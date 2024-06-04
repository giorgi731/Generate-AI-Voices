import { NextResponse } from 'next/server';
import { z } from 'zod';
import getSupabaseServerClient from '~/core/supabase/server-client';
import { throwInternalServerErrorException } from '~/core/http-exceptions';
import getLogger from '~/core/logger';
import { createAudioConversions } from '~/lib/audio_conversions/database/mutations';

export const maxDuration = 60;

export async function POST(request: Request) {
  const client = getSupabaseServerClient();

  try {
    const audio_concersion = await request.json();
    const id = await createAudioConversions(client, audio_concersion);

    return NextResponse.json(id);
  } catch (e) {
    getLogger().error(e, `Error when creating an audio-conversions`);

    return throwInternalServerErrorException();
  }
}
function getBodySchema() {
  return z.object({
    model_id: z.number(),
    input_url: z.string(),
    options: z.object({
      pitch: z.string(),
      vocal: z.string(),
      style: z.string(),
    }),
    date: z.string().datetime(),
    user_id: z.string(),
    duration: z.string(),
    name: z.string(),
    result: z.array(z.string()),
  });
}
