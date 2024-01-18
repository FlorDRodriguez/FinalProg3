import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:4000/api',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    }
})//permite decirle a axios cual es el dom basico

export default instance;