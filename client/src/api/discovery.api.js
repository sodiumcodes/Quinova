import axiosInstance from './axiosInstance';
import { API_ENDPOINTS } from '../constants/api.constants';

export const getDiscoveryPostsApi = async (params) => {
  const response = await axiosInstance.get(API_ENDPOINTS.DISCOVERY.POSTS, { params });
  return response.data;
};

export const searchUsersApi = async (params) => {
  const response = await axiosInstance.get(API_ENDPOINTS.DISCOVERY.USERS, { params });
  return response.data;
};
