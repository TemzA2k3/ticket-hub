import { createSlice } from '@reduxjs/toolkit';


import { fetchUserTickets } from './userTicketsThunks';
import { IEventDetails } from "../../../../shared/types/index"



interface UserTicketsState {
    userTickets: IEventDetails[];
    loading: boolean;
    error: string | null;
  }
  
  const initialState: UserTicketsState = {
    userTickets: [],
    loading: false,
    error: null,
  };
  
  const userTicketsSlice = createSlice({
    name: 'userTickets',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchUserTickets.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchUserTickets.fulfilled, (state, action) => {          
          state.loading = false;
          state.userTickets = action.payload;
        })
        .addCase(fetchUserTickets.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message || 'Something went wrong';
        });
    },
  });
  
  export default userTicketsSlice.reducer;