import type { SupabaseClient } from '@supabase/supabase-js';
import { AUDIO_CONVERSIONS_TABLE } from '~/lib/db-tables';
import AudioConvention from '../types/audio-conversion';

type Client = SupabaseClient<any>;

/**
 * @param client
 * @param audio_conversions
 * @returns Inserted ID
 */
export async function createAudioConversions(
  client: Client,
  audio_conversions: Partial<AudioConvention>
): Promise<number | null> {
  const { data, error }: any = await client
    .from(AUDIO_CONVERSIONS_TABLE)
    .insert(audio_conversions)
    .select('id')
    .single();

  if (error) {
    console.error('Error inserting data:', error);
    return null;
  }

  if (data) {
    return data.id;
  }

  return null;
}
