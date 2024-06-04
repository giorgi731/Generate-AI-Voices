import { NextResponse } from 'next/server';
import { getLogger } from 'nodemailer/lib/shared';
import { throwInternalServerErrorException } from '~/core/http-exceptions';
import getSupabaseServerClient from '~/core/supabase/server-client';
import { deleteModel } from '~/lib/models/database/mutations';
import { addOrganizationSlots } from '~/lib/user/database/mutations';

export async function POST(request: Request) {
  try {

    const client = getSupabaseServerClient();
    const body = (await request.json()) as any;
    const userId = body.modelId;
    const orgId = body.orgId;

    await Promise.all([
      deleteModel(client, userId),
      addOrganizationSlots(client, {id: orgId, slots: 1})
    ]);
    
    return NextResponse.json({
      success: true,
    });
  }  catch (e) {
    getLogger().error(e, `Error when creating a model`);

    return throwInternalServerErrorException();
  }
}