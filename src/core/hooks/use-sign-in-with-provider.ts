import type { SignInWithOAuthCredentials } from '@supabase/gotrue-js';
import useMutation from 'swr/mutation';
import useSupabase from '~/core/hooks/use-supabase';

/**
 * @name useSignInWithProvider
 */
function useSignInWithProvider() {
  const client = useSupabase();
  const key = ['auth', 'sign-in-with-provider'];

  console.log("credentials providers")

  return useMutation(
    key,
    async (_, { arg: credentials }: { arg: SignInWithOAuthCredentials }) => {
      console.log(credentials, "credentials providers")
      return client.auth.signInWithOAuth(credentials).then((response) => {
        console.log(credentials, response, "credentials providers")
        if (response.error) {
          throw response.error.message;
        }

        return response.data;
      });
    }
  );
}

export default useSignInWithProvider;
