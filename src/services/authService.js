/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-catch */
import api from "./api";

export const login = async (credentials) => {
  try {
    const response = await api.post("/login", credentials);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const validateToken = async () => {
  try {
    // In a real application, you might have an endpoint to validate the token
    // Since Reqres doesn't have one, we'll just make a simple request to check if the token works
    const response = await api.get("/users?page=1");
    return response.status === 200;
  } catch (error) {
    return false;
  }
};
