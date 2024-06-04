import useSupabase from '~/core/hooks/use-supabase';
import { getShared } from '../database/queries';

function useGetSharedUsers() {
    const client = useSupabase();
    const fetcher = async (modelID: any) => {
        const result = await getShared(client, modelID);
        return result;
    };

    const mutate = async (modelID: any) => {
        return fetcher(modelID);
    };

    return {
        mutate
    };
}

export default useGetSharedUsers;
