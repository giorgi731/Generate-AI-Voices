import React from 'react';
import AppHeader from '../components/AppHeader';
import { SparklesIcon } from '@heroicons/react/24/outline';
import AppContainer from '../components/AppContainer';
import CreditPlans from './CreditPlans';

function page() {
  return (
    <>
      {/* <AppHeader */}
        {/* // Icon={<SparklesIcon className={'h-6 dark:text-primary-500'} />} */}
      {/* > */}
                {/* <input className='bg-[#2B2041] py-[3px] px-[16px] rounded-[5px] text-[13px]' placeholder='Search artist voices' /> */}
      {/* </AppHeader> */}

      <AppContainer>
        <CreditPlans />
      </AppContainer>
    </>
  );
}

export default page;
