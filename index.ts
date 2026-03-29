export type MembershipStatus = 'FREE' | 'PREMIUM' | 'ADMIN';

export type DemoUser = {
  id: string;
  name: string;
  email: string;
  membershipStatus: MembershipStatus;
  rank: string;
  xpPoints: number;
};
