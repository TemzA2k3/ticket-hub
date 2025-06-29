import { useEffect, useState, useMemo } from "react"

import { useAppDispatch, useAppSelector } from "../../app/hooks/useTypedReduxUtils"
import { useAlert } from "../../app/hooks/useAlert"
import { fetchFavotiteEvents, removeEventFromFavorites } from "../../app/store/api/favoriteEvents/favoriteEventsThunks"
import { getTopCategoriesWithOther, getMinMaxPrices, getPriceRanges, getStatsData } from "../utils/favotiteEventsUtils"

import { FeaturedEventCard } from "./FeaturedEventsCard"
import { BlankSearch } from "./BlankSearch"
import { Loader } from "./Loader"
import { AlertWrapper } from "./AlertWrapper"


export const FavoriteEvents = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all_categories")

  const dispatch = useAppDispatch()
  const { favoriteEvents, loading, error } = useAppSelector(state => state.favoritesEvents)
  const { showAlert, alertMessage, alertType, showTemporaryAlert } = useAlert();
  
  useEffect(() => {
    dispatch(fetchFavotiteEvents())
  }, [dispatch])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value.toLowerCase())
  }

  const removeFromFavorite = async (id: string) => {
    const result = await dispatch(removeEventFromFavorites(id));
    if (removeEventFromFavorites.fulfilled.match(result)) {
      dispatch({
        type: "favoritesEvents/removeEvent",
        payload: id,
      });
      showTemporaryAlert(`Event with id - ${id}, succesfully removed from favorites!`, "success");
    } else {
      showTemporaryAlert("Failed to remove from favorites", "error");
    }
  }

  const handleRemoveFromFavorites = (e: React.MouseEvent, eventId: string) => {
    e.preventDefault();
    removeFromFavorite(eventId);
  };

  const {
    filteredEvents,
    upcomingEventsCount,
    upcomingData,
    uniqueCategoriesCount,
    finalCategoryDisplay,
    min,
    max,
    priceRanges,
    stats
  } = useMemo(() => {

    const filteredEvents = favoriteEvents.filter((event) => {
      const matchSearch = event.title.toLowerCase().includes(searchTerm)
      const matchCategory = categoryFilter === "all_categories" || event.category.toLowerCase() === categoryFilter
      return matchSearch && matchCategory
    });
    
    const upcomingEventsCount = favoriteEvents.filter(event => event.status === "upcoming").length;
  
    const upcomingData = favoriteEvents
      .filter(e => e.daysLeft! >= 0)
      .sort((a, b) => a.daysLeft! - b.daysLeft!)
      .map(e => [e.title, e.daysLeft])
      .slice(0, 4);
  
    const uniqueCategoriesCount = new Set(favoriteEvents.map(e => e.category)).size;
  
    const categoryCounts = favoriteEvents.reduce<Record<string, number>>((acc, event) => {
      acc[event.category] = (acc[event.category] || 0) + 1;
      return acc;
    }, {});
  
    const finalCategoryDisplay = getTopCategoriesWithOther(categoryCounts);
  
    const { min, max } = getMinMaxPrices(favoriteEvents);
  
    const priceRanges = getPriceRanges(favoriteEvents);
  
    const stats = getStatsData(favoriteEvents);
  
    return {
      filteredEvents,
      upcomingEventsCount,
      upcomingData,
      uniqueCategoriesCount,
      finalCategoryDisplay,
      min,
      max,
      priceRanges,
      stats
    };
  }, [favoriteEvents, searchTerm, categoryFilter]);

  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <header className="text-center mb-8 border-b border-border pb-4">
          <h1 className="text-3xl font-bold">My Favorites</h1>
          <p className="text-muted-foreground text-sm">Events you've saved for later</p>
        </header>

        <AlertWrapper
          showAlert={showAlert}
          alertMessage={alertMessage}
          alertType={alertType}
        />

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((item, i) => (
            <div key={i} className="flex items-center gap-4 p-6 border border-border rounded bg-background shadow-sm">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-muted text-primary text-xl">
                <i className={`fa-solid ${item.icon}`}></i>
              </div>
              <div>
                <div className="text-xl font-bold">{item.value}</div>
                <div className="text-sm text-muted-foreground">{item.label}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-row gap-4 mb-8 p-6 border border-border rounded bg-background">
          <div className="relative flex-1">
            <i className="fa-solid fa-search absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search your tickets..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full h-10 pl-10 pr-3 rounded border border-input bg-background text-sm focus:outline-none focus:border-ring"
            />
          </div>
          <div className="flex flex-wrap gap-4">
            <select 
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="h-10 px-3 rounded border border-input bg-background text-sm min-w-[150px]">
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
          </div>
        </div>

        {filteredEvents.length === 0 ? (
          <BlankSearch
            image="fa-solid fa-heart-crack"
            title="No favorites found"
            description="No events match your current filters. Try adjusting your search criteria or browse events to add new favorites."
            border={true}
          />
        ) : loading ? (
          <div className="flex justify-center py-20">
            <Loader size="lg" variant="dots" text="Loading your favorite events..." />
          </div>
        ) : error ? (
          <p className="text-center text-red-500 py-10">Error: {error}</p>
        ) : (
          <div className="grid gap-6 mb-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
            {filteredEvents.map((event) => (
              <FeaturedEventCard 
                key={event.id} 
                {...event} 
                fav={true} 
                onRemoveFromFavorites={(e) => handleRemoveFromFavorites(e, event.id)}
                />
            ))}
          </div>
        )}

        <div className="mt-12 pt-8 border-t border-border">
          <h2 className="text-2xl font-semibold mb-6">Ticket Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="border border-border rounded-lg bg-background shadow-sm overflow-hidden">
              <div className="flex justify-between items-center p-6 border-b border-border bg-muted">
                <h3 className="text-lg font-semibold">Upcoming Events</h3>
                <span className="text-xl font-bold text-primary">{upcomingEventsCount}</span>
              </div>
              {upcomingData.length > 0 && (
                <div className="p-6">
                  <p className="text-muted-foreground mb-4">
                    You have {upcomingEventsCount} upcoming events in your favorites. Don't miss out on getting tickets!
                  </p>
                  <div className="space-y-2">
                    {upcomingData.map(event => (
                      <div key={event[0]} className="flex justify-between items-center p-2 bg-muted rounded">
                        <span className="text-sm font-medium">{event[0]}</span>
                        <span className="text-xs text-muted-foreground">{event[1]} days left</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

            <div className="border border-border rounded-lg bg-background shadow-sm overflow-hidden">
              <div className="flex justify-between items-center p-6 border-b border-border bg-muted">
                <h3 className="text-lg font-semibold">Categories</h3>
                <span className="text-xl font-bold text-primary">{uniqueCategoriesCount}</span>
              </div>
              {finalCategoryDisplay.length > 0 && (
                <div className="p-6">
                  <p className="text-muted-foreground mb-4">Your favorites span across {uniqueCategoriesCount} different categories.</p>
                  <div className="space-y-2">
                    {finalCategoryDisplay.map(([category, count]) => (
                      <div key={category} className="flex justify-between items-center p-2 bg-muted rounded">
                        <span className="text-sm font-medium">{category}</span>
                        <span className="text-xs text-muted-foreground">{count} events</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="border border-border rounded-lg bg-background shadow-sm overflow-hidden">
              <div className="flex justify-between items-center p-6 border-b border-border bg-muted">
                <h3 className="text-lg font-semibold">Price Range</h3>
                <span className="text-xl font-bold text-primary">{min && max ? `$${min} - $${max}` : "None"}</span>
              </div>
              {min && max ? (
                <div className="p-6">
                  <p className="text-muted-foreground mb-4">Your favorite events range from ${min} to ${max} per ticket.</p>
                  <div className="space-y-2">
                    {Object.entries(priceRanges).map(([label, count]) => (
                      <div key={label} className="flex justify-between items-center p-2 bg-muted rounded">
                        <span className="text-sm font-medium">{label}</span>
                        <span className="text-xs text-muted-foreground">{count} events</span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
};
