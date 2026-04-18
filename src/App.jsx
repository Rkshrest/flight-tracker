import React, { useState, useCallback, useEffect } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import FlightCard from './components/FlightCard';
import FlightDetails from './components/FlightDetails';
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

        <SearchBar onSearch={handleSearch} isLoading={isLoading} />

        <div className="mt-16 space-y-12">
          {isLoading ? (
            <Loader />
          ) : error ? (
            <ErrorMessage message={error} onRetry={() => handleSearch(searchQuery)} />
          ) : flight ? (
            <div className="space-y-8">
              <FlightCard 
                flight={flight} 
                onToggleDetails={() => setShowDetails(!showDetails)} 
              />
              <AnimatePresence>
                {showDetails && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <FlightDetails flight={flight} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-24 text-center opacity-30">
               <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                 <PlaneTakeoff className="w-10 h-10 text-gray-400" />
               </div>
               <p className="text-gray-500 font-black text-xl tracking-tight uppercase">Enter Flight Code</p>
            </div>
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
