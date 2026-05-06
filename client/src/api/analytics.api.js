import axiosInstance from './axiosInstance';
import { API_ENDPOINTS } from '../constants/api.constants';

export const getUserAnalyticsApi = async () => {
  const response = await axiosInstance.get(API_ENDPOINTS.ANALYTICS.USER);
  return response.data;
};

export const getPostAnalyticsApi = async (id) => {
  const response = await axiosInstance.get(API_ENDPOINTS.ANALYTICS.POST(id));
  return response.data;
};

export const getTopPostsApi = async () => {
  const response = await axiosInstance.get(API_ENDPOINTS.ANALYTICS.TOP_POSTS);
  return response.data;
};

export const getGrowthAnalyticsApi = async () => {
  const response = await axiosInstance.get(API_ENDPOINTS.ANALYTICS.GROWTH);
  return response.data;
};
