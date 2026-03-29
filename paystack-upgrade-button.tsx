'use client';

import { useState } from 'react';

export function PaystackUpgradeButton() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleUpgrade() {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/paystack/initialize', {
        method: 'POST',
      });

      const data = (await response.json()) as { authorization_url?: string; error?: string };

      if (!response.ok || !data.authorization_url) {
        throw new Error(data.error || 'Unable to start payment.');
      }

      window.location.href = data.authorization_url;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to start payment.');
      setLoading(false);
    }
  }

  return (
    <div className="space-y-3">
      <button
        type="button"
        onClick={handleUpgrade}
        disabled={loading}
        className="rounded-2xl bg-emerald-400 px-5 py-3 font-semibold text-black disabled:cursor-not-allowed disabled:opacity-70"
      >
        {loading ? 'Redirecting to Paystack...' : 'Upgrade with Paystack'}
      </button>
      {error ? <p className="text-sm text-red-300">{error}</p> : null}
    </div>
  );
}
