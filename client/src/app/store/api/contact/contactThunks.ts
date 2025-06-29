import { createAsyncThunk } from "@reduxjs/toolkit";

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  category: string;
  message: string;
}

export const sendContactForm = createAsyncThunk(
  "contact/send",
  async (formData: ContactFormData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");   
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error.message || "Failed to send message");
      }

      const result = await response.json();
      return result;
    } catch (error: any) {
      return rejectWithValue(error.message || "Network error");
    }
  }
);