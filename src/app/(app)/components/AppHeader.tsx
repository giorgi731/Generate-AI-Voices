'use client';

import React from 'react';

import useSignOut from '~/core/hooks/use-sign-out';
import useUserSession from '~/core/hooks/use-user-session';
import ProfileDropdown from '~/components/ProfileDropdown';
import MobileNavigation from '~/components/MobileNavigation';
import bellIcon from '~/../public/images/bell.svg';
import mailIcon from '~/../public/images/mail.svg';

import Heading from '~/core/ui/Heading';
import AppContainer from './AppContainer';

import OrganizationsSelector from '~/app/(app)/components/organizations/OrganizationsSelector_V2';
import HeaderSubscriptionStatusBadge from '~/app/(app)/components/organizations/HeaderSubscriptionStatusBadge';
import Link from 'next/link';
import Image from 'next/image';

const AppHeader: React.FCC<{
  Icon?: JSX.Element;
}> = ({ children, Icon }) => {
  const userSession = useUserSession();
  const signOut = useSignOut();

  return (
    <div className="flex flex-1 items-center justify-between border-b border-gray-50 font-system dark:border-[#291d3a] mx-3 my-3">
      <AppContainer>
        <div className={'flex w-full flex-1 justify-between'}>
          <div
            className={
              'flex items-center justify-between space-x-2.5 lg:space-x-0'
            }
          >
            <div className={'flex items-center lg:hidden'}>
              <MobileNavigation />
            </div>

            <div className={'flex items-center space-x-2 lg:space-x-4'}>
              <Heading type={5}>
                <span className={'flex items-center space-x-0.5 lg:space-x-2'}>
                  {Icon}

                  <span
                    className={
                      'lg:text-initial text-base font-medium dark:text-white'
                    }
                  >
                    {children}
                  </span>
                </span>
              </Heading>
            </div>
          </div>

          <div className={'flex items-center space-x-8'}>
            <div className="hidden lg:flex space-x-8">
              <button className="relative">
                <Image src={mailIcon} alt="mail icon" height={25} width={25} />
                <div className="absolute -right-1 -top-1 flex h-[17px] w-[17px] items-center justify-center rounded-full bg-[#954DFC]">
                  <p className="text-[11px] font-semibold">2</p>
                </div>
              </button>
              <button className="relative">
                <Image src={bellIcon} alt="bell icon" height={25} width={25} />
                <div className="absolute -right-1 -top-1 flex h-[17px] w-[17px] items-center justify-center rounded-full bg-[#954DFC]">
                  <p className="text-[11px] font-semibold">2</p>
                </div>
              </button>
            </div>
            {/* <div>
              credits:{' '}
              <Link href="/top-up" className="font-extrabold text-blue-200">
                {userSession?.data?.balance}
              </Link>
            </div> */}
            {/* <div className={'hidden items-center md:flex'}>
              <HeaderSubscriptionStatusBadge />
            </div> */}
            <ProfileDropdown
              userSession={userSession}
              signOutRequested={signOut}
            />
          </div>
        </div>
      </AppContainer>
    </div>
  );
};

export default AppHeader;
