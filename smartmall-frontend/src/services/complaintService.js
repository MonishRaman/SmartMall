import api from "./api";

const complaintService = {
  list: (userId) => api.get("/complaints", { params: userId ? { userId } : {} }),
  get: (id) => api.get(`/complaints/${id}`),
  create: (payload) => api.post("/complaints", payload),
  updateStatus: (id, status) => api.patch(`/complaints/${id}/status`, null, { params: { status } }),
};

export default complaintService;
