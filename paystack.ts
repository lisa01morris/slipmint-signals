const PAYSTACK_API_BASE = 'https://api.paystack.co';

type PaystackInitializeResponse = {
  status: boolean;
  message: string;
  data?: {
    authorization_url: string;
    access_code: string;
    reference: string;
  };
};

type PaystackVerifyResponse = {
  status: boolean;
  message: string;
  data?: {
    id: number;
    domain: string;
    status: string;
    reference: string;
    amount: number;
    paid_at?: string;
    customer?: {
      email?: string;
      customer_code?: string;
    };
    metadata?: Record<string, unknown>;
  };
};

function getSecretKey() {
  const key = process.env.PAYSTACK_SECRET_KEY;

  if (!key) {
    throw new Error('Missing PAYSTACK_SECRET_KEY.');
  }

  return key;
}

export async function initializePaystackTransaction(input: {
  email: string;
  amount: number;
  reference: string;
  callback_url: string;
  metadata?: Record<string, unknown>;
}) {
  const response = await fetch(`${PAYSTACK_API_BASE}/transaction/initialize`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${getSecretKey()}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
    cache: 'no-store',
  });

  const data = (await response.json()) as PaystackInitializeResponse;

  if (!response.ok || !data.status || !data.data?.authorization_url) {
    throw new Error(data.message || 'Failed to initialize Paystack transaction.');
  }

  return data.data;
}

export async function verifyPaystackTransaction(reference: string) {
  const response = await fetch(`${PAYSTACK_API_BASE}/transaction/verify/${encodeURIComponent(reference)}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${getSecretKey()}`,
    },
    cache: 'no-store',
  });

  const data = (await response.json()) as PaystackVerifyResponse;

  if (!response.ok || !data.status || !data.data) {
    throw new Error(data.message || 'Failed to verify Paystack transaction.');
  }

  return data.data;
}

export function getPremiumAmountKobo() {
  const raw = process.env.PAYSTACK_PREMIUM_AMOUNT_KOBO;
  const amount = Number(raw);

  if (!raw || Number.isNaN(amount) || amount < 100) {
    throw new Error('PAYSTACK_PREMIUM_AMOUNT_KOBO must be set to a valid amount in kobo.');
  }

  return amount;
}
