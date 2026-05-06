import axiosInstance from './axiosInstance';
import { API_ENDPOINTS } from '../constants/api.constants';

export const getPortfolioApi = async (username) => {
  const response = await axiosInstance.get(API_ENDPOINTS.PORTFOLIO.GET(username));
  return response.data;
};
