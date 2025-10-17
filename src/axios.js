import axios from "axios";

const instance = axios.create({
  baseURL: 'https://68878fa0071f195ca981451f.mockapi.io',
  headers: {'Content-Type': 'application/json'}
});
export default instance;
