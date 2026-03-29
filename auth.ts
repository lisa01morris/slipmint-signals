import { demoUser } from '@/lib/demo-data';

export async function getCurrentUser() {
  // Replace this with Clerk, NextAuth, or your real auth provider.
  return demoUser;
}

export async function requirePremium() {
  const user = await getCurrentUser();
  return user.membershipStatus === 'PREMIUM' || user.membershipStatus === 'ADMIN';
}
