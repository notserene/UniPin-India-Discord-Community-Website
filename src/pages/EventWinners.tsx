import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Trophy, Calendar } from 'lucide-react';
import { useEvents } from '../hooks/useEvents';
import { GlassCard } from '../components/ui/GlassCard';

export function EventWinners() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { events, loading } = useEvents();
  const event = events.find(e => e.id === id);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-32 text-center">
        <h1 className="text-3xl font-bold text-white mb-4">Loading winners...</h1>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-32 text-center">
        <h1 className="text-3xl font-bold text-white mb-4">Event not found</h1>
        <Link to="/events" className="text-[#f05a28] hover:underline">Back to Events</Link>
      </div>
    );
  }

  const hasWinners = (event.winners && event.winners.length > 0) || (event.winnerGroups && event.winnerGroups.length > 0);

  return (
    <div className="pb-24 pt-32">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <button onClick={() => navigate(-1)} className="inline-flex items-center text-gray-400 hover:text-white transition-colors mb-8 font-medium">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to {event.title}
        </button>

        <div className="mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight mb-4 flex items-center gap-3">
            <Trophy className="w-8 h-8 sm:w-10 sm:h-10 text-[#eab308]" />
            Winners
          </h1>
          <p className="text-lg text-gray-400 leading-relaxed">
            The champions of <span className="text-white font-semibold">{event.title}</span>.
          </p>
        </div>

        {!hasWinners ? (
          <div className="bg-[#121826]/40 backdrop-blur-md rounded-2xl p-8 border border-white/5 text-center">
            <p className="text-gray-400 text-lg">Winners have not been announced for this event yet.</p>
          </div>
        ) : (
          <div className="space-y-8">
            {event.winnerGroups && event.winnerGroups.length > 0 ? (
              <div className="space-y-8">
                {event.winnerGroups.map((group, gIndex) => (
                  <div key={gIndex} className="bg-[#121826]/30 rounded-2xl p-6 md:p-8 border border-white/5 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
                    <h3 className="text-2xl font-bold text-[#f05a28] mb-8 flex items-center gap-3 border-b border-white/10 pb-4">
                      <Calendar className="w-6 h-6" />
                      {group.date}
                    </h3>
                    <div className="space-y-8">
                      {group.categories.map((category, cIndex) => (
                        <div key={cIndex}>
                          <h4 className="text-sm font-bold text-gray-300 uppercase tracking-wider mb-4 px-2">
                            {category.name}
                          </h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {category.winners.map(winner => (
                              <GlassCard key={winner.id} className="p-5 border-[#eab308]/20 bg-gradient-to-br from-[#eab308]/5 to-transparent">
                                <div className="font-bold text-white text-xl mb-1">{winner.name}</div>
                                {winner.team && <div className="text-xs text-gray-400 mb-3">{winner.team}</div>}
                                <div className="flex justify-between items-center text-xs border-t border-white/5 pt-3 mt-3">
                                  <span className="text-[#eab308] font-bold tracking-wide uppercase">{winner.placement}</span>
                                  {winner.prize && <span className="text-gray-300 font-medium">{winner.prize}</span>}
                                </div>
                              </GlassCard>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {event.winners?.map(winner => (
                  <GlassCard key={winner.id} className="p-6 border-[#eab308]/30 bg-gradient-to-br from-[#eab308]/10 to-transparent">
                    <div className="font-bold text-white text-2xl mb-1">{winner.name}</div>
                    {winner.team && <div className="text-sm text-gray-400 mb-4">{winner.team}</div>}
                    <div className="flex justify-between items-center text-sm border-t border-white/5 pt-4 mt-4">
                      <span className="text-[#eab308] font-bold tracking-wide uppercase text-xs">{winner.placement}</span>
                      {winner.prize && <span className="text-gray-200 font-medium">{winner.prize}</span>}
                    </div>
                  </GlassCard>
                ))}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}