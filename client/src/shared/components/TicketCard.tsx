import { FC } from "react"
import { QRCodeSVG } from "qrcode.react"

import { IEventDetails } from "../types/index"



export const TicketCard: FC<{ ticket: IEventDetails }> = ({ ticket }) => {

  const getTicketCardBorderClass = (status: string) => {
    switch (status) {
      case "upcoming":
        return "border-l-4 border-l-green-500"
      case "past":
        return "border-l-4 border-l-gray-500"
      case "cancelled":
        return "border-l-4 border-l-red-500 opacity-80"
      default:
        return ""
    }
  }

  const getStatusBadgeClasses = (status: string) => {
    switch (status) {
      case "upcoming":
        return "bg-green-500 text-white"
      case "past":
        return "bg-gray-500 text-white"
      case "cancelled":
        return "bg-red-500 text-white"
      default:
        return "bg-gray-500 text-white"
    }
  }

  // const handleAction = (action: string, ticketId: string, eventName: string) => {
  //   
  // }

  // const renderStars = (rating: number) => {
  //   return Array.from({ length: 5 }, (_, i) => (
  //     <i key={i} className={`fa-solid fa-star ${i < rating ? "text-yellow-500" : "text-gray-300"}`}></i>
  //   ))
  // }

  return (
    <div className={`border border-gray-200 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow ${getTicketCardBorderClass(ticket.status || "")}`}>
      {/* Ticket Header */}
      <div className="flex justify-between items-center p-6 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center gap-4">
          <span
            className={`px-3 py-1 rounded-lg text-xs font-medium uppercase ${getStatusBadgeClasses(ticket.status || "")}`}
          >
            {ticket.status === "past" ? "Attended" : ticket.status}
          </span>
          <span className="text-sm text-gray-600 font-mono">{ticket.id}</span>
        </div>
        {/* <div className="flex gap-2">
          <button
            onClick={() => handleAction("Download PDF", ticket.id, ticket.title)}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-200 transition-colors"
            title="Download PDF"
          >
            <i className="fa-solid fa-download text-gray-600"></i>
          </button>
          <button
            onClick={() => handleAction("Share", ticket.id, ticket.title)}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-200 transition-colors"
            title="Share"
          >
            <i className="fa-solid fa-share text-gray-600"></i>
          </button>
          <button
            onClick={() => handleAction("More options", ticket.id, ticket.title)}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-200 transition-colors"
            title="More options"
          >
            <i className="fa-solid fa-ellipsis-vertical text-gray-600"></i>
          </button>
        </div> */}
      </div>

      {/* Ticket Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
        {/* Main Content */}
        <div className="lg:col-span-2 flex gap-6">
          {/* Event Image */}
          <div className="relative w-48 h-28 rounded-lg overflow-hidden flex-shrink-0">
            <img
              src={import.meta.env.VITE_API_BASE_URL + ticket.image || "/placeholder.svg"}
              alt={ticket.title}
              className="w-full h-full object-cover"
            />
            <span className="absolute top-2 left-2 px-2 py-1 bg-black text-white text-xs font-medium rounded">
              {ticket.badge}
            </span>
          </div>

          {/* Ticket Info */}
          <div className="flex-1">
            <h3 className="text-xl font-semibold mb-4">{ticket.title}</h3>

            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <i className="fa-solid fa-calendar w-4 h-4"></i>
                <span>{ticket.startDate} - {ticket.endDate}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <i className="fa-solid fa-clock w-4 h-4"></i>
                <span>{ticket.startTime} - {ticket.endTime}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <i className="fa-solid fa-location-dot w-4 h-4"></i>
                <span>{ticket.location}</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 font-medium">Ticket Type:</span>
                <span className="font-medium">{ticket.purchasedTicket!.name}</span>
              </div>
              {/* <div className="flex justify-between text-sm">
                <span className="text-gray-600 font-medium">Quantity:</span>
                <span className="font-medium">
                  {ticket.purchasedTicket!.quantity} ticket{ticket.purchasedTicket!.quantity > 1 ? "s" : ""}
                </span>
              </div> */}
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 font-medium">Purchase Date:</span>
                <span className="font-medium">{ticket.purchaseDate}</span>
              </div>
              {ticket.refundInfo && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 font-medium">Refund Status:</span>
                  <span className="font-medium text-green-600">Refunded</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Price Breakdown */}
          <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
            <div className="space-y-3">
              {/* Ticket Cost */}
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">
                  {ticket.purchasedTicket!.quantity}x {ticket.purchasedTicket!.name} ($
                  {ticket.purchasedTicket!.price} each)
                </span>
                <span className="font-medium">${ticket.pricing!.subtotal.toFixed(2)}</span>
              </div>

              {/* Service Fee */}
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Service Fee</span>
                <span className="font-medium">${ticket.pricing!.serviceFee.toFixed(2)}</span>
              </div>

              {/* Tax */}
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Tax</span>
                <span className="font-medium">${ticket.pricing!.tax.toFixed(2)}</span>
              </div>

              {/* Divider */}
              <hr className="border-gray-300" />

              {/* Total */}
              <div
                className={`flex justify-between text-lg font-bold ${ticket.refundInfo ? "text-red-500 line-through" : ""}`}
              >
                <span>Total</span>
                <span>${ticket.pricing!.total.toFixed(2)}</span>
              </div>

              {/* Refund Info */}
              {ticket.refundInfo && (
                <div className="mt-3 pt-3 border-t border-gray-300 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Refund Amount</span>
                    <span className="font-medium text-green-600">
                      ${ticket.refundInfo.refundAmount.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Processing Fee</span>
                    <span className="font-medium">-${ticket.refundInfo.processingFee.toFixed(2)}</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* QR Code or Rating */}
          {ticket.status === "upcoming" && (
            <div className="flex items-center justify-center p-4 border border-gray-200 rounded-lg bg-white">
              <div className="flex flex-col items-center gap-2 text-gray-600">
                <QRCodeSVG
                  value={`https://example.com/ticket/${ticket.id}`}
                  size={128}
                  bgColor="#ffffff"
                  fgColor="#000000"
                  className="rounded shadow"
                />
                <span className="text-sm">Your QR Code</span>
              </div>
            </div>
          )}

          {/* {ticket.status === "past" && ticket.rating && (
            <div className="p-4 border border-gray-200 rounded-lg bg-gray-50 text-center">
              <div className="text-sm font-medium mb-2 text-gray-600">Your Rating</div>
              <div className="flex justify-center gap-1 mb-2">{renderStars(ticket.rating)}</div>
              <div className="text-sm text-gray-600">{ticket.ratingText}</div>
            </div>
          )} */}

          {ticket.status === "cancelled" && ticket.refundInfo && (
            <div className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-500">
                <i className="fa-solid fa-check-circle text-white"></i>
              </div>
              <div className="flex-1">
                <div className="font-medium">Refund Processed</div>
                <div className="text-sm text-gray-600">{ticket.refundInfo.refundDate}</div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          {/* <div className="space-y-3">
            {ticket.status === "upcoming" && (
              <>
                <button className="w-full px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors">
                  View Full Ticket
                </button>
                <button className="w-full px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  Add to Calendar
                </button>
                <button className="w-full px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  Get Directions
                </button>
              </>
            )}

            {ticket.status === "past" && (
              <>
                <button className="w-full px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  View Receipt
                </button>
                <button className="w-full px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  Leave Review
                </button>
                <button className="w-full px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  Buy Similar
                </button>
              </>
            )}

            {ticket.status === "cancelled" && (
              <>
                <button className="w-full px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  View Refund Details
                </button>
                <button className="w-full px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  Download Receipt
                </button>
                <button className="w-full px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  Find Similar Events
                </button>
              </>
            )}
          </div> */}
        </div>
      </div>
    </div>
  )
}