import { createSlice } from "@reduxjs/toolkit";

import { fetchEventsByPage } from "./eventsPaginationThunks.ts";
import { IEvent } from "../../../../shared/types/index";



const EVENTS_PER_PAGE = 8;

interface IEventsState {
  items: IEvent[];
  totalPages: number;
  loading: boolean;
  error: string | null;
}

const initialState: IEventsState = {
  items: [],
  totalPages: 1,
  loading: false,
  error: null,
};

const eventsSlice = createSlice({
  name: "eventsPagination",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEventsByPage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEventsByPage.fulfilled, (state, action) => {
        state.items = action.payload.events;
        state.totalPages = Math.ceil(action.payload.totalCount / EVENTS_PER_PAGE);
        state.loading = false;
      })
      .addCase(fetchEventsByPage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to load events.";
      });
  },
});

export default eventsSlice.reducer;
