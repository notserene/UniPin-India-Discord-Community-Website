import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  hoverEffect?: boolean;
}

export function GlassCard({ children, className, hoverEffect = false, ...props }: GlassCardProps) {
  return (
    <div 
      className={cn(
        "rounded-2xl border border-white/5 bg-[#121826]/60 backdrop-blur-md overflow-hidden",
        hoverEffect && "transition-all duration-300 hover:border-white/10 hover:bg-[#121826]/80 hover:shadow-[0_4px_20px_rgba(0,0,0,0.2)]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}