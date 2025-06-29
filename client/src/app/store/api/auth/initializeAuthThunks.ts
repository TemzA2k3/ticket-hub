import { createAsyncThunk } from "@reduxjs/toolkit";


export const initializeAuth = createAsyncThunk(
  "auth/initialize",
  async (_, { rejectWithValue }) => {    
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");    

    if (!token) return { user: null, token: null };

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/get_current_user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Invalid token");

      const user = await response.json(); 
      return { user, token };
    } catch (err: any) {
      return rejectWithValue("Session expired or invalid");
    }
  }
);

