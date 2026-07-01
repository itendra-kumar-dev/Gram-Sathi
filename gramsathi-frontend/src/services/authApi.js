import api from "./api";

// ==========================
// Register User
// ==========================
export const registerUser = async (userData) => {
  try {
    const response = await api.post("/auth/register", userData);
    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        success: false,
        message: "Registration Failed",
      }
    );
  }
};

// ==========================
// Login User
// ==========================
export const loginUser = async (userData) => {
  try {
    const response = await api.post("/auth/login", userData);
    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        success: false,
        message: "Login Failed",
      }
    );
  }
};

// ==========================
// Get Logged-in User Profile
// ==========================
export const getProfile = async () => {
  try {
    const response = await api.get("/auth/profile");
    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        success: false,
        message: "Unable to fetch profile",
      }
    );
  }
};