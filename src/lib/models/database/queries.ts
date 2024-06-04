import type { SupabaseClient } from '@supabase/supabase-js';
import { MODELS_TABLE, USER_MODEL_PERMISIONS } from '~/lib/db-tables';
import type { Database } from '../../../database.types';
import Model from '../types/model';

type Client = SupabaseClient<Database>;

export async function getModels(client: Client, userId: any) {
  const publicModelsPromise = client
    .from(MODELS_TABLE)
    .select<string, Model>(`*`)
    .eq('public', true)
    .eq('is_rvc', true)
    .eq('enabled', true);

  const userModelsPromise = client
    .from(MODELS_TABLE)
    .select<string, Model>(`*`)
    .eq('created_by', userId)
    .eq('is_rvc', true)
    .eq('enabled', true);

  const permissionsPromise = client
    .from(USER_MODEL_PERMISIONS)
    .select('*')
    .eq('user_id', userId);

  const sharedModelsPromise =  client
    .from('share_model')
    .select(`
    model_id,
    models(*)
  `)
  .eq('shared_user', userId)
  .throwOnError();

  const [publicModelsData, userModelsData, permissionsData, sharedModelsData] = await Promise.all([
    publicModelsPromise,
    userModelsPromise,
    permissionsPromise,
    sharedModelsPromise
  ]).catch((error) => {
    throw error;
  });

  const modelIds = permissionsData.data ? permissionsData.data.map((permission) => permission.model_id) : [];

  const accessModelsData = await client
    .from(MODELS_TABLE)
    .select<string, Model>(`*`)
    .in('id', modelIds)
    .eq('is_rvc', true)
    .eq('enabled', true)
    .throwOnError();

  const modelsData = [
    ...new Map([
      ...(sharedModelsData.data?.map(modelData => modelData.models as any) || []),
      ...(sharedModelsData.data?.map(modelData => modelData.models as any) || []),
      ...(publicModelsData.data || []),
      ...(userModelsData.data || []),
      ...(accessModelsData.data || []),
      ...(accessModelsData.data || []),
    ].map(item => [item.id, item])).values()
  ];

  return modelsData;
}

export async function getAllModels(client: Client) {
  const { data, error } = await client
    .from(MODELS_TABLE)
    .select('*')
    .eq('is_rvc', true)
    .throwOnError();

  if (error) {
    throw error;
  }

  return data;
}

export async function getPublicModels(client: Client) {
  const { data, error } = await client
    .from(MODELS_TABLE)
    .select<string, Model>('*')
    .eq('public', true)
    .eq('is_rvc', true)
    .throwOnError();

  if (error) {
    throw error;
  }

  return data;
}

export async function getUserModels(
  client: Client,
  userId: any
  ) {
    const { data, error } = await client
    .from(MODELS_TABLE)
    .select('*, share_model(*)')
    .eq('created_by', userId)
    .eq('is_rvc', true)
    .neq('deleted', true)
    .throwOnError();
    if (error) {
      throw error;
    }
    return data;
  }

  export async function getModelById(client: Client, modelId: any) {
    const { data, error } = await client
    .from(MODELS_TABLE)
    .select<string, any>(`*`)
    .eq('id', modelId)
    .eq('is_rvc', true)
    .throwOnError();
    if (error) {
      throw error;
    }
    return data[0];
  }

  export async function getModelBySharedId(client: Client, userID: any) {
    const { data, error } = await client
    .from('share_model')
    .select(`
    model_id,
    models(*)
  `)
  .eq('shared_user', userID)
  .throwOnError();
  if (error) {
    throw error;
  }

  return data.map(model => {
    const tempModel = model.models as any;
    return tempModel;
  })
}