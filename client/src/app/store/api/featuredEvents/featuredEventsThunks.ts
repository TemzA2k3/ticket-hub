import { createAsyncThunk } from '@reduxjs/toolkit';


export const fetchFeaturedEvents = createAsyncThunk(
  'featuredEvents/fetch',
  async () => {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/featured-events`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch featured events');
    }

    // const featuredEvents = [
    //   {
    //     id: "1",
    //     image: "https://placehold.co/600x400",
    //     title: "Summer Music Festival",
    //     date: "July 15-17, 2023",
    //     location: "Central Park, New York",
    //     price: "From $99",
    //     category: "Music",
    //   },
    //   {
    //     id: "2",
    //     image: "https://placehold.co/600x400",
    //     title: "International Film Festival",
    //     date: "August 5-12, 2023",
    //     location: "Downtown Theater",
    //     price: "From $45",
    //     category: "Film",
    //   },
    //   {
    //     id: "3",
    //     image: "https://placehold.co/600x400",
    //     title: "Tech Conference 2023",
    //     date: "September 20-22, 2023",
    //     location: "Convention Center",
    //     price: "From $199",
    //     category: "Conference",
    //   },
    // ];

    return await response.json();
    // return featuredEvents
  }
);
