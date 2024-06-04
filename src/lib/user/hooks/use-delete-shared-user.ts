import useSWR from 'swr';
import useSupabase from '~/core/hooks/use-supabase';
import { deleteShared } from '../database/queries';

function useDeleteSharedUsers() {
    const client = useSupabase();
    const fetcher = async (sharedID: any) => {
        const result = await deleteShared(client, sharedID);
        return result;
    };

    const mutate = async (sharedID : any) => {
        return fetcher(sharedID);
    };

    return {
        mutate,
        deleteShared: (sharedID: any) => useSWR(sharedID, () => fetcher(sharedID)),
    };
}

export default useDeleteSharedUsers;
