import axios from "axios";

const AxiosConfig = axios.create({
  baseURL: "https://node-todos1-app.herokuapp.com/todo",
});

export default AxiosConfig;
