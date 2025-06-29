import { useSearchParams, Navigate } from "react-router-dom";
import { MainLayout } from "../shared/layouts/MainLayout";
import { AllEvents } from "../shared/components/AllEvents";

export const EventsPage = () => {
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page");

  if (!page) {
    const updatedParams = new URLSearchParams(searchParams);

    const otherParams = Array.from(updatedParams.entries())
      .filter(([key]) => key !== "page")
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
      .join("&");

    const newSearch = `page=1${otherParams ? `&${otherParams}` : ""}`;

    return <Navigate to={`/events?${newSearch}`} replace />;
  }

  return (
    <MainLayout>
      <AllEvents />
    </MainLayout>
  );
};