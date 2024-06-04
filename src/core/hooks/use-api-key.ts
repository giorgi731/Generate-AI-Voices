import { useState, useEffect } from 'react';
import useUserSession from '~/core/hooks/use-user-session';
import useSupabase from './use-supabase';
import jwt from 'jsonwebtoken';
import { USERS_TABLE } from '~/lib/db-tables';

/**
 * @name useApiKey
 * @description Hook to fetch the user's api key
 */
function useApiKey() {
  const user = useUserSession();
  const client = useSupabase();
  const [apiKey, setApiKey] = useState(user?.data?.api_key || null);

  useEffect(() => {
    if (!user || !user.data) {
      console.error('User is not logged in');
      return;
    }
    if(!apiKey){
      // Generate a new api key
      const newApiKey = jwt.sign(user.data.id, 'revocalize2023!@#', { algorithm: 'HS256' });

      // Update the user's api key in the database
      client.from(USERS_TABLE)
      .update({ api_key: newApiKey })
      .eq('id', user.data.id)
      .then(() => {
        //   console.log(`API key updated successfully for user ${user.data.id}`)
          setApiKey(newApiKey);
      })
    }
  }, [user, apiKey, client]);

  return apiKey;
}

export default useApiKey;