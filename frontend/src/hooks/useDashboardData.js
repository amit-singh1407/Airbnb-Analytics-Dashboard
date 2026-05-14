import { useState, useEffect } from 'react';
import { getStats, getRoomTypes, getNeighborhoodPrices, getAvailability, getReviewsAnalysis } from '../services/api';

export const useDashboardData = () => {
    const [stats, setStats] = useState(null);
    const [roomTypes, setRoomTypes] = useState([]);
    const [neighborhoodPrices, setNeighborhoodPrices] = useState([]);
    const [availability, setAvailability] = useState([]);
    const [reviewsAnalysis, setReviewsAnalysis] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAllData = async () => {
            try {
                setLoading(true);
                const [statsData, roomTypesData, neighborhoodData, availabilityData, reviewsData] = await Promise.all([
                    getStats(),
                    getRoomTypes(),
                    getNeighborhoodPrices(),
                    getAvailability(),
                    getReviewsAnalysis()
                ]);

                setStats(statsData);
                setRoomTypes(roomTypesData);
                setNeighborhoodPrices(neighborhoodData);
                setAvailability(availabilityData);
                setReviewsAnalysis(reviewsData);
            } catch (err) {
                console.error("Error fetching dashboard data:", err);
                setError(err.message || 'Failed to fetch data');
            } finally {
                setLoading(false);
            }
        };

        fetchAllData();
    }, []);

    return { stats, roomTypes, neighborhoodPrices, availability, reviewsAnalysis, loading, error };
};
