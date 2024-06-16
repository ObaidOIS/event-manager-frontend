"use client";
import { useState, useEffect } from 'react';
import UpdatePopup from './UpdatePopup'; // Import the new UpdatePopup component
import InvitePopup from './InvitePopup'; // Import the new InvitePopup component
import { getUserDetail } from '../_services/events'; // Import the new getUserDetail service

export default function EventList({ events, onUpdate, onDelete, onInvite }) {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showUpdatePopup, setShowUpdatePopup] = useState(false);
  const [showInvitePopup, setShowInvitePopup] = useState(false);
  const [user, setUser] = useState(null); // Add a new state to store the user details

  useEffect(() => {
    const fetchUserDetail = async () => {
      const user = await getUserDetail();
      setUser(user);
    }
    fetchUserDetail();
  }, []);

  useEffect(() => {
    console.log(user);
    console.log(events);
  }, [user, events]);


  const handleUpdateClick = (event) => {
    setSelectedEvent(event);
    setShowUpdatePopup(true);
  };

  const handleInviteClick = (event) => {
    setSelectedEvent(event);
    setShowInvitePopup(true);
  };

  const handleClosePopup = () => {
    setShowUpdatePopup(false);
    setShowInvitePopup(false);
    setSelectedEvent(null);
  };

  return (
    <div className="mt-6">
      <ul className="space-y-4">
        {events.map(event => (
          <li key={event.id} className="bg-gray-50 p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-gray-900">{event.title}</h2>
            <p className="text-gray-700">{event.description}</p>
            <p className="text-gray-500">{event.date}</p>
            <p className="text-gray-500">{event.location}</p>
            <p className="text-gray-500">Reminder: {event.reminder ? 'Yes' : 'No'}</p>
            <div className="flex space-x-2 mt-4">
              <button
                onClick={() => handleUpdateClick(event)}
                disabled={event.user !== user?.id}    // Disable the button if the user is not the creator
                className="bg-blue-500 text-white py-1 px-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(event.id)}
                disabled={event.user !== user?.id}  // Disable the button if the user is not the creator
                className="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50"
              >
                Delete
              </button>
              <button
                onClick={() => handleInviteClick(event)}
                disabled={event.user !== user?.id}  // Disable the button if the user is not the creator
                className="bg-green-500 text-white py-1 px-3 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50"
              >
                Invite
              </button>
            </div>
          </li>
        ))}
      </ul>
      {showUpdatePopup && (
        <UpdatePopup event={selectedEvent} onUpdate={onUpdate} onClose={handleClosePopup} />
      )}
      {showInvitePopup && (
        <InvitePopup event={selectedEvent} onInvite={onInvite} onClose={handleClosePopup} />
      )}
    </div>
  );
}
