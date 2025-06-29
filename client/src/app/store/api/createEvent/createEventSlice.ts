import { createSlice } from '@reduxjs/toolkit';
import { createEventThunk } from './createEventThunk';

interface CreateEventState {
  loading: boolean;
  error: string | null;
}

const initialState: CreateEventState = {
  loading: false,
  error: null,
};

const createEventSlice = createSlice({
  name: 'createEvent',
  initialState,
  reducers: {
    resetCreateEventState: (state) => {
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createEventThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createEventThunk.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createEventThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetCreateEventState } = createEventSlice.actions;
export default createEventSlice.reducer;