import { useMemo } from 'react';
import Trans from '~/core/ui/Trans';
import Link from 'next/link';

import {
  ChevronDownIcon,
  ArrowLeftOnRectangleIcon,
  Squares2X2Icon,
  PaintBrushIcon,
  SunIcon,
  ComputerDesktopIcon,
  MoonIcon,
  Cog6ToothIcon,
} from '@heroicons/react/24/outline';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from '~/core/ui/Dropdown';

import configuration from '~/configuration';
import ProfileAvatar from '~/components/ProfileAvatar';
import type UserSession from '~/core/session/types/user-session';

import {
  setTheme,
  DARK_THEME_CLASSNAME,
  LIGHT_THEME_CLASSNAME,
  SYSTEM_THEME_CLASSNAME,
} from '~/core/theming';

const ProfileDropdown: React.FCC<{
  userSession: Maybe<UserSession>;
  signOutRequested: () => unknown;
}> = ({ userSession, signOutRequested }) => {
  const signedInAsLabel = useMemo(() => {
    const displayName = userSession?.data?.displayName || undefined;
    const email = userSession?.auth?.user.email || undefined;
    const phone = userSession?.auth?.user.phone || undefined;

    return displayName ?? email ?? phone;
  }, [userSession]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={
          'flex cursor-pointer items-center space-x-2 focus:outline-none'
        }
      >
        <ProfileAvatar user={userSession} />
        <p className="text-[14px] font-semibold">
          {userSession?.data?.displayName}
        </p>
        <ChevronDownIcon
          className={'hidden h-5 text-lg font-extrabold sm:block'}
        />
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className={'lg-!min-w-[247px] w-full px-[12px] py-[16px]'}
        collisionPadding={{ right: 20 }}
      >
        <DropdownMenuItem
          className={'!h-fullrounded-none px-[20px]'}
          clickable={false}
        >
          <div className="flex flex-col items-center w-full">
            {/* <span className={'block truncate'}>{signedInAsLabel}</span> */}
            <ProfileAvatar user={userSession} />
            <span className={'truncate, mt-[12px] block'}>
              {signedInAsLabel}
            </span>
            <p className="text-[#919399]">{userSession?.auth?.user.email}</p>
          </div>
        </DropdownMenuItem>

        <DropdownMenuItem className="mt-[33px] !h-full px-[20px] py-[10px]">
          <Link
            className={'flex w-full items-start space-x-2'}
            href={'/settings/profile'}
          >
            <Cog6ToothIcon className={'h-5'} />
            <span>
              <span className="text-white hover:text-white/75">
                <Trans i18nKey={'common:settingsTabLabel'} />
              </span>
              <p className="text-[13px] text-[#AAADB3]">Edit account profile</p>
            </span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="my-[10px]" />
        <DropdownMenuItem className="!h-full px-[20px] py-[10px]">
          <Link
            className={'full flex w-full items-start space-x-2'}
            href={'/settings/profile'}
          >
            <Cog6ToothIcon className={'h-5'} />
            <span>
              <span className="text-white hover:text-white/75">
                <Trans i18nKey={'common:workspaceSettings'} />
              </span>
              <p className="text-[13px] text-[#AAADB3]">Edit workspace</p>
            </span>
          </Link>
        </DropdownMenuItem>

        {/* <ThemeSelectorSubMenu /> */}

        <div className="!h-full py-[10px]">
          <Link
            className={'flex w-full items-start'}
            href={'/settings/profile'}
          >
            <button className="w-full rounded-[5px] bg-[#30DAFF] p-[16px] py-[10px] text-[13px] font-medium text-[#0A0118] hover:bg-black-200 hover:text-white">
              Update Plan
            </button>
          </Link>
        </div>

        <DropdownMenuItem
          role={'button'}
          className={'!h-full cursor-pointer px-[20px] py-[10px]'}
          onClick={signOutRequested}
        >
          <span className={'flex w-full items-center space-x-2'}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="17"
              height="17"
              viewBox="0 0 17 17"
              fill="none"
            >
              <path
                d="M10.2046 14.8691H10.1179C7.15794 14.8691 5.73127 13.7024 5.48461 11.0891C5.45794 10.8158 5.65794 10.5691 5.93794 10.5424C6.20461 10.5158 6.45794 10.7224 6.48461 10.9958C6.67794 13.0891 7.66461 13.8691 10.1246 13.8691H10.2113C12.9246 13.8691 13.8846 12.9091 13.8846 10.1958V5.84911C13.8846 3.13578 12.9246 2.17578 10.2113 2.17578H10.1246C7.65127 2.17578 6.66461 2.96911 6.48461 5.10245C6.45127 5.37578 6.21794 5.58245 5.93794 5.55578C5.65794 5.53578 5.45794 5.28911 5.47794 5.01578C5.70461 2.36245 7.13794 1.17578 10.1179 1.17578H10.2046C13.4779 1.17578 14.8779 2.57578 14.8779 5.84911V10.1958C14.8779 13.4691 13.4779 14.8691 10.2046 14.8691Z"
                fill="white"
              />
              <path
                d="M10.0457 8.52246H2.45898C2.18565 8.52246 1.95898 8.29579 1.95898 8.02246C1.95898 7.74913 2.18565 7.52246 2.45898 7.52246H10.0457C10.319 7.52246 10.5457 7.74913 10.5457 8.02246C10.5457 8.29579 10.319 8.52246 10.0457 8.52246Z"
                fill="white"
              />
              <path
                d="M3.94456 10.756C3.81789 10.756 3.69122 10.7093 3.59122 10.6093L1.35789 8.37602C1.16456 8.18268 1.16456 7.86268 1.35789 7.66935L3.59122 5.43602C3.78456 5.24268 4.10456 5.24268 4.29789 5.43602C4.49122 5.62935 4.49122 5.94935 4.29789 6.14268L2.41789 8.02268L4.29789 9.90268C4.49122 10.096 4.49122 10.416 4.29789 10.6093C4.20456 10.7093 4.07122 10.756 3.94456 10.756Z"
                fill="white"
              />
            </svg>

            <span>
              <Trans i18nKey={'auth:signOut'} />
            </span>
          </span>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="my-[15px]" />
        <div className="flex !h-[40px] justify-center">
          <p className="w-[175px] text-center text-[9px] text-[#AAADB3]">
            By using Revocalize, you agree to our Terms of Use and Privacy
            Policy
          </p>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

function ThemeSelectorSubMenu() {
  const Wrapper: React.FCC = ({ children }) => (
    <span className={'flex items-center space-x-2.5'}>{children}</span>
  );

  return (
    <>
      <DropdownMenuSeparator className={'hidden lg:flex'} />

      <DropdownMenuSub>
        <DropdownMenuSubTrigger className={'hidden lg:flex'}>
          <Wrapper>
            <PaintBrushIcon className={'h-5'} />

            <span>
              <Trans i18nKey={'common:theme'} />
            </span>
          </Wrapper>
        </DropdownMenuSubTrigger>

        <DropdownMenuSubContent>
          <DropdownMenuItem
            className={'cursor-pointer'}
            onClick={() => setTheme(LIGHT_THEME_CLASSNAME)}
          >
            <Wrapper>
              <SunIcon className={'h-4'} />

              <span>
                <Trans i18nKey={'common:lightTheme'} />
              </span>
            </Wrapper>
          </DropdownMenuItem>

          <DropdownMenuItem
            className={'cursor-pointer'}
            onClick={() => setTheme(DARK_THEME_CLASSNAME)}
          >
            <Wrapper>
              <MoonIcon className={'h-4'} />

              <span>
                <Trans i18nKey={'common:darkTheme'} />
              </span>
            </Wrapper>
          </DropdownMenuItem>

          <DropdownMenuItem
            className={'cursor-pointer'}
            onClick={() => setTheme(SYSTEM_THEME_CLASSNAME)}
          >
            <Wrapper>
              <ComputerDesktopIcon className={'h-4'} />

              <span>
                <Trans i18nKey={'common:systemTheme'} />
              </span>
            </Wrapper>
          </DropdownMenuItem>
        </DropdownMenuSubContent>
      </DropdownMenuSub>
    </>
  );
}

export default ProfileDropdown;
