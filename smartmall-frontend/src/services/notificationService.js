import api from "./api";

export const notificationService = {
  list: (userId) => api.get("/notifications", { params: userId ? { userId } : {} }),
  create: (payload) => api.post("/notifications", payload),
  markRead: (id) => api.patch(`/notifications/${id}/read`),
};

export default notificationService;