import { useParams, Link, useNavigate } from 'react-router-dom';
import { Calendar, Gift, ArrowLeft, Trophy, ExternalLink, CheckCircle2, Users } from 'lucide-react';
import { GlassCard } from '../components/ui/GlassCard';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { useGiveaways } from '../hooks/useGiveaways';

export function GiveawayDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { giveaways, loading } = useGiveaways();
  const giveaway = giveaways.find(g => g.id === id);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <h1 className="text-3xl font-bold text-white mb-4">Loading giveaway...</h1>
      </div>
    );
  }

  if (!giveaway) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <h1 className="text-3xl font-bold text-white mb-4">Giveaway not found</h1>
        <Link to="/giveaways" className="text-[#f05a28] hover:underline">Back to Giveaways</Link>
      </div>
    );
  }

  const isActive = giveaway.status === 'LIVE';
  const isCompleted = giveaway.status === 'COMPLETED';

  return (
    <div className="pb-24 pt-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-8 lg:gap-16">
          
          
          <div className="w-full max-w-[320px] mx-auto md:max-w-none md:w-2/5 lg:w-1/3 flex-shrink-0">
            <div className="relative aspect-square w-full rounded-2xl overflow-hidden shadow-2xl border border-white/10 md:sticky md:top-24 bg-black/20">
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f19]/60 via-transparent to-transparent z-10" />
              <img src={giveaway.image || '/events/giveaway-placeholder.svg'} alt={giveaway.title} className="w-full h-full object-contain relative z-0" />
              
              <div className="absolute top-4 left-4 z-30">
                <button onClick={() => navigate(-1)} className="inline-flex items-center px-4 py-2 bg-black/50 hover:bg-black/80 text-sm font-medium text-white transition-colors backdrop-blur-md rounded-full border border-white/10 shadow-lg">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  <span>Back</span>
                </button>
              </div>
            </div>
          </div>

          
          <div className="flex-1 pb-12 w-full overflow-hidden">
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <Badge status={giveaway.status} />
            </div>
            
            <h1 
              className="text-[clamp(1.5rem,3.5vw,2.5rem)] font-bold text-white tracking-tight mb-8 sm:mb-12 leading-[1.2]"
            >
              {giveaway.title}
            </h1>

            <div className="space-y-12">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-[#121826]/40 backdrop-blur-md rounded-xl p-5 border border-white/5">
                  <div className="flex items-center gap-3 mb-2">
                    <Gift className="w-5 h-5 text-gray-400" />
                    <div className="text-gray-400 font-medium text-sm">Prize</div>
                  </div>
                  <div className="text-[#f05a28] font-bold ml-8 text-lg">{giveaway.prize}</div>
                </div>
                
                <div className="bg-[#121826]/40 backdrop-blur-md rounded-xl p-5 border border-white/5">
                  <div className="flex items-center gap-3 mb-2">
                    <Calendar className="w-5 h-5 text-gray-400" />
                    <div className="text-gray-400 font-medium text-sm">Ends On</div>
                  </div>
                  <div className="text-white font-medium ml-8">{giveaway.endDate}</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                {isCompleted ? (
                  <>
                    <Link to="/giveaways" className="flex-1">
                      <Button variant="primary" fullWidth className="group text-[13px] sm:text-base md:text-lg h-11 sm:h-12 md:h-14">
                        Explore running giveaways
                      </Button>
                    </Link>
                    <a href="https://discord.gg/H2QsP7DWKv" target="_blank" rel="noopener noreferrer" className="flex-1">
                      <Button variant="glass" fullWidth className="group text-[13px] sm:text-base md:text-lg h-11 sm:h-12 md:h-14">
                        Join Discord server
                        <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5 ml-2 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                      </Button>
                    </a>
                  </>
                ) : (
                  <>
                    {giveaway.discordUrl && (
                      <a href={giveaway.discordUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
                        <Button variant={isActive ? 'primary' : 'glass'} fullWidth className="group text-[13px] sm:text-base md:text-lg h-11 sm:h-12 md:h-14">
                          {isActive ? 'Enter on Discord' : 'View on Discord'}
                          <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5 ml-2 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                        </Button>
                      </a>
                    )}
                  </>
                )}
              </div>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4 border-b border-white/10 pb-3">Overview</h2>
                <p className="text-gray-300 leading-relaxed text-lg whitespace-pre-wrap">
                  {giveaway.description}
                </p>
              </section>

              <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <GlassCard className="p-6">
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-[#22c55e]" />
                    How to Participate
                  </h3>
                  <ul className="space-y-3">
                    {giveaway.participationMethod.map((method, idx) => (
                      <li key={idx} className="flex gap-3 text-gray-300">
                        <span className="text-[#f05a28] mt-1">•</span>
                        <span>{method}</span>
                      </li>
                    ))}
                  </ul>
                </GlassCard>

                <GlassCard className="p-6">
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <Users className="w-5 h-5 text-[#3b82f6]" />
                    Eligibility
                  </h3>
                  <ul className="space-y-3">
                    {giveaway.eligibility.map((req, idx) => (
                      <li key={idx} className="flex gap-3 text-gray-300">
                        <span className="text-[#f05a28] mt-1">•</span>
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </GlassCard>
              </section>

              {giveaway.rules && giveaway.rules.length > 0 && (
                <section>
                  <h2 className="text-2xl font-bold text-white mb-6 border-b border-white/10 pb-3">Rules & Terms</h2>
                  <div className="bg-[#121826]/40 backdrop-blur-md rounded-xl p-6 md:p-8 border border-white/5 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
                    <h3 className="text-lg font-medium text-gray-300 mb-6 leading-relaxed">
                      Please ensure you have read and understood all the rules before participating. 
                    </h3>
                    
                    <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                      <p className="text-sm text-gray-400">By participating, you agree to all giveaway rules and conditions.</p>
                      <Link to={`/giveaways/${giveaway.id}/rules`} className="w-full sm:w-auto">
                        <Button variant="secondary" className="w-full sm:w-auto whitespace-nowrap border-[#f05a28]/50 text-[#f05a28] hover:bg-[#f05a28] hover:text-white transition-colors h-11 sm:h-12 px-6">
                          Read Full Rules
                        </Button>
                      </Link>
                    </div>
                  </div>
                </section>
              )}

              {giveaway.winners && giveaway.winners.length > 0 && (
                <section>
                  <h2 className="text-2xl font-bold text-white mb-6 border-b border-white/10 pb-3 flex items-center gap-2">
                    <Trophy className="w-6 h-6 text-[#eab308]" />
                    Giveaway Winners
                  </h2>
                  <div className="bg-[#121826]/40 backdrop-blur-md rounded-xl p-6 md:p-8 border border-[#eab308]/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#eab308]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
                    
                    <h3 className="text-lg font-medium text-gray-300 mb-6 leading-relaxed relative z-10">
                      The official results are in! Check out the lucky winners of this giveaway.
                    </h3>
                    
                    <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10">
                      <p className="text-sm text-gray-400">Prizes will be distributed to winners shortly.</p>
                      <Link to={`/giveaways/${giveaway.id}/winners`} className="w-full sm:w-auto">
                        <Button variant="primary" className="w-full sm:w-auto whitespace-nowrap bg-gradient-to-r from-[#eab308] to-[#f05a28] hover:from-[#f05a28] hover:to-[#eab308] border-none text-white transition-all h-11 sm:h-12 px-8 font-bold tracking-wide">
                          View Winners
                        </Button>
                      </Link>
                    </div>
                  </div>
                </section>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}