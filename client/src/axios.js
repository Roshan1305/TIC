import axios from "axios";

const instance = axios.create({
  baseURL: process.env.baseURL || "https://ticsastra.herokuapp.com/",
});
export default instance;
