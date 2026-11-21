export type EventStatus = 'UPCOMING' | 'REGISTRATION OPEN' | 'LIVE' | 'COMPLETED' | 'CANCELLED';

export interface Winner {
  id: string;
  name: string;
  team?: string;
  prize?: string;
  placement?: string;
}

export interface RuleSection {
  title: string;
  content: string[];
}

export interface Event {
  id: string;
  title: string;
  game: string;
  type: string;
  status: EventStatus;
  startDate: string;
  endDate?: string;
  registrationDeadline?: string;
  registrationUrl?: string;
  discordUrl?: string;
  discordWinnerUrl?: string;
  image: string;
  description: string;
  format?: string;
  entry?: string;
  prizePool?: string;
  rules: RuleSection[];
  winners?: Winner[];
  discordGuildId?: string;
  discordChannelId?: string;
  discordMessageId?: string;
  discordWinnerChannelId?: string;
  discordWinnerMessageId?: string;
  winnerGroups?: {
    date: string;
    categories: {
      name: string;
      winners: Winner[];
    }[];
  }[];
}

export interface Giveaway {
  id: string;
  title: string;
  status: EventStatus;
  prize: string;
  endDate: string;
  image: string;
  description: string;
  participationMethod: string[];
  eligibility: string[];
  rules: RuleSection[];
  discordUrl?: string;
  winners?: Winner[];
  winnerAnnouncedAt?: string;
  discordGuildId?: string;
  discordChannelId?: string;
  discordMessageId?: string;
  discordWinnerChannelId?: string;
  discordWinnerMessageId?: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface SiteConfig {
  socials: SocialLink[];
  aboutText: string;
}