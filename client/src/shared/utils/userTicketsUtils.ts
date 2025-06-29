import type { IEventDetails } from "../types/index";

export const getPurchasedStats = (tickets: IEventDetails[]) => {
  const totalTickets = tickets.length;

  const uniqueEventsMap = new Map<string, IEventDetails>();
  for (const ticket of tickets) {
    if (!uniqueEventsMap.has(ticket.eventId!)) {
      uniqueEventsMap.set(ticket.eventId!, ticket);
    }
  }
  const uniqueEvents = Array.from(uniqueEventsMap.values());

  const upcomingCount = uniqueEvents.filter(event => event.status === "upcoming").length;
  const pastCount = uniqueEvents.filter(event => event.status === "past").length;

  const totalSpent = tickets.reduce((sum, event) => {
    if (event.status === "cancelled") {
      return sum + (event.refundInfo?.processingFee ?? 0);
    } else {
      return sum + (event.pricing?.total ?? 0);
    }
  }, 0);

  return [
    { icon: "fa-ticket", label: "Total Tickets", value: totalTickets.toString() },
    { icon: "fa-calendar-check", label: "Upcoming Events", value: upcomingCount.toString() },
    { icon: "fa-history", label: "Past Events", value: pastCount.toString() },
    { icon: "fa-dollar-sign", label: "Total Spent", value: `$${totalSpent.toLocaleString()}` },
  ];
};



export const getUpcomingEventsSummary = (tickets: IEventDetails[]) => {
  const upcomingTickets = tickets.filter(ticket => ticket.status === "upcoming");

  const eventMap = new Map<string, IEventDetails>();

  for (const ticket of upcomingTickets) {
    const existing = eventMap.get(ticket.eventId!);
    if (!existing || (ticket.daysLeft ?? Infinity) < (existing.daysLeft ?? Infinity)) {
      eventMap.set(ticket.eventId!, ticket);
    }
  }
  const uniqueUpcoming = Array.from(eventMap.values()).sort((a, b) => (a.daysLeft ?? 0) - (b.daysLeft ?? 0)).slice(0, 3);

  const count = uniqueUpcoming.length;

  const items = uniqueUpcoming.map(event => ({
    title: event.title,
    daysLeft: event.daysLeft,
  }));

  return { count, items };
};


export const getSpendingOverviewFixed = (tickets: IEventDetails[]) => {
  const categoryTotals: Record<string, number> = {};

  const grouped: Record<string, IEventDetails[]> = {};

  for (const ticket of tickets) {
    const category = ticket.badge ?? "Other";
    if (!grouped[category]) {
      grouped[category] = [];
    }
    grouped[category].push(ticket);
  }

  for (const [category, events] of Object.entries(grouped)) {
    let sum = 0;

    for (const event of events) {
      if (event.status === "past" || event.status === "upcoming") {
        sum += event.pricing?.total ?? 0;
      }

      if (event.status === "cancelled" && event.refundInfo?.processingFee) {
        sum += event.refundInfo.processingFee;
      }
    }

    categoryTotals[category] = Math.round(sum);
  }

  const total = Object.values(categoryTotals).reduce((a, b) => a + b, 0);

  const categories = Object.entries(categoryTotals).map(([key, value]) => ({
    name: key,
    amount: value,
  }));

  return {
    total,
    categories,
  };
};


