import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000', // Cambia esto según tu configuración 
});

export default api;
