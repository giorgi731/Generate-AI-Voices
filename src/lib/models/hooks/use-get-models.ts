import useSWR from 'swr';
import useSupabase from '~/core/hooks/use-supabase';
import { getModels, getPublicModels } from '../database/queries';
import useUserId from '~/core/hooks/use-user-id';

function useGetModels() {
  const client = useSupabase();
  const userId = useUserId();
  const key = ['models'];
  
  return useSWR(key, async () => {
    if (userId) {
      return getModels(client, userId).then((result) => result);
    } else {
      return getPublicModels(client).then((result) => result);
    }
  });
}

export default useGetModels;
