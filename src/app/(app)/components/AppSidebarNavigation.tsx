import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cva } from "class-variance-authority";

import { Tooltip, TooltipContent, TooltipTrigger } from '~/core/ui/Tooltip';
import If from '~/core/ui/If';
import Trans from '~/core/ui/Trans';

import NAVIGATION_CONFIG from '~/navigation.config';
import isRouteActive from '~/core/generic/is-route-active';
import { Cog6ToothIcon } from '@heroicons/react/24/outline';
import classNames from 'classnames';

function AppSidebarNavigation({
  collapsed,
}: React.PropsWithChildren<{
  collapsed: boolean;
}>) {
  const iconClassName = getSidebarIconClassBuilder()({
    collapsed,
  });

  const path = usePathname() ?? '';

  const sharedActive = isRouteActive('/shared-with-me', path, 3);

  const sharedClassName = getSidebarItemClassBuilder()({
    collapsed,
    active: sharedActive,
  });

  const settingsActive = isRouteActive('/settings', path, 3);

  const settingsClassName = getSidebarItemClassBuilderSettings()({
    collapsed,
    active: settingsActive,
  });

  return (
    <div className={'flex flex-col'}>
      {NAVIGATION_CONFIG.items.map((item) => {
        const Label = <Trans i18nKey={item.label} defaults={item.label} />;
        const active = isRouteActive(item.path, path, 3);

        const className = getSidebarItemClassBuilder()({
          collapsed,
          active,
        });

        return (
          <Link
            key={item.path}
            href={item.path}
            className={classNames(className, 'my-2')}
            style={{ paddingRight: 0 }}
          >
            <span>{Label}</span>
          </Link>
        );
      })}
      <div className="mb-8 mt-[24px] flex h-[1px] w-full bg-[#251D35]" />
      <div>
        <Link href="/settings" className={settingsClassName}>
          <If
            condition={collapsed}
            fallback={
              <svg
                className={iconClassName}
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                stroke="white"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8 10C9.10457 10 10 9.10457 10 8C10 6.89543 9.10457 6 8 6C6.89543 6 6 6.89543 6 8C6 9.10457 6.89543 10 8 10Z"
                  strokeWidth="1.5"
                  stroke-miterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M1.33398 8.5863V7.41297C1.33398 6.71963 1.90065 6.1463 2.60065 6.1463C3.80732 6.1463 4.30065 5.29297 3.69398 4.2463C3.34732 3.6463 3.55398 2.8663 4.16065 2.51963L5.31398 1.85963C5.84065 1.5463 6.52065 1.73297 6.83398 2.25963L6.90732 2.3863C7.50732 3.43297 8.49398 3.43297 9.10065 2.3863L9.17398 2.25963C9.48732 1.73297 10.1673 1.5463 10.694 1.85963L11.8473 2.51963C12.454 2.8663 12.6607 3.6463 12.314 4.2463C11.7073 5.29297 12.2007 6.1463 13.4073 6.1463C14.1007 6.1463 14.674 6.71297 14.674 7.41297V8.5863C14.674 9.27963 14.1073 9.85297 13.4073 9.85297C12.2007 9.85297 11.7073 10.7063 12.314 11.753C12.6607 12.3596 12.454 13.133 11.8473 13.4796L10.694 14.1396C10.1673 14.453 9.48732 14.2663 9.17398 13.7396L9.10065 13.613C8.50065 12.5663 7.51398 12.5663 6.90732 13.613L6.83398 13.7396C6.52065 14.2663 5.84065 14.453 5.31398 14.1396L4.16065 13.4796C3.55398 13.133 3.34732 12.353 3.69398 11.753C4.30065 10.7063 3.80732 9.85297 2.60065 9.85297C1.90065 9.85297 1.33398 9.27963 1.33398 8.5863Z"
                  strokeWidth="1.5"
                  stroke-miterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <defs>
                  <radialGradient
                    id="paint0_radial_1361_7695"
                    cx="0"
                    cy="0"
                    r="1"
                    gradientUnits="userSpaceOnUse"
                    gradientTransform="translate(-2.11164 -1.61115) rotate(39.6323) scale(25.365 19.0296)"
                  >
                    <stop stopColor="#FEDC8F" />
                    <stop offset="0.420236" stopColor="#F16681" />
                    <stop offset="0.707757" stopColor="#A76DFA" />
                    <stop offset="0.910465" stopColor="#33D6FA" />
                  </radialGradient>
                </defs>
              </svg>
            }
          >
            <Tooltip>
              <TooltipTrigger>
                <svg
                  className={iconClassName}
                  width="16"
                  height="16"
                  fill="none"
                  stroke="white"
                  viewBox="0 0 16 16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8 10C9.10457 10 10 9.10457 10 8C10 6.89543 9.10457 6 8 6C6.89543 6 6 6.89543 6 8C6 9.10457 6.89543 10 8 10Z"
                    strokeWidth="1.5"
                    stroke-miterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M1.33398 8.5863V7.41297C1.33398 6.71963 1.90065 6.1463 2.60065 6.1463C3.80732 6.1463 4.30065 5.29297 3.69398 4.2463C3.34732 3.6463 3.55398 2.8663 4.16065 2.51963L5.31398 1.85963C5.84065 1.5463 6.52065 1.73297 6.83398 2.25963L6.90732 2.3863C7.50732 3.43297 8.49398 3.43297 9.10065 2.3863L9.17398 2.25963C9.48732 1.73297 10.1673 1.5463 10.694 1.85963L11.8473 2.51963C12.454 2.8663 12.6607 3.6463 12.314 4.2463C11.7073 5.29297 12.2007 6.1463 13.4073 6.1463C14.1007 6.1463 14.674 6.71297 14.674 7.41297V8.5863C14.674 9.27963 14.1073 9.85297 13.4073 9.85297C12.2007 9.85297 11.7073 10.7063 12.314 11.753C12.6607 12.3596 12.454 13.133 11.8473 13.4796L10.694 14.1396C10.1673 14.453 9.48732 14.2663 9.17398 13.7396L9.10065 13.613C8.50065 12.5663 7.51398 12.5663 6.90732 13.613L6.83398 13.7396C6.52065 14.2663 5.84065 14.453 5.31398 14.1396L4.16065 13.4796C3.55398 13.133 3.34732 12.353 3.69398 11.753C4.30065 10.7063 3.80732 9.85297 2.60065 9.85297C1.90065 9.85297 1.33398 9.27963 1.33398 8.5863Z"
                    strokeWidth="1.5"
                    stroke-miterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <defs>
                    <radialGradient
                      id="paint0_radial_1361_7695"
                      cx="0"
                      cy="0"
                      r="1"
                      gradientUnits="userSpaceOnUse"
                      gradientTransform="translate(-2.11164 -1.61115) rotate(39.6323) scale(25.365 19.0296)"
                    >
                      <stop stopColor="#FEDC8F" />
                      <stop offset="0.420236" stopColor="#F16681" />
                      <stop offset="0.707757" stopColor="#A76DFA" />
                      <stop offset="0.910465" stopColor="#33D6FA" />
                    </radialGradient>
                  </defs>
                </svg>
              </TooltipTrigger>

              <TooltipContent side={'right'} sideOffset={20}>
                Settings
              </TooltipContent>
            </Tooltip>
          </If>

          <span>Settings</span>
        </Link>
        {/* <Link
          href="/shared-with-me"
          className={classNames(sharedClassName, 'mt-[16px]')}
        >
          <If
            condition={collapsed}
            fallback={
              <svg
                className={iconClassName}
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="white"
              >
                <path d="M9.47927 14.4196C8.6926 14.4196 7.57927 13.8662 6.69927 11.2196L6.21927 9.77956L4.77927 9.29956C2.13927 8.41956 1.58594 7.30623 1.58594 6.51956C1.58594 5.73956 2.13927 4.61956 4.77927 3.73289L10.4393 1.84623C11.8526 1.37289 13.0326 1.51289 13.7593 2.23289C14.4859 2.95289 14.6259 4.13956 14.1526 5.55289L12.2659 11.2129C11.3793 13.8662 10.2659 14.4196 9.47927 14.4196ZM5.0926 4.68623C3.23927 5.30623 2.57927 6.03956 2.57927 6.51956C2.57927 6.99956 3.23927 7.73289 5.0926 8.34623L6.7726 8.90623C6.91927 8.95289 7.03927 9.07289 7.08594 9.21956L7.64594 10.8996C8.25927 12.7529 8.99927 13.4129 9.47927 13.4129C9.95927 13.4129 10.6926 12.7529 11.3126 10.8996L13.1993 5.23956C13.5393 4.21289 13.4793 3.37289 13.0459 2.93956C12.6126 2.50623 11.7726 2.45289 10.7526 2.79289L5.0926 4.68623Z" />
                <path d="M6.74052 9.59967C6.61385 9.59967 6.48719 9.55301 6.38719 9.45301C6.19385 9.25968 6.19385 8.93967 6.38719 8.74634L8.77385 6.35301C8.96719 6.15967 9.28719 6.15967 9.48052 6.35301C9.67385 6.54634 9.67385 6.86634 9.48052 7.05967L7.09385 9.45301C7.00052 9.55301 6.86719 9.59967 6.74052 9.59967Z" />
                <defs>
                  <radialGradient
                    id="paint0_radial_1361_7695"
                    cx="0"
                    cy="0"
                    r="1"
                    gradientUnits="userSpaceOnUse"
                    gradientTransform="translate(-2.11164 -1.61115) rotate(39.6323) scale(25.365 19.0296)"
                  >
                    <stop stopColor="#FEDC8F" />
                    <stop offset="0.420236" stopColor="#F16681" />
                    <stop offset="0.707757" stopColor="#A76DFA" />
                    <stop offset="0.910465" stopColor="#33D6FA" />
                  </radialGradient>
                </defs>
              </svg>
            }
          >
            <Tooltip>
              <TooltipTrigger>
                <svg
                  className={iconClassName}
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="white"
                >
                  <path d="M9.47927 14.4196C8.6926 14.4196 7.57927 13.8662 6.69927 11.2196L6.21927 9.77956L4.77927 9.29956C2.13927 8.41956 1.58594 7.30623 1.58594 6.51956C1.58594 5.73956 2.13927 4.61956 4.77927 3.73289L10.4393 1.84623C11.8526 1.37289 13.0326 1.51289 13.7593 2.23289C14.4859 2.95289 14.6259 4.13956 14.1526 5.55289L12.2659 11.2129C11.3793 13.8662 10.2659 14.4196 9.47927 14.4196ZM5.0926 4.68623C3.23927 5.30623 2.57927 6.03956 2.57927 6.51956C2.57927 6.99956 3.23927 7.73289 5.0926 8.34623L6.7726 8.90623C6.91927 8.95289 7.03927 9.07289 7.08594 9.21956L7.64594 10.8996C8.25927 12.7529 8.99927 13.4129 9.47927 13.4129C9.95927 13.4129 10.6926 12.7529 11.3126 10.8996L13.1993 5.23956C13.5393 4.21289 13.4793 3.37289 13.0459 2.93956C12.6126 2.50623 11.7726 2.45289 10.7526 2.79289L5.0926 4.68623Z" />
                  <path d="M6.74052 9.59967C6.61385 9.59967 6.48719 9.55301 6.38719 9.45301C6.19385 9.25968 6.19385 8.93967 6.38719 8.74634L8.77385 6.35301C8.96719 6.15967 9.28719 6.15967 9.48052 6.35301C9.67385 6.54634 9.67385 6.86634 9.48052 7.05967L7.09385 9.45301C7.00052 9.55301 6.86719 9.59967 6.74052 9.59967Z" />
                  <defs>
                    <radialGradient
                      id="paint0_radial_1361_7695)"
                      cx="0"
                      cy="0"
                      r="1"
                      gradientUnits="userSpaceOnUse"
                      gradientTransform="translate(-2.11164 -1.61115) rotate(39.6323) scale(25.365 19.0296)"
                    >
                      <stop stopColor="#FEDC8F" />
                      <stop offset="0.420236" stopColor="#F16681" />
                      <stop offset="0.707757" stopColor="#A76DFA" />
                      <stop offset="0.910465" stopColor="#33D6FA" />
                    </radialGradient>
                  </defs>
                </svg>
              </TooltipTrigger>

              <TooltipContent side={'right'} sideOffset={20}>
                Shared with me
              </TooltipContent>
            </Tooltip>
          </If>

          <span>Shared with me</span>
        </Link> */}
      </div>
    </div>
  );
}

export default AppSidebarNavigation;

function getSidebarItemClassBuilder() {
  return cva(
    [
      `flex w-full items-center border-transparent text-sm font-medium text-gray-600 transition-colors duration-300 font-system`,
    ],
    {
      variants: {
        collapsed: {
          true: `justify-center space-x-0 py-1 px-0.5[&>span]:hidden`,
          false: `py-1 px-3 pr-12 pl-4 space-x-2.5`,
        },
        active: {
          true: `bg-primary-50 font-medium text-current dark:text-primary-contrast`,
          false: `text-gray-600 ring-transparent hover:bg-primary-50 active:bg-gray-200  dark:text-gray-300 dark:hover:bg-primary-300/5 dark:hover:text-white dark:active:bg-black-300 dark:active:bg-black-300`,
        },
      },
      compoundVariants: [
        {
          collapsed: true,
          active: true,
          className: `bg-primary-500/5 dark:bg-primary-500/10 !text-primary-500`,
        },
        {
          collapsed: false,
          active: true,
          className: `bg-transparent font-medium text-current dark:text-primary-contrast [&>svg]:fill-[url(#paint0_radial_1361_7695)] border-l-2 border-white`,
        },
        {
          collapsed: true,
          active: false,
          className: `text-gray-600 dark:text-primary-contrast`,
        },
      ],
    }
  );
}
function getSidebarItemClassBuilderSettings() {
  return cva(
    [
      `flex w-full items-center rounded-lg border-transparent text-sm font-medium text-gray-600 transition-colors duration-300 font-system`,
    ],
    {
      variants: {
        collapsed: {
          true: `justify-center space-x-0 px-0.5 py-3 [&>span]:hidden`,
          false: `py-3 px-3 pr-12 pl-4 space-x-2.5`,
        },
        active: {
          true: `bg-primary-50 font-medium text-current dark:text-primary-contrast`,
          false: `text-gray-600 ring-transparent hover:bg-primary-50 active:bg-gray-200  dark:text-gray-300 dark:hover:bg-primary-300/5 dark:hover:text-white dark:active:bg-black-300 dark:active:bg-black-300`,
        },
      },
      compoundVariants: [
        {
          collapsed: true,
          active: true,
          className: `bg-primary-500/5 dark:bg-primary-500/10 !text-primary-500`,
        },
        {
          collapsed: false,
          active: true,
          className: `bg-red-500 font-medium text-current dark:text-primary-contrast [&>svg]:stroke-[url(#paint0_radial_1361_7695)]`,
        },
        {
          collapsed: true,
          active: false,
          className: `text-gray-600 dark:text-primary-contrast`,
        },
      ],
    }
  );
}

function getSidebarIconClassBuilder() {
  return cva([''], {
    variants: {
      collapsed: {
        true: `h-6`,
        false: `h-5`,
      },
    },
  });
}
