import type { Stripe } from 'stripe';

export interface OrganizationSubscription {
  id: string;
  priceId: string;
}
