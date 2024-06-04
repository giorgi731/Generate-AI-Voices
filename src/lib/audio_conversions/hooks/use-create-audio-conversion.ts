import useSWRMutation from 'swr/mutation';
import useApiRequest from '~/core/hooks/use-api';
import useRefresh from '~/core/hooks/use-refresh';
import AudioConversion from '../types/audio-conversion';

function useCreateAudioConversions(userId: Maybe<string>) {
  const fetcher = useApiRequest<void, AudioConversion>();
  const refresh = useRefresh();
  const key = ['audio-conversion', userId];

  return useSWRMutation(
    key,
    (_, { arg: audio_conversion }: { arg: AudioConversion }) => {
      const path = '/api/audio-conversions';

      return fetcher({
        path,
        body: audio_conversion,
        method: 'POST',
      });
    },
    {
      onSuccess: refresh,
    }
  );
}

export default useCreateAudioConversions;
