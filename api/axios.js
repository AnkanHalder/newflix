import axios from "axios";
// Create a new instance of Axios
const serverInstance = axios.create({
  baseURL: 'https://newflixbackend.onrender.com' 
});

export default serverInstance;