import useSWR from 'swr';
import useSupabase from '~/core/hooks/use-supabase';
import { ORGANIZATIONS_TABLE } from '~/lib/db-tables';
import { parseOrganizationIdCookie } from '~/lib/server/cookies/organization.cookie';
import getLogger from '~/core/logger';
import { use } from 'react';

function useGetOrganization() {
  const client = useSupabase();
  const key = ['organizations'];

  return useSWR(key, async () => {
    const userId = await client.auth.getSession();
    const orgId = await client
      .from(ORGANIZATIONS_TABLE)
      .select('*')
      .eq('name', userId.data.session?.user.email)
      .single();

    return orgId;
  });
}

export default useGetOrganization;
