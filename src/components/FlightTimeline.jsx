import React, { useMemo } from 'react';
import { Plane } from 'lucide-react';

const FlightTimeline = ({ status, departure, arrival }) => {
  const progress = useMemo(() => {
    switch (status) {
      case 'active':
        return 50;
      case 'landed':
        return 100;
      case 'scheduled':
      default:
        return 0;
    }
  }, [status]);

  return (
    <div className="w-full py-8">
      <div className="relative">
        {/* Background Line */}
        <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-100 -translate-y-1/2 rounded-full" />
        
        {/* Progress Line */}
        <div 
          className="absolute top-1/2 left-0 h-1 bg-primary-500 -translate-y-1/2 rounded-full transition-all duration-1000 ease-out" 
          style={{ width: `${progress}%` }}
        />

        {/* Departure Point */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 flex flex-col items-center">
          <div className={`w-4 h-4 rounded-full border-4 border-white shadow-sm ${progress >= 0 ? 'bg-primary-600' : 'bg-gray-300'}`} />
          <span className="mt-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">{departure}</span>
        </div>

        {/* Plane Icon */}
        <div 
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 transition-all duration-1000 ease-out z-10"
          style={{ left: `${progress}%` }}
        >
          <div className="bg-white p-2 rounded-full shadow-lg border border-gray-100">
            <Plane className={`w-4 h-4 text-primary-600 ${status === 'active' ? 'animate-pulse' : ''}`} />
          </div>
        </div>

        {/* Arrival Point */}
        <div className="absolute top-1/2 right-0 -translate-y-1/2 flex flex-col items-center">
          <div className={`w-4 h-4 rounded-full border-4 border-white shadow-sm ${progress === 100 ? 'bg-primary-600' : 'bg-gray-300'}`} />
          <span className="mt-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">{arrival}</span>
        </div>
      </div>
      
      <div className="mt-12 flex justify-between text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">
        <span>Departure</span>
        <span className={status === 'active' ? 'text-primary-600 animate-pulse' : ''}>
          {status === 'active' ? 'En Route' : status === 'scheduled' ? 'Scheduled' : 'Arrived'}
        </span>
        <span>Arrival</span>
      </div>
    </div>
  );
};

export default FlightTimeline;
