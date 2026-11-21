import React from 'react';
import { cn } from './GlassCard';
import type { EventStatus } from '../../data/types';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  status: EventStatus;
}

export function Badge({ status, className, ...props }: BadgeProps) {
  const getStatusStyles = (s: EventStatus) => {
    switch (s) {
      case 'LIVE':
      case 'REGISTRATION OPEN':
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case 'UPCOMING':
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case 'COMPLETED':
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
      case 'CANCELLED':
        return "bg-red-500/20 text-red-400 border-red-500/30";
      default:
        return "bg-white/10 text-white border-white/20";
    }
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider border backdrop-blur-sm",
        getStatusStyles(status),
        className
      )}
      {...props}
    >
      {status}
    </span>
  );
}