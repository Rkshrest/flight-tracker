import React from 'react';
import { Plane } from 'lucide-react';

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full glass">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary-600 rounded-xl shadow-lg shadow-primary-500/20">
            <Plane className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight text-gray-900">
            Flight<span className="text-primary-600">Tracker</span>
          </span>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="hidden sm:flex flex-col items-end">
             <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Status</span>
             <span className="text-xs font-bold text-emerald-500 flex items-center gap-1.5">
               <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
               Live
             </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
