import type { DemoUser } from '@/types';

export const demoUser: DemoUser = {
  id: 'demo-user-1',
  name: 'Global Press',
  email: 'owner@slipmintsignals.com',
  membershipStatus: 'PREMIUM',
  rank: 'Market Sniper',
  xpPoints: 1240,
};

export const demoSignals = [
  {
    id: 'sig-1',
    market: 'BTC/USD',
    direction: 'BUY',
    entry: '64,200',
    sl: '62,950',
    tp: ['65,300', '66,150'],
    status: 'Active',
    explanation: 'Bullish continuation above intraday structure with momentum confirmation.',
  },
  {
    id: 'sig-2',
    market: 'XAU/USD',
    direction: 'SELL',
    entry: '3,018',
    sl: '3,034',
    tp: ['2,998', '2,985'],
    status: 'TP1 Hit',
    explanation: 'Rejection from resistance with a clean lower-high structure.',
  },
];

export const demoLessons = [
  { id: 'lesson-1', title: 'Risk Management Basics', level: 'Beginner', premiumOnly: false },
  { id: 'lesson-2', title: 'Multi-Timeframe Analysis', level: 'Intermediate', premiumOnly: true },
  { id: 'lesson-3', title: 'Trading Psychology and Discipline', level: 'Advanced', premiumOnly: true },
];
