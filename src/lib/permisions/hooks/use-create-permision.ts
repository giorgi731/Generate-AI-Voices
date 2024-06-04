import useSWRMutation from 'swr/mutation';
import useApiRequest from '~/core/hooks/use-api';
import useRefresh from '~/core/hooks/use-refresh';

function useCreatePermision() {
  const fetcher = useApiRequest<void, any>();
  const refresh = useRefresh();
  const key = ['permision'];

  return useSWRMutation(
    key,
    (_, { arg: invite }: { arg: any }) => {
      const path = '/api/permisions';

      return fetcher({
        path,
        body: invite,
        method: 'POST',
      });
    },
    {
      onSuccess: refresh,
    }
  );
}

export default useCreatePermision;
