import Link from 'next/link';
import { ReactNode } from 'react';
import { getCurrentUser } from '@/lib/auth';

const links = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/academy', label: 'Academy' },
  { href: '/signals', label: 'Signals' },
  { href: '/tools', label: 'Tools' },
  { href: '/referrals', label: 'Referrals' },
  { href: '/account', label: 'Account' },
  { href: '/admin', label: 'Admin' },
];

export async function AppShell({ children }: { children: ReactNode }) {
  const user = await getCurrentUser();

  return (
    <div className="min-h-screen bg-[#0b0f19] text-white">
      <div className="grid min-h-screen md:grid-cols-[260px_1fr]">
        <aside className="border-r border-white/10 bg-[#121826] p-6">
          <div className="mb-8">
            <p className="text-xs uppercase tracking-[0.3em] text-emerald-300">SlipMint Signals</p>
            <h1 className="mt-2 text-xl font-bold">Member App</h1>
          </div>

          <nav className="space-y-2">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block rounded-xl px-4 py-3 text-sm text-zinc-300 transition hover:bg-white/5 hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-zinc-300">
            <p className="font-semibold text-white">{user.name}</p>
            <p>{user.membershipStatus} member</p>
            <p>{user.rank}</p>
          </div>
        </aside>

        <main className="p-6 md:p-10">{children}</main>
      </div>
    </div>
  );
}
