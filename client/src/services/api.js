import axios from "axios";

const API = axios.create({
  baseURL: "https://smart-community-management-system.onrender.com/api",
});

export default API;