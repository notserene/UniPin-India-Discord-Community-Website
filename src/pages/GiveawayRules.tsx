import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useGiveaways } from '../hooks/useGiveaways';

export function GiveawayRules() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { giveaways, loading } = useGiveaways();
  const giveaway = giveaways.find(g => g.id === id);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-32 text-center">
        <h1 className="text-3xl font-bold text-white mb-4">Loading rules...</h1>
      </div>
    );
  }

  if (!giveaway) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-32 text-center">
        <h1 className="text-3xl font-bold text-white mb-4">Giveaway not found</h1>
        <Link to="/giveaways" className="text-[#f05a28] hover:underline">Back to Giveaways</Link>
      </div>
    );
  }

  return (
    <div className="pb-24 pt-32">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <button onClick={() => navigate(-1)} className="inline-flex items-center text-gray-400 hover:text-white transition-colors mb-8 font-medium">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to {giveaway.title}
        </button>

        <div className="mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
            Giveaway Rules & Terms
          </h1>
          <p className="text-lg text-gray-400 leading-relaxed">
            Detailed rules, terms, and guidelines for <span className="text-white font-semibold">{giveaway.title}</span>. 
            Please read these carefully before participating.
          </p>
        </div>

        {(!giveaway.rules || giveaway.rules.length === 0) ? (
          <div className="bg-[#121826]/40 backdrop-blur-md rounded-2xl p-8 border border-white/5 text-center">
            <p className="text-gray-400 text-lg">No specific rules have been posted for this giveaway yet.</p>
          </div>
        ) : (
          <div className="space-y-8">
            {giveaway.rules.map((rule, idx) => (
              <section key={idx} className="bg-[#121826]/40 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-white/5 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-4 border-b border-white/5 pb-4">
                  <span className="w-10 h-10 rounded-full bg-[#f05a28]/20 flex items-center justify-center text-lg text-[#f05a28] font-bold flex-shrink-0">
                    {idx + 1}
                  </span>
                  {rule.title}
                </h2>
                <ul className="space-y-4 text-gray-300">
                  {rule.content.map((item, i) => (
                    <li key={i} className="flex gap-4">
                      <span className="text-[#f05a28] mt-1.5 text-xl leading-none">•</span>
                      <span className="leading-relaxed text-lg">{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}