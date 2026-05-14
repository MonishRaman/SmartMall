import api from "./api";

export const productService = {
	list: (shopId) => api.get("/products", { params: shopId ? { shopId } : {} }),
	get: (id) => api.get(`/products/${id}`),
	create: (payload) => api.post("/products", payload),
	update: (id, payload) => api.put(`/products/${id}`, payload),
	remove: (id) => api.delete(`/products/${id}`),
};

export default productService;
