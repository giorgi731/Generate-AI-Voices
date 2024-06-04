import useSWRMutation from 'swr/mutation';
import useSupabase from '~/core/hooks/use-supabase';
import { getUserModels } from '../database/queries';
import { deleteModel, updateModel } from '../database/mutations';

export function useUpdateModel(userId: Maybe<string>) {
  const client = useSupabase();
  const key = ['model', 'update'];

  return useSWRMutation(key, async (_, { arg: model }: { arg: any }) => {
    await updateModel(client, model, model.id);
    return getUserModels(client, userId).then((result) => result);
  });
}

export function useRemoveModel(userId: Maybe<string>) {
  const client = useSupabase();
  const key = ['model', 'delete'];

  return useSWRMutation(key, async (_, { arg: modelId }: { arg: string }) => {
    await deleteModel(client, modelId);
    return getUserModels(client, userId).then((result) => result);
  });
}
