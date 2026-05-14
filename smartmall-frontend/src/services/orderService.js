import api from "./api";

export const orderService = {
	list: (userId) => api.get("/orders", { params: userId ? { userId } : {} }),
	get: (id) => api.get(`/orders/${id}`),
	create: (payload) => api.post("/orders", payload),
	updateStatus: (id, status) => api.patch(`/orders/${id}/status`, null, { params: { status } }),
};

export default orderService;
