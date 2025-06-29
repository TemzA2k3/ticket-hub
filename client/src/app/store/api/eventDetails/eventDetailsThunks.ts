import { createAsyncThunk } from '@reduxjs/toolkit';
import type { IEventDetails } from '../../../../shared/types/index';


export const fetchEventDetails = createAsyncThunk<IEventDetails, string>(
  "eventDetails/fetch",
  async (id: string) => {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token"); 
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/events/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
    
    if (!response.ok) {
        throw new Error("Failed to fetch event details");
    }

    const data: IEventDetails = await response.json();

    return data;

    // const mockEventDetails: IEventDetails = {
    //   id: "123",
    //   title: "Summer Music Festival",
    //   image: "https://placehold.co/1200x600",
    //   badge: "Music",
    //   date: "July 15-17, 2023",
    //   time: "12:00 PM - 11:00 PM",
    //   location: "Central Park, New York",
    //   isFavorite: true,
    //   tabs: ["about", "venue", "organizer"],
    //   tabsContent: {
    //     about: [
    //       "Join us for three days of amazing music...",
    //       "The Summer Music Festival is the highlight...",
    //       "In addition to incredible music...",
    //       "This year's lineup includes Grammy-winning...",
    //     ],
    //     venue: {
    //       name: "Central Park Great Lawn",
    //       address: "Central Park, New York, NY 10024",
    //       mapEmbedLink: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d19992.531918507942!2d-73.96172212784053!3d40.78004297156394!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c2589a018531e3%3A0xb9df1f7387a94119!2z0KbQtdC90YLRgNCw0LvRjNC90YvQuSDQv9Cw0YDQug!5e0!3m2!1sru!2slt!4v1750422549978!5m2!1sru!2slt",
    //       mapViewLink: "https://maps.app.goo.gl/ZRSNmic6NxeiJF7d7"
    //     },
    //     organizer: {
    //       name: "Festival Productions Inc.",
    //       description: "Festival Productions Inc. is a leading event organizer...",
    //     },
    //   },
    //   tickets: [
    //     {
    //       name: "General Admission",
    //       description: "Access to all stages and general festival grounds",
    //       price: 99,
    //       available: true,
    //     },
    //     {
    //       name: "VIP Pass",
    //       description: "VIP viewing areas, exclusive lounge access, and premium restrooms",
    //       price: 199,
    //       available: true,
    //     },
    //     {
    //       name: "Premium Package",
    //       description: "All VIP benefits plus backstage tours and artist meet & greets",
    //       price: 299,
    //       available: false,
    //     },
    //   ],
    // };

    // return mockEventDetails;
  }
);