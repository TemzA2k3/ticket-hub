import { createAsyncThunk } from '@reduxjs/toolkit';


export const fetchUpcomingEvents = createAsyncThunk(
  'upcomingEvents/fetch',
  async () => {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/upcoming`);
    if (!response.ok) {
      throw new Error('Failed to fetch upcoming events');
    }

    // const events = [
    //   {
    //     id: "1",
    //     title: "Jazz Night at Blue Note",
    //     category: "Music",
    //     date: "June 25, 2023",
    //     time: "8:00 PM",
    //     location: "Blue Note Jazz Club",
    //     price: "From $35",
    //   },
    //   {
    //     id: "2",
    //     title: "NBA Finals Game 5",
    //     category: "Sports",
    //     date: "June 28, 2023",
    //     time: "7:30 PM",
    //     location: "Madison Square Garden",
    //     price: "From $120",
    //   },
    //   {
    //     id: "3",
    //     title: "Hamilton - Broadway Musical",
    //     category: "Theater",
    //     date: "July 2, 2023",
    //     time: "7:00 PM",
    //     location: "Richard Rodgers Theatre",
    //     price: "From $89",
    //   },
    //   {
    //     id: "4",
    //     title: "Food & Wine Festival",
    //     category: "Food",
    //     date: "July 8-9, 2023",
    //     time: "11:00 AM - 7:00 PM",
    //     location: "Central Park",
    //     price: "From $65",
    //   },
    //   {
    //     id: "5",
    //     title: "Comedy Night with Dave Chappelle",
    //     category: "Comedy",
    //     date: "July 15, 2023",
    //     time: "9:00 PM",
    //     location: "Comedy Cellar",
    //     price: "From $55",
    //   },
    // ];
    

    return await response.json();
    // return events
  }
);
