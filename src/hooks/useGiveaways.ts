import { useState } from 'react';
import type { Giveaway } from '../data/types';
import { giveaways as staticGiveaways } from '../data/giveaways';

export function useGiveaways() {
  const [giveaways] = useState<Giveaway[]>(staticGiveaways);
  const [loading] = useState(false);
  return { giveaways, loading };
}