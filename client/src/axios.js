import axios from "axios";

const instance = axios.create({
  baseURL: process.env.baseURL || "http://localhost:3001",
});
export default instance;