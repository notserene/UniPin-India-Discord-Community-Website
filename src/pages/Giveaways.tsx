import { useState, useMemo } from 'react';
import { Search, ExternalLink } from 'lucide-react';
import { GiveawayCard } from '../components/giveaways/GiveawayCard';
import { Select } from '../components/ui/Select';
import { Button } from '../components/ui/Button';
import { useGiveaways } from '../hooks/useGiveaways';

export function Giveaways() {
  const { giveaways, loading } = useGiveaways();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('Active');

  const filteredGiveaways = useMemo(() => {
    return giveaways.filter(giveaway => {

      let matchStatus = true;
      if (statusFilter !== 'All') {
        if (statusFilter === 'Active') {
          matchStatus = giveaway.status !== 'COMPLETED';
        } else {
          matchStatus = giveaway.status === statusFilter.toUpperCase();
        }
      }

      const matchSearch = giveaway.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          giveaway.prize.toLowerCase().includes(searchQuery.toLowerCase());

      return matchStatus && matchSearch;
    });
  }, [giveaways, searchQuery, statusFilter]);

  const statuses = ['All', 'Active', 'Completed'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4 leading-tight">Giveaways</h1>
        <p className="text-lg text-gray-400 max-w-2xl leading-relaxed">
          Participate in official UniPin India giveaways to win UniPin Credits, UC, diamonds, gift cards, and more.
        </p>
      </div>

      <div className="sticky top-28 z-30 mb-8 rounded-2xl border border-white/5 bg-[#121826]/80 backdrop-blur-md p-2">
        <div className="flex flex-row flex-wrap items-center gap-2 w-full pb-1 md:pb-0 px-1">
          <div className="relative flex-1 min-w-[160px] sm:min-w-[200px]">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search giveaways..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 hover:bg-white/10 border border-transparent hover:border-white/10 rounded-xl pl-10 sm:pl-11 pr-3 sm:pr-4 py-2.5 sm:py-3.5 text-sm sm:text-base text-white placeholder-gray-500 focus:outline-none focus:bg-white/10 transition-all"
            />
          </div>

          <div className="relative min-w-[140px] sm:min-w-[160px]">
            <Select
              value={statusFilter}
              onChange={(value) => setStatusFilter(value)}
              options={statuses.map(s => ({ value: s, label: s === 'All' ? 'All' : s }))}
            />
          </div>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-24 bg-[#121826]/30 rounded-2xl border border-white/5">
          <p className="text-gray-400 text-lg mb-4">Loading giveaways...</p>
        </div>
      ) : filteredGiveaways.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredGiveaways.map(giveaway => (
            <GiveawayCard key={giveaway.id} giveaway={giveaway} />
          ))}
        </div>
      ) : (
        <div className="text-center py-24 bg-[#121826]/30 rounded-2xl border border-white/5">
          <p className="text-gray-400 text-lg mb-2">
            {statusFilter === 'Active' && !searchQuery
              ? 'No active giveaways right now.'
              : 'No giveaways found matching your criteria.'}
          </p>
          <p className="text-gray-500 mb-8">Join the server to get updates first!</p>
          <div className="flex flex-col items-center gap-6">
            <a href="https://discord.gg/H2QsP7DWKv" target="_blank" rel="noopener noreferrer">
              <Button variant="primary" className="h-12 px-8 font-semibold">
                Join our Discord Server
                <ExternalLink className="w-5 h-5 ml-2" />
              </Button>
            </a>
            {(searchQuery || statusFilter !== 'All') && (
              <button 
                onClick={() => {
                  setSearchQuery('');
                  setStatusFilter('All');
                }}
                className="text-[#f05a28] hover:text-[#d94b1f] font-medium transition-colors"
              >
                Clear all filters
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}