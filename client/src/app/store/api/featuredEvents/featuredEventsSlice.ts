import { createSlice } from '@reduxjs/toolkit';

import { fetchFeaturedEvents } from './featuredEventsThunks';
import { IEvent } from "../../../../shared/types/index"



interface IFeaturedEventsState {
  events: IEvent[];
  loading: boolean;
  error: string | null;
}

const initialState: IFeaturedEventsState = {
  events: [],
  loading: false,
  error: null,
};

const featuredEventsSlice = createSlice({
  name: 'featuredEvents',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeaturedEvents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFeaturedEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.events = action.payload;
      })
      .addCase(fetchFeaturedEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

export default featuredEventsSlice.reducer;
