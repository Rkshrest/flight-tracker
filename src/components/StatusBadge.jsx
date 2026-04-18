import React, { useMemo } from 'react';
import { twMerge } from 'tailwind-merge';

const StatusBadge = ({ status }) => {
  const config = useMemo(() => {
    const s = status?.toLowerCase();
    if (s === 'landed' || s === 'active') {
      return {
        label: s === 'active' ? 'Live' : 'Landed',
        classes: 'bg-emerald-50 text-emerald-600 border-emerald-100',
        dot: 'bg-emerald-500'
      };
    }
    if (s === 'scheduled') {
      return {
        label: 'Scheduled',
        classes: 'bg-blue-50 text-blue-600 border-blue-100',
        dot: 'bg-blue-500'
      };
    }
    if (s === 'delayed') {
      return {
        label: 'Delayed',
        classes: 'bg-orange-50 text-orange-600 border-orange-100',
        dot: 'bg-orange-500'
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
      'inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border',
      config.classes
    )}>
      <span className={twMerge('w-1.5 h-1.5 rounded-full animate-pulse', config.dot)} />
      {config.label}
    </div>
  );
};

export default StatusBadge;
