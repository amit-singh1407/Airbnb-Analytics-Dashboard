import axios from 'axios';

// Use environment variable for API URL in production, fallback to localhost for development
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_URL,
    timeout: 10000,
});

export const getStats = async () => {
    const response = await api.get('/stats');
    return response.data;
};

export const getRoomTypes = async () => {
    const response = await api.get('/room-types');
    return response.data;
};

export const getNeighborhoodPrices = async () => {
    const response = await api.get('/neighborhood-prices');
    return response.data;
};

export const getAvailability = async () => {
    const response = await api.get('/availability');
    return response.data;
};

export const getReviewsAnalysis = async () => {
    const response = await api.get('/reviews-analysis');
    return response.data;
};

export const getListings = async (params) => {
    const response = await api.get('/listings', { params });
    return response.data;
};

export default api;
