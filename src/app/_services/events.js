import api from '../_utils/api';

export const fetchEvents = async () => {
  const response = await api.get('/events/');
  return response.data;
};

export const createEvent = async (event) => {
  const response = await api.post('/events/create/', event);
  return response.data;
};

export const fetchEvent = async (id) => {
  const response = await api.get(`/events/${id}/`);
  return response.data;
}

export const updateEvent = async (id, event) => {
  const response = await api.put(`/events/${id}/update/`, event);
  return response.data;
};

export const deleteEvent = async (id) => {
  const response = await api.delete(`/events/${id}/delete/`);
  return response.data;
};

export const inviteUsers = async (id, email) => {
  const response = await api.post(`/events/${id}/invite/`, { "email": email });
  return response.data;
};

export const getInvites = async (id) => {
  const response = await api.get(`/events/${id}/get_invited_users/`);
  return response.data;
}

export const getUserDetail  = async () => {
  const response = await api.get('/user/');
  return response.data;
}
