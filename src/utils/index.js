import axios from 'axios';

const AxiosConfig = axios.create({
  baseURL: 'http://localhost:5000/todo',
});

export default AxiosConfig;
