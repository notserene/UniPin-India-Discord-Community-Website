import { useState } from 'react';
import type { Event } from '../data/types';
import { events as staticEvents } from '../data/events';

export function useEvents() {
  const [events] = useState<Event[]>(staticEvents);
  const [loading] = useState(false);
  return { events, loading };
}