export interface IEvent {
  id: string;
  title: string;
  image: string;
  date: string;
  location: string;
  price: string;
  category: string;
  status?: string;
  daysLeft?: number;
  priceValue?: number;
}

export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  avatarUrl?: string | null
  verified: boolean;
}

export interface IBlankPageProps {
  image: string,
  title: string,
  description: string;
  border?: boolean;
}

export type TPersonalInformation = {
  label: string;
  value: string; 
  full?: boolean;
}

export interface IProfile {
  id: number;
  avatarUrl: string;
  firstName: string;
  lastName: string;
  title: string;
  email: string;
  memberSince: string;
  location: string;
  membership: string;
  personalInfo: TPersonalInformation[];
  // settings: { title: string; desc: string; checked: boolean }[];
  // security: { title: string; desc: string; action: string; variant: string }[];
  stats: { icon: string; value: string; label: string }[];
  // achievements: {
  //   icon: string;
  //   title: string;
  //   desc: string;
  //   earned?: boolean;
  //   percent?: number;
  // }[];
}

export interface IEventDetails {
  id: string;
  title: string;
  image: string;
  badge: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  location: string;
  favorite: boolean;
  daysLeft?: number
  eventId?: string;
  tabs: string[];
  tabsContent: {
    about: string[];
    venue: {
      name: string;
      address: string;
      mapEmbedLink: string;
      mapViewLink: string;
    };
    organizer: {
      name: string;
      bio: string;
      email: string;
    };
  };
  tickets: {
    name: string;
    description: string;
    price: number;
    quantity: number;
    available: boolean;
  }[];
  purchasedTicket?: {
    name: string;
    price: number;
    quantity: number;
  };
  status?: "upcoming" | "past" | "cancelled";
  purchaseDate?: string;
  pricing?: {
    subtotal: number;
    serviceFee: number;
    tax: number;
    total: number;
  };
  rating?: number;
  ratingText?: string;
  refundInfo?: {
    originalAmount: number;
    refundAmount: number;
    processingFee: number;
    refundDate: string;
  };
}

export interface TicketType {
  id: string
  name: string
  price: number
  quantity: number
  description: string
  saleStart: string
  saleEnd: string
}

export interface IEventFormData {
  title: string
  category: string
  description: string
  image: File | null
  startDate: string
  startTime: string
  endDate: string
  endTime: string
  venueName: string
  venueAddress: string
  additionalInfo: string
  mapEmbedLink: string
  mapViewLink: string
  ticketTypes: TicketType[]
}

export type CheckoutFormValues = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  paymentMethod: string;
  cardNumber: string;
  expiry: string;
  cvc: string;
  nameOnCard: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
};