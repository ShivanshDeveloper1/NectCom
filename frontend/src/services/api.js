import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 60000,
});

export const getProductByIdOrSlug = async (identifier) => {
  const res = await api.get(`/api/products/${identifier}`);
  return res.data;
};

export const getProducts = async (params = {}) => {
  const res = await api.get('/api/products', { params });
  return res.data;
};

// Explicitly send FormData header for image uploads
export const createProduct = async (formData) => {
  const res = await api.post('/api/products', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return res.data;
};

export const updateProduct = async (id, formData) => {
  const res = await api.put(`/api/products/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return res.data;
};

export const deleteProduct = async (id) => {
  const res = await api.delete(`/api/products/${id}`);
  return res.data;
};





export const getVideos = async () => {
  const res = await api.get('/api/videos');
  return res.data;
};

export const createVideo = async (videoData) => {
  const res = await api.post('/api/videos', videoData);
  return res.data;
};

export const deleteVideo = async (id) => {
  const res = await api.delete(`/api/videos/${id}`);
  return res.data;
};







export default api;