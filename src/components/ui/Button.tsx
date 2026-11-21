import React from 'react';
import { cn } from './GlassCard';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'glass' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', fullWidth, ...props }, ref) => {
    
    const variants = {
      primary: "bg-[#f05a28] text-white hover:bg-[#d94b1f] border border-transparent shadow-lg shadow-[#f05a28]/20",
      secondary: "bg-white text-[#0b0f19] hover:bg-gray-100 border border-transparent",
      glass: "bg-white/5 text-white hover:bg-white/10 border border-white/10 backdrop-blur-sm",
      ghost: "bg-transparent text-white hover:bg-white/10"
    };

    const sizes = {
      sm: "h-9 px-4 text-sm",
      md: "h-11 px-6 text-base",
      lg: "h-14 px-8 text-lg font-medium"
    };

    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f05a28] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b0f19] disabled:opacity-50 disabled:pointer-events-none",
          variants[variant],
          sizes[size],
          fullWidth && "w-full",
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';