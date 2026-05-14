import api from "./api";

export const cartService = {
	list: (userId) => api.get("/carts", { params: userId ? { userId } : {} }),
	get: (id) => api.get(`/carts/${id}`),
	create: (payload) => api.post("/carts", payload),
	addItem: ({ userId, productId, quantity }) => api.post("/carts/items", { userId, productId, quantity }),
	updateItem: (itemId, quantity) => api.patch(`/carts/items/${itemId}`, null, { params: { quantity } }),
	removeItem: (itemId) => api.delete(`/carts/items/${itemId}`),
	clearCart: (userId) => api.delete(`/carts/user/${userId}`),
	remove: (id) => api.delete(`/carts/${id}`),
};

export default cartService;