import useSWR from 'swr';
import useSupabase from '~/core/hooks/use-supabase';
import { getModelBySharedId } from '../database/queries';
import useUserId from '~/core/hooks/use-user-id';

function useGetSharedModels() {
    const client = useSupabase();
    const userId = useUserId();
    const key = ['modelsGetShared'];
    return useSWR(key, async () => {
        if (userId) {
            return getModelBySharedId(client, userId).then((result) => result);
        } else {
            return []
        }
    });
}

export default useGetSharedModels;
