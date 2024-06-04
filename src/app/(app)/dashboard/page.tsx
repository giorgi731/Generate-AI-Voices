import dynamic from 'next/dynamic';

import Trans from '~/core/ui/Trans';
import { Squares2X2Icon } from '@heroicons/react/24/outline';

import AppHeader from '~/app/(app)/components/AppHeader';
import AppContainer from '~/app/(app)/components/AppContainer';

const DashboardDemo = dynamic(
  () => import('~/app/(app)/dashboard/DashboardDemo'),
  {
    ssr: false,
  }
);

export const metadata = {
  title: 'Dashboard',
};

function DashboardPage() {
  return (
    <>
      {/* <Trans i18nKey={'common:dashboardTabLabel'} /> */}
      <AppHeader>
        <input
          className="rounded-[5px] bg-[#2B2041] px-[16px] py-[3px] text-[13px]"
          placeholder="Search artist voices"
        />
      </AppHeader>

      <AppContainer>
        <DashboardDemo />
      </AppContainer>
    </>
  );
}

export default DashboardPage;
