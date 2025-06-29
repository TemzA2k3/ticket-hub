import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../app/hooks/useTypedReduxUtils";
import { fetchEventsByPage } from "../../app/store/api/eventsPagination/eventsPaginationThunks";

import { Button } from "../../shared/components/Buttons";
import { FeaturedEventCard } from "../../shared/components/FeaturedEventsCard";
import { Pagination } from "../../features/pagination/Pagination";
import { BlankSearch } from "./BlankSearch"
import { Loader } from "./Loader"
import { useDebounce } from "../../app/hooks/useDebounce";



export const AllEvents = () => {
  const dispatch = useAppDispatch();
  const { items: events, loading, error, totalPages } = useAppSelector((state) => state.events);

  const [searchParams, setSearchParams] = useSearchParams();

  const pageParam = Number(searchParams.get("page")) || 1;
  const categoryParam = searchParams.get("category") || "all_categories";
  const timeParam = searchParams.get("time") || "upcoming";
  const nameParam = searchParams.get("name") || "";
  const locationParam = searchParams.get("location") || "";
  const dateParam = searchParams.get("date") || "";

  const [searchSrting, setSearchString] = useState(nameParam)
  const debouncedValue = useDebounce(searchSrting)

  useEffect(() => {
    dispatch(fetchEventsByPage({
      page: pageParam,
      category: categoryParam,
      time: timeParam,
      name: debouncedValue,
      location: locationParam,
      date: dateParam,
    }));
  }, [dispatch, pageParam, categoryParam, timeParam, debouncedValue, locationParam, dateParam]);

  useEffect(() => {
    if (debouncedValue !== nameParam) {
      if (debouncedValue.trim() === "") {
        searchParams.delete("name");
      } else {
        searchParams.set("name", debouncedValue);
      }
  
      searchParams.set("page", "1");
      setSearchParams(searchParams);
    }
  }, [debouncedValue]);
  

  const handlePageChange = (page: number) => {
    searchParams.set("page", String(page));
    setSearchParams(searchParams);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    searchParams.set("category", e.target.value);
    searchParams.set("page", "1");
    setSearchParams(searchParams);
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    searchParams.set("time", e.target.value);
    searchParams.set("page", "1");
    setSearchParams(searchParams);
  };

  const handleResetFilters = () => {
    const newParams = new URLSearchParams();
    newParams.set("page", "1");
  
    setSearchString("");
    setSearchParams(newParams); 
  };

  return (
    <section id="events" className="py-8 block">
      <div className="w-full max-w-[1200px] mx-auto px-4">
        <h1 className="text-2xl font-bold mb-6">All Events</h1>

        {/* Фильтры */}
        <div className="flex flex-col gap-4 mb-8 sm:flex-row sm:gap-6">
          <div className="relative flex-1">
            <i className="fa-solid fa-search absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search events..."
              className="w-full h-10 pl-10 pr-3 border border-input rounded-[var(--radius)] bg-background text-sm"
              value={searchSrting}
              onChange={(e) => setSearchString(e.target.value)}
            />
          </div>

          <div className="flex gap-4">
            <select
              className="w-44 h-10 px-3 border border-input rounded-[var(--radius)] bg-background text-sm"
              value={categoryParam}
              onChange={handleCategoryChange}
            >
              <option value="all_categories">All Categories</option>
              <option value="sports">Sports</option>
              <option value="theater">Theater</option>
              <option value="concerts">Concerts</option>
              <option value="comedy">Comedy</option>
              <option value="conferences">Conferences</option>
              <option value="film">Film</option>
              <option value="gaming">Gaming</option>
              <option value="food_and_drink">Food and Drink</option>
            </select>

            <select
              className="w-44 h-10 px-3 border border-input rounded-[var(--radius)] bg-background text-sm"
              value={timeParam}
              onChange={handleTimeChange}
            >
              <option value="upcoming">Upcoming</option>
              <option value="today">Today</option>
              <option value="tomorrow">Tomorrow</option>
              <option value="this_weekend">This Weekend</option>
              <option value="this_week">This Week</option>
              <option value="this_month">This Month</option>
            </select>

            <Button variant="outline" iconOnly onClick={handleResetFilters}>
              <i className="fa-solid fa-filter"></i>
            </Button>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader size="lg" variant="dots" text="Loading events..." />
          </div>
        ) : error ? (
          <p className="text-center text-red-500 py-10">Error: {error}</p>
        ) : events.length === 0 ? (
          <BlankSearch
            image="fa-solid fa-ticket"
            title="No events found"
            description="No events match your current filters. Try adjusting your search criteria."
          />
        ) : (
          <>
            <div className="grid gap-6 mb-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
              {events.map((event) => (
                <FeaturedEventCard key={event.id} {...event} />
              ))}
            </div>
            <Pagination
              currentPage={pageParam}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        )}

      </div>
    </section>
  );
};
