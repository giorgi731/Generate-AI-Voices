import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';
import getSupabaseServerClient from '~/core/supabase/server-client';
import { createAudioConversions } from '~/lib/audio_conversions/database/mutations';
import { USERS_TABLE } from '~/lib/db-tables';
import { updateOrganization } from '~/lib/organizations/database/mutations';
import { getUserByEmail } from '~/lib/user/database/queries';

export async function POST(req: Request, res: NextApiResponse) {
  if (req.method === 'POST') {
    const client = getSupabaseServerClient({
      admin: true,
    });

    const data = await client
      .from('auth.users')
      .select('*')
      .eq('email', 'joeylee503@gmail.com');

    // const client = getSupabaseServerClient();
    // const data = await req.json();
    // const newData = data.data?.slice(1).map((row: any) => {
    //   return data.data[0]?.reduce((rowData: any, key: any, index: any) => {
    //     rowData[key] = row[index];
    //     return rowData;
    //   }, {});
    // });

    // const newDataFiltered = newData
    //   .map((i: any) => i.email && i.link && { email: i.email, link: i.link })
    //   .filter((k: any) => k) as any;

    // const result = await getUserByEmail(
    //   client,
    //   newDataFiltered[newDataFiltered.length - 1]?.email
    // );

    // await client
    //   .from('users')
    //   .update({ neversea: true })
    //   .match({ id: result.data.id });

    // await createAudioConversions(client, {
    //   user_id: result.data.id,
    //   date: new Date().toISOString(),
    //   duration: "2000",
    //   name: "",
    //   input_url: '',
    //   model_id: 23,
    //   options: {
    //     pitch: 'test1',
    //     style: 'test2',
    //     vocal: 'test3',
    //   },
    //   result: [
    //     newDataFiltered[newDataFiltered.length - 1]?.link.slice(0, -1) + '1',
    //   ],
    // });

    return NextResponse.json(data);
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
