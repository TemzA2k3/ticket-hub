import { createSlice } from "@reduxjs/toolkit";
import { sendContactForm } from "./contactThunks";

interface ContactState {
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: ContactState = {
  loading: false,
  error: null,
  success: false,
};

const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    resetContactState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendContactForm.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(sendContactForm.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.error = null;
      })
      .addCase(sendContactForm.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || "Failed to send message";
        state.success = false;
      });
  },
});

export const { resetContactState } = contactSlice.actions;
export default contactSlice.reducer;