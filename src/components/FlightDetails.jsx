import React from 'react';
import { Info, Clock, ShieldCheck, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const FlightDetails = ({ flight }) => {
  if (!flight) return null;

  const data = [
    { label: 'Departure Delay', value: flight.departure?.delay ? `${flight.departure.delay} min` : 'None', icon: <Clock className="w-4 h-4" /> },
    { label: 'Baggage Claim', value: flight.arrival?.baggage || 'Not Assigned', icon: <ShieldCheck className="w-4 h-4" /> },
    { label: 'Aircraft Reg', value: flight.aircraft?.registration || '---', icon: <Zap className="w-4 h-4" /> },
    {
      label: 'Estimated Arrival',
      value: flight.arrival?.estimated ? (() => {
        const timePart = flight.arrival.estimated.split('T')[1]?.substring(0, 5);
        if (!timePart) return 'On Schedule';
        const [hours, minutes] = timePart.split(':');
        const h = parseInt(hours, 10);
        const ampm = h >= 12 ? 'PM' : 'AM';
        const h12 = h % 12 || 12;
        return `${h12}:${minutes} ${ampm}`;
      })() : 'On Schedule',
      icon: <Info className="w-4 h-4" />
    }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
      {data.map((item, idx) => (
        <motion.div 
          key={idx}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col gap-3"
        >
          <div className="text-primary-500 bg-primary-50 w-fit p-2 rounded-lg">
            {item.icon}
          </div>
          <div>
            <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">{item.label}</span>
            <span className="text-lg font-bold text-gray-900">{item.value}</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default FlightDetails;
