import { Link, useLocation } from 'react-router-dom';

import { useState, useEffect } from 'react';
import { cn } from '../ui/GlassCard';
import { config } from '../../data/config';

export function Navbar() {

  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Events', path: '/events' },
    { name: 'Giveaways', path: '/giveaways' },
    { name: 'About', path: '/about' },
  ];

  const discordUrl = config.socials.find(s => s.platform === 'Discord')?.url || '#';

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent",
        scrolled ? "bg-[#121826]/90 backdrop-blur-md border-white/5 shadow-sm" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 md:h-24">
          
          
          <nav className="flex items-center gap-3 sm:gap-6 md:gap-10 flex-1 overflow-x-auto hide-scrollbar pr-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={cn(
                  "text-xs sm:text-sm md:text-base font-semibold tracking-wide transition-colors hover:text-white focus-ring rounded-md px-2 py-1.5 whitespace-nowrap",
                  location.pathname === link.path ? "text-white" : "text-gray-400"
                )}
              >
                {link.name.toUpperCase()}
              </Link>
            ))}
          </nav>

          
          <div className="flex items-center flex-shrink-0 ml-3 sm:ml-4">
            <a href={discordUrl} target="_blank" rel="noopener noreferrer" tabIndex={-1}>
              <button className="group flex items-center justify-center gap-1.5 sm:gap-2 bg-[#f05a28]/75 hover:bg-[#b33f19] text-white rounded-full transition-all duration-300 shadow-[0_0_10px_rgba(240,90,40,0.1)] hover:shadow-[0_0_20px_rgba(179,63,25,0.4)] hover:-translate-y-0.5 active:translate-y-0 font-medium px-4 py-2 sm:px-5 sm:py-2 focus:outline-none cursor-pointer">
                <svg className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0 transition-transform duration-300 group-hover:scale-110" viewBox="0 0 127.14 96.36" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a67.55,67.55,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.31,60,73.31,53s5-12.74,11.43-12.74S96.2,46,96.12,53,91.08,65.69,84.69,65.69Z" />
                </svg>
                <span className="hidden lg:inline text-sm whitespace-nowrap">Join Discord Server</span>
                <span className="inline lg:hidden text-xs sm:text-sm whitespace-nowrap font-medium">Join Discord</span>
              </button>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}