import useSWR from 'swr';
import useSupabase from '~/core/hooks/use-supabase';
import { setShareModel } from '../database/queries';

function useSetShareModel() {
    const client = useSupabase();

    const fetcher = async (owner_id: string, target_id: string, model_id: number) => {
        const result = await setShareModel(client, owner_id, target_id, model_id);
        return result;
    };

    const mutate = async (owner_id: string, target_id: string, model_id: number) => {
        return fetcher(owner_id, target_id, model_id);
    };

    return {
        mutate,
        setShareModel: (owner_id: string, target_id: string, model_id: number) => useSWR({owner_id, target_id, model_id}, () => fetcher(owner_id, target_id, model_id)),
    };
}

export default useSetShareModel;
