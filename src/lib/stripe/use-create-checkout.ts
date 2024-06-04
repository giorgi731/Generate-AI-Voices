import useApiRequest from '~/core/hooks/use-api';
import useRefresh from '~/core/hooks/use-refresh';

export default function useCreateCheckout(userId: Maybe<string>) {
  const fetcher = useApiRequest<void, { plan: any }>();
  const refresh = useRefresh();

  const createCheckout = async (plan: any) => {
    const path = '/api/stripe/checkout-test-mode';
    const response = await fetcher({
      path,
      body: { plan: { ...plan, userId } },
      method: 'POST',
    });

    refresh();

    return response;
  };

  return { createCheckout };
}
