import { Link } from 'react-router-dom';
import { Target, Users, Trophy, Globe } from 'lucide-react';
import { config } from '../data/config';
import { GlassCard } from '../components/ui/GlassCard';
import { InstagramIcon, FacebookIcon, YoutubeIcon, DiscordIcon, SnapchatIcon, WhatsAppIcon, MailIcon, GlobeIcon } from '../components/layout/Footer';

export function About() {
  const discordUrl = config.socials.find(s => s.platform === 'Discord')?.url || '#';

  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'instagram': return <InstagramIcon className="w-5 h-5" />;
      case 'facebook': return <FacebookIcon className="w-5 h-5" />;
      case 'youtube': return <YoutubeIcon className="w-5 h-5" />;
      case 'discord': return <DiscordIcon className="w-5 h-5" />;
      case 'snapchat': return <SnapchatIcon className="w-5 h-5" />;
      case 'whatsapp': return <WhatsAppIcon className="w-5 h-5" />;
      case 'mail': return <MailIcon className="w-5 h-5" />;
      case 'website': return <GlobeIcon className="w-5 h-5" />;
      default: return <GlobeIcon className="w-5 h-5" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
      <div className="text-center max-w-3xl mx-auto mb-20">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-6">
          More than just a <span className="text-[#f05a28]">community.</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-400 leading-relaxed font-light mb-12">
          {config.aboutText}
        </p>
        
        <div className="bg-[#121826]/40 backdrop-blur-md rounded-xl p-6 md:p-8 border border-white/5 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-[#f05a28]/80"></div>
          <div className="flex flex-col items-center gap-4 relative z-10 px-2 md:px-8">
            <h2 className="text-white/70 font-medium tracking-[0.2em] uppercase text-sm md:text-base">Community Notice</h2>
            <p className="text-gray-300 text-base md:text-lg leading-[1.8] text-center font-light tracking-wide max-w-4xl">
              This platform is independently created and maintained by a dedicated group of UniPin India community moderators and admins. It is designed solely for hosting and promoting community-driven events. Please note that this website is <span className="text-white font-normal border-b border-white/20 pb-0.5">not directly linked</span> to UniPin's official corporate entity.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 max-w-6xl mx-auto">
        
        
        <Link to="/events" className="md:col-span-8 focus:outline-none focus:ring-2 focus:ring-[#f05a28]/50 rounded-2xl block group">
          <GlassCard hoverEffect className="h-full p-8 md:p-10 flex flex-col justify-center border-transparent group-hover:border-[#f05a28]/30">
            <Trophy className="w-10 h-10 text-[#f05a28] mb-6 group-hover:scale-110 transition-transform duration-300" />
            <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              Events & Tournaments
              <svg className="w-5 h-5 text-gray-500 group-hover:text-[#f05a28] group-hover:translate-x-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </h3>
            <p className="text-gray-400 leading-relaxed text-lg max-w-xl group-hover:text-gray-300 transition-colors">
              Compete in events across top games. We bring structured formats, massive prize pools, and true competitive spirit to the forefront.
            </p>
          </GlassCard>
        </Link>

        
        <a href={discordUrl} target="_blank" rel="noopener noreferrer" className="md:col-span-4 focus:outline-none focus:ring-2 focus:ring-[#f05a28]/50 rounded-2xl block group">
          <GlassCard hoverEffect className="h-full p-8 flex flex-col border-transparent group-hover:border-[#f05a28]/30">
            <Users className="w-8 h-8 text-[#f05a28] mb-6 group-hover:scale-110 transition-transform duration-300" />
            <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
              Community First
              <svg className="w-4 h-4 text-gray-500 group-hover:text-[#f05a28] group-hover:translate-x-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </h3>
            <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
              Join thousands of Gamers in our Discord. Find squads, share highlights, and stay updated.
            </p>
          </GlassCard>
        </a>

        
        <div className="md:col-span-4">
          <GlassCard className="h-full p-8 flex flex-col border border-white/5">
            <Globe className="w-8 h-8 text-[#f05a28] mb-6" />
            <h3 className="text-xl font-bold text-white mb-6">UniPin Socials</h3>
            <div className="flex flex-wrap gap-3">
              {config.socials.map((social) => (
                <a 
                  key={social.platform}
                  href={social.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 hover:border-[#f05a28]/50 transition-all focus:outline-none focus:ring-2 focus:ring-[#f05a28]/50 title-tooltip"
                  title={social.platform}
                >
                  {getSocialIcon(social.platform)}
                </a>
              ))}
            </div>
          </GlassCard>
        </div>

        
        <Link to="/giveaways" className="md:col-span-8 focus:outline-none focus:ring-2 focus:ring-[#f05a28]/50 rounded-2xl block group">
          <GlassCard hoverEffect className="h-full p-8 md:p-10 flex flex-col justify-center relative overflow-hidden border-transparent group-hover:border-[#f05a28]/30">
            <div className="relative z-10">
              <Target className="w-10 h-10 text-[#f05a28] mb-6 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                Exclusive Giveaways
                <svg className="w-5 h-5 text-gray-500 group-hover:text-[#f05a28] group-hover:translate-x-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </h3>
              <p className="text-gray-400 leading-relaxed text-lg max-w-xl group-hover:text-gray-300 transition-colors">
                Participate in regular drops to win UniPin credits, and more. Active community members are constantly rewarded.
              </p>
            </div>
          </GlassCard>
        </Link>

      </div>
    </div>
  );
}