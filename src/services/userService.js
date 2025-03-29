/* eslint-disable no-useless-catch */
import api from "./api";

export const getUsers = async (page = 1) => {
  try {
    const response = await api.get(`/users?page=${page}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUser = async (id) => {
  try {
    const response = await api.get(`/users/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateUser = async (id, userData) => {
  try {
    const response = await api.put(`/users/${id}`, userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteUser = async (id) => {
  try {
    const response = await api.delete(`/users/${id}`);
    return response.status === 204 || response.status === 200;
  } catch (error) {
    throw error;
  }
};
