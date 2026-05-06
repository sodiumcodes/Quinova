import axiosInstance from './axiosInstance';
import { API_ENDPOINTS } from '../constants/api.constants';

export const uploadAvatarApi = async (data) => {
  const response = await axiosInstance.patch(API_ENDPOINTS.USER.UPLOAD_AVATAR, data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

export const updateFullNameApi = async (data) => {
  const response = await axiosInstance.patch(API_ENDPOINTS.USER.UPDATE_FULLNAME, data);
  return response.data;
};

export const updateEmailApi = async (data) => {
  const response = await axiosInstance.patch(API_ENDPOINTS.USER.UPDATE_EMAIL, data);
  return response.data;
};

export const updatePasswordApi = async (data) => {
  const response = await axiosInstance.patch(API_ENDPOINTS.USER.UPDATE_PASSWORD, data);
  return response.data;
};

export const updateBioApi = async (data) => {
  const response = await axiosInstance.patch(API_ENDPOINTS.USER.UPDATE_BIO, data);
  return response.data;
};

export const updateSocialsApi = async (data) => {
  const response = await axiosInstance.patch(API_ENDPOINTS.USER.UPDATE_SOCIALS, data);
  return response.data;
};

export const updateUsernameApi = async (data) => {
  const response = await axiosInstance.patch(API_ENDPOINTS.USER.UPDATE_USERNAME, data);
  return response.data;
};

export const toggleFollowApi = async (id) => {
  const response = await axiosInstance.post(API_ENDPOINTS.USER.TOGGLE_FOLLOW(id));
  return response.data;
};

export const getUserProfileApi = async (username) => {
  const response = await axiosInstance.get(API_ENDPOINTS.USER.GET_PROFILE(username));
  return response.data;
};

export const getFollowStatsApi = async (id) => {
  const response = await axiosInstance.get(API_ENDPOINTS.USER.GET_FOLLOW_STATS(id));
  return response.data;
};

export const getFollowersApi = async (id) => {
  const response = await axiosInstance.get(API_ENDPOINTS.USER.GET_FOLLOWERS(id));
  return response.data;
};

export const getFollowingApi = async (id) => {
  const response = await axiosInstance.get(API_ENDPOINTS.USER.GET_FOLLOWING(id));
  return response.data;
};
