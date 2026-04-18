import React from 'react';

const StatusBadge = ({ status, isDark = false }) => {
  const getStatusStyles = () => {
    switch (status?.toLowerCase()) {
      case 'active':
      case 'live':
        return isDark 
          ? 'bg-green-500/20 text-green-400 border-green-500/30' 
          : 'bg-green-50 text-green-600 border-green-100';
      case 'landed':
        return isDark
          ? 'bg-blue-500/20 text-blue-400 border-blue-500/30'
          : 'bg-blue-50 text-blue-600 border-blue-100';
      case 'scheduled':
        return isDark
          ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
          : 'bg-yellow-50 text-yellow-600 border-yellow-100';
      case 'cancelled':
        return isDark
          ? 'bg-red-500/20 text-red-400 border-red-500/30'
          : 'bg-red-50 text-red-600 border-red-100';
      default:
        return isDark
          ? 'bg-gray-500/20 text-gray-400 border-gray-500/30'
          : 'bg-gray-50 text-gray-600 border-gray-100';
    }
  };

  const statusLabel = status?.toLowerCase() === 'active' ? 'Live' : status;

  return (
    <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full border text-[10px] font-black uppercase tracking-widest transition-all duration-500 ${getStatusStyles()}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${status?.toLowerCase() === 'active' ? 'animate-pulse bg-current' : 'bg-current'}`} />
      {statusLabel || 'Unknown'}
    </div>
  );
};

export default StatusBadge;
