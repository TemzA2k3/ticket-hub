import { createSlice } from '@reduxjs/toolkit';

import { fetchFavotiteEvents } from './favoriteEventsThunks';
import { IEvent } from "../../../../shared/types/index"


interface IFavoritesEventsState {
    favoriteEvents: IEvent[];
    loading: boolean;
    error: string | null;
  }
  
  const initialState: IFavoritesEventsState = {
    favoriteEvents: [],
    loading: false,
    error: null,
  };
  
  const favoritesEventsSlice = createSlice({
    name: 'favoritesEvents',
    initialState,
    reducers: {
      removeEvent: (state, action) => {        
        state.favoriteEvents = state.favoriteEvents.filter(
          event => event.id !== action.payload
        );        
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchFavotiteEvents.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchFavotiteEvents.fulfilled, (state, action) => {
          state.loading = false;
          state.favoriteEvents = action.payload;
        })
        .addCase(fetchFavotiteEvents.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message || 'Something went wrong';
        })
    },
  });
  
  export default favoritesEventsSlice.reducer;