import axios from "axios";

const api = axios.create({
  baseURL: "http://10.0.0.11:3000/users", 
  timeout: 5000,
});

export default api;
