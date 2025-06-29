import { createAsyncThunk } from '@reduxjs/toolkit';

import { transformUserData } from "../../../../shared/utils/profileUtils"
import { IProfile, TPersonalInformation } from "../../../../shared/types/index"


export const fetchProfileData = createAsyncThunk<IProfile, string>(
  'profile/fetch',
  async (userId) => {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token"); 
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/profile/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    if (!response.ok) throw new Error('Failed to fetch profile');

    const data = await response.json()  
    return data;    

    // Мок:
    // const user = {
    //   id: 1234,
    //   avatar: 'https://ui-avatars.com/api/?name=John+Doe&background=000&color=fff&size=120',
    //   name: 'John Doe',
    //   title: 'Event Enthusiast',
    //   email: 'john.doe@example.com',
    //   memberSince: 'March 2023',
    //   location: 'New York, USA',
    //   membership: 'Premium Member',
    //   personalInfo: [
    //     { label: 'First Name', value: 'John' },
    //     { label: 'Last Name', value: 'Doe' },
    //     { label: 'Email Address', value: 'john.doe@example.com' },
    //     { label: 'Phone Number', value: '+1 (555) 123-4567' },
    //     { label: 'Date of Birth', value: 'January 15, 1990' },
    //     { label: 'Location', value: 'New York, USA' },
    //     {
    //       label: 'Bio',
    //       value:
    //         'Passionate about live music and cultural events. I love discovering new artists and experiencing unique performances. Always on the lookout for the next great concert or festival!',
    //       full: true,
    //     },
    //   ],
    //   // settings: [
    //   //   {
    //   //     title: 'Email Notifications',
    //   //     desc: 'Receive updates about events and bookings',
    //   //     checked: true,
    //   //   },
    //   //   {
    //   //     title: 'SMS Notifications',
    //   //     desc: 'Get text messages for important updates',
    //   //     checked: false,
    //   //   },
    //   //   {
    //   //     title: 'Marketing Communications',
    //   //     desc: 'Receive promotional offers and recommendations',
    //   //     checked: true,
    //   //   },
    //   //   {
    //   //     title: 'Public Profile',
    //   //     desc: 'Make your profile visible to other users',
    //   //     checked: true,
    //   //   },
    //   // ],
    //   // security: [
    //   //   {
    //   //     title: 'Password',
    //   //     desc: 'Last changed 3 months ago',
    //   //     action: 'Change Password',
    //   //     variant: 'outline',
    //   //   },
    //   //   {
    //   //     title: 'Two-Factor Authentication',
    //   //     desc: 'Add an extra layer of security',
    //   //     action: 'Enable 2FA',
    //   //     variant: 'primary',
    //   //   },
    //   //   {
    //   //     title: 'Login Sessions',
    //   //     desc: 'Manage your active sessions',
    //   //     action: 'View Sessions',
    //   //     variant: 'outline',
    //   //   },
    //   //   {
    //   //     title: 'Download Data',
    //   //     desc: 'Export your account information',
    //   //     action: 'Download',
    //   //     variant: 'outline',
    //   //   },
    //   // ],
    //   stats: [
    //     { icon: 'ticket', value: '15', label: 'Events Attended' },
    //     { icon: 'heart', value: '8', label: 'Favorite Events' },
    //     { icon: 'calendar-plus', value: '3', label: 'Upcoming Events' },
    //     { icon: 'dollar-sign', value: '$1,247', label: 'Total Spent' },
    //   ],
    //   // achievements: [
    //   //   {
    //   //     icon: 'star',
    //   //     title: 'First Event',
    //   //     desc: 'Attended your first event',
    //   //     earned: true,
    //   //   },
    //   //   {
    //   //     icon: 'fire',
    //   //     title: 'Event Enthusiast',
    //   //     desc: 'Attended 10+ events',
    //   //     earned: true,
    //   //   },
    //   //   {
    //   //     icon: 'crown',
    //   //     title: 'VIP Status',
    //   //     desc: 'Spend $2000+ on events',
    //   //     percent: 62,
    //   //   },
    //   //   {
    //   //     icon: 'users',
    //   //     title: 'Social Butterfly',
    //   //     desc: 'Refer 5 friends to TicketHub',
    //   //     percent: 40,
    //   //   },
    //   // ],
    // };

    
    // return user;
  }
);

export const changePersonalInformation = createAsyncThunk<TPersonalInformation[],{ userId: string; userPersonalInformation: TPersonalInformation[] }>(
  'profile/changePersonalInformation',
  async ({ userId, userPersonalInformation }) => {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token"); 
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/profile/${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(transformUserData(userPersonalInformation)),
    });
    if (!response.ok) throw new Error('Failed to update profile');

    const result = await response.json(); 
    
    return result   
  }
);


export const uploadAvatar = createAsyncThunk(
  "profile/uploadAvatar",
  async ({ userId, file }: { userId: string; file: File }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      
      const formData = new FormData();
      formData.append("avatar", file);

      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/profile/${userId}/avatar`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error.message || "Failed to upload avatar");
      }

      const result = await response.json();      
      return result;
    } catch (error: any) {
      return rejectWithValue(error.message || "Network error");
    }
  }
);
