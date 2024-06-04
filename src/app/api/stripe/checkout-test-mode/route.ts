import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import configuration from '~/configuration';
import getSupabaseServerClient from '~/core/supabase/server-client';
import { ORGANIZATIONS_SUBSCRIPTIONS_TABLE } from '~/lib/db-tables';
import { updateOrganization } from '~/lib/organizations/database/mutations';

export interface CheckoutSubscriptionBody {
  plan: string;
  planDescription: string;
  amount: number;
  interval: 'month' | 'year';
  customerId?: string;
  orgId: any;
}

export async function POST(req: Request) {
  const stripe = new Stripe(
    process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY as string,
    { apiVersion: '2022-11-15' }
  ) as any;
  const body = (await req.json()) as any;

  const client = getSupabaseServerClient({
    admin: true,
  });

  try {
    const clientReferenceId = body?.organizationId;
    const product = configuration.stripe.products.find(
      (i) => i.stripeProductId === body?.products[0]?.price
    );

    const orgSub = await client
      .from(ORGANIZATIONS_SUBSCRIPTIONS_TABLE)
      .select('*')
      .eq('organization_id', clientReferenceId);

    await updateOrganization(client, {
      id: clientReferenceId,
      data: { credits: product?.credits },
    });

    const hasAnyActiveSubscription = orgSub.data?.[0];

    if (hasAnyActiveSubscription) {
      const subscriptionData = await stripe.subscriptions.retrieve(
        hasAnyActiveSubscription?.subscription_id
      );

      const subscriptionItemId = subscriptionData.items.data[0].id;

      const newSubscriptionData = await stripe.subscriptions.update(
        subscriptionData.id,
        {
          items: [
            {
              id: subscriptionItemId,
              price: body.products[0].price,
            },
          ],
        }
      );

      // console.log(newSubscriptionData, "sssss")
    }
    const session = await stripe.checkout.sessions.create({
      customer: 'cus_OgGbeKoktgA6Xd',
      mode: 'setup', // mode should be subscription
      allowPromotionCodes: true,
      line_items: [
        {
          price: 'price_1NLF7AELSZjChMNFhpdKRJWI',
          quantity: 1,
        },
      ],
      client_reference_id: body.organizationId.toString(),
      success_url: 'https://www.revocalize.ai/success',
      cancel_url: `https://www.revocalize.ai/cancel`,
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof Stripe.errors.StripeError) {
      const { message } = error;
      return NextResponse.json({ message }, { status: error.statusCode });
    }
  }
}
