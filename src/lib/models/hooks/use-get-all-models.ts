import useSWR from 'swr';
import useSupabase from '~/core/hooks/use-supabase';
import { getAllModels } from '../database/queries';

function useGetAllModels() {
  const client = useSupabase();
  const key = ['models'];

  return useSWR(key, async () => {
    return getAllModels(client).then((result) => result);
  });
}

export default useGetAllModels;
