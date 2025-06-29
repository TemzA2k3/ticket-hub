import { createAsyncThunk } from "@reduxjs/toolkit";

import { IEvent } from "../../../../shared/types/index";



interface IEventsResponse {
    events: IEvent[];
    totalCount: number;
}

interface IFetchParams {
  page: number;
  name?: string;
  category?: string;
  location?: string;
  date?: string;
  time?: string;
}


export const fetchEventsByPage = createAsyncThunk<IEventsResponse, IFetchParams>(
  "events/fetchByPage",
  async (
      { page, name, category, location, date, time }
    ) => {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/events?page=${page}&name=${name}&category=${category}&location=${location}&date=${date}&time=${time}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch events: ${response.statusText}`);
    }

    const data: IEventsResponse = await response.json();

    // const data = {
    //     events: [
    //       {
    //         id: "1",
    //         image: "https://placehold.co/600x400",
    //         title: "Summer Music Festival",
    //         date: "July 15-17, 2023",
    //         location: "Central Park, New York",
    //         price: "From $99",
    //         category: "Music",
    //       },
    //       {
    //         id: "2",
    //         image: "https://placehold.co/600x400",
    //         title: "International Film Festival",
    //         date: "August 5-12, 2023",
    //         location: "Downtown Theater",
    //         price: "From $45",
    //         category: "Film",
    //       },
    //       {
    //         id: "3",
    //         image: "https://placehold.co/600x400",
    //         title: "Tech Conference 2023",
    //         date: "September 20-22, 2023",
    //         location: "Convention Center",
    //         price: "From $199",
    //         category: "Conference",
    //       },
    //       {
    //         id: "4",
    //         image: "https://placehold.co/600x400",
    //         title: "Jazz Night at Blue Note",
    //         date: "June 25, 2023",
    //         location: "Blue Note Jazz Club",
    //         price: "From $35",
    //         category: "Music",
    //       },
    //       {
    //         id: "5",
    //         image: "https://placehold.co/600x400",
    //         title: "NBA Finals Game 5",
    //         date: "June 28, 2023",
    //         location: "Madison Square Garden",
    //         price: "From $120",
    //         category: "Sports",
    //       },
    //       {
    //         id: "6",
    //         image: "https://placehold.co/600x400",
    //         title: "Hamilton - Broadway Musical",
    //         date: "July 2, 2023",
    //         location: "Richard Rodgers Theatre",
    //         price: "From $89",
    //         category: "Theater",
    //       },
    //       {
    //         id: "7",
    //         image: "https://placehold.co/600x400",
    //         title: "Food & Wine Festival",
    //         date: "July 8-9, 2023",
    //         location: "Central Park",
    //         price: "From $65",
    //         category: "Food",
    //       },
    //       {
    //         id: "8",
    //         image: "https://placehold.co/600x400",
    //         title: "Comedy Night with Dave Chappelle",
    //         date: "July 15, 2023",
    //         location: "Comedy Cellar",
    //         price: "From $55",
    //         category: "Comedy",
    //       },
    //     ],
    //     totalCount: 32
    //   }
    return data;
  }
);
