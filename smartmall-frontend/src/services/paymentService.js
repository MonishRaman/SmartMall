import api from "./api";

export const paymentService = {
	list: () => api.get("/payments"),
	get: (id) => api.get(`/payments/${id}`),
	byOrder: (orderId) => api.get(`/payments/order/${orderId}`),
	create: (payload) => api.post("/payments", payload),
	updateStatus: (id, status) => api.patch(`/payments/${id}/status`, null, { params: { status } }),
};

export default paymentService;
