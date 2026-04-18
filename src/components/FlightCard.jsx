import React from 'react';
import { Plane, ArrowRight, Clock, MapPin } from 'lucide-react';
import StatusBadge from './StatusBadge';
import FlightTimeline from './FlightTimeline';
import { motion } from 'framer-motion';

import { Plane, ArrowRight, Clock, MapPin, Share2 } from 'lucide-react';

const FlightCard = ({ flight, onToggleDetails }) => {
  if (!flight) return null;

  const handleShare = () => {
    const summary = `Tracking ${flight.airline} flight ${flight.flightNumber}. Currently ${flight.status === 'active' ? 'en route' : flight.status}. Arriving at ${flight.arrival.iata} @ ${flight.arrival.formattedTime}.`;
    if (navigator.share) {
      navigator.share({
        title: 'Flight Intelligence',
        text: summary,
        url: window.location.href,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(summary);
      alert('Flight intelligence copied to clipboard!');
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-4xl mx-auto bg-white rounded-[2.5rem] p-10 md:p-16 shadow-[0_40px_80px_rgba(0,0,0,0.03)] border border-gray-100/50 relative overflow-hidden"
    >
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-50/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-50/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl pointer-events-none" />
      
      <div className="flex flex-col gap-14 relative z-10">
        {/* Header Section */}
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-gradient-to-br from-gray-50 to-white rounded-2xl flex items-center justify-center border border-gray-100 shadow-sm transform -rotate-3 hover:rotate-0 transition-transform duration-500">
              <span className="text-3xl font-black text-primary-600 tracking-tighter">{flight.airline?.charAt(0)}</span>
            </div>
            <div>
              <h2 className="text-4xl font-black text-gray-900 tracking-tighter leading-none mb-3">{flight.airline}</h2>
              <div className="flex items-center gap-3">
                <span className="px-2 py-0.5 bg-gray-900 text-white text-[9px] font-black uppercase tracking-widest rounded-md">{flight.flightNumber}</span>
                <span className="w-1.5 h-1.5 bg-gray-200 rounded-full" />
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{flight.date}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={handleShare}
              className="p-3 bg-gray-50 hover:bg-gray-100 text-gray-400 hover:text-primary-600 rounded-xl transition-all"
            >
              <Share2 className="w-5 h-5" />
            </button>
            <StatusBadge status={flight.status} />
          </div>
        </div>

        {/* Visual Route Map (SVG) */}
        <div className="w-full h-32 relative flex items-center justify-center">
           <svg className="w-full h-full" viewBox="0 0 400 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <motion.path 
                d="M 50 80 Q 200 10 350 80" 
                stroke="#F1F5F9" 
                strokeWidth="2" 
                strokeDasharray="4 4" 
              />
              <motion.path 
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, ease: "easeInOut" }}
                d="M 50 80 Q 200 10 350 80" 
                stroke="url(#gradient)" 
                strokeWidth="3" 
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="gradient" x1="50" y1="80" x2="350" y2="80" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#3B82F6" />
                  <stop offset="1" stopColor="#60A5FA" />
                </linearGradient>
              </defs>
           </svg>
           <div className="absolute inset-0 flex justify-between items-end px-4 pb-2">
              <div className="flex flex-col items-center">
                 <div className="w-2 h-2 bg-primary-600 rounded-full" />
                 <span className="text-[10px] font-black text-gray-300 mt-2">{flight.departure.iata}</span>
              </div>
              <div className="flex flex-col items-center">
                 <div className="w-2 h-2 bg-gray-200 rounded-full" />
                 <span className="text-[10px] font-black text-gray-300 mt-2">{flight.arrival.iata}</span>
              </div>
           </div>
        </div>

        {/* Route Visualization */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 items-start">
          <div className="group">
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4 block">Origin</span>
            <div className="text-7xl font-black text-gray-900 tracking-tighter group-hover:text-primary-600 transition-colors duration-500">{flight.departure?.iata}</div>
            <div className="text-xs font-bold text-gray-400 line-clamp-1 mt-2 mb-4">{flight.departure?.airport}</div>
            <div className="space-y-1 pt-4 border-t border-gray-50">
              <div className="text-3xl font-black text-gray-900">{flight.departure?.formattedTime}</div>
              <div className="text-[10px] font-black text-primary-600/60 uppercase tracking-widest">{flight.departure?.humanTime}</div>
            </div>
          </div>

          <div className="h-full flex flex-col items-center justify-center pt-10">
             <div className="w-full h-[1px] bg-gray-100 relative">
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-4 border border-gray-50 rounded-full shadow-xl transform hover:scale-125 transition-transform duration-500 group">
                 <Plane className="w-6 h-6 text-primary-600 rotate-90 group-hover:translate-y-1 transition-transform" />
               </div>
             </div>
             <span className="text-[10px] font-black text-gray-300 uppercase tracking-[0.5em] mt-8">Non-Stop</span>
          </div>

          <div className="group text-right">
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4 block text-right">Destination</span>
            <div className="text-7xl font-black text-gray-900 tracking-tighter group-hover:text-primary-600 transition-colors duration-500">{flight.arrival?.iata}</div>
            <div className="text-xs font-bold text-gray-400 line-clamp-1 mt-2 mb-4">{flight.arrival?.airport}</div>
            <div className="space-y-1 pt-4 border-t border-gray-50">
              <div className="text-3xl font-black text-gray-900">{flight.arrival?.formattedTime}</div>
              <div className="text-[10px] font-black text-primary-600/60 uppercase tracking-widest">{flight.arrival?.humanTime}</div>
            </div>
          </div>
        </div>

        {/* Enhanced Timeline */}
        <FlightTimeline 
          status={flight.status} 
          departureTime={flight.departure?.estimated}
          arrivalTime={flight.arrival?.estimated}
          departureIata={flight.departure?.iata} 
          arrivalIata={flight.arrival?.iata} 
        />

        {/* Information Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 border-t border-gray-50">
           <div className="space-y-2">
              <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Terminal</span>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center">
                  <MapPin className="w-3.5 h-3.5 text-gray-400" />
                </div>
                <span className="text-lg font-black text-gray-900">{flight.departure?.terminal || '---'}</span>
              </div>
           </div>
           
           <div className="space-y-2">
              <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Gate</span>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center">
                  <Clock className="w-3.5 h-3.5 text-gray-400" />
                </div>
                <span className="text-lg font-black text-gray-900">{flight.departure?.gate || '---'}</span>
              </div>
           </div>

           <div className="col-span-2 flex justify-end items-end gap-4">
              <button 
                onClick={onToggleDetails}
                className="group flex items-center gap-4 px-10 py-5 bg-gray-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.25em] hover:bg-primary-600 transition-all shadow-[0_20px_40px_rgba(0,0,0,0.1)] hover:shadow-primary-200"
              >
                Detailed Intelligence
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </button>
           </div>
        </div>
      </div>
    </motion.div>
  );
};

export default FlightCard;
