import jwt from 'jsonwebtoken';
import configuration from '~/configuration';
import useSWRMutation from 'swr/mutation';
import useSupabase from './use-supabase';

interface Credentials {
  email: string;
  password: string;
  uuid?: string;
}

/**
 * @name useSignUpWithEmailAndPassword
 */
function useSignUpWithEmailAndPassword() {
  const client = useSupabase();
  const key = ['auth', 'sign-up-with-email-password'];

  return useSWRMutation(
    key,
    async (_, { arg: credentials }: { arg: Credentials }) => {
      const emailRedirectTo = [
        configuration.site.siteUrl,
        configuration.paths.signIn,
      ].join('/');

      const response = await fetch("/api/devices", {
        method: "POST",
        body: JSON.stringify({ deviceId: credentials.uuid }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (data.registered) {
        throw 'Device already registered';
      };
      
      return client.auth
        .signUp({
          ...credentials,

          options: {
            data: {
              device_id: credentials.uuid
            },
            emailRedirectTo,
          },
        })
        .then(async (response: any) => {
          if (response.error) {
            throw response.error.message;
          }

          // const userId = response?.data?.user?.id;

          // await client
          //   .from(USERS_TABLE)
          //   .update({device_id: credentials.uuid})
          //   .eq('id', userId)
          //   .throwOnError();
          // await client
          //   .from(ORGANIZATIONS_TABLE)
          //   .insert({

          //   })
          // await client
          //   .rpc('create_new_organization', {
          //     org_name: response?.data?.user?.email,
          //     api_key: generateApiKey(userId),
          //     credits: 1500,
          //     user_id: userId,
          //     create_user: false,
          //   })
          //   .throwOnError()
          //   .single();

          // Return the response data along with the API Key

          // console.log(response, "vedemmmm???")
          // if (response.error) {
          //   return { error: response?.error?.message };
          // }
          return { ...response.data };
        });
    }
  );
}

function generateApiKey(userId: string) {
  // Encrypt the payload using JWT and HS256 algorithm
  const apiKey = jwt.sign(userId, 'revocalize2023!@#', { algorithm: 'HS256' });

  return apiKey;
}

export default useSignUpWithEmailAndPassword;
