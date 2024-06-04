import useSWR from 'swr';
import useSupabase from '~/core/hooks/use-supabase';
import getCurrentOrganization from '~/lib/server/organizations/get-current-organization';

function useGetCurrentOrganization() {
  const client = useSupabase();

  const fetcher = async (data: any) => {
    const result = (await getCurrentOrganization(client, { userId: data.userId, organizationId: data.orgId })) as any;

    if (result?.error) {
      return false;
    }
    return result;
  };

  const mutate = async (userId: string, orgId: number) => {
    return fetcher({userId, orgId});
  };

  return {
    mutate,
    getCurrentOrganization: (userId: string, orgId: number) =>
      useSWR(["organization", userId, orgId ], () => fetcher({ userId, orgId })),
  };
}

export default useGetCurrentOrganization;
