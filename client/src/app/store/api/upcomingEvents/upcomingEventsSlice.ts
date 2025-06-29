import { createSlice } from "@reduxjs/toolkit";
import { fetchUpcomingEvents } from "./upcomingEventsThunks"


interface IUpcomingEvent {
    id: string;
    title: string;
    category: string;
    date: string;
    time: string
    location: string;
    price: string;
}

interface IUpcomingEventsState {
    upcomingEvents: IUpcomingEvent[];
    loading: boolean;
    error: string | null;
}

const initialState: IUpcomingEventsState = {
    upcomingEvents: [],
    loading: false,
    error: null,
}

const upcomingEventsSlice = createSlice({
    name: 'upcomingEvents',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchUpcomingEvents.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchUpcomingEvents.fulfilled, (state, action) => {
          state.loading = false;
          state.upcomingEvents = action.payload;
        })
        .addCase(fetchUpcomingEvents.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message || 'Something went wrong';
        });
    },
  });
  
  export default upcomingEventsSlice.reducer;