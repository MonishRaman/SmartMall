import api from "./api";

const eventService = {
  list: (search) => api.get("/events", { params: search ? { search } : {} }),
  get: (id) => api.get(`/events/${id}`),
  create: (payload) => api.post("/events", payload),
  update: (id, payload) => api.put(`/events/${id}`, payload),
  remove: (id) => api.delete(`/events/${id}`),
};

export default eventService;
