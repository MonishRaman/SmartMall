import api from "./api";

const offerService = {
  list: (shopId) => api.get("/offers", { params: shopId ? { shopId } : {} }),
  get: (id) => api.get(`/offers/${id}`),
  create: (payload) => api.post("/offers", payload),
  update: (id, payload) => api.put(`/offers/${id}`, payload),
  remove: (id) => api.delete(`/offers/${id}`),
};

export default offerService;
