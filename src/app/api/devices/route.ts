import { NextResponse } from 'next/server';
import getSupabaseServerClient from '~/core/supabase/server-client';
import { throwInternalServerErrorException } from '~/core/http-exceptions';
import getLogger from '~/core/logger';
import { USERS_TABLE } from '~/lib/db-tables';

export const maxDuration = 60;

export async function POST(request: Request) {
  const client = getSupabaseServerClient({ admin: true });
  const body = await request.json();
  const device_id = body.deviceId;

  try {
    const { data, error } = await client.from(USERS_TABLE).select().eq('device_id', device_id);

    if (error) {
      getLogger().error(error, 'Error when querying the USERS_TABLE');
      return throwInternalServerErrorException();
    }

    if (data && data.length > 0) {
      return NextResponse.json({ registered: true });
    }

    return NextResponse.json({ registered: false });
  } catch (e) {
    getLogger().error(e, 'Error when processing the POST request');
    return NextResponse.json({ error: 'Internal Server Error' });
  }
}
