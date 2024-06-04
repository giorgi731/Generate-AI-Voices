import useSWR from 'swr';
import useSupabase from '~/core/hooks/use-supabase';
import { getAudioConversions } from '../database/queries';
import useUserId from '~/core/hooks/use-user-id';

function useGetAudioConversions(
  limit: number = 10,
  page: number = 1
) {
  const client = useSupabase();
  const key = ['audio-conversion'];
  const userId = useUserId();
  const offset = (page - 1) * limit;

  return useSWR([key, page], async () => {
    if (userId) {

      return getAudioConversions(client, userId!, limit, offset).then((result) => result);
    } else {
      return []
    }
  });
}

export default useGetAudioConversions;
