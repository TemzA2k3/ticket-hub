import { FC, useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "./Buttons";


interface PublishedEventModalProps {
  newEventId: string | null;
}


export const PublishedEventModal: FC<PublishedEventModalProps> = ({ newEventId }) => {

  const [copied, setCopied] = useState(false);

  const copyEventLink = () => {
    navigator.clipboard.writeText(`${window.location.origin}/events/${newEventId}`)
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }


  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div className="text-center mb-4">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="fa-solid fa-check-circle text-green-500 text-2xl"></i>
          </div>
          <h3 className="text-xl font-semibold">Event Created Successfully!</h3>
        </div>

        <div className="mb-6">
          <p className="text-gray-600 mb-4">Your event has been published and is now live on TicketHub.</p>
          <div>
            <label className="block text-sm font-medium mb-2">Event Link:</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={`${window.location.origin}/events/${newEventId}`}
                readOnly
                className="flex-1 h-10 px-3 border border-gray-300 rounded bg-gray-50"
              />
              <button
                onClick={copyEventLink}
                className="px-3 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
              >
                {copied ? (
                  <i className="fa-solid fa-check text-green-500"></i>
                ) : (
                  <i className="fa-solid fa-copy"></i>
                )}
              </button>
            </div>
          </div>
        </div>

        <div className="grid gap-3">
          <Link to={`/events/${newEventId}`}>
            <Button variant="primary" fullWidth>
              View Event
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}