import { SupabaseClient } from '@supabase/supabase-js';
import { AUDIO_CONVERSIONS_TABLE, MODELS_TABLE } from '~/lib/db-tables';
import type AudioConversion from '~/lib/audio_conversions/types/audio-conversion';
import type { Database } from '../../../database.types';

type Client = SupabaseClient<Database>;

export async function getAudioConversions(
  client: Client,
  userId: string,
  limit: number = 10,
  offset: number = 0
) {
  const { data, error } = await client
    .from(AUDIO_CONVERSIONS_TABLE)
    .select<string, AudioConversion>(`*`)
    .eq('user_id', userId)
    .neq('result', null)
    .order('date', { ascending: false })
    .range(offset, offset + limit - 1)
    .throwOnError();

  if (error) {
    throw error;
  }

  const modelIds = Array.from(
    new Set(data.map((audioConversion) => audioConversion.model_id))
  );

  const modelPromises = modelIds.map((modelId) =>
    getModelById(client, modelId)
  );
  const modelResults = (await Promise.allSettled(modelPromises)) as any;

  const modelsCache: Record<any, any> = {};

  const audioConversionsWithModels = data.map((audioConversion) => {
    const { model_id } = audioConversion as any;

    if (modelResults[modelIds.indexOf(model_id)].status === 'fulfilled') {
      const model = modelResults[modelIds.indexOf(model_id)].value;

      // Store the fetched model in the cache
      modelsCache[model_id] = model;

      return { ...audioConversion, model };
    } else if (modelsCache[model_id]) {
      // Retrieve the model from the cache if available
      return { ...audioConversion, model: modelsCache[model_id] };
    } else {
      // Handle error case where model data couldn't be fetched
      return { ...audioConversion, model: null };
    }
  });

  return audioConversionsWithModels;
}

export async function getModelById(client: Client, modelId: any) {
  const { data, error } = await client
    .from(MODELS_TABLE)
    .select<string, any>(`*`)
    .eq('id', modelId)
    .throwOnError();

  if (error) {
    throw error;
  }

  return data[0];
}

export async function getAudioConversionById(
  client: Client,
  conversionId: string
) {
  console.log(conversionId, 'ualalalal');
  const { data, error } = await client
    .from(AUDIO_CONVERSIONS_TABLE)
    .select<string, AudioConversion>(`*`)
    .eq('id', conversionId)
    .throwOnError();

  if (error) {
    throw error;
  }
  
  return data[0];
}
