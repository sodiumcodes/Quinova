import axiosInstance from './axiosInstance';
import { API_ENDPOINTS } from '../constants/api.constants';

export const likePostApi = async (id) => {
  const response = await axiosInstance.post(API_ENDPOINTS.ENGAGEMENT.LIKE_POST(id));
  return response.data;
};

export const savePostApi = async (id) => {
  const response = await axiosInstance.post(API_ENDPOINTS.ENGAGEMENT.SAVE_POST(id));
  return response.data;
};

export const viewPostApi = async (id) => {
  const response = await axiosInstance.post(API_ENDPOINTS.ENGAGEMENT.VIEW_POST(id));
  return response.data;
};

export const createCommentApi = async (id, data) => {
  const response = await axiosInstance.post(API_ENDPOINTS.ENGAGEMENT.COMMENT(id), data);
  return response.data;
};

export const likeCommentApi = async (id) => {
  const response = await axiosInstance.post(API_ENDPOINTS.ENGAGEMENT.LIKE_COMMENT(id));
  return response.data;
};

export const replyCommentApi = async (id, parentId, data) => {
  const response = await axiosInstance.post(API_ENDPOINTS.ENGAGEMENT.REPLY_COMMENT(id, parentId), data);
  return response.data;
};

export const getCommentsApi = async (id) => {
  const response = await axiosInstance.get(API_ENDPOINTS.ENGAGEMENT.GET_COMMENTS(id));
  return response.data;
};

export const getRepliesApi = async (id) => {
  const response = await axiosInstance.get(API_ENDPOINTS.ENGAGEMENT.GET_REPLIES(id));
  return response.data;
};

export const editCommentApi = async (id, data) => {
  const response = await axiosInstance.patch(API_ENDPOINTS.ENGAGEMENT.EDIT_COMMENT(id), data);
  return response.data;
};

export const removeCommentApi = async (idC, idP) => {
  const response = await axiosInstance.delete(API_ENDPOINTS.ENGAGEMENT.REMOVE_COMMENT(idC, idP));
  return response.data;
};
