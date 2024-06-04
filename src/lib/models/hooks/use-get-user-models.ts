import useSWR from 'swr';
import useSupabase from '~/core/hooks/use-supabase';
import { getUserModels } from '../database/queries';
import useUserId from '~/core/hooks/use-user-id';

function useGetUserModels() {
  const client = useSupabase();
  const userId = useUserId();
  const key = ['userModels'];

  return useSWR(key, async () => {
    if (userId) {
      return getUserModels(client, userId).then((result) => result);
    } else {
      return []
    }
  });
}

export default useGetUserModels;
