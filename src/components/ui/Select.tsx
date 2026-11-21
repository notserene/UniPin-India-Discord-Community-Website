import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { cn } from './GlassCard';

interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  className?: string;
}

export function Select({ value, onChange, options, className }: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value) || options[0];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-full bg-white/5 hover:bg-white/10 border border-transparent hover:border-white/10 rounded-xl pl-3 sm:pl-4 pr-10 py-2.5 sm:py-3.5 text-sm sm:text-base text-white text-left focus:outline-none transition-all",
          isOpen && "bg-white/10 border-white/10",
          className
        )}
      >
        <span className="block truncate">{selectedOption?.label}</span>
        <span className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
          <ChevronDown className={cn("w-4 h-4 text-gray-400 transition-transform duration-300", isOpen && "rotate-180")} />
        </span>
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-2 origin-top rounded-xl bg-[#1a2235]/95 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/50 overflow-hidden outline-none animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="max-h-60 overflow-auto py-1.5 custom-scrollbar">
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                className={cn(
                  "relative w-full cursor-pointer select-none py-2.5 pl-10 pr-4 text-sm sm:text-base text-left transition-colors",
                  value === option.value ? "bg-[#f05a28]/10 text-[#f05a28] font-medium" : "text-gray-300 hover:bg-white/10 hover:text-white"
                )}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
              >
                <span className="block truncate">{option.label}</span>
                {value === option.value && (
                  <span className="absolute inset-y-0 left-3 flex items-center text-[#f05a28]">
                    <Check className="w-4 h-4" />
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}