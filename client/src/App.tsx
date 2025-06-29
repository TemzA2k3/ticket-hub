import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { useAppDispatch } from "./app/hooks/useTypedReduxUtils"
import { initializeAuth } from "./app/store/api/auth/initializeAuthThunks"

import { HomePage } from "./pages/HomePage";

import { SignInPage } from "./pages/SignInPage";
import { SignUpPage } from "./pages/SignUpPage";

// import { VenuesPage } from "./pages/VenuesPage"
import { AboutPage } from "./pages/AboutPage"
import { ContactPage } from "./pages/ContactPage"
import { TermsOfServicePage } from "./pages/TermsOfServicePage"
import { PrivacyPolicyPage } from "./pages/PrivacyPolicyPage"
import { FaqPage } from "./pages/FaqPage"

import { EventsPage } from "./pages/EventsPage";
import { EventDetailsPage } from "./pages/EventDetailsPage";
import { CheckoutPage } from "./pages/CheckoutPage";

import { NotFoundPage } from "./pages/NotFoundPage";
import { ProtectedRoute } from "./shared/components/ProtectedRoute"

import { UserProfilePage } from "./pages/UserProfilePage"
import { CreateEventPage } from "./pages/CreateEventPage"
import { UserTicketsPage } from "./pages/UserTicketsPage"
import { FavoriteEventsPage } from "./pages/FavoriteEventsPage"


import './styles/index.scss';
import './App.scss'


export const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />

        {/* <Route path="/venues" element={<VenuesPage />} /> */}
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/terms" element={<TermsOfServicePage />} />
        <Route path="/privacy" element={<PrivacyPolicyPage />} />
        <Route path="/faq" element={<FaqPage />} />

        <Route path="/events" element={<EventsPage />} />
        <Route path="/events/:eventId" element={<EventDetailsPage />} />
        <Route path="/events/:eventId/checkout" element={<CheckoutPage />} />


        <Route path="/profile" element={<UserProfilePage />} />
        <Route path="/profile/:userId" element={<UserProfilePage />} />
        
        <Route
          path="/my-tickets"
          element={
            <ProtectedRoute>
              <UserTicketsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/favorites"
          element={
            <ProtectedRoute>
              <FavoriteEventsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-event"
          element={
            <ProtectedRoute>
              <CreateEventPage />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}