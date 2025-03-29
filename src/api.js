import axios from "axios";

const API_URL = "http://localhost:5000";

export const getItems = () => axios.get(`${API_URL}/items`);
export const addItem = (data) =>
  axios.post(`${API_URL}/add`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
export const deleteItem = (category, id) =>
  axios.delete(`${API_URL}/delete/${category}/${id}`);
