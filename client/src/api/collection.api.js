import axiosInstance from './axiosInstance';
import { API_ENDPOINTS } from '../constants/api.constants';

export const createCollectionApi = async (name) => {
  const response = await axiosInstance.post(API_ENDPOINTS.COLLECTION.CREATE(name));
  return response.data;
};

export const getCollectionsApi = async () => {
  const response = await axiosInstance.get(API_ENDPOINTS.COLLECTION.GET_ALL);
  return response.data;
};

export const deleteCollectionApi = async (name) => {
  const response = await axiosInstance.delete(API_ENDPOINTS.COLLECTION.DELETE(name));
  return response.data;
};

export const updateCollectionNameApi = async (id, data) => {
  const response = await axiosInstance.patch(API_ENDPOINTS.COLLECTION.UPDATE_NAME(id), data);
  return response.data;
};

export const saveItemToCollectionApi = async (data) => {
  const response = await axiosInstance.post(API_ENDPOINTS.COLLECTION.ITEM_SAVE, data);
  return response.data;
};

export const getCollectionItemsApi = async (name) => {
  const response = await axiosInstance.get(API_ENDPOINTS.COLLECTION.GET_ITEMS(name));
  return response.data;
};

export const updateItemNoteApi = async (id, data) => {
  const response = await axiosInstance.patch(API_ENDPOINTS.COLLECTION.UPDATE_NOTE(id), data);
  return response.data;
};

export const removeItemFromCollectionApi = async (id) => {
  const response = await axiosInstance.delete(API_ENDPOINTS.COLLECTION.REMOVE_ITEM(id));
  return response.data;
};
