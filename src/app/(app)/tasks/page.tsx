import dynamic from 'next/dynamic';
import AppContainer from '~/app/(app)/components/AppContainer';
import TasksPage from './TasksPage';

// const TasksPage = dynamic(() => import('./TasksPage'), {
//   ssr: false,
// });

export const metadata = {
  title: 'Tasks',
};

function TasksPageWrapper() {
  return (
    <>
      {/* <AppHeader
      >
        <input className='bg-[#2B2041] py-[3px] px-[16px] rounded-[5px] text-[13px]' placeholder='Search artist voices' />
      </AppHeader> */}
      <AppContainer>
        <TasksPage />
      </AppContainer>
    </>
  );
}

export default TasksPageWrapper;
