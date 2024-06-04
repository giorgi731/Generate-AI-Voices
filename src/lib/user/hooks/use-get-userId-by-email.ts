import useSWR from 'swr';
import useSupabase from '~/core/hooks/use-supabase';
import { getUserByEmail } from '../database/queries';

function useGetUserIdByEmail() {
  const client = useSupabase();
  
  const fetcher = async (email:any) => {
    const result = await getUserByEmail(client, email);
    return result;
  };

  const mutate = async (email:any) => {
    return fetcher(email);
  };

  return {
    mutate,
    getUserIdByEmail: (email:any) => useSWR(email, () => fetcher(email)),
  };
}

export default useGetUserIdByEmail;
