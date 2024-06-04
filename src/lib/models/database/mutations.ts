import type { SupabaseClient } from '@supabase/supabase-js';
import { MODELS_TABLE } from '~/lib/db-tables';
import type { Database } from '../../../database.types';
import Model from '../types/model';

type Client = SupabaseClient<Database>;

/**
 * @param client
 * @param model
 */

export async function createModel(client: Client, model: Partial<any>) {
  return client.from(MODELS_TABLE).insert(model).throwOnError();
}

export async function deleteModel(client: Client, modelId:any) {
  // return client.from(MODELS_TABLE).delete().match({id: modelId}).throwOnError();
  return client.from(MODELS_TABLE).update({ deleted: true }).match({id: modelId}).throwOnError();
}

export async function updateModel(
  client: Client,
  model: Partial<any>,
  modelId: any
) {
  return client
    .from(MODELS_TABLE)
    .update(model)
    .eq('id', modelId)
    .throwOnError();
}
