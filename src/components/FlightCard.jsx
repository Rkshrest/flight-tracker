import React from 'react';
import { Plane, ArrowRight, Clock, MapPin } from 'lucide-react';
import StatusBadge from './StatusBadge';
import FlightTimeline from './FlightTimeline';
import { motion } from 'framer-motion';

const FlightCard = ({ flight, onToggleDetails }) => {
  if (!flight) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full max-w-4xl mx-auto card-premium p-8 md:p-12"
    >
      <div className="flex flex-col gap-10">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center border border-gray-100 shadow-sm">
              <span className="text-xl font-black text-primary-600">{flight.airline?.charAt(0)}</span>
            </div>
            <div>
              <h2 className="text-2xl font-black text-gray-900 tracking-tight leading-none mb-1">{flight.airline}</h2>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">{flight.flightNumber} • {flight.date}</p>
            </div>
          </div>
          <StatusBadge status={flight.status} />
        </div>

        {/* Path */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          <div className="space-y-1">
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Origin</span>
            <div className="text-5xl font-black text-gray-900 tracking-tighter">{flight.departure?.iata}</div>
            <div className="text-xs font-bold text-gray-500 line-clamp-1">{flight.departure?.airport}</div>
            <div className="flex flex-col mt-2">
              <div className="text-xl font-black text-primary-600">{flight.departure?.formattedTime}</div>
              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{flight.departure?.humanTime}</div>
            </div>
          </div>

          <div className="flex flex-col items-center gap-2 px-6">
             <div className="w-full h-px bg-gray-100 relative">
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-2 border border-gray-100 rounded-full shadow-sm">
                 <Plane className="w-5 h-5 text-primary-600 rotate-90" />
               </div>
             </div>
             <span className="text-[10px] font-black text-gray-300 uppercase tracking-[0.3em] mt-2">Non-Stop Intelligence</span>
          </div>

          <div className="space-y-1 text-right">
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Destination</span>
            <div className="text-5xl font-black text-gray-900 tracking-tighter">{flight.arrival?.iata}</div>
            <div className="text-xs font-bold text-gray-500 line-clamp-1">{flight.arrival?.airport}</div>
            <div className="flex flex-col mt-2">
              <div className="text-xl font-black text-primary-600">{flight.arrival?.formattedTime}</div>
              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{flight.arrival?.humanTime}</div>
            </div>
          </div>
        </div>

        {/* Visual Timeline */}
        <FlightTimeline 
          status={flight.status} 
          departure={flight.departure?.iata} 
          arrival={flight.arrival?.iata} 
        />

        {/* Quick Footer */}
        <div className="flex flex-wrap items-center justify-between gap-6 pt-8 border-t border-gray-50">
           <div className="flex items-center gap-8">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gray-50 rounded-lg">
                  <MapPin className="w-3 h-3 text-gray-400" />
                </div>
                <div>
                  <span className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-0.5">Terminal</span>
                  <span className="font-black text-gray-900 text-sm">{flight.departure?.terminal || '---'}</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gray-50 rounded-lg">
                  <Clock className="w-3 h-3 text-gray-400" />
                </div>
                <div>
                  <span className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-0.5">Gate</span>
                  <span className="font-black text-gray-900 text-sm">{flight.departure?.gate || '---'}</span>
                </div>
              </div>
           </div>
           
           <button 
             onClick={onToggleDetails}
             className="group flex items-center gap-2 px-6 py-3 bg-primary-50 text-primary-600 rounded-xl text-sm font-black uppercase tracking-widest hover:bg-primary-600 hover:text-white transition-all shadow-sm"
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
