import { useEffect } from "react"
import { useLocation } from "react-router-dom"

import { useAlert } from "../app/hooks/useAlert"

import { MainLayout } from "../shared/layouts/MainLayout"
import { MainComponent } from "../shared/components/MainComponent"
import { FeaturedEvents } from "../shared/components/FeaturedEvents"
import { CategoryEventCard } from "../shared/components/CategoryEventCard"
import { UpcomingEvents } from "../shared/components/UpcomingEvents"
import { AlertWrapper } from "../shared/components/AlertWrapper"



export const HomePage = () => {
  const location = useLocation();
  const { showAlert, alertMessage, alertType, showTemporaryAlert } = useAlert();

  useEffect(() => {
    if (location.state?.purchasedTicketSuccess) {
      showTemporaryAlert("You have successfully bought a ticket!. You can find it in 'My Tickets' or recieve an email!", "success");
    }
  }, [location.state]);
  return (
    <MainLayout>
      <AlertWrapper
        showAlert={showAlert}
        alertMessage={alertMessage}
        alertType={alertType}
      />
      <MainComponent />
      <FeaturedEvents />
      <CategoryEventCard />
      <UpcomingEvents />
    </MainLayout>
  )
}