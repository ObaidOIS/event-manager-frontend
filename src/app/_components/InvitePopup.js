"use client";
import { useState, useEffect } from 'react';
import { getInvites } from '../_services/events';

export default function InvitePopup({ event, onInvite, onClose }) {
  const [email, setEmail] = useState('');
  const [invitedEmails, setInvitedEmails] = useState([]);
  const [error, setError] = useState('');

    useEffect(() => {
    const fetchInvites = async () => {
        const data = await getInvites(event.id);
        setInvitedEmails(data);
        }
        fetchInvites();
    }, [event.id]);





  const handleInvite = () => {
    if (invitedEmails.includes(email)) {
      setError('This email is already invited.');
      return;
    }

    const emails = [...invitedEmails, email];
    setInvitedEmails(emails);
    onInvite(event.id, email);
    setEmail('');
    setError('');
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg space-y-4">
        <h2 className="text-xl font-bold">Invite to {event.title}</h2>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <div className="flex space-x-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 placeholder-gray-400"
          />
          <button
            onClick={handleInvite}
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            +
          </button>
        </div>
        <div>
          <h3 className="text-lg font-semibold">Invited Users</h3>
          <ul className="list-disc list-inside space-y-1">
            {invitedEmails.map((email, index) => (
              <li key={index} className="text-gray-700">{email}</li>
            ))}
          </ul>
        </div>
        <button
          onClick={onClose}
          className="w-full bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          Close
        </button>
      </div>
    </div>
  );
}
