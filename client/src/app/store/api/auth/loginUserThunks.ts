import { createAsyncThunk } from "@reduxjs/toolkit";
import { IUser } from "../../../../shared/types";

interface LoginResponse {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  token: string;
  avatarUrl: string | null
  verified: boolean;
}

export const loginUser = createAsyncThunk<
  { user: IUser; token: string },
  { email: string; password: string; remember: boolean },
  { rejectValue: string }
>(
  "auth/loginUser",
  async ({ email, password, remember }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error.message || "Login failed");
      }

      const data: LoginResponse = await response.json();      

      const user = {
        id: data.id,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        verified: data.verified,
        avatarUrl: data.avatarUrl
      };

      const storage = remember ? localStorage : sessionStorage;
      storage.setItem("token", data.token);
      storage.setItem("user", JSON.stringify(user));

      return { user, token: data.token };
    } catch (err: any) {
      return rejectWithValue(err.message || "Network error");
    }
  }
);
