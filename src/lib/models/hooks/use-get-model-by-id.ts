import useSWR from 'swr';
import useSupabase from '~/core/hooks/use-supabase';
import { getModelById } from '../database/queries';

function useGetModelById(modelId: any) {
  const client = useSupabase();
  const key = ['model'];

  return useSWR(key, async () => {
    return getModelById(client, modelId).then((result) => result);
  });
}

export default useGetModelById;
