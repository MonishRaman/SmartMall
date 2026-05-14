import api from "./api";

export const shopService = {
	list: () => api.get("/shops"),
	get: (id) => api.get(`/shops/${id}`),
	create: (payload) => api.post("/shops", payload),
	update: (id, payload) => api.put(`/shops/${id}`, payload),
	remove: (id) => api.delete(`/shops/${id}`),
};

export default shopService;
