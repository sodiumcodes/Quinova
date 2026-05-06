import axiosInstance from './axiosInstance';
import { API_ENDPOINTS } from '../constants/api.constants';

export const createPostApi = async (data) => {
  const response = await axiosInstance.post(API_ENDPOINTS.POST.CREATE, data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

export const toggleFeatureApi = async (id) => {
  const response = await axiosInstance.post(API_ENDPOINTS.POST.TOGGLE_FEATURE(id));
  return response.data;
};

export const getSinglePostApi = async (id) => {
  const response = await axiosInstance.get(API_ENDPOINTS.POST.GET_SINGLE(id));
  return response.data;
};

export const getAllUserPostsApi = async (username) => {
  const response = await axiosInstance.get(API_ENDPOINTS.POST.GET_ALL_USER_POSTS(username));
  return response.data;
};

export const editImageApi = async (id, data) => {
  const response = await axiosInstance.patch(API_ENDPOINTS.POST.EDIT_IMAGE(id), data);
  return response.data;
};

export const editCaptionApi = async (id, data) => {
  const response = await axiosInstance.patch(API_ENDPOINTS.POST.EDIT_CAPTION(id), data);
  return response.data;
};

export const editTagApi = async (id, data) => {
  const response = await axiosInstance.patch(API_ENDPOINTS.POST.EDIT_TAG(id), data);
  return response.data;
};

export const deletePostApi = async (id) => {
  const response = await axiosInstance.delete(API_ENDPOINTS.POST.DELETE(id));
  return response.data;
};
