import Link from 'next/link';
import { siteConfig } from '@/lib/site';
import { Container } from '@/components/container';

export function Navbar() {
  return (
    <header className="border-b border-white/10 bg-[#0b0f19]/90 backdrop-blur">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="text-lg font-bold text-white">
            {siteConfig.name}
          </Link>
          <nav className="hidden gap-6 md:flex">
            {siteConfig.nav.map((item) => (
              <Link key={item.href} href={item.href} className="text-sm text-zinc-300 transition hover:text-white">
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex gap-3">
            <Link href="/pricing" className="text-sm text-zinc-300 hover:text-white">
              Pricing
            </Link>
            <Link
              href="/dashboard"
              className="rounded-xl bg-emerald-400 px-4 py-2 text-sm font-semibold text-black transition hover:opacity-90"
            >
              Enter App
            </Link>
          </div>
        </div>
      </Container>
    </header>
  );
}
