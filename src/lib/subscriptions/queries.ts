import type { SupabaseClient } from '@supabase/supabase-js';
import {
  ORGANIZATIONS_SUBSCRIPTIONS_TABLE,
  SUBSCRIPTIONS_TABLE,
} from '~/lib/db-tables';
import type { Database } from '../../database.types';
import { getOrganizationById } from '../organizations/database/queries';

type Client = SupabaseClient<Database>;

/**
 * @name getOrganizationSubscription
 * @description Returns the organization's subscription
 */
export async function getOrganizationSubscription(
  client: Client,
  organizationId: number
) {
  return client
    .from(ORGANIZATIONS_SUBSCRIPTIONS_TABLE)
    .select(`*`)
    .eq('organization_id', organizationId)
    .throwOnError()
    .single();
}

/**
 * @name getOrganizationBySubscriptionId
 * @description Retrieve an Organization record given its
 * subscription ID {@link subscriptionId}. Throws an error when not found.
 */
export async function getOrganizationBySubscriptionId(
  client: Client,
  subscriptionId: number
) {
  // console.log(subscriptionId, 'wiaiwia');
  return client
    .from(SUBSCRIPTIONS_TABLE)
    .select<string>(
      `
      *
       `
    )
    .eq('id', subscriptionId)
    .single()
    .throwOnError();
}

/**
 * @name getOrganizationSubscriptionActive
 * @description Returns whether the organization is on an active
 * subscription, regardless of plan.
 */
export async function getOrganizationSubscriptionActive(
  client: Client,
  organizationId: number
) {
  try {
    const { data: subscription } = await getOrganizationSubscription(
      client,
      organizationId
    );

    // const { data: organization } = await getOrganizationById(
    //   client,
    //   organizationId
    // );

    // const { data } = await getOrganizationBySubscriptionId(
    //   client,
    //   subscription?.subscription_id
    // );

    // return { data, organization };
  } catch (err: any) {
    return {
      error: err?.message,
    };
  }
}
