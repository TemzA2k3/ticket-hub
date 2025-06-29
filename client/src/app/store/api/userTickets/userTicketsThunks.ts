import { createAsyncThunk } from '@reduxjs/toolkit';

import { IEventDetails } from "../../../../shared/types/index"


export const fetchUserTickets = createAsyncThunk<IEventDetails[]>(
  'userTickets/fetch',
  async () => {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");     
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/user-tickets`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
    if (!response.ok) throw new Error('Failed to fetch My Tickets');    
    const userTickets = await response.json();    
    
    return userTickets


    // const mockPurchasedTickets: IEventDetails[] = [
    //   {
    //     id: "TH-2024-001",
    //     title: "Summer Music Festival",
    //     image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=200&fit=crop",
    //     badge: "Concerts",
    //     startDate: "July 15, 2024",
    //     endDate: "July 17, 2024",
    //     startTime: "6:00 PM",
    //     endTime: "11:00 PM",
    //     location: "Central Park, New York",
    //     favorite: true,
    //     daysLeft: 10,
    //     tabs: ["about", "venue", "organizer"],
    //     tabsContent: {
    //       about: [
    //         "Join us for three days of amazing music...",
    //         "The Summer Music Festival is the highlight...",
    //         "In addition to incredible music...",
    //         "This year's lineup includes Grammy-winning...",
    //       ],
    //       venue: {
    //         name: "Central Park Great Lawn",
    //         address: "Central Park, New York, NY 10024",
    //         mapEmbedLink: "",
    //         mapViewLink: "",
    //       },
    //       organizer: {
    //         name: "Festival Productions Inc.",
    //         bio: "Festival Productions Inc. is a leading event organizer...",
    //         email: "qwerty1522003@gmail.com"
    //       },
    //     },
    //     tickets: [
    //       {
    //         name: "General Admission",
    //         description: "Access to all stages and general festival grounds",
    //         price: 99,
    //         available: true,
    //       },
    //       {
    //         name: "VIP Pass",
    //         description: "VIP viewing areas, exclusive lounge access, and premium restrooms",
    //         price: 199,
    //         available: true,
    //       },
    //       {
    //         name: "Premium Package",
    //         description: "All VIP benefits plus backstage tours and artist meet & greets",
    //         price: 299,
    //         available: false,
    //       },
    //     ],
    //     // Purchase details
    //     purchasedTicket: {
    //       name: "VIP Pass",
    //       price: 199,
    //       quantity: 2,
    //     },
    //     status: "upcoming",
    //     purchaseDate: "June 10, 2024",
    //     pricing: {
    //       subtotal: 398.0,
    //       serviceFee: 25.0,
    //       tax: 15.0,
    //       total: 438.0,
    //     },
    //   },
    //   {
    //     id: "TH-2024-002",
    //     title: "NBA Finals Game 5",
    //     image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop",
    //     badge: "Sports",
    //     startDate: "June 28, 2024",
    //     endDate: "June 28, 2024",
    //     startTime: "7:30 PM",
    //     endTime: "10:30 PM",
    //     location: "Madison Square Garden",
    //     favorite: true,
    //     tabs: ["about", "venue", "organizer"],
    //     daysLeft: 12,
    //     tabsContent: {
    //       about: [
    //         "Experience the excitement of NBA Finals...",
    //         "This is the ultimate basketball showdown...",
    //         "Watch the best players compete...",
    //         "Historic Madison Square Garden atmosphere...",
    //       ],
    //       venue: {
    //         name: "Madison Square Garden",
    //         address: "4 Pennsylvania Plaza, New York, NY 10001",
    //         mapEmbedLink: "",
    //         mapViewLink: "",
    //       },
    //       organizer: {
    //         name: "NBA Entertainment",
    //         bio: "Official NBA event organizer...",
    //         email: "xzc@gmail.com"
    //       },
    //     },
    //     tickets: [
    //       {
    //         name: "Upper Bowl",
    //         description: "Great view from upper level",
    //         price: 89,
    //         available: true,
    //       },
    //       {
    //         name: "Lower Bowl",
    //         description: "Premium courtside experience",
    //         price: 299,
    //         available: true,
    //       },
    //       {
    //         name: "VIP Suite",
    //         description: "Luxury suite with catering",
    //         price: 599,
    //         available: false,
    //       },
    //     ],
    //     // Purchase details
    //     purchasedTicket: {
    //       name: "Lower Bowl",
    //       price: 299,
    //       quantity: 1,
    //     },
    //     status: "upcoming",
    //     purchaseDate: "May 20, 2024",
    //     pricing: {
    //       subtotal: 299.0,
    //       serviceFee: 18.0,
    //       tax: 12.0,
    //       total: 329.0,
    //     },
    //   },
    //   {
    //     id: "TH-2024-003",
    //     title: "Jazz Night at Blue Note",
    //     image: "https://images.unsplash.com/photo-1574391884720-bbc3740c59d1?w=300&h=200&fit=crop",
    //     badge: "Concerts",
    //     startDate: "May 25, 2024",
    //     endDate: "May 25, 2024",
    //     startTime: "8:00 PM",
    //     endTime: "11:00 PM",
    //     location: "Blue Note Jazz Club",
    //     favorite: true,
    //     daysLeft: 1,
    //     tabs: ["about", "venue", "organizer"],
    //     tabsContent: {
    //       about: [
    //         "Intimate jazz performance in legendary venue...",
    //         "World-class musicians in cozy setting...",
    //         "Premium cocktails and dining available...",
    //         "Historic Blue Note atmosphere...",
    //       ],
    //       venue: {
    //         name: "Blue Note Jazz Club",
    //         address: "131 W 3rd St, New York, NY 10012",
    //         mapEmbedLink: "",
    //         mapViewLink: "",
    //       },
    //       organizer: {
    //         name: "Blue Note Entertainment",
    //         bio: "Premier jazz venue and event organizer...",
    //         email: "wekjbdiwe@gmail.com"
    //       },
    //     },
    //     tickets: [
    //       {
    //         name: "General Seating",
    //         description: "Standard table seating",
    //         price: 45,
    //         available: true,
    //       },
    //       {
    //         name: "Premium Table",
    //         description: "Front row table with premium service",
    //         price: 89,
    //         available: true,
    //       },
    //       {
    //         name: "VIP Experience",
    //         description: "Meet & greet with artists",
    //         price: 149,
    //         available: true,
    //       },
    //     ],
    //     // Purchase details
    //     purchasedTicket: {
    //       name: "Premium Table",
    //       price: 89,
    //       quantity: 2,
    //     },
    //     status: "past",
    //     purchaseDate: "April 15, 2024",
    //     pricing: {
    //       subtotal: 178.0,
    //       serviceFee: 12.0,
    //       tax: 8.0,
    //       total: 198.0,
    //     },
    //     rating: 4,
    //     ratingText: "Great performance!",
    //   },
    //   {
    //     id: "TH-2024-004",
    //     title: "Broadway Musical - Hamilton",
    //     image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop",
    //     badge: "Theater",
    //     startDate: "March 15, 2024",
    //     endDate: "March 15, 2024",
    //     startTime: "7:00 PM",
    //     endTime: "10:00 PM",
    //     location: "Richard Rodgers Theatre",
    //     favorite: true,
    //     daysLeft: 12,
    //     tabs: ["about", "venue", "organizer"],
    //     tabsContent: {
    //       about: [
    //         "The revolutionary musical about Alexander Hamilton...",
    //         "Lin-Manuel Miranda's masterpiece...",
    //         "Award-winning Broadway production...",
    //         "Historic Richard Rodgers Theatre...",
    //       ],
    //       venue: {
    //         name: "Richard Rodgers Theatre",
    //         address: "226 W 46th St, New York, NY 10036",
    //         mapEmbedLink: "",
    //         mapViewLink: "",
    //       },
    //       organizer: {
    //         name: "Broadway Productions",
    //         bio: "Premier Broadway show producer...",
    //         email: "dkjfhwk@gmail.com"
    //       },
    //     },
    //     tickets: [
    //       {
    //         name: "Mezzanine",
    //         description: "Great view from mezzanine level",
    //         price: 149,
    //         available: true,
    //       },
    //       {
    //         name: "Orchestra",
    //         description: "Premium orchestra seating",
    //         price: 249,
    //         available: true,
    //       },
    //       {
    //         name: "Premium Orchestra",
    //         description: "Best seats in the house",
    //         price: 349,
    //         available: false,
    //       },
    //     ],
    //     // Purchase details
    //     purchasedTicket: {
    //       name: "Orchestra",
    //       price: 249,
    //       quantity: 2,
    //     },
    //     status: "cancelled",
    //     purchaseDate: "February 10, 2024",
    //     pricing: {
    //       subtotal: 498.0,
    //       serviceFee: 30.0,
    //       tax: 20.0,
    //       total: 548.0,
    //     },
    //     refundInfo: {
    //       originalAmount: 548.0,
    //       refundAmount: 518.0,
    //       processingFee: 30.0,
    //       refundDate: "March 18, 2024",
    //     },
    //   },
    // ]

    // return mockPurchasedTickets
  }
)