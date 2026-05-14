import { 
    MOCK_STATS, 
    MOCK_ROOM_TYPES, 
    MOCK_NEIGHBORHOOD_PRICES, 
    MOCK_AVAILABILITY, 
    MOCK_REVIEWS_ANALYSIS, 
    MOCK_LISTINGS 
} from './mockData';

// Use environment variable for API URL in production, fallback to localhost for development
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_URL,
    timeout: 10000,
});

export const getStats = async () => {
    try {
        const response = await api.get('/stats');
        return response.data;
    } catch (error) {
        console.warn('API Error, using mock stats:', error.message);
        return MOCK_STATS;
    }
};

export const getRoomTypes = async () => {
    try {
        const response = await api.get('/room-types');
        return response.data;
    } catch (error) {
        console.warn('API Error, using mock room types:', error.message);
        return MOCK_ROOM_TYPES;
    }
};

export const getNeighborhoodPrices = async () => {
    try {
        const response = await api.get('/neighborhood-prices');
        return response.data;
    } catch (error) {
        console.warn('API Error, using mock neighborhood prices:', error.message);
        return MOCK_NEIGHBORHOOD_PRICES;
    }
};

export const getAvailability = async () => {
    try {
        const response = await api.get('/availability');
        return response.data;
    } catch (error) {
        console.warn('API Error, using mock availability:', error.message);
        return MOCK_AVAILABILITY;
    }
};

export const getReviewsAnalysis = async () => {
    try {
        const response = await api.get('/reviews-analysis');
        return response.data;
    } catch (error) {
        console.warn('API Error, using mock reviews analysis:', error.message);
        return MOCK_REVIEWS_ANALYSIS;
    }
};

export const getListings = async (params) => {
    try {
        const response = await api.get('/listings', { params });
        return response.data;
    } catch (error) {
        console.warn('API Error, using mock listings:', error.message);
        return MOCK_LISTINGS;
    }
};

export default api;
