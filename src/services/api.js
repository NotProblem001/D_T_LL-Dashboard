import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('jwt_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('jwt_token');
        }
        return Promise.reject(error);
    }
);

export const loginEmpresa = async (email, password) => {
    const response = await api.post('/auth/token', { name: email, password });
    localStorage.setItem('jwt_token', response.data);
    return response.data;
};

export const obtenerResumen = async () => {
    const response = await api.get('/api/v1/empresa/resumen');
    return response.data;
};

export const obtenerReportesFacturacion = async () => {
    const response = await api.get('/api/v1/empresa/reportes-facturacion');
    return response.data;
};

export const obtenerPasajeros = async () => {
    const response = await api.get('/api/v1/empresa/pasajeros');
    return response.data;
};

export default api;
