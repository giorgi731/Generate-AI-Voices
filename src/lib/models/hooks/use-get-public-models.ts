import useSWR from 'swr';
import useSupabase from '~/core/hooks/use-supabase';
import { getPublicModels } from '../database/queries';

function useGetPublicModels() {
  const client = useSupabase();
  const key = ['models'];

  return useSWR(key, async () => {
    return getPublicModels(client).then((result) => result);
  });
}

export default useGetPublicModels;
