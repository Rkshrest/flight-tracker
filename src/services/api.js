import axios from 'axios';

const API_KEY = import.meta.env.VITE_AVIATIONSTACK_API_KEY;
const BASE_URL = 'http://api.aviationstack.com/v1';

const apiClient = axios.create({
  baseURL: BASE_URL,
  params: {
    access_key: API_KEY,
  },
});

/**
 * Fetch flight data by flight number
 */
export const getFlightData = async (flightNumber) => {
  const cleanNumber = flightNumber.replace(/\s/g, '').toUpperCase();
  const today = new Date().toISOString().split('T')[0];
  
  try {
    const response = await apiClient.get('/flights', {
      params: { flight_iata: cleanNumber },
    });

    let flights = response.data?.data || [];

    if (flights.length === 0) {
      const icaoResponse = await apiClient.get('/flights', {
        params: { flight_icao: cleanNumber },
      });
      flights = icaoResponse.data?.data || [];
    }

    if (flights.length > 0) {
      // Find the most relevant flight:
      // 1. Current 'active' flight
      // 2. Flight for today
      // 3. Flight closest to NOW
      
      const now = new Date();
      
      return flights.sort((a, b) => {
        // Priority 1: Status
        const statusPriority = { 'active': 0, 'scheduled': 1, 'landed': 2, 'cancelled': 3 };
        const aStatus = statusPriority[a.flight_status] ?? 4;
        const bStatus = statusPriority[b.flight_status] ?? 4;
        
        if (aStatus !== bStatus) return aStatus - bStatus;

        // Priority 2: Date proximity to NOW
        const aTime = a.departure.estimated || a.departure.scheduled;
        const bTime = b.departure.estimated || b.departure.scheduled;
        
        if (aTime && bTime) {
          const aDiff = Math.abs(new Date(aTime) - now);
          const bDiff = Math.abs(new Date(bTime) - now);
          return aDiff - bDiff;
        }

        return new Date(b.flight_date) - new Date(a.flight_date);
      });
    }
    
    return [];
  } catch (error) {
    console.error('Error fetching flight data:', error);
    if (error.response) {
      throw new Error(error.response.data.error?.message || 'Failed to fetch flight data');
    }
    throw error;
  }
};

export default apiClient;
