import { createAsyncThunk } from "@reduxjs/toolkit";

import { IUser } from "../../../../shared/types/index"



export const registerUser = createAsyncThunk<
    { registered: boolean },
    Omit<IUser, "id"> & { password: string },
    { rejectValue: string }
>("auth/registerUser", async (userData, { rejectWithValue }) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/register`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userData),
        });

        if (!response.ok) {
          const errorData = await response.json();
          return rejectWithValue(errorData.message || "Registration failed");
        }

        return await response.json(); 
        // return { registered: true }
    } catch (err: any) {
        return rejectWithValue(err.message || "Network error");
    }
});