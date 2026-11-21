import { Link } from 'react-router-dom';
import { GlassCard } from '../ui/GlassCard';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import type { Event } from '../../data/types';

interface EventCardProps {
  event: Event;
}

export function EventCard({ event }: EventCardProps) {
  return (
    <GlassCard hoverEffect className="flex flex-col sm:flex-row h-full group overflow-hidden">
      <div className="relative aspect-square w-full sm:w-[45%] md:w-[40%] lg:w-[45%] flex-shrink-0 overflow-hidden bg-black/20">
          <div className="absolute inset-0 bg-gradient-to-t from-[#121826]/80 to-transparent z-10" />
          <img 
            src={event.image || '/events/event-placeholder.svg'} 
            alt={event.title} 
            className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute top-3 left-3 z-20 flex gap-2">
            <Badge status={event.status} />
          </div>
        </div>
      
      <div className="p-5 sm:p-6 flex flex-col flex-1 justify-center">
        <div className="flex items-center gap-1.5 mb-2 text-xs font-semibold tracking-wider text-[#f05a28] uppercase">
            <span>{event.game}</span>
            <span className="w-1 h-1 rounded-full bg-white/20"></span>
            <span>{event.type}</span>
          </div>
          
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 leading-snug">
            {event.title}
          </h3>
          
          <p className="text-base text-gray-400 mb-5 line-clamp-2 leading-relaxed flex-1">
            {event.description}
          </p>

        <Link to={`/events/${event.id}`} className="mt-auto block" tabIndex={-1}>
          <Button variant="primary" className="w-full font-semibold h-10 sm:h-11 text-sm">
            View Details
          </Button>
        </Link>
      </div>
    </GlassCard>
  );
}