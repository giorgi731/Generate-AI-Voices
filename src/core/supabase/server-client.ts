import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { headers, cookies } from 'next/headers';
import invariant from 'tiny-invariant';
import type { Database } from '~/database.types';
import { SupabaseClient, createClient } from '@supabase/supabase-js';

function getSupabaseServerClient(
  params = {
    admin: false,
  }
): SupabaseClient<any, "public", any> { // Adjust the return type here if necessary
  const env = process.env;

  invariant(env.NEXT_PUBLIC_SUPABASE_URL, `Supabase URL not provided`);
  invariant(env.NEXT_PUBLIC_SUPABASE_ANON_KEY, `Supabase Anon Key not provided`);
  cookies().getAll(); // Keep cookies in the JS execution context for Next.js build
  
  
  if (params.admin) {
    return createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY!) as unknown as SupabaseClient<any, 'public', any>
  }
  else {
    return createServerComponentClient<Database>({
      supabaseUrl: env.NEXT_PUBLIC_SUPABASE_URL,
      supabaseKey: params.admin ? env.SUPABASE_SERVICE_ROLE_KEY : env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      headers,
      cookies,
    } as any);

  }
  // Cast the client to the expected generic type
}

export default getSupabaseServerClient;
