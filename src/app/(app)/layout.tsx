import { use } from 'react';
import { redirect } from 'next/navigation';

import loadAppData from '~/lib/server/loaders/load-app-data';
import AppRouteShell from '~/app/(app)/components/AppRouteShell';
import getSupabaseServerClient from '~/core/supabase/server-client';

function AppLayout({ children }: React.PropsWithChildren) {
  const data = use(loadAppData()) as any;
  // const client = getSupabaseServerClient();
  // const org = use(client.from("organizations").select("*").eq("name", data?.user?.email).single())

  if ('redirect' in data) {
    console.log('redirecting to', data.destination);
    return redirect(data.destination);
  }

  return <AppRouteShell data={{ ...data, organization: null }}>{children}</AppRouteShell>;
}

export default AppLayout;
