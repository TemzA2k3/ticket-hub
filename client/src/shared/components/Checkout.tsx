import { useState } from "react";
import { useLocation, Link, useParams, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

import { useAppDispatch } from "../../app/hooks/useTypedReduxUtils";
import { submitOrder } from "../../app/store/api/order/orderThunks";

import { formatExpiryInput } from "../utils/formatExpiryInput";

import { BlankSearch } from "./BlankSearch";
import { Button } from "./Buttons";
import { AlertMessage } from "./AlertMessage";

import type { CheckoutFormValues } from "../types/index"

export const Checkout = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<"card" | "paypal">("card");

  const { state } = useLocation();
  const { eventId } = useParams();
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const { eventTitle, eventStartDate, eventEndDate, ticket, quantity, subtotal, serviceFee, total } = state || {};


  const handleSubmit = async () => {
    const isValid = await formik.validateForm().then(errors => Object.keys(errors).length === 0);
    if (!isValid) {
      formik.setTouched(
        Object.keys(formik.values).reduce((acc, key) => ({ ...acc, [key]: true }), {} as any)
      );
      return;
    }
    const orderData = {
      ...formik.values,
      eventId,
      eventTitle,
      eventStartDate,
      eventEndDate,
      ticket,
      quantity,
      subtotal,
      serviceFee,
      total,
    };
    try {
      setIsSubmitting(true);
      setErrorMessage(null);
      const result = await dispatch(submitOrder(orderData)).unwrap();
      
      if (result.success) {
        navigate("/", {
          state: { purchasedTicketSuccess: true },
        });
      }
    } catch (err) {
      const message = typeof err === "string" ? err : "Order failed";
      setErrorMessage(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formik = useFormik<CheckoutFormValues>({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      paymentMethod: "card",
      cardNumber: "",
      expiry: "",
      cvc: "",
      nameOnCard: "",
      address: "",
      city: "",
      state: "",
      zip: "",
      country: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("Required"),
      lastName: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email").required("Required"),
      phone: Yup.string().required("Required"),
      cardNumber: Yup.string().when("paymentMethod", {
        is: "card",
        then: (schema) =>
          schema.matches(/^\d{16}$/, "Card number must be 16 digits").required("Card number is required"),
      }),
      expiry: Yup.string().when("paymentMethod", {
        is: "card",
        then: (schema) =>
          schema
            .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, "Expiry must be in MM/YY format")
            .required("Expiry date is required"),
      }),
      cvc: Yup.string().when("paymentMethod", {
        is: "card",
        then: (schema) =>
          schema.matches(/^\d{3}$/, "CVC must be 3 digits").required("CVC is required"),
      }),
      nameOnCard: Yup.string().when("paymentMethod", {
        is: "card",
        then: (schema) =>
          schema.matches(/^[A-Za-z\s]+$/, "Name can only contain letters").required("Name on card is required"),
      }),
      address: Yup.string().required("Required"),
      city: Yup.string().required("Required"),
      state: Yup.string().required("Required"),
      zip: Yup.string()
        .matches(/^\d{4,6}$/, "Zip code must be 4 to 6 digits")
        .required("Required"),
      country: Yup.string().required("Required"),
    }),
    onSubmit: () => { },
  });

  if (!state) {
    return <BlankSearch image="fa-solid fa-triangle-exclamation"
      title="No Event or Ticker Selected"
      description="Please go back and choose an event or ticket before proceeding to checkout."
      border={false} />
  }

  return (
    <section id="checkout" className="py-8">
      <div className="w-full max-w-[1200px] mx-auto px-4">
        <Link
          to={`/events/${eventId}`}
          className="inline-flex items-center gap-2 mb-6 text-sm font-medium hover:underline">
          <i className="fa-solid fa-arrow-left" />
          Back to Event
        </Link>

        {errorMessage && (
          <AlertMessage type="error" message={errorMessage}/>
        )}

        <div className="grid gap-6 md:grid-cols-[2fr_1fr]">
          <form className="grid gap-6">
            <h1 className="text-2xl font-bold mb-4">Checkout</h1>

            {/* Contact Info */}
            <div className="border rounded shadow">
              <div className="border-b px-6 py-4">
                <h2 className="text-lg font-semibold">Contact Information</h2>
              </div>
              <div className="p-6 grid gap-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm mb-1">First Name</label>
                    <input
                      {...formik.getFieldProps("firstName")}
                      placeholder="Enter your first name"
                      className="w-full border px-3 py-2 rounded"
                    />
                    {formik.touched.firstName && formik.errors.firstName && (
                      <div className="text-red-500 text-sm">{formik.errors.firstName}</div>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm mb-1">Last Name</label>
                    <input
                      {...formik.getFieldProps("lastName")}
                      placeholder="Enter your last name"
                      className="w-full border px-3 py-2 rounded"
                    />
                    {formik.touched.lastName && formik.errors.lastName && (
                      <div className="text-red-500 text-sm">{formik.errors.lastName}</div>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-sm mb-1">Email</label>
                  <input
                    type="email"
                    {...formik.getFieldProps("email")}
                    placeholder="example@mail.com"
                    className="w-full border px-3 py-2 rounded"
                  />
                  {formik.touched.email && formik.errors.email && (
                    <div className="text-red-500 text-sm">{formik.errors.email}</div>
                  )}
                </div>
                <div>
                  <label className="block text-sm mb-1">Phone</label>
                  <input
                    type="tel"
                    {...formik.getFieldProps("phone")}
                    placeholder="+1234567890"
                    className="w-full border px-3 py-2 rounded"
                  />
                  {formik.touched.phone && formik.errors.phone && (
                    <div className="text-red-500 text-sm">{formik.errors.phone}</div>
                  )}
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="border rounded shadow">
              <div className="border-b px-6 py-4">
                <h2 className="text-lg font-semibold">Payment Method</h2>
              </div>
              <div className="p-6 grid gap-4">
                <div
                  className={`flex items-center gap-2 p-4 border rounded cursor-pointer ${paymentMethod === "card" ? "border-primary bg-black/5" : "border-border"
                    }`}
                  onClick={() => {
                    setPaymentMethod("card");
                    formik.setFieldValue("paymentMethod", "card");
                  }}
                >
                  <input type="radio" checked={paymentMethod === "card"} readOnly />
                  <label>Credit or Debit Card</label>
                </div>
                <div
                  className={`flex items-center gap-2 p-4 border rounded cursor-pointer ${paymentMethod === "paypal" ? "border-primary bg-black/5" : "border-border"
                    }`}
                  onClick={() => {
                    setPaymentMethod("paypal");
                    formik.setFieldValue("paymentMethod", "paypal");
                  }}
                >
                  <input type="radio" checked={paymentMethod === "paypal"} readOnly />
                  <label>PayPal</label>
                </div>

                {paymentMethod === "card" && (
                  <div className="grid gap-4">
                    <div>
                      <label className="block text-sm mb-1">Card Number</label>
                      <input
                        {...formik.getFieldProps("cardNumber")}
                        inputMode="numeric"
                        maxLength={16}
                        placeholder="1234 5678 9012 3456"
                        onChange={(e) => {
                          const digitsOnly = e.target.value.replace(/\D/g, "");
                          formik.setFieldValue("cardNumber", digitsOnly);
                        }}
                        className="w-full border px-3 py-2 rounded"
                      />
                      {formik.touched.cardNumber && formik.errors.cardNumber && (
                        <div className="text-red-500 text-sm">{formik.errors.cardNumber}</div>
                      )}
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm mb-1">Expiry</label>
                        <input
                          {...formik.getFieldProps("expiry")}
                          placeholder="MM/YY"
                          maxLength={5}
                          onChange={(e) => {
                            const formatted = formatExpiryInput(e.target.value);
                            formik.setFieldValue("expiry", formatted);
                          }}
                          className="w-full border px-3 py-2 rounded"
                        />
                        {formik.touched.expiry && formik.errors.expiry && (
                          <div className="text-red-500 text-sm">{formik.errors.expiry}</div>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm mb-1">CVC</label>
                        <input
                          {...formik.getFieldProps("cvc")}
                          inputMode="numeric"
                          maxLength={3}
                          placeholder="123"
                          onChange={(e) => {
                            const digitsOnly = e.target.value.replace(/\D/g, "");
                            formik.setFieldValue("cvc", digitsOnly);
                          }}
                          className="w-full border px-3 py-2 rounded"
                        />
                        {formik.touched.cvc && formik.errors.cvc && (
                          <div className="text-red-500 text-sm">{formik.errors.cvc}</div>
                        )}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm mb-1">Name on Card</label>
                      <input
                        {...formik.getFieldProps("nameOnCard")}
                        placeholder="John Doe"
                        onChange={(e) => {
                          const lettersOnly = e.target.value.replace(/[^a-zA-Z\s]/g, "");
                          formik.setFieldValue("nameOnCard", lettersOnly);
                        }}
                        className="w-full border px-3 py-2 rounded"
                      />
                      {formik.touched.nameOnCard && formik.errors.nameOnCard && (
                        <div className="text-red-500 text-sm">{formik.errors.nameOnCard}</div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Billing Address */}
            <div className="border rounded shadow">
              <div className="border-b px-6 py-4">
                <h2 className="text-lg font-semibold">Billing Address</h2>
              </div>
              <div className="p-6 grid gap-4">
                <div>
                  <label className="block text-sm mb-1">Address</label>
                  <input
                    {...formik.getFieldProps("address")}
                    placeholder="123 Main Street"
                    className="w-full border px-3 py-2 rounded"
                  />
                  {formik.touched.address && formik.errors.address && (
                    <div className="text-red-500 text-sm">{formik.errors.address}</div>
                  )}
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm mb-1">City</label>
                    <input
                      {...formik.getFieldProps("city")}
                      placeholder="e.g. Vilnius"
                      className="w-full border px-3 py-2 rounded"
                    />
                    {formik.touched.city && formik.errors.city && (
                      <div className="text-red-500 text-sm">{formik.errors.city}</div>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm mb-1">State</label>
                    <input
                      {...formik.getFieldProps("state")}
                      placeholder="e.g. Vilniaus m."
                      className="w-full border px-3 py-2 rounded"
                    />
                    {formik.touched.state && formik.errors.state && (
                      <div className="text-red-500 text-sm">{formik.errors.state}</div>
                    )}
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm mb-1">Zip</label>
                    <input
                      {...formik.getFieldProps("zip")}
                      inputMode="numeric"
                      maxLength={6}
                      placeholder="e.g. 123456"
                      onChange={(e) => {
                        const digitsOnly = e.target.value.replace(/\D/g, "");
                        formik.setFieldValue("zip", digitsOnly);
                      }}
                      className="w-full border px-3 py-2 rounded"
                    />
                    {formik.touched.zip && formik.errors.zip && (
                      <div className="text-red-500 text-sm">{formik.errors.zip}</div>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm mb-1">Country</label>
                    <input
                      {...formik.getFieldProps("country")}
                      placeholder="e.g. Lithuania"
                      className="w-full border px-3 py-2 rounded"
                    />
                    {formik.touched.country && formik.errors.country && (
                      <div className="text-red-500 text-sm">{formik.errors.country}</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </form>

          {/* Sidebar */}
          <div>
            <div className="border rounded shadow">
              <div className="border-b px-6 py-4">
                <h2 className="text-lg font-semibold">Order Summary</h2>
              </div>
              <div className="p-6">
                <div className="py-4 space-y-4">
                  <div className="flex gap-4 items-start">
                    <div className="w-12 h-12 flex items-center justify-center rounded bg-black/5 text-primary">
                      <i className="fa-solid fa-ticket" />
                    </div>
                    <div>
                      <h3 className="text-base font-medium mb-1">{eventTitle}</h3>
                      <p className="text-sm text-muted-foreground mb-1">{eventStartDate} - {eventEndDate}</p>
                      <div className="text-sm">{ticket?.name} × {quantity}</div>
                    </div>
                  </div>

                  <hr />

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Price per ticket</span>
                      <span>${ticket?.price?.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>${subtotal?.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Service Fee</span>
                      <span>${serviceFee?.toFixed(2)}</span>
                    </div>
                    <hr />
                    <div className="flex justify-between font-semibold text-base">
                      <span>Total</span>
                      <span>${total?.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="border-t p-6">
                <Button
                  fullWidth
                  variant="primary"
                  disabled={isSubmitting}
                  onClick={handleSubmit}
                >
                  {isSubmitting && <i className="fa fa-spinner fa-spin mr-2" />}
                  Complete Purchase
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
