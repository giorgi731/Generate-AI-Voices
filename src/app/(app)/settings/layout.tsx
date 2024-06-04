import React from 'react';
import { Cog6ToothIcon } from '@heroicons/react/24/outline';

import NavigationMenu from '~/core/ui/Navigation/NavigationMenu';
import NavigationItem from '~/core/ui/Navigation/NavigationItem';
import AppHeader from '~/app/(app)/components/AppHeader';
import AppContainer from '~/app/(app)/components/AppContainer';
import Trans from '~/core/ui/Trans';
import getLanguageCookie from '~/i18n/get-language-cookie';
import initializeServerI18n from '~/i18n/i18n.server';

const links = [
  {
    path: '/settings/profile',
    label: 'common:profileSettingsTabLabel',
  },
  {
    path: '/settings/organization',
    label: 'common:organizationSettingsTabLabel',
  },
  {
    path: '/settings/api-keys',
    label: 'common:subscriptionAPIKeysTabLabel',
  },
  {
    path: '/settings/subscription',
    label: 'common:subscriptionSettingsTabLabel',
  },
];

async function SettingsLayout({ children }: React.PropsWithChildren) {
  await initializeServerI18n(getLanguageCookie());

  return (
    <>
      <div className={`px-[30px] pb-[15px] pt-[22px] text-left container`}>
        <h2 className="mb-[5px] text-[24px] font-[700] text-white">Settings</h2>
      </div>
      
      <AppContainer className='container'>
      <div className={`w-[100%] pr-[40px] ml-[25px]`}>
        <NavigationMenu bordered>
          {links.map((link) => (
            <NavigationItem
              className={'flex-1 lg:flex-none'}
              link={link}
              key={link.path}
            />
          ))}
        </NavigationMenu>

        <div
          className={`mt-4 flex h-full flex-col space-y-4 lg:mt-7 lg:flex-row lg:space-x-8 lg:space-y-0`}
        >
          {children}
        </div>
        </div>
      </AppContainer>
      
    </>
  );
}

export default SettingsLayout;
