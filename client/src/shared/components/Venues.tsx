import type React from "react"

import { useState } from "react"
import { Loader } from "./Loader"

const mockVenues = [
  {
    id: 1,
    name: "Madison Square Garden",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop",
    location: "New York, NY",
    address: "4 Pennsylvania Plaza, New York, NY 10001",
    capacity: 20789,
    type: "Arena",
    description: "The world's most famous arena, hosting the biggest names in sports and entertainment.",
    amenities: ["Parking", "Restaurants", "Accessibility", "VIP Lounges", "Gift Shop"],
    upcomingEvents: 12,
    rating: 4.8,
    phone: "+1 (212) 465-6741",
    website: "www.msg.com",
    categories: ["Sports", "Concerts", "Entertainment"],
  },
  {
    id: 2,
    name: "Lincoln Center",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop",
    location: "New York, NY",
    address: "10 Lincoln Center Plaza, New York, NY 10023",
    capacity: 2738,
    type: "Theater",
    description: "A prestigious performing arts complex featuring world-class opera, ballet, and classical music.",
    amenities: ["Valet Parking", "Fine Dining", "Accessibility", "Gift Shop", "Guided Tours"],
    upcomingEvents: 8,
    rating: 4.9,
    phone: "+1 (212) 875-5456",
    website: "www.lincolncenter.org",
    categories: ["Theater", "Classical", "Opera"],
  },
  {
    id: 3,
    name: "Central Park SummerStage",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=400&fit=crop",
    location: "New York, NY",
    address: "Rumsey Playfield, Central Park, New York, NY 10024",
    capacity: 5000,
    type: "Outdoor",
    description: "An iconic outdoor venue in the heart of Central Park, perfect for summer concerts and festivals.",
    amenities: ["Food Vendors", "Accessibility", "Restrooms", "Security"],
    upcomingEvents: 15,
    rating: 4.6,
    phone: "+1 (212) 360-2756",
    website: "www.summerstage.org",
    categories: ["Music", "Festivals", "Outdoor"],
  },
  {
    id: 4,
    name: "Brooklyn Bowl",
    image: "https://images.unsplash.com/photo-1574391884720-bbc3740c59d1?w=600&h=400&fit=crop",
    location: "Brooklyn, NY",
    address: "61 Wythe Ave, Brooklyn, NY 11249",
    capacity: 600,
    type: "Club",
    description: "A unique venue combining live music, bowling, and dining in a converted warehouse space.",
    amenities: ["Bowling Lanes", "Full Kitchen", "Bar", "Private Events", "Parking"],
    upcomingEvents: 25,
    rating: 4.4,
    phone: "+1 (718) 963-3369",
    website: "www.brooklynbowl.com",
    categories: ["Music", "Entertainment", "Dining"],
  },
  {
    id: 5,
    name: "Apollo Theater",
    image: "https://images.unsplash.com/photo-1527224857830-43a7acc85260?w=600&h=400&fit=crop",
    location: "New York, NY",
    address: "253 W 125th St, New York, NY 10027",
    capacity: 1506,
    type: "Theater",
    description: "Historic theater in Harlem, famous for launching the careers of legendary performers.",
    amenities: ["Historic Tours", "Gift Shop", "Accessibility", "VIP Seating"],
    upcomingEvents: 6,
    rating: 4.7,
    phone: "+1 (212) 531-5300",
    website: "www.apollotheater.org",
    categories: ["Theater", "Music", "Comedy"],
  },
  {
    id: 6,
    name: "Barclays Center",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop",
    location: "Brooklyn, NY",
    address: "620 Atlantic Ave, Brooklyn, NY 11217",
    capacity: 19000,
    type: "Arena",
    description: "Modern multi-purpose arena hosting major sports events, concerts, and entertainment shows.",
    amenities: ["Multiple Restaurants", "Premium Suites", "Accessibility", "Parking", "Retail Stores"],
    upcomingEvents: 18,
    rating: 4.5,
    phone: "+1 (917) 618-6100",
    website: "www.barclayscenter.com",
    categories: ["Sports", "Concerts", "Entertainment"],
  },
]

export const Venues = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [loading, setLoading] = useState(false)

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value.toLowerCase())
  }

  const filteredVenues = mockVenues.filter((venue) => {
    const matchesSearch =
      venue.name.toLowerCase().includes(searchTerm) || venue.location.toLowerCase().includes(searchTerm)
    const matchesCategory =
      categoryFilter === "all" || venue.categories.some((cat) => cat.toLowerCase() === categoryFilter)
    const matchesType = typeFilter === "all" || venue.type.toLowerCase() === typeFilter
    return matchesSearch && matchesCategory && matchesType
  })

  const venueTypes = ["Arena", "Theater", "Outdoor", "Club"]
  const categories = ["Sports", "Concerts", "Theater", "Music", "Entertainment"]

  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Venues</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover amazing venues across the city. From intimate theaters to massive arenas, find the perfect location
            for your next event experience.
          </p>
        </header>

        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            { icon: "fa-building", label: "Total Venues", value: "150+" },
            { icon: "fa-calendar-check", label: "Events This Month", value: "500+" },
            { icon: "fa-users", label: "Total Capacity", value: "2M+" },
            { icon: "fa-star", label: "Average Rating", value: "4.7" },
          ].map((stat, i) => (
            <div key={i} className="text-center p-6 border border-gray-200 rounded-lg bg-white shadow-sm">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-black text-white flex items-center justify-center text-xl">
                <i className={`fa-solid ${stat.icon}`}></i>
              </div>
              <div className="text-2xl font-bold mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8 p-6 border border-gray-200 rounded-lg bg-white">
          <div className="relative flex-1">
            <i className="fa-solid fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Search venues by name or location..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full h-10 pl-10 pr-3 border border-gray-300 rounded bg-white text-sm focus:outline-none focus:border-black"
            />
          </div>
          <div className="flex flex-wrap gap-4">
            <select
              className="h-10 px-3 border border-gray-300 rounded bg-white text-sm min-w-[150px] focus:outline-none focus:border-black"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="all">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category.toLowerCase()}>
                  {category}
                </option>
              ))}
            </select>
            <select
              className="h-10 px-3 border border-gray-300 rounded bg-white text-sm min-w-[150px] focus:outline-none focus:border-black"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <option value="all">All Types</option>
              {venueTypes.map((type) => (
                <option key={type} value={type.toLowerCase()}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Venues Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader size="lg" variant="spinner" text="Loading venues..." />
          </div>
        ) : filteredVenues.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center text-2xl text-gray-400">
              <i className="fa-solid fa-building"></i>
            </div>
            <h3 className="text-xl font-semibold mb-2">No venues found</h3>
            <p className="text-gray-600">No venues match your current search criteria. Try adjusting your filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {filteredVenues.map((venue) => (
              <div
                key={venue.id}
                className="border border-gray-200 rounded-lg bg-white shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
              >
                {/* Venue Image */}
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={venue.image || "/placeholder.svg"}
                    alt={venue.name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                  <span className="absolute top-3 left-3 px-2 py-1 bg-black text-white text-xs font-medium rounded">
                    {venue.type}
                  </span>
                  <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 bg-white/90 rounded text-xs font-medium">
                    <i className="fa-solid fa-star text-yellow-500"></i>
                    <span>{venue.rating}</span>
                  </div>
                </div>

                {/* Venue Info */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{venue.name}</h3>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <i className="fa-solid fa-location-dot w-4"></i>
                      <span>{venue.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <i className="fa-solid fa-users w-4"></i>
                      <span>Capacity: {venue.capacity.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <i className="fa-solid fa-calendar w-4"></i>
                      <span>{venue.upcomingEvents} upcoming events</span>
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">{venue.description}</p>

                  {/* Categories */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {venue.categories.slice(0, 3).map((category) => (
                      <span key={category} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                        {category}
                      </span>
                    ))}
                  </div>

                  {/* Amenities */}
                  <div className="mb-4">
                    <div className="text-sm font-medium mb-2">Amenities:</div>
                    <div className="flex flex-wrap gap-1">
                      {venue.amenities.slice(0, 3).map((amenity) => (
                        <span key={amenity} className="text-xs text-gray-600 bg-gray-50 px-2 py-1 rounded">
                          {amenity}
                        </span>
                      ))}
                      {venue.amenities.length > 3 && (
                        <span className="text-xs text-gray-500">+{venue.amenities.length - 3} more</span>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button className="flex-1 px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors text-sm">
                      View Details
                    </button>
                    <button className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors text-sm">
                      Events
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Featured Venues Section */}
        <div className="mt-16 pt-12 border-t border-gray-200">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Venues</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {mockVenues.slice(0, 2).map((venue) => (
              <div key={venue.id} className="border border-gray-200 rounded-lg bg-white shadow-sm overflow-hidden">
                <div className="md:flex">
                  <div className="md:w-1/2">
                    <img
                      src={venue.image || "/placeholder.svg"}
                      alt={venue.name}
                      className="w-full h-48 md:h-full object-cover"
                    />
                  </div>
                  <div className="md:w-1/2 p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-xl font-semibold">{venue.name}</h3>
                      <div className="flex items-center gap-1 text-sm">
                        <i className="fa-solid fa-star text-yellow-500"></i>
                        <span>{venue.rating}</span>
                      </div>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <i className="fa-solid fa-location-dot w-4"></i>
                        <span>{venue.address}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <i className="fa-solid fa-phone w-4"></i>
                        <span>{venue.phone}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <i className="fa-solid fa-globe w-4"></i>
                        <span>{venue.website}</span>
                      </div>
                    </div>

                    <p className="text-sm text-gray-600 mb-4">{venue.description}</p>

                    <div className="flex gap-2">
                      <button className="flex-1 px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors text-sm">
                        Learn More
                      </button>
                      <button className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors text-sm">
                        <i className="fa-solid fa-heart"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center bg-gray-50 rounded-lg p-12">
          <h2 className="text-3xl font-bold mb-4">List Your Venue</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Are you a venue owner? Join TicketHub and reach thousands of event organizers looking for the perfect space.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-medium">
              List Your Venue
            </button>
            <button className="px-8 py-3 border border-gray-300 rounded-lg hover:bg-white transition-colors font-medium">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
