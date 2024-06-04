import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import getSupabaseServerClient from '~/core/supabase/server-client';
import { getOrganizationSubscription } from '~/lib/subscriptions/queries';
const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY as string, {
  apiVersion: '2022-11-15',
}) as Stripe;

export async function POST(req: Request) {
  const body = (await req.json()) as any;
  const userId = body.userId;
  const organizationId = body.organizationId;

  const client = getSupabaseServerClient({
    admin: true,
  });
  let customer;
  try { 
    const { error, data } = await getOrganizationSubscription(client, Number(organizationId))
    console.log(error, 'error')
    customer = data?.customer_id
  } catch(e) {

  }
  const session = await stripe.checkout.sessions.create({
    customer: customer || undefined,
    payment_method_types: ['card'],
    line_items: body.products,
    allow_promotion_codes: true,
    client_reference_id: organizationId,
    mode: 'subscription',
    metadata: {
      userId,
      plan: body.products[0].price
    },
    success_url: 'https://www.revocalize.ai/success/' + body.products[0].price,
    cancel_url: 'https://www.revocalize.ai/plans',
  });
  return NextResponse.json({ id: session.id });
}
