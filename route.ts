import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyPaystackTransaction } from '@/lib/paystack';

export async function GET(request: NextRequest) {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL;
  const reference = request.nextUrl.searchParams.get('reference');

  if (!appUrl || !reference) {
    return NextResponse.redirect(new URL('/pricing?payment=missing_reference', appUrl || request.nextUrl.origin));
  }

  try {
    const payment = await verifyPaystackTransaction(reference);

    if (payment.status !== 'success') {
      return NextResponse.redirect(new URL('/pricing?payment=not_successful', appUrl));
    }

    const metadata = (payment.metadata || {}) as { userId?: string };
    const userId = metadata.userId;

    if (userId) {
      await prisma.user
        .update({
          where: { id: userId },
          data: { membershipStatus: 'PREMIUM' },
        })
        .catch(() => null);

      await prisma.subscription.upsert({
        where: { userId },
        create: {
          userId,
          paystackCustomerCode: payment.customer?.customer_code,
          paystackReference: payment.reference,
          status: 'ACTIVE',
          currentPeriodEnd: payment.paid_at
            ? new Date(new Date(payment.paid_at).getTime() + 30 * 24 * 60 * 60 * 1000)
            : null,
        },
        update: {
          paystackCustomerCode: payment.customer?.customer_code,
          paystackReference: payment.reference,
          status: 'ACTIVE',
          currentPeriodEnd: payment.paid_at
            ? new Date(new Date(payment.paid_at).getTime() + 30 * 24 * 60 * 60 * 1000)
            : null,
        },
      }).catch(() => null);
    }

    return NextResponse.redirect(new URL('/dashboard?upgraded=1', appUrl));
  } catch {
    return NextResponse.redirect(new URL('/pricing?payment=verification_failed', appUrl));
  }
}
