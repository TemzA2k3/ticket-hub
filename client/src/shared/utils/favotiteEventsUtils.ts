import { IEvent } from "../types/index"


type CategoryCounts = Record<string, number>;

export const getTopCategoriesWithOther = (
    categoryCounts: CategoryCounts,
    topLimit: number = 3
): [string, number][] => {
    const sortedCategories = Object.entries(categoryCounts).sort((a, b) => b[1] - a[1]);

    const topCategories = sortedCategories.slice(0, topLimit);
    const otherCategories = sortedCategories.slice(topLimit);

    const otherCount = otherCategories.reduce((acc, [, count]) => acc + count, 0);

    return otherCount > 0
        ? [...topCategories, ["Other", otherCount]]
        : topCategories;
};

export const getMinMaxPrices = (events: IEvent[]) => {
    const values = events
      .map(e => e.priceValue)
      .filter((v): v is number => typeof v === "number");
  
    if (values.length === 0) {
      return { min: 0, max: 0 };
    }
  
    return {
      min: Math.min(...values),
      max: Math.max(...values),
    };
  };
  
export const getPriceRanges = (events: IEvent[]) => {
    const ranges = {
        "Under $50": 0,
        "$50 - $100": 0,
        "Over $100": 0,
    };

    events.forEach((e) => {
        const price = e.priceValue;
        if (typeof price !== "number") return;

        if (price < 50) {
            ranges["Under $50"]++;
        } else if (price <= 100) {
            ranges["$50 - $100"]++;
        } else {
            ranges["Over $100"]++;
        }
    });

    return ranges;
};


export const getStatsData = (events: IEvent[]) => {
    const favoriteCount = events.length;
  
    const upcomingCount = events.filter(e => e.status === "upcoming").length;
    const pastCount = events.filter(e => e.status === "past").length;    
    const totalPrice = events.reduce((sum, e) => sum + (e.priceValue ?? 0), 0);
  
    return [
      { icon: "fa-heart", label: "Favorite Events", value: favoriteCount.toString() },
      { icon: "fa-calendar-check", label: "Upcoming Events", value: upcomingCount.toString() },
      { icon: "fa-history", label: "Past Events", value: pastCount.toString() },
      { icon: "fa-dollar-sign", label: "Potential Savings", value: `$${totalPrice.toLocaleString()}` },
    ];
  };
  
