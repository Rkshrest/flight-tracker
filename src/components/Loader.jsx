import React from 'react';

const Loader = () => {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 animate-pulse">
      <div className="bg-white rounded-[2rem] p-10 border border-gray-100 shadow-sm space-y-10">
        <div className="flex justify-between items-start">
          <div className="space-y-3">
            <div className="h-6 w-32 bg-gray-100 rounded-lg"></div>
            <div className="h-4 w-48 bg-gray-100 rounded-lg"></div>
          </div>
          <div className="h-8 w-24 bg-gray-100 rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          <div className="space-y-4">
            <div className="h-10 w-32 bg-gray-100 rounded-xl"></div>
            <div className="h-4 w-40 bg-gray-50 rounded"></div>
          </div>
          <div className="h-1 w-full bg-gray-50"></div>
          <div className="space-y-4 text-right flex flex-col items-end">
            <div className="h-10 w-32 bg-gray-100 rounded-xl"></div>
            <div className="h-4 w-40 bg-gray-50 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
