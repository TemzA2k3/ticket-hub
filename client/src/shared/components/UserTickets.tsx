import type React from "react"
import { useState, useEffect, useMemo } from "react"

import { useAppDispatch, useAppSelector } from "../../app/hooks/useTypedReduxUtils"
import { fetchUserTickets } from "../../app/store/api/userTickets/userTicketsThunks"
import { getPurchasedStats, getUpcomingEventsSummary, getSpendingOverviewFixed } from "../utils/userTicketsUtils"

import { TicketCard } from "./TicketCard"
import { BlankSearch } from "./BlankSearch"
import { Loader } from "./Loader"
import { IEventDetails } from "../types"



export const UserTickets = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all_categories")
  const [sortBy, setSortBy] = useState("date")

  const dispatch = useAppDispatch()
  const { userTickets, loading, error } = useAppSelector(state => state.userTickets)

  useEffect(() => {
    dispatch(fetchUserTickets())
  }, [dispatch])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value.toLowerCase())
  }

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusFilter(e.target.value)
  }

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value);
  };

  const {
    sortedTickets,
    count,
    items,
    total,
    categories,
    stats
  } = useMemo(() => {
    
    const filteredTickets = userTickets.filter((ticket) => {
      const matchStatus = statusFilter === "all" || ticket.status === statusFilter;
      const matchSearch = ticket.title.toLowerCase().includes(searchTerm);
      const matchCategory = categoryFilter === "all_categories" || ticket.badge.toLowerCase().replace(/ /g, "_") === categoryFilter;
      return matchStatus && matchSearch && matchCategory;
    });
  
    const sortedTickets = [...filteredTickets].sort((a: IEventDetails, b: IEventDetails) => {
      switch (sortBy) {
        case "date":
          return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
        case "name":
          return a.title.localeCompare(b.title);
        case "price":
          return (a.pricing?.total ?? 0) - (b.pricing?.total ?? 0);
        case "purchase":
          return new Date(b.purchaseDate!).getTime() - new Date(a.purchaseDate!).getTime();
        default:
          return 0;
      }
    });
  
    const { count, items } = getUpcomingEventsSummary(userTickets);
    const { total, categories } = getSpendingOverviewFixed(userTickets);
    const stats = getPurchasedStats(userTickets);
  
    return {
      sortedTickets,
      count,
      items,
      total,
      categories,
      stats
    };
  }, [userTickets, statusFilter, searchTerm, categoryFilter, sortBy]);

  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <header className="text-center mb-8 border-b border-border pb-4">
          <h1 className="text-3xl font-bold">My Tickets</h1>
          <p className="text-muted-foreground text-sm">Manage your purchased tickets and bookings</p>
        </header>
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
              className="h-10 px-3 rounded border border-input bg-background text-sm min-w-[150px]"
              onChange={handleFilterChange}
            >
              <option value="all">All Tickets</option>
              <option value="upcoming">Upcoming</option>
              <option value="past">Past Events</option>
              <option value="cancelled">Cancelled</option>
            </select>
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
            <select 
            value={sortBy}
            onChange={handleSortChange}
            className="h-10 px-3 rounded border border-input bg-background text-sm min-w-[150px]">
              <option value="date">Sort by Date</option>
              <option value="name">Sort by Name</option>
              <option value="price">Sort by Price</option>
              <option value="purchase">Purchase Date</option>
            </select>
          </div>
        </div>

        {sortedTickets.length === 0 ? (
          <BlankSearch
            image="fa-solid fa-ticket"
            title="No tickets found"
            description="You haven't purchased any tickets yet, or no tickets match your current filters." 
            border={true}/>
        ) : loading ? (
          <div className="flex justify-center py-20">
            <Loader size="lg" variant="dots" text="Loading profile..." />
          </div>
        ) : error ? (
          <p className="text-center text-red-500 py-10">Error: {error}</p>
        ) : (
          <div className="space-y-6">
            {sortedTickets.map((ticket) => (
              <TicketCard key={ticket.id} ticket={ticket} />
            ))}
          </div>
        )}


        <div className="mt-12 pt-8 border-t border-border">
          <h2 className="text-2xl font-semibold mb-6">Ticket Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {/* Upcoming Events Card */}
            <div className="border border-border rounded-lg bg-background shadow-sm overflow-hidden">
              <div className="flex justify-between items-center p-6 border-b border-border bg-muted">
                <h3 className="text-lg font-semibold">Upcoming Events</h3>
                <span className="text-xl font-bold text-primary">{count}</span>
              </div>
              {items.length > 0 && (
                <div className="p-6">
                  <p className="text-muted-foreground mb-4">
                    Don't forget about your upcoming events!
                  </p>
                  <div className="space-y-2">
                    {items.map((event, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center p-2 bg-muted rounded"
                      >
                        <span className="text-sm font-medium">{event.title}</span>
                        <span className="text-xs text-muted-foreground">
                          {event.daysLeft} {event.daysLeft === 1 ? "day" : "days"} left
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* Spending Overview Card */}
            <div className="border border-border rounded-lg bg-background shadow-sm overflow-hidden">
              <div className="flex justify-between items-center p-6 border-b border-border bg-muted">
                <h3 className="text-lg font-semibold">Spending Overview</h3>
                <span className="text-xl font-bold text-primary">${total}</span>
              </div>
              {categories.length > 0 && (
                <div className="p-6">
                  <p className="text-muted-foreground mb-4">
                    Your total spending on events this year.
                  </p>
                  <div className="space-y-2">
                    {categories.map((cat: { name: string, amount: number }, idx: number) => (
                      <div
                        key={idx}
                        className="flex justify-between items-center p-2 bg-muted rounded"
                      >
                        <span className="text-sm font-medium">{cat.name} Events</span>
                        <span className="text-xs text-muted-foreground">
                          ${cat.amount}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section >
  )
}


