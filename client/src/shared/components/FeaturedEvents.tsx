import { useEffect } from "react";
import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next";

import { useAppDispatch, useAppSelector } from "../../app/hooks/useTypedReduxUtils";
import { fetchFeaturedEvents } from "../../app/store/api/featuredEvents/featuredEventsThunks"

import { FeaturedEventCard } from "./FeaturedEventsCard";
import { Button } from "./Buttons";
import { BlankSearch } from "./BlankSearch"
import { Loader } from "./Loader"



export const FeaturedEvents = () => {
  const dispatch = useAppDispatch();
  const { events, loading, error } = useAppSelector((state) => state.featuredEvents);

  const { t } = useTranslation()

  useEffect(() => {
    dispatch(fetchFeaturedEvents());
  }, [dispatch]);

  return (
    <section className="py-12">
      <div className="w-full max-w-[1200px] mx-auto px-4">
        <div className="mb-8 text-center">
          <h2 className="text-[2rem] font-bold mb-2">{t("featuredEvents.title")}</h2>
          <p className="text-muted-foreground">
            Discover the hottest events happening near you
          </p>
        </div>



        {loading ? (
          <div className="flex justify-center py-20">
            <Loader size="lg" variant="dots" text={t("loaderText.featuredEvents")} />
          </div>
        ) : error ? (
          <p className="text-center text-red-500 py-10">Error: {error}</p>
        ) : events.length === 0 ? (
          <BlankSearch
            image="fa-solid fa-ticket"
            title="No featured events found"
            description="Coming soon"
          />
        ) : (
          <>
            <div className="grid gap-6 mb-8 sm:grid-cols-2 lg:grid-cols-3">
              {events.map((event) => (
                <FeaturedEventCard key={event.id} {...event} />
              ))}
            </div>
            <div className="flex justify-center">
              <Link to="/events">
                <Button variant="outline">
                  View All Events
                </Button>
              </Link>
            </div>
          </>
          )}

        {/* { loading && <p className="text-center">Loading events...</p> }
        { error && <p className="text-center text-red-500">{error}</p> }

        { !loading && !error &&
         (
          <div className="grid gap-6 mb-8 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <FeaturedEventCard key={event.id} {...event} />
            ))}
          </div>
        )} */}
      </div>
    </section>
  );
};