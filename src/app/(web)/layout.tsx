import { use } from 'react';
import loadAppData from '~/lib/server/loaders/load-app-data';
import AppRouteShell, {
  RouteShellWithSidebar,
} from '~/app/(app)/components/AppRouteShell';
import loadUserData from '~/lib/server/loaders/load-user-data';
import useGetOrganization from '~/lib/organizations/hooks/use-get-organization';
import getSupabaseServerClient from '~/core/supabase/server-client';
// import I18nProvider from '~/i18n/I18nProvider';
// import AuthChangeListener from '~/app/(app)/components/AuthChangeListener';
// import SiteHeaderSessionProvider from '../(site)/components/SiteHeaderSessionProvider';
// import { GlobalStateProvider } from '~/lib/contexts/GlobalStore';

// import { Metadata } from 'next'
// export const metadata:Metadata = {
// title: 'AI Voice Generator: Voice Cloning & Realistic Text to Speech',
// description: 'Generate studio-quality AI voices in one-click, or choose from our officially licensed AI voice models. Get started instantly.'
// };

export const dynamic = 'force-dynamic';
export const revalidate = 0;

function AppLayout({ children }: React.PropsWithChildren) {
  const appData = use(loadAppData()) as any;
  const userData = use(loadUserData()) as any;



  if ('redirect' in appData) {
    return <AppRouteShell data={userData}>{children}</AppRouteShell>;
  } else {
    return <AppRouteShell data={appData}>{children}</AppRouteShell>;
  }
}

export default AppLayout;

