import { NextResponse } from 'next/server';
import Stripe from 'stripe';
const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY as string, {
  apiVersion: '2022-11-15',
}) as Stripe;

export const maxDuration = 60;

export async function POST(req: Request) {
  const body = (await req.json()) as any;
  const userId = body.userId;
  const organizationId = body.organizationId;
  const success_url = body.success_url;
  const cancel_url = body.cancel_url;
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: body.products,
    allow_promotion_codes: true,
    client_reference_id: `${organizationId}/${body.products[0].quantity}`,
    mode: 'payment',
    metadata: {
      userId,
      plan: body.products[0].price,
    },
    success_url: success_url || 'https://www.revocalize.ai/success/' + body.products[0].price + '/' + body.products[0].quantity,
    cancel_url: cancel_url || 'https://www.revocalize.ai/plans',
  });
  return NextResponse.json({ id: session.id });
}
