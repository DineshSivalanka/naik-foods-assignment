import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
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

export default API;
