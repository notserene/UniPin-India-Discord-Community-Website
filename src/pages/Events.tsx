import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, ExternalLink } from 'lucide-react';
import { EventCard } from '../components/events/EventCard';

import { Select } from '../components/ui/Select';
import { Button } from '../components/ui/Button';
import { useEvents } from '../hooks/useEvents';

export function Events() {
  const { events, loading } = useEvents();
  const [searchParams, setSearchParams] = useSearchParams();
  const gameFilter = searchParams.get('game') || 'All';
  const statusFilter = searchParams.get('status') || 'Active';
  const [searchQuery, setSearchQuery] = useState('');

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const matchGame = gameFilter === 'All' || event.game === gameFilter || event.type === gameFilter;
      
      let matchStatus = true;
      if (statusFilter !== 'All') {
        if (statusFilter === 'Active') {
          matchStatus = ['LIVE', 'REGISTRATION OPEN'].includes(event.status);
        } else {
          matchStatus = event.status === statusFilter.toUpperCase();
        }
      }

      const matchSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          event.game.toLowerCase().includes(searchQuery.toLowerCase());

      return matchGame && matchStatus && matchSearch;
    });
  }, [gameFilter, statusFilter, searchQuery]);

  const games = ['All', 'BGMI', 'Free Fire', 'FC Mobile', 'Discord', 'Community Event', 'Instagram', 'Other'];
  const statuses = ['All', 'Active', 'Upcoming', 'Completed'];

  const setFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value === 'All' && key !== 'status') {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    setSearchParams(params);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4 leading-tight">Events</h1>
        <p className="text-lg text-gray-400 max-w-2xl leading-relaxed">
          Discover and register for the latest official UniPin India Community Events & tournaments.
        </p>
      </div>

      <div className="sticky top-28 z-30 mb-8 rounded-2xl border border-white/5 bg-[#121826]/80 backdrop-blur-md p-2">
        <div className="flex flex-row flex-wrap items-center gap-2 w-full pb-1 md:pb-0 px-1">
          
          <div className="relative flex-1 min-w-[160px] sm:min-w-[200px]">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search events..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 hover:bg-white/10 border border-transparent hover:border-white/10 rounded-xl pl-10 sm:pl-11 pr-3 sm:pr-4 py-2.5 sm:py-3.5 text-sm sm:text-base text-white placeholder-gray-500 focus:outline-none focus:bg-white/10 transition-all"
            />
          </div>

          <div className="relative min-w-[140px] sm:min-w-[160px]">
            <Select
              value={gameFilter}
              onChange={(value) => setFilter('game', value)}
              options={games.map(g => ({ value: g, label: g === 'All' ? 'All' : g }))}
            />
          </div>

          <div className="relative min-w-[140px] sm:min-w-[160px]">
            <Select
              value={statusFilter}
              onChange={(value) => setFilter('status', value)}
              options={statuses.map(s => ({ value: s, label: s === 'All' ? 'All' : s }))}
            />
          </div>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-24">
          <p className="text-gray-400 text-lg mb-4">Loading events...</p>
        </div>
      ) : filteredEvents.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredEvents.map(event => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      ) : (
        <div className="text-center py-24">
          <p className="text-gray-400 text-lg mb-2">
            {statusFilter === 'Active' && !searchQuery && gameFilter === 'All'
              ? 'No active events right now.'
              : 'No events found matching your criteria.'}
          </p>
          <p className="text-gray-500 mb-8">Join the server to get updates first!</p>
          <div className="flex flex-col items-center gap-6">
            <a href="https://discord.gg/H2QsP7DWKv" target="_blank" rel="noopener noreferrer">
              <Button variant="primary" className="h-12 px-8 font-semibold">
                Join our Discord Server
                <ExternalLink className="w-5 h-5 ml-2" />
              </Button>
            </a>
            <button 
              onClick={() => {
                setSearchParams({ status: 'All' });
                setSearchQuery('');
              }}
              className="text-[#f05a28] hover:text-[#d94b1f] font-medium transition-colors"
            >
              Clear all filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
}