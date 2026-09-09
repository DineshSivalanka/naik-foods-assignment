import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
});

export const getProducts = async (params = {}) => {
  const response = await API.get("/products", {
    params,
  });

  return response.data;
};

export const getProductById = async (id) => {
  const response = await API.get(`/products/${id}`);

  return response.data;
};

export const getRecommendations = async (id) => {
  const response = await API.get(
    `/products/recommendations/${id}`
  );

  return response.data;
};

export const getWishlist = async (clientId) => {
  const response = await API.get(`/wishlist/${clientId}`);
  return response.data;
};

export const addToWishlist = async (clientId, productId) => {
  const response = await API.post(`/wishlist/${clientId}/add`, { productId });
  return response.data;
};

export const removeFromWishlist = async (clientId, productId) => {
  const response = await API.delete(`/wishlist/${clientId}/remove/${productId}`);
  return response.data;
};

export const createOrder = async (orderData) => {
  const response = await API.post("/orders", orderData);
  return response.data;
};

export const getOrders = async (clientId) => {
  const response = await API.get(`/orders/${clientId}`);
  return response.data;
};

export const getOrderById = async (orderId) => {
  const response = await API.get(`/orders/detail/${orderId}`);
  return response.data;
};

export default API;
