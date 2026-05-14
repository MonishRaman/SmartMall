import api from "./api";

export const analyticsService = {
  overview: () => api.get("/analytics/overview"),
  dashboard: () => api.get("/dashboard"),
};

export default analyticsService;