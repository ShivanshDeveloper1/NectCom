import axios from 'axios';


const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 60000,
 
});

// GET Single Product by ID or Slug
export const getProductByIdOrSlug = async (identifier) => {
  const res = await api.get(`/api/products/${identifier}`);
  return res.data;
};




// GET All Products
export const getProducts = async (params = {}) => {
  const res = await api.get('/api/products', { params });
  return res.data;
};

// POST Create Product
// export const createProduct = async (formData) => {
//   const res = await api.post('/api/products', formData, {
//     headers: { 'Content-Type': 'multipart/form-data' },
//   });
//   return res.data;
// };

export const createProduct = async (formData) => {
  const res = await api.post('/api/products', formData);
  return res.data;
};


export const updateProduct = async (id, formData) => {
  const res = await api.put(`/api/products/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return res.data;
};

// DELETE Product
export const deleteProduct = async (id) => {
  const res = await api.delete(`/api/products/${id}`);
  return res.data;
};




export default api;