import { FC } from "react";
import { Link, useLocation } from "react-router-dom";

import { Button } from "./Buttons";


interface EventCardProps {
  id: string;
  image: string;
  title: string;
  date: string;
  location: string;
  price: string;
  category: string;
  fav?: boolean;
  onRemoveFromFavorites?: (e: React.MouseEvent, eventId: string) => void;
}


export const FeaturedEventCard: FC<EventCardProps> = ({
  id,
  image,
  title,
  date,
  location,
  price,
  category,
  fav,
  onRemoveFromFavorites
}) => {

  const locationPath = useLocation();

  return (
    <Link
      to={`/events/${id}${locationPath.search}`}
      className="bg-background border border-border rounded overflow-hidden transition-shadow hover:shadow-md"
    >
      <div className="relative aspect-[16/9] overflow-hidden">
        <img
          src={import.meta.env.VITE_API_BASE_URL + image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-105"
        />
        {fav ? (
          <>
            <span className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs font-medium px-2 py-1 rounded">
              {category}
            </span>
            <button
              onClick={(e) => onRemoveFromFavorites?.(e, id)}
              className={`
                absolute top-2 right-2 w-8 h-8 rounded-full 
                bg-white text-muted-foreground 
                flex items-center justify-center 
                transition-all duration-200 
                hover:bg-background hover:scale-110
                active text-red-500
              `}
              title="Remove from favorites"
            >
              <i className="fa-solid fa-heart"></i>
            </button>
          </>
        ) : (
          <span className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs font-medium px-2 py-1 rounded">
            {category}
          </span>
        )}
      </div>

      <div className="p-4">
        <h3 className="text-sm font-semibold mb-2 truncate">{title}</h3>

        <div className="mb-2">
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
            <i className="fa-solid fa-calendar text-sm" />
            <span>{date}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <i className="fa-solid fa-location-dot text-sm" />
            <span>{location}</span>
          </div>
        </div>

        <div className="flex justify-between items-center mt-2">
          <div className="font-bold text-sm">{price}</div>
          <Button size="sm" variant="primary">
            Get Tickets
          </Button>
        </div>
      </div>
    </Link>
  );
};
