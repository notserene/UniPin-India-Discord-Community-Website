import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Trophy } from 'lucide-react';
import { useGiveaways } from '../hooks/useGiveaways';
import { GlassCard } from '../components/ui/GlassCard';

export function GiveawayWinners() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { giveaways, loading } = useGiveaways();
  const giveaway = giveaways.find(g => g.id === id);

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-32 text-center">
        <h1 className="text-3xl font-bold text-white mb-4">Loading winners...</h1>
      </div>
    );
  }

  if (!giveaway) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-32 text-center">
        <h1 className="text-3xl font-bold text-white mb-4">Giveaway not found</h1>
        <Link to="/giveaways" className="text-[#f05a28] hover:underline">Back to Giveaways</Link>
      </div>
    );
  }

  return (
    <div className="pb-24 pt-32">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <button onClick={() => navigate(-1)} className="inline-flex items-center text-gray-400 hover:text-white transition-colors mb-8 font-medium">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to {giveaway.title}
        </button>

        <div className="mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight mb-4 flex items-center gap-3">
            <Trophy className="w-8 h-8 sm:w-10 sm:h-10 text-[#eab308]" />
            Giveaway Winners
          </h1>
          <p className="text-lg text-gray-400 leading-relaxed">
            The lucky winners of <span className="text-white font-semibold">{giveaway.title}</span>. 
          </p>
        </div>

        {(!giveaway.winners || giveaway.winners.length === 0) ? (
          <div className="bg-[#121826]/40 backdrop-blur-md rounded-2xl p-8 border border-white/5 text-center">
            <p className="text-gray-400 text-lg">Winners have not been announced for this giveaway yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {giveaway.winners.map(winner => (
              <GlassCard key={winner.id} className="p-6 border-[#eab308]/30 bg-gradient-to-br from-[#eab308]/10 to-transparent text-center">
                <div className="font-bold text-white text-2xl mb-1">{winner.name}</div>
                {winner.prize && (
                  <div className="border-t border-white/5 pt-4 mt-4">
                    <span className="text-[#eab308] font-bold tracking-wide uppercase text-xs">{winner.prize}</span>
                  </div>
                )}
              </GlassCard>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}