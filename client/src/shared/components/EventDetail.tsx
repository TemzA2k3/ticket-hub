import { useEffect, useState } from "react";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../app/hooks/useTypedReduxUtils";
import { useAlert } from "../../app/hooks/useAlert"
import { fetchEventDetails } from "../../app/store/api/eventDetails/eventDetailsThunks"
import { addEventToFavorites, removeEventFromFavorites } from "../../app/store/api/favoriteEvents/favoriteEventsThunks"

import { Button } from "./Buttons";
import { Loader } from "./Loader"
import { AlertWrapper } from "./AlertWrapper"



export const EventDetail = () => {
  const dispatch = useAppDispatch()
  const { eventDetails, loading, error } = useAppSelector(state => state.eventDetails)
  const { user } = useAppSelector(state => state.auth)

  const [selectedTicketIndex, setSelectedTicketIndex] = useState<number | null>();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("about");

  const { showAlert, alertMessage, alertType, showTemporaryAlert } = useAlert();

  const navigate = useNavigate();
  const location = useLocation()
  const { eventId } = useParams<{ eventId: string }>();

  useEffect(() => {
    dispatch(fetchEventDetails(eventId!))
  }, [dispatch])

  useEffect(() => {
    if (eventDetails?.tickets?.length) {
      const defaultIndex = getDefaultSelectedIndex();
      setSelectedTicketIndex(defaultIndex !== -1 ? defaultIndex : null);
    }
  }, [eventDetails]);

  const getDefaultSelectedIndex = () => {
    return eventDetails?.tickets?.findIndex(ticket => ticket.available) ?? null;
  };

  const addToFavorites = async () => {
    if (eventId && eventDetails) {
      const result = await dispatch(addEventToFavorites(eventId));
      if (addEventToFavorites.fulfilled.match(result)) {
        dispatch({
          type: "eventDetails/setFavorite",
          payload: true,
        });
        showTemporaryAlert(`Event - ${eventDetails.title}, succesfully added to favorites!`, "success");
      } else {
        showTemporaryAlert("Failed to add to favorites", "error");
      }
    }
  };

  const removeFromFavorites = async () => {
    if (eventId && eventDetails) {
      const result = await dispatch(removeEventFromFavorites(eventId));
      if (removeEventFromFavorites.fulfilled.match(result)) {
        dispatch({
          type: "eventDetails/setFavorite",
          payload: false,
        });
        showTemporaryAlert(`Event - ${eventDetails.title}, succesfully removed from favorites!`, "success");
      } else {
        showTemporaryAlert("Failed to remove from favorites", "error");
      }
    }
  };

  const copyEventLink = () => {
    if (eventDetails) {
      navigator.clipboard.writeText(`${window.location.origin}/events/${eventDetails.id}`);
      showTemporaryAlert(`The link was successfully copied!`, "success");
    }
  };

  const handleProceed = () => {
    if (!selectedTicket || !eventDetails) return;
    navigate(`checkout`, {
      state: {
        eventTitle: eventDetails.title,
        eventStartDate: eventDetails.startDate,
        eventEndDate: eventDetails.endDate,
        ticket: selectedTicket,
        quantity,
        subtotal,
        serviceFee,
        total,
      },
    });
  };

  const handleSelect = (index: number) => {
    if (!eventDetails?.tickets[index].available) return;
    if (index === selectedTicketIndex) return;
    setSelectedTicketIndex(index);
    setQuantity(1);
  };

  const handleQuantity = (delta: number) => {
    if (!selectedTicket) return;
    setQuantity(prev => {
      const max = selectedTicket.quantity;
      const next = prev + delta;
      if (next < 1) return 1;
      if (next > max) return max;
      return next;
    });
  };

  const selectedTicket =
    eventDetails && typeof selectedTicketIndex === "number"
      ? eventDetails.tickets[selectedTicketIndex]
      : null;

  const subtotal = selectedTicket ? selectedTicket.price * quantity : 0;
  const serviceFeeRate = 0.15;
  const serviceFee = subtotal * serviceFeeRate;
  const total = subtotal + serviceFee;

  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <Link to={`/events${location.search}`} className="inline-flex items-center gap-2 mb-6 text-sm font-medium hover:underline">
          <i className="fa-solid fa-arrow-left" />
          Back to Events
        </Link>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader size="lg" variant="dots" text="Loading event details..." />
          </div>
        ) : error ? (
          <p className="text-center text-red-500 py-10">Error: {error}</p>
        ) : null}

        <AlertWrapper
          showAlert={showAlert}
          alertMessage={alertMessage}
          alertType={alertType}
        />

        {eventDetails && (
          <div className="grid gap-6 md:grid-cols-[2fr_1fr]">
            <div>
              <div className="relative aspect-[16/9] rounded overflow-hidden">
                <img src={import.meta.env.VITE_API_BASE_URL + eventDetails.image} alt={eventDetails.title} className="w-full h-full object-cover" />
                <span className="absolute top-2 right-2 bg-primary text-white text-xs px-2 py-1 rounded">
                  {eventDetails.badge}
                </span>
              </div>

              <div className="my-6">
                <h1 className="text-3xl font-bold mb-4">{eventDetails.title}</h1>
                <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2"><i className="fa-solid fa-calendar" /> {eventDetails.startDate} - {eventDetails.endDate}</div>
                  <div className="flex items-center gap-2"><i className="fa-solid fa-clock" /> {eventDetails.startTime} - {eventDetails.endTime}</div>
                  <div className="flex items-center gap-2"><i className="fa-solid fa-location-dot" /> {eventDetails.location}</div>
                </div>
              </div>

              {/* Табы */}
              <div>
                <div className="grid grid-cols-3 gap-1 mb-4">
                  {eventDetails.tabs.map(tab => (
                    <button
                      key={tab}
                      className={`py-3 text-sm font-medium rounded ${activeTab === tab ? "bg-white shadow" : "bg-muted"}`}
                      onClick={() => setActiveTab(tab)}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  ))}
                </div>

                <div className="bg-white p-4 rounded">
                  {activeTab === "about" &&
                    <p className="mb-4 leading-loose">{eventDetails.tabsContent.about}</p>
                  }
                  {activeTab === "venue" && (
                    <>
                      <h3 className="text-lg font-semibold">{eventDetails.tabsContent.venue.name}</h3>
                      <p className="mb-4">{eventDetails.tabsContent.venue.address}</p>
                      <iframe
                        className="w-full aspect-[16/9] rounded mb-4 border"
                        src={eventDetails.tabsContent.venue.mapEmbedLink}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                      />
                      <Link to={eventDetails.tabsContent.venue.mapViewLink} target="_blank" rel="noopener noreferrer">
                        <Button variant="primary">
                          View on Google Maps
                        </Button>
                      </Link>
                    </>
                  )}
                  {activeTab === "organizer" && (
                    <>
                      <h3 className="text-lg font-semibold">{eventDetails.tabsContent.organizer.name}</h3>
                      <p className="mb-4">{eventDetails.tabsContent.organizer.email}</p>
                      <p className="mb-4">{eventDetails.tabsContent.organizer.bio}</p>
                      <Button variant="primary">
                        <Link
                          to={`mailto:${eventDetails.tabsContent.organizer.email}`}
                        // className="inline-block text-sm font-medium border border-primary text-primary px-4 py-2 rounded hover:bg-primary hover:text-white"
                        >
                          Contact Organizer
                        </Link>
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div>
              <div className="rounded border border-border bg-background shadow overflow-hidden">
                <div className="p-6 border-b border-border">
                  <h2 className="text-xl font-semibold mb-1">Get Tickets</h2>
                  <p className="text-sm text-muted-foreground">Select your ticket type and quantity</p>
                </div>

                <div className="p-6 space-y-6">
                  <div className="space-y-4">
                    {eventDetails.tickets.map((ticket, i) => {
                      const isSelected = selectedTicketIndex === i;
                      const isAvailable = ticket.available;

                      return (
                        <div
                          key={i}
                          className={`flex justify-between items-start p-4 border rounded transition-all
                              ${!isAvailable ? "opacity-50 cursor-not-allowed border-border"
                              : isSelected ? "border-primary bg-black/5 cursor-pointer"
                                : "border-border cursor-pointer"}
                          `}
                          onClick={() => handleSelect(i)}
                        >
                          <div>
                            <h3 className="text-base font-medium mb-1">{ticket.name}</h3>
                            <p className="text-sm text-muted-foreground">{ticket.description}</p>
                          </div>
                          <div className="text-right space-y-1">
                            <div className="font-bold text-base">${ticket.price}</div>
                            {!isAvailable && (
                              <span className="inline-block border border-primary text-primary text-xs px-2 py-0.5 rounded">
                                Unavailable
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Кол-во */}
                  <div>
                    <h3 className="text-sm font-medium mb-2">Quantity</h3>
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => handleQuantity(-1)}
                        className="w-8 h-8 flex items-center justify-center rounded-full border border-border bg-background"
                        disabled={quantity <= 1}
                      >
                        <i className="fa-solid fa-minus" />
                      </button>
                      <span className="w-8 text-center">{quantity}</span>
                      <button
                        onClick={() => handleQuantity(1)}
                        className="w-8 h-8 flex items-center justify-center rounded-full border border-border bg-background"
                        disabled={!!selectedTicket && quantity >= selectedTicket.quantity}
                      >
                        <i className="fa-solid fa-plus" />
                      </button>
                    </div>
                  </div>

                  {/* Сводка */}
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
                    <div className="flex justify-between"><span>Service Fee</span><span>${serviceFee.toFixed(2)}</span></div>
                    <div className="flex justify-between font-bold"><span>Total</span><span>${total.toFixed(2)}</span></div>
                  </div>
                </div>

                <div className="p-6 border-t border-border space-y-4">
                  <Button fullWidth variant="primary" disabled={!selectedTicket} onClick={handleProceed}>
                    Proceed to Checkout
                  </Button>
                  <div className="flex justify-between">
                    {user && (
                      <Button onClick={eventDetails.favorite ? removeFromFavorites : addToFavorites} variant="outline">
                        <i
                          className="fa-solid fa-heart"
                          style={{ color: eventDetails.favorite ? "rgb(255, 4, 4)" : "inherit" }}
                        />
                      </Button>
                    )}
                    <Button onClick={copyEventLink} variant="outline"><i className="fa-solid fa-share" /></Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};