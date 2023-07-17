import axios from "axios";
// Create a new instance of Axios
const serverInstance = axios.create({
  baseURL: 'http://localhost:8000' 
});

export default serverInstance;