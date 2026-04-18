import React, { useMemo } from 'react';
import { twMerge } from 'tailwind-merge';

const StatusBadge = ({ status }) => {
  const config = useMemo(() => {
    const s = status?.toLowerCase();
    
    // Green -> On Time, Landed, Active
    if (s === 'landed' || s === 'active') {
      return {
        label: s === 'active' ? 'Live' : 'Landed',
        classes: 'bg-green-50 text-green-600 border-green-100',
        dot: 'bg-green-500'
      };
    }
    
    // Yellow -> Delayed, Scheduled (if we want to differentiate)
    if (s === 'delayed') {
      return {
        label: 'Delayed',
        classes: 'bg-yellow-50 text-yellow-600 border-yellow-100',
        dot: 'bg-yellow-500'
      };
    }

    if (s === 'scheduled') {
      return {
        label: 'Scheduled',
        classes: 'bg-primary-50 text-primary-600 border-primary-100',
        dot: 'bg-primary-500'
      };
    }
    
    // Red -> Cancelled
    if (s === 'cancelled' || s === 'diverted') {
      return {
        label: s,
        classes: 'bg-red-50 text-red-600 border-red-100',
        dot: 'bg-red-500'
      };
    }

    return {
      label: status || 'Unknown',
      classes: 'bg-gray-50 text-gray-500 border-gray-100',
      dot: 'bg-gray-400'
    };
  }, [status]);

  return (
    <div className={twMerge(
      'inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border shadow-sm',
      config.classes
    )}>
      <span className={twMerge('w-1.5 h-1.5 rounded-full', config.dot, status === 'active' && 'animate-pulse')} />
      {config.label}
    </div>
  );
};

export default StatusBadge;
