import axiosInstance from './axiosInstance';
import { API_ENDPOINTS } from '../constants/api.constants';

export const loginApi = async (credentials) => {
  const response = await axiosInstance.post(API_ENDPOINTS.AUTH.LOGIN, credentials);
  return response.data;
};

export const registerApi = async (userData) => {
  const response = await axiosInstance.post(API_ENDPOINTS.AUTH.REGISTER, userData);
  return response.data;
};

export const logoutApi = async () => {
  const response = await axiosInstance.post(API_ENDPOINTS.AUTH.LOGOUT);
  return response.data;
};

export const getMeApi = async () => {
  const response = await axiosInstance.get(API_ENDPOINTS.AUTH.ME);
  return response.data;
};
