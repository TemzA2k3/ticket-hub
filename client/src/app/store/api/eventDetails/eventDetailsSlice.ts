// eventDetailsSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import { fetchEventDetails } from "./eventDetailsThunks";
import type { IEventDetails } from '../../../../shared/types/index';


interface EventDetailsState {
  loading: boolean;
  error: string | null;
  eventDetails: IEventDetails | null;
}

const initialState: EventDetailsState = {
  loading: false,
  error: null,
  eventDetails: null,
};

const eventDetailsSlice = createSlice({
  name: "eventDetails",
  initialState,
  reducers: {
    setFavorite(state, action) {
      if (state.eventDetails) {
        state.eventDetails.favorite = action.payload;
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEventDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEventDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.eventDetails = action.payload;
      })
      .addCase(fetchEventDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Unknown error";
      });
  },
});

export default eventDetailsSlice.reducer;
