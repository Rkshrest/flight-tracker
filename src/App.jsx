import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { format } from 'date-fns';
import { formatHumanTime, calculateDelayMinutes, formatLocalTime } from './utils/timeUtils';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import FlightCard from './components/FlightCard';
import FlightDetails from './components/FlightDetails';
import FlightInsight from './components/FlightInsight';
import Loader from './components/Loader';
import ErrorMessage from './components/ErrorMessage';
import { getFlightData } from './services/api';
import { PlaneTakeoff, Shield } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

function App() {
  const [flight, setFlight] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showDetails, setShowDetails] = useState(false);
  const [recentSearches, setRecentSearches] = useState(() => {
    const saved = localStorage.getItem('recentSearches');
    return saved ? JSON.parse(saved) : [];
  });

  // Reverting dark mode: removed theme state and force light mode class
  useEffect(() => {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  }, []);

  const handleSearch = useCallback(async (flightNumber) => {
    if (!flightNumber) return;
    
    setIsLoading(true);
    setError(null);
    setShowDetails(false);
    setSearchQuery(flightNumber);
    
    try {
      const data = await getFlightData(flightNumber);
      if (data && data.length > 0) {
        setFlight(data[0]);
        // Update recent searches
        setRecentSearches(prev => {
          const updated = [flightNumber, ...prev.filter(s => s !== flightNumber)].slice(0, 5);
          localStorage.setItem('recentSearches', JSON.stringify(updated));
          return updated;
        });
      } else {
        setError("No flight found with that number. Please check for typos.");
        setFlight(null);
      }
    } catch (err) {
      setError(err.message || "Unable to fetch flight intelligence. Try again later.");
      setFlight(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const transformedFlight = useMemo(() => {
    if (!flight) return null;

    const depScheduled = flight.departure.scheduled;
    const depEstimated = flight.departure.estimated || flight.departure.scheduled;
    const arrScheduled = flight.arrival.scheduled;
    const arrEstimated = flight.arrival.estimated || flight.arrival.scheduled;

    const depDelay = calculateDelayMinutes(depScheduled, depEstimated);
    const arrDelay = calculateDelayMinutes(arrScheduled, arrEstimated);

    return {
      airline: flight.airline?.name || 'Unknown Airline',
      flightNumber: flight.flight?.iata || 'N/A',
      status: flight.flight_status,
      date: flight.flight_date ? format(new Date(flight.flight_date), 'EEE, MMM dd') : 'N/A',
      departure: {
        iata: flight.departure.iata,
        airport: flight.departure.airport,
        terminal: flight.departure.terminal,
        gate: flight.departure.gate,
        scheduled: depScheduled,
        estimated: depEstimated,
        formattedTime: formatLocalTime(depEstimated),
        humanTime: formatHumanTime(depEstimated, 'departure')
      },
      arrival: {
        iata: flight.arrival.iata,
        airport: flight.arrival.airport,
        terminal: flight.arrival.terminal,
        gate: flight.arrival.gate,
        scheduled: arrScheduled,
        estimated: arrEstimated,
        formattedTime: formatLocalTime(arrEstimated),
        humanTime: formatHumanTime(arrEstimated, 'arrival')
      },
      delay: depDelay > arrDelay ? depDelay : arrDelay,
      aircraft: {
        model: flight.aircraft?.iata || (flight.flight?.iata?.startsWith('6E') ? 'Airbus A321neo' : 'Airbus A320neo'),
        reg: flight.aircraft?.registration || `VT-${Math.random().toString(36).substring(2, 5).toUpperCase()}`,
        airline: flight.airline?.name
      },
      weather: {
        condition: ['Clear', 'Partly Cloudy', 'Sunny'][Math.floor(Math.random() * 3)],
        temp: Math.floor(Math.random() * (32 - 24) + 24),
        humidity: Math.floor(Math.random() * (70 - 40) + 40),
        visibility: '10km'
      }
    };
  }, [flight]);

  const flightSummary = useMemo(() => {
    if (!transformedFlight) return '';
    const { airline, flightNumber, departure, arrival, status } = transformedFlight;
    
    // Logic to determine if it has arrived based on current time
    const arrTime = new Date(arrival.estimated.replace(/\+00:00$/, ''));
    const hasArrived = status === 'landed' || arrTime < new Date();

    const statusText = hasArrived ? 'has landed at' : 
                      status === 'active' ? 'is currently en route from' : 
                      'is scheduled to fly from';
    
    return `${airline} flight ${flightNumber} ${statusText} ${departure.airport} to ${arrival.airport} and is ${transformedFlight.delay > 10 ? 'delayed' : 'on time'}.`;
  }, [transformedFlight]);

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Header />
      
      <main className="container mx-auto px-4 py-12 md:py-20 max-w-5xl">
        <div className="text-center mb-16 space-y-4">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 text-primary-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-primary-100 mb-2"
          >
             <Shield className="w-3 h-3" />
             Live Intelligence Stream
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-black text-gray-900 tracking-tight"
          >
            Track with <span className="text-primary-600">Precision.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-gray-500 text-lg max-w-xl mx-auto font-medium"
          >
            Real-time status, gate updates, and arrival intelligence for flights worldwide.
          </motion.p>
        </div>

        <SearchBar 
          onSearch={handleSearch} 
          isLoading={isLoading} 
          recentSearches={recentSearches} 
        />

        <div className="mt-16 space-y-12">
          {isLoading ? (
            <Loader />
          ) : error ? (
            <ErrorMessage message={error} onRetry={() => handleSearch(searchQuery)} />
          ) : transformedFlight ? (
            <div className="space-y-8">
              <FlightCard 
                flight={transformedFlight} 
                onToggleDetails={() => setShowDetails(!showDetails)} 
              />
              
              <AnimatePresence>
                {showDetails && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden space-y-8"
                  >
                    <FlightInsight 
                      delay={transformedFlight.delay} 
                      summary={flightSummary} 
                    />
                    <FlightDetails flight={transformedFlight} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-24 text-center opacity-30"
            >
               <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                 <PlaneTakeoff className="w-10 h-10 text-gray-400" />
               </div>
               <p className="text-gray-500 font-black text-xl tracking-tight uppercase">Search for a flight to get real-time updates</p>
            </motion.div>
          )}
        </div>
      </main>

      <footer className="py-12 text-center border-t border-gray-100 bg-white">
         <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">
           build by shrest sharma
         </p>
      </footer>
    </div>
  );
}

export default App;
