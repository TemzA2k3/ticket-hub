import { createAsyncThunk } from "@reduxjs/toolkit";


export const submitOrder = createAsyncThunk<
  { success: boolean },
  any,
  { rejectValue: string }
>(
  "order/submitOrder",
  async (orderData, { rejectWithValue }) => {    
    try {      
      const token = localStorage.getItem("token") || sessionStorage.getItem("token"); 
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/orders`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(orderData),
      });
      
      if (!response.ok) {
        const error = await response.json();        
        return rejectWithValue(error.error || "Order failed");
      }

      const result = await response.json();
      return result
    } catch (err: any) {
      return rejectWithValue(err.message || "Network error");
    }
  }
);