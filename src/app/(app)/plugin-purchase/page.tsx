'use client'
import React, { useCallback, useEffect, useState } from 'react'
import { Stripe, loadStripe } from '@stripe/stripe-js';
import useCurrentOrganization from "~/lib/organizations/hooks/use-current-organization";
import useUserId from '~/core/hooks/use-user-id';
import configuration from '~/configuration';
import Loading from '../loading';
import { useRouter } from 'next/navigation';

export default function PluginPurchasePage(props: any) {
  const organization = useCurrentOrganization();
  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
  const userId = useUserId();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  const redirectToCheckoutPage = useCallback(async () => {
    const stripe = (await stripePromise) as Stripe;
    if (organization && userId) {
      if (!organization.plugin_purchased) {
        const response = await fetch("/api/stripe/checkout", {
          method: "post",
          body: JSON.stringify({
            products: [{ price: configuration.stripe.plugin.stripeProductId, quantity:1 }],
            userId: userId,
            organizationId: organization?.id,
            success_url: "https://www.revocalize.ai/download-plugin/",
            cancel_url: "https://www.revocalize.ai/" 
          }, null),
          headers: {
            "content-type": "application/json",
          },
        });

        const session = await response.json();
        setLoading(false)
        const { error } = await stripe.redirectToCheckout({
          sessionId: session.id,
        });
      } else {
        setLoading(false);
        router.push('/download-plugin')
      }
    }
  }, [organization, userId])

  useEffect(() => {
    redirectToCheckoutPage()
  }, [redirectToCheckoutPage])

  return (
    <>
      {loading && (
        <Loading />
      )}
    </>
  )
}

