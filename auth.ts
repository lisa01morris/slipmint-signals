export async function getCurrentUser() {
  return {
    id: null,
    membershipStatus: 'FREE',
  };
}

export async function requirePremium() {
  const user = await getCurrentUser();
  return user.membershipStatus === 'PREMIUM' || user.membershipStatus === 'ADMIN';
}
