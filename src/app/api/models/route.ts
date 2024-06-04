import { NextResponse } from 'next/server';
import getSupabaseServerClient from '~/core/supabase/server-client';
import { throwInternalServerErrorException } from '~/core/http-exceptions';
import getLogger from '~/core/logger';
import { createModel } from '~/lib/models/database/mutations';

export async function POST(request: Request) {
  const client = getSupabaseServerClient();

  try {
    const model = await request.json();

    await createModel(client, model);

    return NextResponse.json({
      success: true,
    });
  } catch (e) {
    getLogger().error(e, `Error when creating a model`);

    return throwInternalServerErrorException();
  }
}
