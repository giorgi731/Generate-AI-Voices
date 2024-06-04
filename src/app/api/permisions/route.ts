import { NextResponse } from 'next/server';
import { z } from 'zod';
import getSupabaseServerClient from '~/core/supabase/server-client';
import { throwInternalServerErrorException } from '~/core/http-exceptions';
import getLogger from '~/core/logger';
import { createPermision } from '~/lib/permisions/database/mutations';
import { USER_MODEL_PERMISIONS } from '~/lib/db-tables';
import { getAllModels } from '~/lib/models/database/queries';

export async function POST(request: Request) {
  const client = getSupabaseServerClient();

  try {
    const invite = await request.json();

    const userPermisionsData = await client
      .from(USER_MODEL_PERMISIONS)
      .select('*')
      .eq('model_id', invite.model_id);

    if (userPermisionsData?.data?.[0]?.model_id !== invite?.model_id) {
      await createPermision(client, invite);
    }

    return NextResponse.json({
      success: true,
    });
  } catch (e) {
    getLogger().error(e, `Error when creating a model`);

    return throwInternalServerErrorException();
  }
}

