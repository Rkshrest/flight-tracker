import React, { useMemo, useEffect, useState } from 'react';
import { Plane } from 'lucide-react';

const FlightTimeline = ({ status, departureTime, arrivalTime, departureIata, arrivalIata }) => {
  const [now, setNow] = useState(new Date());

  // Update 'now' every minute to keep progress accurate
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const progress = useMemo(() => {
    if (status === 'landed') return 100;
    if (status === 'scheduled') return 0;
    
    try {
      const dep = new Date(departureTime.replace(/\+00:00$/, ''));
      const arr = new Date(arrivalTime.replace(/\+00:00$/, ''));
      
      if (isNaN(dep.getTime()) || isNaN(arr.getTime())) return 50;
      
      const total = arr - dep;
      const current = now - dep;
      
      let p = (current / total) * 100;
      return Math.min(Math.max(p, 0), 100);
    } catch (e) {
      return 50;
    }
  }, [status, departureTime, arrivalTime, now]);

  const isArrived = progress >= 100 || status === 'landed';

  return (
    <div className="w-full py-10">
      <div className="relative h-1.5 bg-gray-100 rounded-full overflow-visible">
        {/* Progress Line */}
        <div 
          className="absolute top-0 left-0 h-full bg-primary-500 rounded-full transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(37,99,235,0.3)]" 
          style={{ width: `${progress}%` }}
        />

        {/* Departure Point */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 flex flex-col items-center">
          <div className={`w-3 h-3 rounded-full border-2 border-white shadow-sm ${progress > 0 ? 'bg-primary-600' : 'bg-gray-300'}`} />
          <span className="mt-4 text-[9px] font-black text-gray-400 uppercase tracking-widest">{departureIata}</span>
        </div>

        {/* Plane Icon */}
        <div 
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 transition-all duration-1000 ease-out z-10"
          style={{ left: `${progress}%` }}
        >
          <div className="bg-white p-2.5 rounded-full shadow-xl border border-gray-50 transform hover:scale-110 transition-transform">
            <Plane className={`w-3.5 h-3.5 text-primary-600 ${status === 'active' && !isArrived ? 'animate-pulse' : ''}`} style={{ transform: 'rotate(90deg)' }} />
          </div>
        </div>

        {/* Arrival Point */}
        <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 flex flex-col items-center">
          <div className={`w-3 h-3 rounded-full border-2 border-white shadow-sm ${isArrived ? 'bg-primary-600' : 'bg-gray-300'}`} />
          <span className="mt-4 text-[9px] font-black text-gray-400 uppercase tracking-widest">{arrivalIata}</span>
        </div>
      </div>
      
      <div className="mt-12 flex justify-between items-center text-[10px] font-black uppercase tracking-[0.2em]">
        <span className="text-gray-400">Departure</span>
        <div className="flex flex-col items-center gap-1">
          <span className={status === 'active' && !isArrived ? 'text-primary-600' : 'text-gray-500'}>
            {status === 'active' && !isArrived ? 'En Route' : isArrived ? 'Arrived' : 'Scheduled'}
          </span>
          {status === 'active' && !isArrived && (
             <div className="flex gap-1">
                <span className="w-1 h-1 bg-primary-600 rounded-full animate-bounce [animation-delay:-0.3s]" />
                <span className="w-1 h-1 bg-primary-600 rounded-full animate-bounce [animation-delay:-0.15s]" />
                <span className="w-1 h-1 bg-primary-600 rounded-full animate-bounce" />
             </div>
          )}
        </div>
        <span className="text-gray-400">Arrival</span>
      </div>
    </div>
  );
};

export default FlightTimeline;
