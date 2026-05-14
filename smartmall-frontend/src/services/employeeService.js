import api from "./api";

const employeeService = {
  list: (shopId) => api.get("/employees", { params: shopId ? { shopId } : {} }),
  get: (id) => api.get(`/employees/${id}`),
  create: (payload) => api.post("/employees", payload),
  update: (id, payload) => api.put(`/employees/${id}`, payload),
  remove: (id) => api.delete(`/employees/${id}`),
};

export default employeeService;
