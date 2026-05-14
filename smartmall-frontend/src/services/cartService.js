import api from "./api";

export const cartService = {
	list: (userId) => api.get("/carts", { params: userId ? { userId } : {} }),
	get: (id) => api.get(`/carts/${id}`),
	create: (payload) => api.post("/carts", payload),
	remove: (id) => api.delete(`/carts/${id}`),
};

export default cartService;