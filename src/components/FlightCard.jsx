import React, { useMemo } from 'react';
import { Plane, Calendar, Clock, MapPin, ArrowRight } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import StatusBadge from './StatusBadge';
import { motion } from 'framer-motion';

const FlightCard = ({ flight, onToggleDetails }) => {
  const formattedTimes = useMemo(() => {
    try {
      // Extract local time from string to avoid timezone shifts
      const formatLocalTime = (isoString) => {
        if (!isoString) return '--:--';
        // aviationstack returns "2026-04-18T22:00:00+00:00"
        // where 22:00 is already the local time at the airport.
        // We take the HH:MM part directly.
        const timePart = isoString.split('T')[1]?.substring(0, 5);
        if (!timePart) return '--:--';
        
        const [hours, minutes] = timePart.split(':');
        const h = parseInt(hours, 10);
        const ampm = h >= 12 ? 'PM' : 'AM';
        const h12 = h % 12 || 12;
        return `${h12}:${minutes} ${ampm}`;
      };

      return {
        departure: formatLocalTime(flight.departure.estimated || flight.departure.scheduled),
        arrival: formatLocalTime(flight.arrival.estimated || flight.arrival.scheduled),
        date: flight.flight_date ? format(parseISO(flight.flight_date), 'EEE, MMM dd') : 'N/A'
      };
    } catch (e) {
      return { departure: '--:--', arrival: '--:--', date: 'N/A' };
    }
  }, [flight]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-4xl mx-auto card-premium p-8 md:p-12"
    >
      <div className="flex flex-col gap-10">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center border border-gray-100">
              <span className="text-xl font-bold text-primary-600">{flight.airline?.name?.charAt(0)}</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 leading-none mb-1">{flight.airline?.name}</h2>
              <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">{flight.flight?.iata} • {formattedTimes.date}</p>
            </div>
          </div>
          <StatusBadge status={flight.flight_status} />
        </div>

        {/* Path */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          <div className="space-y-1">
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Origin</span>
            <div className="text-5xl font-black text-gray-900 tracking-tighter">{flight.departure?.iata}</div>
            <div className="text-xs font-bold text-gray-500 line-clamp-1">{flight.departure?.airport}</div>
            <div className="text-xl font-bold text-primary-600 mt-2">{formattedTimes.departure}</div>
          </div>

          <div className="flex flex-col items-center gap-2 px-6">
             <div className="w-full h-px bg-gray-100 relative">
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-2 border border-gray-100 rounded-full">
                 <Plane className="w-5 h-5 text-primary-600 rotate-90" />
               </div>
             </div>
             <span className="text-[10px] font-bold text-gray-300 uppercase tracking-[0.2em] mt-2">Non-Stop</span>
          </div>

          <div className="space-y-1 text-right">
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Destination</span>
            <div className="text-5xl font-black text-gray-900 tracking-tighter">{flight.arrival?.iata}</div>
            <div className="text-xs font-bold text-gray-500 line-clamp-1">{flight.arrival?.airport}</div>
            <div className="text-xl font-bold text-primary-600 mt-2">{formattedTimes.arrival}</div>
          </div>
        </div>

        {/* Quick Footer */}
        <div className="flex flex-wrap items-center justify-between gap-6 pt-8 border-t border-gray-50">
           <div className="flex items-center gap-8">
              <div>
                <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Terminal</span>
                <span className="font-bold text-gray-900">{flight.departure?.terminal || '---'}</span>
              </div>
              <div>
                <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Gate</span>
                <span className="font-bold text-gray-900">{flight.departure?.gate || '---'}</span>
              </div>
           </div>
           
           <button 
             onClick={onToggleDetails}
             className="flex items-center gap-2 text-sm font-bold text-primary-600 hover:gap-3 transition-all"
           >
             Detailed Intelligence
             <ArrowRight className="w-4 h-4" />
           </button>
        </div>
      </div>
    </motion.div>
  );
};

export default FlightCard;
