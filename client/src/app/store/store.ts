import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./api/auth/authSlice";
import featuredEventsReducer from "./api/featuredEvents/featuredEventsSlice";
import categoriesReducer from "./api/categories/categoriesSlice"
import upcomingEventsReducer from "./api/upcomingEvents/upcomingEventsSlice"
import eventsReducer from "./api/eventsPagination/eventsPaginationSlice"
import profileReducer from "./api/profile/profileSlice"
import userTicketsSlice from "./api/userTickets/userTicketsSlice"
import favoritesEventsSlice from "./api/favoriteEvents/favoriteEventsSlice"
import eventDetailsSlice from "./api/eventDetails/eventDetailsSlice"
import createEventSlice from "./api/createEvent/createEventSlice"
import contactReducer from "./api/contact/contactSlice"


export const store = configureStore({
  reducer: {
    auth: authReducer,
    featuredEvents: featuredEventsReducer,
    categories: categoriesReducer,
    upcomingEvents: upcomingEventsReducer,
    events: eventsReducer,
    profile: profileReducer,
    userTickets: userTicketsSlice,
    favoritesEvents: favoritesEventsSlice,
    eventDetails: eventDetailsSlice,
    createEvent: createEventSlice,
    contact: contactReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
