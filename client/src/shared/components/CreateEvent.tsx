import { useEffect, useState } from "react"
import { useFormik, FieldArray, FormikProvider } from "formik";

import { useAppDispatch, useAppSelector } from "../../app/hooks/useTypedReduxUtils";
import { createEventThunk } from "../../app/store/api/createEvent/createEventThunk"

import { PublishedEventModal } from "./PublishedEventModal"
import { AlertMessage } from "./AlertMessage"

import { initialValues, validationSchema, steps, getImageUrlFromFile } from "../utils/createEventUtils"
import { IEventFormData } from "../types/index"



export const CreateEvent = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [newEventId, setNewEventId] = useState<string | null>(null);

  const { loading, error } = useAppSelector(state => state.createEvent);
  const dispatch = useAppDispatch()

  const formik = useFormik<IEventFormData>({
    initialValues,
    validationSchema: validationSchema[currentStep - 1],
    enableReinitialize: false,
    validateOnChange: false,
    validateOnBlur: true,
    onSubmit: () => { },
  });

  const totalCapacity = formik.values.ticketTypes.reduce((sum, ticket) => sum + ticket.quantity, 0);
  const priceRange = formik.values.ticketTypes.length
    ? `$${Math.min(...formik.values.ticketTypes.map((t) => t.price))} - $${Math.max(...formik.values.ticketTypes.map((t) => t.price))}`
    : "$0 - $0";


  const nextStep = async () => {
    const errors = await formik.validateForm();
    if (Object.keys(errors).length === 0) {
      setCurrentStep((s) => s + 1);
    } else {
      formik.setTouched(
        Object.keys(errors).reduce((acc, key) => {
          acc[key] = true;
          return acc;
        }, {} as Record<string, boolean>)
      );
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((s) => s - 1);
    }
  };

  const handlePublishEventClick = async () => {
    const errors = await formik.validateForm();
    if (Object.keys(errors).length === 0) {
      const resultAction = await dispatch(createEventThunk(formik.values));
      if (createEventThunk.fulfilled.match(resultAction)) {
        setNewEventId(resultAction.payload?.id || null);
        setShowSuccessModal(true);
      }
    } else {
      formik.setTouched(
        Object.keys(errors).reduce((acc, key) => {
          acc[key] = true;
          return acc;
        }, {} as Record<string, boolean>)
      );
    }
  };

  useEffect(() => {
    return () => {
      if (formik.values.image) {
        URL.revokeObjectURL(getImageUrlFromFile(formik.values.image as File));
      }
    };
  }, [formik.values.image]);  

  return (
    <section className="py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Page Header */}
        <header className="text-center mb-8 border-b border-border pb-4">
          <h1 className="text-3xl font-bold mb-2">Create New Event</h1>
          <p className="text-muted-foreground">Share your event with the world and start selling tickets</p>
        </header>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8 p-6 bg-[#f5f5f5]">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${currentStep >= step.number ? "bg-black text-white" : "bg-gray-200 text-gray-600"
                    }`}
                >
                  {step.number}
                </div>
                <div className="text-xs mt-2 text-center">{step.label}</div>
              </div>
              {index < steps.length - 1 && (
                <div className={`w-16 h-0.5 mx-4 ${currentStep > step.number ? "bg-black" : "bg-gray-200"}`} />
              )}
            </div>
          ))}
        </div>

        {/* Form Container */}
        <FormikProvider value={formik}>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="bg-white border border-border rounded-lg p-6">
              {/* Step 1: Basic Information */}
              {currentStep === 1 && (
                <div>
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-2">Basic Information</h2>
                    <p className="text-muted-foreground">Let's start with the essential details about your event</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium mb-2">Event Title *</label>
                      <input
                        type="text"
                        name="title"
                        value={formik.values.title}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="Enter your event title"
                        className="w-full h-10 px-3 border border-input rounded focus:outline-none focus:border-ring"
                        required
                      />
                      {formik.touched.title && formik.errors.title && (
                        <div className="text-xs text-red-500 mt-1">{formik.errors.title}</div>
                      )}
                      <div className="text-xs text-muted-foreground mt-1">Make it catchy and descriptive</div>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium mb-2">Category *</label>
                      <select
                        name="category"
                        value={formik.values.category}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="w-full h-10 px-3 border border-input rounded focus:outline-none focus:border-ring"
                        required
                      >
                        <option value="">Select a category</option>
                        <option value="Concerts">Concerts</option>
                        <option value="Sports">Sports</option>
                        <option value="Theater">Theater</option>
                        <option value="Comedy">Comedy</option>
                        <option value="Films">Films</option>
                        <option value="Food and Drink">Food and Drink</option>
                        <option value="Gaming">Gaming</option>
                        <option value="Conferences">Conferences</option>
                      </select>
                      {formik.touched.category && formik.errors.category && (
                        <div className="text-xs text-red-500 mt-1">{formik.errors.category}</div>
                      )}
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium mb-2">Event Description *</label>
                      <textarea
                        name="description"
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        rows={4}
                        placeholder="Describe your event in detail..."
                        className="w-full px-3 py-2 border border-input rounded focus:outline-none focus:border-ring"
                        required
                      />
                      {formik.touched.description && formik.errors.description && (
                        <div className="text-xs text-red-500 mt-1">{formik.errors.description}</div>
                      )}
                      <div className="text-xs text-muted-foreground mt-1">Tell people what makes your event special</div>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium mb-2">Event Image</label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                        <input
                          type="file"
                          accept="image/*"
                          id="event-image"
                          style={{ display: "none" }}
                          onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                              formik.setFieldValue("image", e.target.files[0]);
                            }
                          }}
                        />
                        <label htmlFor="event-image" className="cursor-pointer">
                          <i className="fa-solid fa-cloud-upload-alt text-2xl text-gray-400 mb-2 block"></i>
                          <span className="text-gray-600">Click to upload or drag and drop</span>
                          <div className="text-xs text-muted-foreground mt-1">PNG, JPG up to 10MB</div>
                        </label>
                        {formik.touched.image && formik.errors.image && (
                          <div className="text-xs text-red-500 mt-1">{formik.errors.image as string}</div>
                        )}
                        {formik.values.image && (
                          <div className="text-xs text-green-600 mt-1">{(formik.values.image as File).name}</div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Event Details */}
              {currentStep === 2 && (
                <div>
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-2">Event Details</h2>
                    <p className="text-muted-foreground">When and where will your event take place?</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Start Date *</label>
                      <input
                        type="date"
                        name="startDate"
                        value={formik.values.startDate}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="w-full h-10 px-3 border border-input rounded focus:outline-none focus:border-ring"
                        required
                      />
                      {formik.touched.startDate && formik.errors.startDate && (
                        <div className="text-xs text-red-500 mt-1">{formik.errors.startDate}</div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Start Time *</label>
                      <input
                        type="time"
                        name="startTime"
                        value={formik.values.startTime}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="w-full h-10 px-3 border border-input rounded focus:outline-none focus:border-ring"
                        required
                      />
                      {formik.touched.startTime && formik.errors.startTime && (
                        <div className="text-xs text-red-500 mt-1">{formik.errors.startTime}</div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">End Date *</label>
                      <input
                        type="date"
                        name="endDate"
                        value={formik.values.endDate}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="w-full h-10 px-3 border border-input rounded focus:outline-none focus:border-ring"
                      />
                      {formik.touched.endDate && formik.errors.endDate && (
                        <div className="text-xs text-red-500 mt-1">{formik.errors.endDate}</div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">End Time *</label>
                      <input
                        type="time"
                        name="endTime"
                        value={formik.values.endTime}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="w-full h-10 px-3 border border-input rounded focus:outline-none focus:border-ring"
                      />
                      {formik.touched.endTime && formik.errors.endTime && (
                        <div className="text-xs text-red-500 mt-1">{formik.errors.endTime}</div>
                      )}
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium mb-2">Venue Name *</label>
                      <input
                        type="text"
                        name="venueName"
                        value={formik.values.venueName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="Enter venue name"
                        className="w-full h-10 px-3 border border-input rounded focus:outline-none focus:border-ring"
                        required
                      />
                      {formik.touched.venueName && formik.errors.venueName && (
                        <div className="text-xs text-red-500 mt-1">{formik.errors.venueName}</div>
                      )}
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium mb-2">Venue Address *</label>
                      <input
                        type="text"
                        name="venueAddress"
                        value={formik.values.venueAddress}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="Enter full address"
                        className="w-full h-10 px-3 border border-input rounded focus:outline-none focus:border-ring"
                        required
                      />
                      {formik.touched.venueAddress && formik.errors.venueAddress && (
                        <div className="text-xs text-red-500 mt-1">{formik.errors.venueAddress}</div>
                      )}
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium mb-2">Map Embed Link *</label>
                      <input
                        type="text"
                        name="mapEmbedLink"
                        value={formik.values.mapEmbedLink}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="Enter map embed link"
                        className="w-full h-10 px-3 border border-input rounded focus:outline-none focus:border-ring"
                        required
                      />
                      {formik.touched.mapEmbedLink && formik.errors.mapEmbedLink && (
                        <div className="text-xs text-red-500 mt-1">{formik.errors.mapEmbedLink}</div>
                      )}
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium mb-2">Map View Link *</label>
                      <input
                        type="text"
                        name="mapViewLink"
                        value={formik.values.mapViewLink}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="Enter map embed link"
                        className="w-full h-10 px-3 border border-input rounded focus:outline-none focus:border-ring"
                        required
                      />
                      {formik.touched.mapViewLink && formik.errors.mapViewLink && (
                        <div className="text-xs text-red-500 mt-1">{formik.errors.mapViewLink}</div>
                      )}
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium mb-2">Additional Information</label>
                      <textarea
                        name="additionalInfo"
                        value={formik.values.additionalInfo}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        rows={3}
                        placeholder="Parking info, accessibility details, etc."
                        className="w-full px-3 py-2 border border-input rounded focus:outline-none focus:border-ring"
                      />
                      {formik.touched.additionalInfo && formik.errors.additionalInfo && (
                        <div className="text-xs text-red-500 mt-1">{formik.errors.additionalInfo}</div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Ticket Information */}
              {currentStep === 3 && (
                <div>
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-2">Ticket Information</h2>
                    <p className="text-muted-foreground">Set up your ticket types and pricing</p>
                  </div>

                  <FieldArray name="ticketTypes">
                    {({ push, remove }) => (
                      <div className="mb-6">
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="text-lg font-medium">Ticket Types</h3>
                          <button
                            type="button"
                            onClick={() =>
                              push({
                                id: Date.now().toString(),
                                name: "New Ticket Type",
                                price: 0,
                                quantity: 0,
                                description: "",
                                saleStart: "",
                                saleEnd: "",
                              })
                            }
                            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                          >
                            <i className="fa-solid fa-plus"></i>
                            Add Ticket Type
                          </button>
                        </div>

                        <div className="space-y-6">
                          {formik.values.ticketTypes.map((ticket, idx) => (
                            <div key={ticket.id} className="border border-gray-200 rounded-lg p-4">
                              <div className="flex justify-between items-center mb-4">
                                <h4 className="font-medium">{ticket.name}</h4>
                                {formik.values.ticketTypes.length > 1 && (
                                  <button
                                    type="button"
                                    onClick={() => remove(idx)}
                                    className="text-red-500 hover:text-red-700 p-1"
                                    title="Remove ticket type"
                                  >
                                    <i className="fa-solid fa-trash"></i>
                                  </button>
                                )}
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <label className="block text-sm font-medium mb-2">Ticket Name *</label>
                                  <input
                                    type="text"
                                    name={`ticketTypes[${idx}].name`}
                                    value={ticket.name}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className="w-full h-10 px-3 border border-input rounded focus:outline-none focus:border-ring"
                                    required
                                  />
                                  {formik.touched.ticketTypes?.[idx]?.name &&
                                    typeof formik.errors.ticketTypes?.[idx] === 'object' &&
                                    formik.errors.ticketTypes?.[idx] &&
                                    'name' in formik.errors.ticketTypes[idx] &&
                                    (
                                      <div className="text-xs text-red-500 mt-1">{(formik.errors.ticketTypes[idx] as any).name}</div>
                                    )}
                                </div>

                                <div>
                                  <label className="block text-sm font-medium mb-2">Price *</label>
                                  <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                                    <input
                                      type="number"
                                      name={`ticketTypes[${idx}].price`}
                                      value={ticket.price}
                                      onChange={formik.handleChange}
                                      onBlur={formik.handleBlur}
                                      min="0"
                                      step="0.01"
                                      placeholder="0.00"
                                      className="w-full h-10 pl-8 pr-3 border border-input rounded focus:outline-none focus:border-ring"
                                      required
                                    />
                                  </div>
                                  {formik.touched.ticketTypes?.[idx]?.price &&
                                    typeof formik.errors.ticketTypes?.[idx] === 'object' &&
                                    formik.errors.ticketTypes?.[idx] &&
                                    'price' in formik.errors.ticketTypes[idx] &&
                                    (
                                      <div className="text-xs text-red-500 mt-1">{(formik.errors.ticketTypes[idx] as any).price}</div>
                                    )}
                                </div>

                                <div className="md:col-span-2">
                                  <label className="block text-sm font-medium mb-2">Quantity Available *</label>
                                  <input
                                    type="number"
                                    name={`ticketTypes[${idx}].quantity`}
                                    value={ticket.quantity}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    min="1"
                                    placeholder="100"
                                    className="w-full h-10 px-3 border border-input rounded focus:outline-none focus:border-ring"
                                    required
                                  />
                                  {formik.touched.ticketTypes?.[idx]?.quantity &&
                                    typeof formik.errors.ticketTypes?.[idx] === 'object' &&
                                    formik.errors.ticketTypes?.[idx] &&
                                    'quantity' in formik.errors.ticketTypes[idx] &&
                                    (
                                      <div className="text-xs text-red-500 mt-1">{(formik.errors.ticketTypes[idx] as any).quantity}</div>
                                    )}
                                </div>

                                <div className="md:col-span-2">
                                  <label className="block text-sm font-medium mb-2">Description</label>
                                  <textarea
                                    name={`ticketTypes[${idx}].description`}
                                    value={ticket.description}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    rows={2}
                                    placeholder="Describe what's included with this ticket type"
                                    className="w-full px-3 py-2 border border-input rounded focus:outline-none focus:border-ring"
                                  />
                                  {formik.touched.ticketTypes?.[idx]?.description &&
                                    typeof formik.errors.ticketTypes?.[idx] === 'object' &&
                                    formik.errors.ticketTypes?.[idx] &&
                                    'description' in formik.errors.ticketTypes[idx] &&
                                    (
                                      <div className="text-xs text-red-500 mt-1">{(formik.errors.ticketTypes[idx] as any).description}</div>
                                    )}
                                </div>

                                <div>
                                  <label className="block text-sm font-medium mb-2">Sale Start Date</label>
                                  <input
                                    type="datetime-local"
                                    name={`ticketTypes[${idx}].saleStart`}
                                    value={ticket.saleStart}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className="w-full h-10 px-3 border border-input rounded focus:outline-none focus:border-ring"
                                  />
                                  {formik.touched.ticketTypes?.[idx]?.saleStart &&
                                    typeof formik.errors.ticketTypes?.[idx] === 'object' &&
                                    formik.errors.ticketTypes?.[idx] &&
                                    'saleStart' in formik.errors.ticketTypes[idx] &&
                                    (
                                      <div className="text-xs text-red-500 mt-1">{(formik.errors.ticketTypes[idx] as any).saleStart}</div>
                                    )}
                                </div>

                                <div>
                                  <label className="block text-sm font-medium mb-2">Sale End Date</label>
                                  <input
                                    type="datetime-local"
                                    name={`ticketTypes[${idx}].saleEnd`}
                                    value={ticket.saleEnd}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className="w-full h-10 px-3 border border-input rounded focus:outline-none focus:border-ring"
                                  />
                                  {formik.touched.ticketTypes?.[idx]?.saleEnd &&
                                    typeof formik.errors.ticketTypes?.[idx] === 'object' &&
                                    formik.errors.ticketTypes?.[idx] &&
                                    'saleEnd' in formik.errors.ticketTypes[idx] &&
                                    (
                                      <div className="text-xs text-red-500 mt-1">{(formik.errors.ticketTypes[idx] as any).saleEnd}</div>
                                    )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                          <h3 className="font-medium mb-3">Pricing Summary</h3>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span>Total Ticket Types:</span>
                              <span>{formik.values.ticketTypes.length}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Total Capacity:</span>
                              <span>{totalCapacity}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Price Range:</span>
                              <span>{priceRange}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </FieldArray>
                </div>
              )}

              {/* Step 4: Review & Publish */}
              {currentStep === 4 && (
                <div>
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-2">Review & Publish</h2>
                    <p className="text-muted-foreground">Review your event details before publishing</p>
                  </div>

                  <div className="space-y-6">
                    {/* Event Overview */}
                    <div>
                      <h3 className="text-lg font-medium mb-3">Event Overview</h3>
                      <div className="border border-gray-200 rounded-lg p-4 flex gap-4">
                        <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          {formik.values.image ? (
                            <img
                              src={getImageUrlFromFile(formik.values.image as File)}
                              alt="Event preview"
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <i className="fa-solid fa-image text-gray-400 text-xl"></i>
                          )}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium mb-2">{formik.values.title || "Event Title"}</h4>
                          <div className="flex gap-4 text-sm text-gray-600 mb-2">
                            <span>{formik.values.category || "Category"}</span>
                          </div>
                          <p className="text-sm text-gray-600">
                            {formik.values.description || "Event description will appear here..."}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Event Details */}
                    <div>
                      <h3 className="text-lg font-medium mb-3">Event Details</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-medium mb-2">Date & Time</h4>
                          <div className="space-y-1 text-sm">
                            <div className="flex items-center gap-2">
                              <i className="fa-solid fa-calendar w-4"></i>
                              <span>{formik.values.startDate || "Date will appear here"}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <i className="fa-solid fa-clock w-4"></i>
                              <span>{formik.values.startTime || "Time will appear here"}</span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium mb-2">Location</h4>
                          <div className="space-y-1 text-sm">
                            <div className="flex items-center gap-2">
                              <i className="fa-solid fa-location-dot w-4"></i>
                              <span>{formik.values.venueName || "Venue will appear here"}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <i className="fa-solid fa-map-marker-alt w-4"></i>
                              <span>{formik.values.venueAddress || "Address will appear here"}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Ticket Summary */}
                    <div>
                      <h3 className="text-lg font-medium mb-3">Ticket Summary</h3>
                      <div className="space-y-3">
                        {formik.values.ticketTypes.map((ticket) => (
                          <div key={ticket.id} className="border border-gray-200 rounded-lg p-3">
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="font-medium">{ticket.name}</h4>
                                <p className="text-sm text-gray-600">{ticket.description}</p>
                              </div>
                              <div className="text-right">
                                <div className="font-medium">${ticket.price}</div>
                                <div className="text-sm text-gray-600">{ticket.quantity} available</div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Form Navigation */}
              <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={prevStep}
                  className={`flex items-center gap-2 px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors ${currentStep === 1 ? "invisible" : ""
                    }`}
                >
                  <i className="fa-solid fa-arrow-left"></i>
                  Previous
                </button>

                <div className="flex gap-3">
                  {currentStep < 4 ? (
                    <button
                      type="button"
                      onClick={nextStep}
                      className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors"
                    >
                      Next
                      <i className="fa-solid fa-arrow-right"></i>
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handlePublishEventClick}
                      className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors"
                      disabled={loading}
                    >
                      {loading ? (
                        <span className="loader" />
                      ) : (
                        <i className="fa-solid fa-rocket"></i>
                      )}
                      Publish Event
                    </button>
                  )}
                </div>
              </div>
            </div>
          </form>
        </FormikProvider>

        {/* Success Modal */}
        {showSuccessModal && (
          <PublishedEventModal newEventId={newEventId} />
        )}

        {error && (
          <AlertMessage
            type="error"
            message={error}
          />
        )}
      </div>
    </section>
  );
}
