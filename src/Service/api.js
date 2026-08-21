import axios from "axios";

const api = axios.create({
  baseURL: "https://fitness-class-backend.onrender.com/api",
});

export default api;


//completed