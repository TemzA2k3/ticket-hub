import * as Yup from "yup";

import { IEventFormData } from "../types/index"



export const initialValues: IEventFormData = {
  title: "",
  category: "",
  description: "",
  image: null,
  startDate: "",
  startTime: "",
  endDate: "",
  endTime: "",
  venueName: "",
  venueAddress: "",
  mapEmbedLink: "",
  mapViewLink: "",
  additionalInfo: "",
  ticketTypes: [
    {
      id: "1",
      name: "General Admission",
      price: 0,
      quantity: 0,
      description: "",
      saleStart: "",
      saleEnd: "",
    },
  ],
};

export const validationSchema = [
  // Step 1
  Yup.object({
    title: Yup.string().required("Title is required"),
    category: Yup.string().required("Category is required"),
    description: Yup.string().required("Description is required"),
    image: Yup.mixed()
      .test("fileSize", "Image is too large (max 10MB)", (value) => {
        if (!value) return true;
        if (value instanceof File) {
          return value.size <= 10 * 1024 * 1024;
        }
        return true;
      })
      .test("fileType", "Unsupported file format", (value) => {
        if (!value) return true;
        if (value instanceof File) {
          return ["image/jpeg", "image/png", "image/jpg"].includes(value.type);
        }
        return true;
      }),
  }),
  // Step 2
  Yup.object({
    startDate: Yup.string().required("Start date is required"),
    startTime: Yup.string().required("Start time is required"),
    endDate: Yup.string().required("End date is required"),
    endTime: Yup.string().required("End time is required"),
    venueName: Yup.string().required("Venue name is required"),
    venueAddress: Yup.string().required("Venue address is required"),
    mapEmbedLink: Yup.string()
      .required("Map Embed Link address is required")
      .matches(
        /^https:\/\/www\.google\.com\/maps\/embed\?pb=.+$/,
        "Map Embed Link must be a valid Google Maps embed URL"
      ),
    mapViewLink: Yup.string()
      .required("Map View Link address is required")
      .matches(
        /^https:\/\/maps\.app\.goo\.gl\/[A-Za-z0-9]+$/,
        "Map View Link must be a valid Google Maps short link"
      ),
    additionalInfo: Yup.string(),
  }),
  // Step 3
  Yup.object({
    ticketTypes: Yup.array().of(
      Yup.object({
        name: Yup.string().required("Ticket name is required"),
        price: Yup.number()
          .moreThan(0, "Price must be greater than 0").required("Price is required"),
        quantity: Yup.number()
          .min(1, "Quantity must be at least 1").required("Quantity is required"),
        description: Yup.string(),
        saleStart: Yup.string(),
        saleEnd: Yup.string(),
      })
    ),
  }),
  // Step 4 (review, no new fields)
  Yup.object({}),
];


export const prepareEventData = (values: IEventFormData): FormData => {
  const formData = new FormData();

  Object.entries(values).forEach(([key, value]) => {
    if (key === 'image') {
      if (value instanceof File) {
        formData.append('image', value);
      }
    } else if (key === 'ticketTypes') {
      formData.append('ticketTypes', JSON.stringify(value));
    } else {
      formData.append(key, value as string);
    }
  });

  return formData;
};

export const steps = [
  { number: 1, label: "Basic Info" },
  { number: 2, label: "Details" },
  { number: 3, label: "Tickets" },
  { number: 4, label: "Review" },
];

export const getImageUrlFromFile = (file: File | null) => {
  if (!file) return "";
  return URL.createObjectURL(file);
};