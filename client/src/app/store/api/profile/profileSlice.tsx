import { createSlice } from '@reduxjs/toolkit';


import { fetchProfileData, changePersonalInformation, uploadAvatar } from './profileThunks';
import { IProfile } from "../../../../shared/types/index"



interface ProfileState {
  profileData: IProfile | null;
  loading: boolean;
  error: string | null;
}

const initialState: ProfileState = {
  profileData: null,
  loading: false,
  error: null,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfileData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfileData.fulfilled, (state, action) => {
        state.loading = false;
        state.profileData = action.payload;
      })
      .addCase(fetchProfileData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
      })
      .addCase(changePersonalInformation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(changePersonalInformation.fulfilled, (state, action) => {
        state.loading = false;
        if (state.profileData) {
          state.profileData.personalInfo = action.payload;
          const infoMap = Object.fromEntries(action.payload.map(i => [i.label, i.value]));
          if (infoMap["First Name"]) state.profileData.firstName = infoMap["First Name"];
          if (infoMap["Last Name"]) state.profileData.lastName = infoMap["Last Name"];
          if (infoMap["Location"]) state.profileData.location = infoMap["Location"];
        }
      })
      .addCase(changePersonalInformation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to update profile';
      })
      .addCase(uploadAvatar.fulfilled, (state, action) => {
        if (state.profileData) {
          state.profileData.avatarUrl = action.payload.avatarUrl;
        }
      });
  },
});

export default profileSlice.reducer;
