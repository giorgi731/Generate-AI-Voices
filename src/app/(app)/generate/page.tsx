import dynamic from 'next/dynamic';
import AppHeader from '~/app/(app)/components/AppHeader';
import AppContainer from '~/app/(app)/components/AppContainer';
import PlaygroundPage from './DashboardDemo';

const DashboardDemo = dynamic(
  () => import('~/app/(app)/generate/DashboardDemo'),
  { ssr: false }
);

export const metadata = {
  title: 'Generate',
};

function DashboardPage() {
  return (
    <>
      <AppHeader>
        <input
          className="hidden rounded-[5px] bg-[#2B2041] px-[16px] py-[3px] text-[13px] lg:flex"
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
