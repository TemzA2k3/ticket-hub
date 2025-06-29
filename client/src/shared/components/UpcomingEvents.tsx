import { useEffect } from "react";
import { Link } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../app/hooks/useTypedReduxUtils";
import { fetchUpcomingEvents } from "../../app/store/api/upcomingEvents/upcomingEventsThunks"

import { Button } from "./Buttons";
import { Loader } from "./Loader"
import { BlankSearch } from "./BlankSearch";



export const UpcomingEvents = () => {
  const dispatch = useAppDispatch()
  const { upcomingEvents, loading, error } = useAppSelector(state => state.upcomingEvents)

  useEffect(() => {
    dispatch(fetchUpcomingEvents())
  }, [dispatch])


  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8 text-center">
          <h2 className="text-[2rem] font-bold mb-2">Upcoming Events</h2>
          <p className="text-muted-foreground">Don't miss out on these exciting events coming soon</p>
        </div>

        <div className="grid gap-6">

          {loading ? (
            <div className="flex justify-center py-20">
              <Loader size="lg" variant="dots" text="Loading events..." />
            </div>
          ) : error ? (
            <p className="text-center text-red-500 py-10">Error: {error}</p>
          ) : upcomingEvents.length === 0 ? (
            <BlankSearch
              image="fa-solid fa-ticket"
              title="No upcoming events found"
              description="Coming soon"
            />
          ) : (
            <>
              {upcomingEvents.map((event) => (
                <div key={event.title} className="border border-border bg-background rounded overflow-hidden">
                  <div className="flex justify-between items-center p-4">
                    <h3 className="text-base font-semibold truncate">{event.title}</h3>
                    <span className="bg-primary text-primary-foreground text-xs font-medium px-2 py-1 rounded">{event.category}</span>
                  </div>

                  <div className="grid gap-2 px-4 sm:grid-cols-2 md:grid-cols-3">
                    <div className="flex items-center gap-2 text-sm">
                      <i className="fa-solid fa-calendar" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <i className="fa-solid fa-clock" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <i className="fa-solid fa-location-dot" />
                      <span>{event.location}</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center p-4 border-border">
                    <div className="font-bold">{event.price}</div>
                    <Link to={`/events/${event.id}`}>
                      <Button variant="primary" size="sm">
                        Get Tickets
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>

        {upcomingEvents.length > 0 && (
          <div className="flex justify-center mt-12">
            <Link to="/events">
              <Button variant="outline">
                View All Events
              </Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};
