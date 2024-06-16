"use client";
import { useState, useEffect } from 'react';
import { fetchEvents, createEvent, updateEvent, deleteEvent, inviteUsers } from './_services/events';
import EventForm from './_components/EventForm';
import EventList from './_components/EventList';
import withAuth from './_hooks/withAuth';
import { useAuth } from './_context/AuthContext';

const Events = () => {
  const [events, setEvents] = useState([]);
  const { logout } = useAuth();

  useEffect(() => {
    async function loadEvents() {
      const data = await fetchEvents();
      setEvents(data);
    }
    loadEvents();
  }, []);

  const handleCreate = async (event) => {
    const newEvent = await createEvent(event);
    setEvents([...events, newEvent]);
  };

  const handleUpdate = async (id, event) => {
    const updatedEvent = await updateEvent(id, event);
    setEvents(events.map(e => e.id === id ? updatedEvent : e));
  };

  const handleDelete = async (id) => {
    await deleteEvent(id);
    setEvents(events.filter(e => e.id !== id));
  };

  const handleInvite = async (id, email) => {
    await inviteUsers(id, email);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="min-h-screen bg-gray-400 py-6 flex flex-col items-center ">
      {/* Navigation Bar */}
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-md p-6 mb-6 flex justify-between items-center">
        {/* <div className="flex items-center space-x-4"> */}
          <span className="text-xl font-bold  text-gray-900">Event Manager</span>
          <button
            className="px-3 py-1 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
            onClick={() => window.location.href = '/'}
          >
            Events
          </button>
        {/* </div> */}
        <button
          className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>

      {/* Event Form and List */}
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-md p-6">
        <EventForm onSave={handleCreate} />
        <EventList events={events} onUpdate={handleUpdate} onDelete={handleDelete} onInvite={handleInvite} />
      </div>
    </div>
  );
};

export default withAuth(Events);
