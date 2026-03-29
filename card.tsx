import { ReactNode } from 'react';

export function Card({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-sm backdrop-blur">
      <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-zinc-300">{title}</h3>
      <div className="text-sm text-zinc-100">{children}</div>
    </div>
  );
}
