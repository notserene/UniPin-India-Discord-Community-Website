import { Link } from 'react-router-dom';
import { ArrowRight, Gift } from 'lucide-react';
import { Button } from '../components/ui/Button';

import { EventCard } from '../components/events/EventCard';
import { GiveawayCard } from '../components/giveaways/GiveawayCard';
import { useEvents } from '../hooks/useEvents';
import { useGiveaways } from '../hooks/useGiveaways';

export function Home() {
  const { events } = useEvents();
  const { giveaways } = useGiveaways();
  
  const featuredEvents = events.slice(0, 3);
  const activeGiveaways = giveaways.slice(0, 3);

  return (
    <div className="flex flex-col gap-24 pb-24">
      
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl">
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-6 leading-[1.15]">
              Events worth<br/> 
              <span className="text-[#f05a28]">
                showing up for.
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-xl leading-relaxed">
              Explore UniPin India events, tournaments and giveaways — all in one place.
            </p>
            
            <div className="flex flex-row gap-2 sm:gap-4 w-full sm:w-auto items-center">
              <Link to="/giveaways" className="flex-1 sm:flex-none focus-ring rounded-lg block">
                <Button className="w-full flex justify-center items-center gap-1.5 sm:gap-2 bg-[#f05a28] hover:bg-[#d94b1f] text-white transition-all duration-300 hover:-translate-y-0.5 font-medium h-10 sm:h-14 px-2 sm:px-8 group">
                  <Gift className="w-3 h-3 sm:w-5 sm:h-5 flex-shrink-0 transition-transform duration-300 group-hover:scale-110" />
                  <span className="whitespace-nowrap text-[11px] sm:text-base font-medium">Explore Giveaways</span>
                </Button>
              </Link>
              <Link to="/events" className="flex-1 sm:flex-none focus-ring rounded-lg block">
                <Button className="w-full flex justify-center items-center group border border-[#f05a28]/30 hover:border-[#b33f19] text-[#f05a28] hover:text-white bg-[#f05a28]/15 hover:bg-[#b33f19] shadow-[0_0_10px_rgba(240,90,40,0.1)] hover:shadow-[0_0_20px_rgba(179,63,25,0.4)] transition-all duration-300 hover:-translate-y-0.5 h-10 sm:h-14 px-2 sm:px-8">
                  <span className="whitespace-nowrap text-[11px] sm:text-base font-medium">Explore Events</span>
                  <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-1.5 sm:ml-2 transition-transform group-hover:translate-x-1 flex-shrink-0" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex items-end justify-between mb-8 border-b border-white/5 pb-4">
          <div>
            <h1 className="text-xl md:text-2xl font-semibold text-white tracking-tight">Featured Events</h1>
          </div>
          <Link to="/events" className="hidden sm:inline-flex items-center text-sm font-medium text-gray-400 hover:text-white transition-colors focus-ring rounded-sm">
            View all events <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
        
        <div className="mt-8 sm:hidden">
          <Link to="/events" className="focus-ring rounded-lg block">
            <Button variant="glass" fullWidth>View all events</Button>
          </Link>
        </div>
      </section>

      
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex items-end justify-between mb-8 border-b border-white/5 pb-4">
          <div>
            <h1 className="text-xl md:text-2xl font-semibold text-white tracking-tight">Active Giveaways</h1>
          </div>
          <Link to="/giveaways" className="hidden sm:inline-flex items-center text-sm font-medium text-gray-400 hover:text-white transition-colors focus-ring rounded-sm">
            View all giveaways <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeGiveaways.map((giveaway) => (
            <GiveawayCard key={giveaway.id} giveaway={giveaway} />
          ))}
        </div>

        <div className="mt-8 sm:hidden">
          <Link to="/giveaways" className="focus-ring rounded-lg block">
            <Button variant="glass" fullWidth>View all giveaways</Button>
          </Link>
        </div>
      </section>

    </div>
  );
}