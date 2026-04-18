import React from 'react';
import { Plane, ArrowRight, Clock, MapPin } from 'lucide-react';
import StatusBadge from './StatusBadge';
import FlightTimeline from './FlightTimeline';
import { motion } from 'framer-motion';

const FlightCard = ({ flight, onToggleDetails }) => {
  if (!flight) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      className="w-full max-w-4xl mx-auto bg-white rounded-[2.5rem] p-8 md:p-14 shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-gray-50 relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary-50/30 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none" />
      
      <div className="flex flex-col gap-12 relative z-10">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 bg-gradient-to-br from-gray-50 to-white rounded-2xl flex items-center justify-center border border-gray-100 shadow-sm">
              <span className="text-2xl font-black text-primary-600">{flight.airline?.charAt(0)}</span>
            </div>
            <div>
              <h2 className="text-3xl font-black text-gray-900 tracking-tight leading-none mb-2">{flight.airline}</h2>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">{flight.flightNumber}</span>
                <span className="w-1 h-1 bg-gray-200 rounded-full" />
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">{flight.date}</span>
              </div>
            </div>
          </div>
          <StatusBadge status={flight.status} />
        </div>

        {/* Path */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
          <div className="space-y-2">
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Origin</span>
            <div className="text-6xl font-black text-gray-900 tracking-tighter">{flight.departure?.iata}</div>
            <div className="text-xs font-bold text-gray-400 line-clamp-1">{flight.departure?.airport}</div>
            <div className="flex flex-col pt-2">
              <div className="text-2xl font-black text-primary-600">{flight.departure?.formattedTime}</div>
              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">{flight.departure?.humanTime}</div>
            </div>
          </div>

          <div className="flex flex-col items-center gap-3">
             <div className="w-full h-px bg-gray-100 relative">
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-3 border border-gray-50 rounded-full shadow-lg">
                 <Plane className="w-5 h-5 text-primary-600 rotate-90" />
               </div>
             </div>
             <span className="text-[10px] font-black text-gray-300 uppercase tracking-[0.4em] mt-3">Non-Stop</span>
          </div>

          <div className="space-y-2 text-right">
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Destination</span>
            <div className="text-6xl font-black text-gray-900 tracking-tighter">{flight.arrival?.iata}</div>
            <div className="text-xs font-bold text-gray-400 line-clamp-1">{flight.arrival?.airport}</div>
            <div className="flex flex-col pt-2">
              <div className="text-2xl font-black text-primary-600">{flight.arrival?.formattedTime}</div>
              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">{flight.arrival?.humanTime}</div>
            </div>
          </div>
        </div>

        {/* Visual Timeline */}
        <FlightTimeline 
          status={flight.status} 
          departureTime={flight.departure?.estimated}
          arrivalTime={flight.arrival?.estimated}
          departureIata={flight.departure?.iata} 
          arrivalIata={flight.arrival?.iata} 
        />

        {/* Quick Footer */}
        <div className="flex flex-wrap items-center justify-between gap-8 pt-10 border-t border-gray-50">
           <div className="flex items-center gap-10">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gray-50 rounded-xl">
                  <MapPin className="w-4 h-4 text-gray-400" />
                </div>
                <div>
                  <span className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Terminal</span>
                  <span className="font-black text-gray-900">{flight.departure?.terminal || '---'}</span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gray-50 rounded-xl">
                  <Clock className="w-4 h-4 text-gray-400" />
                </div>
                <div>
                  <span className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Gate</span>
                  <span className="font-black text-gray-900">{flight.departure?.gate || '---'}</span>
                </div>
              </div>
           </div>
           
           <button 
             onClick={onToggleDetails}
             className="group flex items-center gap-3 px-8 py-4 bg-gray-900 text-white rounded-2xl text-xs font-black uppercase tracking-[0.2em] hover:bg-primary-600 transition-all shadow-xl hover:shadow-primary-200"
           >
             Detailed Intelligence
             <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
           </button>
        </div>
      </div>
    </motion.div>
  );
};

export default FlightCard;
