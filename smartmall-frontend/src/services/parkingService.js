import api from "./api";

export const parkingService = {
  listSlots: (occupied) => api.get("/parking/slots", { params: occupied === undefined ? {} : { occupied } }),
  createSlot: (payload) => api.post("/parking/slots", payload),
  setOccupied: (id, occupied) => api.patch(`/parking/slots/${id}/occupied`, null, { params: { occupied } }),
};

export default parkingService;