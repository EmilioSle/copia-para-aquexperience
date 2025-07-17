import React, { useState, useRef, useEffect } from 'react';
import { Search, MapPin, Calendar, Users } from 'lucide-react';
import { SearchFilters } from '../../../types';

interface SearchBarProps {
  onSearch?: (filters: SearchFilters) => void;
  autoFocus?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, autoFocus = false }) => {
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [participants, setParticipants] = useState('1');
  const [isExpanded, setIsExpanded] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsExpanded(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = () => {
    const filters: SearchFilters = {
      location: location || undefined,
      date: date ? new Date(date) : undefined,
    };

    if (onSearch) {
      onSearch(filters);
    } else {
      // Default search behavior
      const searchParams = new URLSearchParams();
      if (query) searchParams.set('q', query);
      if (location) searchParams.set('location', location);
      if (date) searchParams.set('date', date);
      if (participants !== '1') searchParams.set('participants', participants);
      
      window.location.href = `/search?${searchParams.toString()}`;
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div ref={searchRef} className="relative">
      {/* Simple Search Bar */}
      <div 
        className={`
          flex items-center bg-gray-50 rounded-full border border-gray-200 
          transition-all duration-200 hover:shadow-md focus-within:shadow-md
          ${isExpanded ? 'shadow-lg' : ''}
        `}
      >
        <div className="flex-1 flex items-center px-4 py-2">
          <Search className="h-5 w-5 text-gray-400 mr-3" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Buscar experiencias, equipos, instructores..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsExpanded(true)}
            onKeyPress={handleKeyPress}
            className="flex-1 bg-transparent border-none outline-none text-gray-700 placeholder-gray-500"
          />
        </div>
        
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors duration-200 mr-1"
          aria-label="Search"
        >
          <Search className="h-5 w-5" />
        </button>
      </div>

      {/* Expanded Search Options */}
      {isExpanded && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 p-4 z-50">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Ubicación
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="¿Dónde?"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Fecha
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Participants */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Participantes
              </label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <select
                  value={participants}
                  onChange={(e) => setParticipants(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                    <option key={num} value={num}>
                      {num} {num === 1 ? 'persona' : 'personas'}
                    </option>
                  ))}
                  <option value="9+">9+ personas</option>
                </select>
              </div>
            </div>
          </div>

          {/* Quick Filters */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-sm font-medium text-gray-700 mb-2">Búsquedas populares:</p>
            <div className="flex flex-wrap gap-2">
              {[
                'Surf para principiantes',
                'Buceo en arrecife',
                'Kayak familiar',
                'Pesca deportiva',
                'Paddleboard',
              ].map((tag) => (
                <button
                  key={tag}
                  onClick={() => {
                    setQuery(tag);
                    handleSearch();
                  }}
                  className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors duration-200"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;