import useSWRMutation from 'swr/mutation';
import useApiRequest from '~/core/hooks/use-api';
import useRefresh from '~/core/hooks/use-refresh';
import Model from '../types/model';

function useCreateModel(userId: Maybe<string>) {
  const fetcher = useApiRequest<void, { model: Model }>();
  const refresh = useRefresh();
  const key = ['models', userId];

  return useSWRMutation(
    key,
    (_, { arg: model }: { arg: any }) => {
      const path = '/api/models';

      return fetcher({
        path,
        body: { ...model },
        method: 'POST',
      });
    },
    {
      onSuccess: refresh,
    }
  );
}

export default useCreateModel;
