// import { headers } from 'next/headers';
// import { NextResponse } from 'next/server';
// import StripeWebhooks from '~/core/stripe/stripe-webhooks.enum';
// import Stripe from 'stripe';

// const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY as string, {
//   apiVersion: '2022-11-15',
// }) as any;
// const webhookSecret = 'whsec_Xa463CfDAyRGU4mblqbYZ3TRevNELGr4';

// export async function POST(req: any, res: any) {
//   if (req.method === 'POST') {
//     const rawBody = await req.text();

//     const sig = headers().get('stripe-signature');

//     try {
//       const event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret);

//       switch (event.type) {
//         case StripeWebhooks.Completed:
//           console.log("boss");
//       }

//     } catch (err: any) {
//       console.log(err);
//       return;
//     }

//     return NextResponse.json({
//       success: true,
//     });
//   } else {
//     res.setHeader('Allow', 'POST');
//   }
// }

import type { Stripe } from 'stripe';
import type { SupabaseClient } from '@supabase/supabase-js';

import { headers } from 'next/headers';
import { NextResponse } from 'next/server';

import getStripeInstance from '~/core/stripe/get-stripe';
import getLogger from '~/core/logger';

import {
  throwBadRequestException,
  throwInternalServerErrorException,
} from '~/core/http-exceptions';

import {
  addSubscription,
  deleteSubscription,
  updateSubscriptionById,
} from '~/lib/subscriptions/mutations';

import getSupabaseServerClient from '~/core/supabase/server-client';
import {
  setOrganizationSubscriptionData,
  updateOrganization,
} from '~/lib/organizations/database/mutations';
import StripeWebhooks from '~/core/stripe/stripe-webhooks.enum';
import configuration from '~/configuration';
import { ORGANIZATIONS_TABLE } from '~/lib/db-tables';

const STRIPE_SIGNATURE_HEADER = 'stripe-signature';

const webhookSecretKey = 'whsec_D8IJEs2IEkzawbeYZCa6859SkO06Ykc7' as string;
// const webhookSecretKey = 'whsec_JfWGHwQnxdQVIdErK7sMZpkNuOT8jtOa' as string;

/**
 * @description Handle the webhooks from Stripe related to checkouts
 */
export async function POST(request: Request) {
  const logger = getLogger();
  const signature = headers().get(STRIPE_SIGNATURE_HEADER);

  logger.info(`[Stripe] Received Stripe Webhook`);

  if (!webhookSecretKey) {
    return throwInternalServerErrorException(`The variable STRIPE_WEBHOOK_SECRET is unset. Please add the STRIPE_WEBHOOK_SECRET environment variable`);
  }

  // verify signature header is not missing
  if (!signature) {
    return throwBadRequestException();
  }

  const rawBody = await request.text();
  const stripe = await getStripeInstance();

  // create an Admin client to write to the subscriptions table
  const client = getSupabaseServerClient({ admin: true });

  try {
    // build the event from the raw body and signature using Stripe
    const event = stripe.webhooks.constructEvent(
      rawBody,
      signature,
      webhookSecretKey
    );

    logger.info({ type: event.type }, `[Stripe] Processing Stripe Webhook...`);

    switch (event.type) {
      case StripeWebhooks.Completed: {
        const session = event.data.object as Stripe.Checkout.Session;

        switch (session.mode) {
          case 'subscription': {
            const subscriptionId = session.subscription as string;
            const subscription = await stripe.subscriptions.retrieve(subscriptionId);
            console.log(subscription, session, 'subscription');
            await onCheckoutCompleted(client, session, subscription);
            break;
          }

          case 'payment': {
            if (session.metadata?.plan === configuration.stripe.plugin.stripeProductId) {
              await client
                .from(ORGANIZATIONS_TABLE)
                .update({
                  plugin_purchased: true
                })
                .eq('id', Number(session?.client_reference_id?.split('/')[0]));
                break;
            } else {

              const orgPrevSlots = (await client
                .from(ORGANIZATIONS_TABLE)
                .select('slots')
                .eq('id', Number(session?.client_reference_id?.split('/')[0]))
                .single()) as any;

              await client
                .from(ORGANIZATIONS_TABLE)
                .update({ slots: orgPrevSlots?.data?.slots + Number(session?.client_reference_id?.split('/')[1]) })
                .eq('id', Number(session?.client_reference_id?.split('/')[0]));

              break;
            }
          }
        }
      }

      case StripeWebhooks.ChargeFailed: {
        const subscription = event.data.object as Stripe.Subscription;
        await deleteSubscription(client, subscription.id);
        break;
      }

      case StripeWebhooks.AsyncPaymentFailed: {
        const subscription = event.data.object as Stripe.Subscription;
        await deleteSubscription(client, subscription.id);
        break;
      }

      case StripeWebhooks.SubscriptionUpdated: {
        const subscription = event.data.object as Stripe.Subscription;
        await updateSubscriptionById(client, subscription);
        break;
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    logger.error({ error }, `[Stripe] Webhook handling failed`);
    return throwInternalServerErrorException();
  }
}

/**
 * @description When the checkout is completed, we store the order. The
 * subscription is only activated if the order was paid successfully.
 * Otherwise, we have to wait for a further webhook
 */
async function onCheckoutCompleted(
  client: SupabaseClient,
  session: Stripe.Checkout.Session,
  subscription: Stripe.Subscription | any
) {
  const organizationId = getOrganizationIdFromClientReference(session);
  const customerId = session.customer as string;

  // build organization subscription and set on the organization document
  // we add just enough data in the DB, so we do not query
  // Stripe for every bit of data
  // if you need your DB record to contain further data
  // add it to {@link buildOrganizationSubscription}

  const { error, data } = await addSubscription(client, subscription);
  const productId = subscription.plan.id;
  const product = configuration.stripe.products.find((i) => i.stripeProductId === productId);

  await updateOrganization(client, {
    id: organizationId,
    data: { credits: product?.credits, slots: product?.slots },
  });

  if (error)
    return Promise.reject(`Failed to add subscription to the database: ${error}`);

  return setOrganizationSubscriptionData(client, {
    organizationId,
    customerId,
    subscriptionId: data.id,
  });
}

/**
 * @name getOrganizationIdFromClientReference
 * @description Get the organization ID from the client reference ID
 * @param session
 */
function getOrganizationIdFromClientReference(
  session: Stripe.Checkout.Session
) {
  return Number(session.client_reference_id);
}
