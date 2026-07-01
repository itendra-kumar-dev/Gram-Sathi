import api from "./api";

// ===========================
// Add Equipment
// ===========================

export const addEquipment = async (formData) => {
  const response = await api.post(
    "/equipments",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

// ===========================
// Get All Equipments
// ===========================

export const getEquipments = async (filters = {}) => {
  const response = await api.get("/equipments", {
    params: filters,
  });

  return response.data;
};

// ===========================
// Get Equipment By Id
// ===========================

export const getEquipmentById = async (id) => {
  const response = await api.get(`/equipments/${id}`);

  return response.data;
};

// ===========================
// Update Equipment
// ===========================

export const updateEquipment = async (id, formData) => {
  const response = await api.put(
    `/equipments/${id}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

// ===========================
// Delete Equipment
// ===========================

export const deleteEquipment = async (id) => {
  const response = await api.delete(`/equipments/${id}`);

  return response.data;
};

// ===========================
// My Listings
// ===========================

export const getMyListings = async () => {
  const response = await api.get("/equipments/my-listings");

  return response.data;
};

// ===========================
// Toggle Availability
// ===========================

export const toggleAvailability = async (id) => {
  const response = await api.put(`/equipments/toggle/${id}`);

  return response.data;
};