import axios from 'axios'

const axiousInstance = axios.create({
    baseURL:import.meta.env.MODE === "development" ? "http://localhost:5000/api/v1" :"/api/v1",
    withCredentials:true,
})


export default axiousInstance;