"use client";
import useSWR from 'swr';
import useSupabase from '~/core/hooks/use-supabase';
import { getOrganizationById } from '~/lib/organizations/database/queries';
import { getCookie } from '~/core/generic/cookies';

function useGetOrganizationSubscriptionActive() {
  const client = useSupabase();
  const key = ['organizations1'];
  // const orgId = getCookie("organizationId")

  return useSWR(key, async () => {
    try {
      // const { data: subscription } = await getOrganizationSubscription(
      //   client,
      //   organization?.id || 0
      // );

      // const { data } = await getOrganizationBySubscriptionId(
      //   client,
      //   subscription?.subscription_id
      // );

      const { data: userEmail } = await client.auth.getSession()
      const { data: organizationData } = await getOrganizationById(client, String(userEmail.session?.user.email));

      return organizationData;
    } catch (err: any) {
      return false;
    }
  });
}

export default useGetOrganizationSubscriptionActive;
