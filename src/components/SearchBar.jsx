import React, { useState, useCallback } from 'react';
import { Search, Loader2 } from 'lucide-react';

const SearchBar = ({ onSearch, isLoading }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  }, [query, onSearch]);

  return (
    <div className="w-full max-w-2xl mx-auto mb-12">
      <form onSubmit={handleSubmit} className="relative group">
        <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400 group-focus-within:text-primary-600 transition-colors" />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Flight number (e.g., 6E 6406)"
          className="block w-full pl-16 pr-36 py-5 bg-white border border-gray-200 rounded-2xl text-lg font-medium placeholder-gray-400 focus:outline-none focus:border-primary-500 transition-all shadow-sm"
          disabled={isLoading}
        />
        <div className="absolute inset-y-2 right-2 flex items-center">
          <button
            type="submit"
            disabled={isLoading || !query.trim()}
            className="flex items-center gap-2 h-full px-8 bg-primary-600 text-white font-bold rounded-xl hover:bg-primary-700 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed transition-all"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              'Track'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
