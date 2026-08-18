import axios from "axios";

const api = axios.create({
  baseURL: "https://fitness-class-backend.onrender.com",
});

export default api;


