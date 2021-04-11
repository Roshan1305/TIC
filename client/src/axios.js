import axios from "axios";

const instance = axios.create({
  baseURL: process.env.baseURL || "https://ticsastra.herokuapp.com:3001",
});
export default instance;
