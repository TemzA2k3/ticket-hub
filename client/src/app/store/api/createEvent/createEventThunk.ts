import { createAsyncThunk } from '@reduxjs/toolkit';
import { IEventFormData } from '../../../../shared/types/index';
import { prepareEventData } from '../../../../shared/utils/createEventUtils';



export const createEventThunk = createAsyncThunk(
  'createEvent/create',
  async (eventData: IEventFormData, { rejectWithValue }) => {
    try {      
      const formData = prepareEventData(eventData);
      const token = localStorage.getItem("token") || sessionStorage.getItem("token"); 

      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/create_event`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();        
        return rejectWithValue(errorData.error);
      }

      const data = await response.json();      
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Unknown error');
    }
  }
);