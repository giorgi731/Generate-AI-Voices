import useSWR from 'swr';
import useSupabase from '~/core/hooks/use-supabase';
import { getAudioConversionById } from '../database/queries';

function useGetAudioConversionById(conversionId: any) {
  const client = useSupabase();
  const key = ['audio-conversion'];

  return useSWR(key, async () => {
    return getAudioConversionById(client, conversionId).then(
      (result) => result
    );
  });
}

export default useGetAudioConversionById;
