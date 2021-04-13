import axios from "axios";

const instance = axios.create({
  baseURL: "https://ticsastra.herokuapp.com/api",
});
export default instance;
