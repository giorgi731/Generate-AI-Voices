import type { SupabaseClient } from '@supabase/supabase-js';
import type { User } from '@supabase/gotrue-js';
import { MEMBERSHIPS_TABLE, ORGANIZATIONS_TABLE } from '~/lib/db-tables';
import type Membership from '~/lib/organizations/types/membership';
import type MembershipRole from '~/lib/organizations/types/membership-role';
import type Organization from '~/lib/organizations/types/organization';
import type { OrganizationSubscription } from '~/lib/organizations/types/organization-subscription';
import type { Database } from '../../../database.types';
import type UserData from '~/core/session/types/user-data';

type Client = SupabaseClient<Database>;

const FETCH_ORGANIZATION_QUERY = `
  id,
  name,
  credits,
  api_key,
  slots,
  logoURL: logo_url,
  plugin_purchased,
  logo_url,
  user_ids,
  created_at,
  subscription: organizations_subscriptions (
    customerId: customer_id,
    data: subscription_id (
      priceId: price_id
    )
  )
`;

export type UserOrganizationData = {
  role: MembershipRole;
  organization: Organization & {
    subscription?: {
      customerId: Maybe<string>;
      data: OrganizationSubscription;
    };
  };
};

/**
 * @name getOrganizationsByUserId
 * @description Get all the organizations where the user {@link userId} is a member
 * @param client
 * @param userId
 */
export function getOrganizationsByUserId(client: Client, userId: string) {
  return client
    .from(MEMBERSHIPS_TABLE)
    .select<string, UserOrganizationData>(
      `
        role,
        userId: user_id,
        organization:organization_id (${FETCH_ORGANIZATION_QUERY})`
    )
    .eq('user_id', userId)
    .throwOnError();
}

/**
 * @name getFirstOrganizationByUserId
 * @description Get the first organization where the user {@link userId} is a member
 * @param client
 * @param userId
 */
export async function getFirstOrganizationByUserId(
  client: Client,
  userId: string
) {
  return client
    .from(MEMBERSHIPS_TABLE)
    .select<string, UserOrganizationData>(
      `
        role,
        userId: user_id,
        organization:organization_id (${FETCH_ORGANIZATION_QUERY})
      )`
    )
    .eq('user_id', userId)
    .limit(1)
    .throwOnError()
    .single();
}

export async function getOrganizationInvitedMembers(
  client: Client,
  organizationId: number
) {
  return client
    .from(MEMBERSHIPS_TABLE)
    .select<string, Membership>(
      `
      id,
      role,
      invitedEmail: invited_email
    `
    )
    .eq('organization_id', organizationId)
    .not('code', 'is', null)
    .throwOnError();
}

/**
 * @name getOrganizationMembers
 * @description Get all the members of an organization
 * @param client
 * @param organizationId
 */
export function getOrganizationMembers(client: Client, organizationId: number) {
  return client
    .from(MEMBERSHIPS_TABLE)
    .select<
      string,
      {
        membershipId: number;
        role: MembershipRole;
        data: UserData;
      }
    >(
      `
        membershipId: id,
        role,
        data: user_id (
          id,
          photoUrl: photo_url,
          displayName: display_name
          userName: user_name
        )
       `
    )
    .eq('organization_id', organizationId)
    .is('code', null);
}

/**
 * @name getOrganizationById
 * @description Returns the Database record of the organization by its ID
 * {@link organizationId}
 */
export function getOrganizationById(client: Client, organizationId: string) {
  return client
    .from(ORGANIZATIONS_TABLE)
    // .select('*')
    .select<string, Organization & { subscription: OrganizationSubscription }>(FETCH_ORGANIZATION_QUERY)
    .eq('name', organizationId)
    .throwOnError()
    .single();

    
}

/**
 * @name getOrganizationByCustomerId
 * @description Retrieve an organization using the customer ID assigned by
 * Stripe after the first checkout, e,g. when the customer record is created
 * @param client
 * @param customerId
 */
export function getOrganizationByCustomerId(
  client: Client,
  customerId: string
) {
  return client
    .from(ORGANIZATIONS_TABLE)
    .select(
      `
      id,
      name,
      logoURL: logo_url,
      subscription: organizations_subscriptions (
        customerId: customer_id
      )
      `
    )
    .eq('organizations_subscriptions.customer_id', customerId)
    .throwOnError()
    .single();
}

/**
 * @name getMembersAuthMetadata
 * @param client
 * @param userIds
 */
export function getMembersAuthMetadata(client: Client, userIds: string[]) {
  return Promise.all(
    userIds.map((userId) => {
      const response = client.auth.admin.getUserById(userId);

      return response.then((response) => {
        return response.data.user as User;
      });
    }) ?? []
  );
}
