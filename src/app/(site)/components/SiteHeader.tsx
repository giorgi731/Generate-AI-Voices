'use client';

import { ArrowRightIcon, ArrowSmallRightIcon } from '@heroicons/react/24/outline';

import Logo from '~/core/ui/Logo';
import Container from '~/core/ui/Container';
import If from '~/core/ui/If';
import Button from '~/core/ui/Button';
import SiteNavigation from './SiteNavigation';
import useSignOut from '~/core/hooks/use-sign-out';
import useUserSession from '~/core/hooks/use-user-session';

import DarkModeToggle from '~/components/DarkModeToggle';
import ProfileDropdown from '~/components/ProfileDropdown';

import configuration from '~/configuration';

const fixedClassName = `FixedHeader`;

const SiteHeader: React.FCC<{
  fixed?: boolean;
}> = ({ fixed }) => {
  const signOut = useSignOut();
  const userSession = useUserSession();

  return (
    <div className={`w-full py-6 ${fixed ? fixedClassName : ''}`}>
      <div id='heroLights' className='max-w-full pointer-events-none -z-10' style={{
        "background": "radial-gradient(47.84% 61.25% at 50% 0%,rgba(113,61,255,.06) 0%,rgba(113,61,255,0) 100%),radial-gradient(28.37% 15.33% at 50% 42.67%,rgba(113,61,255,.2) 0%,rgba(113,61,255,0) 100%)",
        "content": "",
        "height": "1331px",
        "left": "calc(50% - 820px)",
        "position": "absolute",
        "top": 0,
        "width": "1640px",
      }}></div>
      <Container>
        <div className="flex items-center justify-between w-full">
          <div className={'flex items-center space-x-4 lg:space-x-8'}>
            <Logo />

          </div>

          <div className={'flex items-center space-x-4 lg:space-x-8'}>
            <SiteNavigation />
          </div>

          <div className={'flex items-center justify-end space-x-4'}>
            <div className={'flex items-center'}>
              <If
                condition={
                  configuration.enableThemeSwitcher && !userSession?.auth
                }
              >
                <DarkModeToggle />
              </If>
            </div>

            <If condition={userSession?.auth} fallback={<AuthButtons />}>
              <ProfileDropdown
                userSession={userSession}
                signOutRequested={signOut}
              />
            </If>
          </div>
        </div>
      </Container>
    </div>
  );
};

function AuthButtons() {
  return (
    <div className={'hidden space-x-2 lg:flex'}>
      <Button className='rounded-xl font-system' color={'transparent'} href={configuration.paths.signIn}>
        <span>Sign In</span>
      </Button>

      <Button className='rounded-xl font-system' color={'secondary'} href={configuration.paths.signUp}>
        <span className={'flex items-center space-x-2'}>
          <span>Sign Up</span>
          <ArrowSmallRightIcon className={'h-4'} />
        </span>
      </Button>
    </div>
  );
}

export default SiteHeader;
