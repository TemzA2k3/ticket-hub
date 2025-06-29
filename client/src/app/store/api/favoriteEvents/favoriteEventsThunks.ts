import { createAsyncThunk } from '@reduxjs/toolkit';


export const fetchFavotiteEvents = createAsyncThunk(
    "favoriteEvents/fetch",
    async () => {

    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/favorite-events`,  {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch featured events');
    }

    const result = await response.json();
  
    return result

    //  const favoriteEvents = [
    //   {
    //     id: "1",
    //     image: "https://placehold.co/600x400",
    //     title: "Summer Music Festival",
    //     date: "July 15-17, 2023",
    //     location: "Central Park, New York",
    //     price: "From $99",
    //     category: "Music",
    //     status: "upcoming",
    //     daysLeft: 15,
    //     priceValue: 99,
    //   },
    //   {
    //     id: "2",
    //     image: "https://placehold.co/600x400",
    //     title: "International Film Festival",
    //     date: "August 5-12, 2023",
    //     location: "Downtown Theater",
    //     price: "From $45",
    //     category: "Film",
    //     status: "upcoming",
    //     daysLeft: 36,
    //     priceValue: 45,
    //   },
    //   {
    //     id: "3",
    //     image: "https://placehold.co/600x400",
    //     title: "Tech Conference 2023",
    //     date: "September 20-22, 2023",
    //     location: "Convention Center",
    //     price: "From $199",
    //     category: "Conference",
    //     status: "past",
    //     daysLeft: -60,
    //     priceValue: 199,
    //   },
    //   {
    //     id: "4",
    //     image: "https://placehold.co/600x400",
    //     title: "Jazz Night at Blue Note",
    //     date: "June 25, 2023",
    //     location: "Blue Note Jazz Club",
    //     price: "From $35",
    //     category: "Music",
    //     status: "past",
    //     daysLeft: -2,
    //     priceValue: 35,
    //   },
    //   {
    //     id: "5",
    //     image: "https://placehold.co/600x400",
    //     title: "NBA Finals Game 5",
    //     date: "June 28, 2023",
    //     location: "Madison Square Garden",
    //     price: "From $120",
    //     category: "Sports",
    //     status: "upcoming",
    //     daysLeft: 8,
    //     priceValue: 120,
    //   },
    //   {
    //     id: "6",
    //     image: "https://placehold.co/600x400",
    //     title: "Hamilton - Broadway Musical",
    //     date: "July 2, 2023",
    //     location: "Richard Rodgers Theatre",
    //     price: "From $89",
    //     category: "Theater",
    //     status: "upcoming",
    //     daysLeft: 15,
    //     priceValue: 89,
    //   },
    //   {
    //     id: "7",
    //     image: "https://placehold.co/600x400",
    //     title: "Food & Wine Festival",
    //     date: "July 8-9, 2023",
    //     location: "Central Park",
    //     price: "From $65",
    //     category: "Food",
    //     status: "upcoming",
    //     daysLeft: 20,
    //     priceValue: 65,
    //   },
    //   {
    //     id: "8",
    //     image: "https://placehold.co/600x400",
    //     title: "Comedy Night with Dave Chappelle",
    //     date: "July 15, 2023",
    //     location: "Comedy Cellar",
    //     price: "From $55",
    //     category: "Comedy",
    //     status: "upcoming",
    //     daysLeft: 27,
    //     priceValue: 55,
    //   },
    // ]
    

    // return favoriteEvents
        
    }
)

export const addEventToFavorites = createAsyncThunk(
  "favoriteEvents/add",
  async (eventId: string, { rejectWithValue }) => {    
    try {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");      
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/favorite-events/${eventId}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });      

      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error.message || "Failed to add to favorites");
      }

      // return await response.json();
    } catch (error: any) {
      return rejectWithValue(error.message || "Network error");
    }
  }
);

export const removeEventFromFavorites = createAsyncThunk(
  "favoriteEvents/remove",
  async (eventId: string, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/favorite-events/${eventId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error.message || "Failed to add to favorites");
      }

      // return await response.json();
    } catch (error: any) {
      return rejectWithValue(error.message || "Network error");
    }
  }
);