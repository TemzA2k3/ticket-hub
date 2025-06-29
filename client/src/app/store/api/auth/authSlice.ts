import { createSlice } from "@reduxjs/toolkit";

import { registerUser } from "./registerUserThunks"
import { uploadAvatar } from "../profile/profileThunks"
import { loginUser } from "./loginUserThunks"
import { initializeAuth } from "./initializeAuthThunks";

import { IUser } from "../../../../shared/types/index"



interface AuthState {
  user: IUser | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  registered: boolean;
  avatarUrl: string | null;
  initialized: boolean;
  verified: boolean;
}

const initialState: AuthState = {
  user: null,
  token: null,
  loading: false,
  error: null,
  registered: false,
  initialized: false,
  avatarUrl: null,
  verified: false
};


const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.error = null;
    },
    resetRegistered: (state) => {
      state.registered = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.registered = false;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.registered = action.payload.registered;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Registration error";
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.loading = false;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Login failed";
      })
      .addCase(initializeAuth.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.initialized = true;
      })
      .addCase(initializeAuth.rejected, (state) => {
        state.initialized = true;
      })
      .addCase(uploadAvatar.fulfilled, (state, action) => {
        // Если user есть, обновляем avatarUrl
        if (state.user) {
          state.user.avatarUrl = action.payload.avatarUrl;
        }
      });
  },
});

export const { logout, resetRegistered } = authSlice.actions;
export default authSlice.reducer;
