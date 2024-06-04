import { NextResponse } from 'next/server';
import axios from 'axios';
import { updateModel } from '~/lib/models/database/mutations';
import getSupabaseServerClient from '~/core/supabase/server-client';

export async function POST(request: Request) {
  const formData = await request.formData();
  const jsonData = Object.fromEntries(formData) as any;
  const client = getSupabaseServerClient();

  try {
    const response = await axios.post(
      'https://api.revocalize.ai/models/train',
      jsonData,
      {
        headers: {
          Authorization: request.headers.get('Authorization'),
          'Content-Type': 'application/json',
        },
      }
    );

    await updateModel(
      client,
      {
        audio_demo_url: JSON.parse(jsonData.training_data)?.[0],
        image_url: jsonData.imageUrl,
      },
      response.data.model_id
    );

    return NextResponse.json(response.data);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error });
  }
}
