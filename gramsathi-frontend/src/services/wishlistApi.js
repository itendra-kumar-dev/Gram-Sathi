import api from "./api";

export const getWishlist = async () => (await api.get("/wishlist")).data;
export const addToWishlist = async (equipmentId) =>
  (await api.post("/wishlist", { equipmentId })).data;
export const removeFromWishlist = async (equipmentId) =>
  (await api.delete(`/wishlist/${equipmentId}`)).data;