import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cva } from "class-variance-authority";
import { Tooltip, TooltipContent, TooltipTrigger } from '~/core/ui/Tooltip';
import If from '~/core/ui/If';
import Trans from '~/core/ui/Trans';
import NAVIGATION_CONFIG from '~/navigation.config';
import isRouteActive from '~/core/generic/is-route-active';
import { FiDownloadCloud } from 'react-icons/fi'
import { RiSettings4Line } from 'react-icons/ri'
import classNames from 'classnames';
import { BiCodeAlt } from 'react-icons/bi';
import { MdOutlineHandshake } from 'react-icons/md';
import useGetUserModels from '~/lib/models/hooks/use-get-user-models';
import useGetSharedModels from '~/lib/models/hooks/use-get-user-shared-models';

function AppSidebarNavigation({ collapsed }: React.PropsWithChildren<{ collapsed: boolean; }>) {
  const iconClassName = getSidebarIconClassBuilder()({ collapsed, });
  const path = usePathname() ?? '';
  const userModelsData = useGetUserModels();
  const userSharedModelsData = useGetSharedModels();

  return (
    <div className={'sideScroll flex flex-col overflow-y-auto no-scrollbar !mt-[15px] h-[400px]'}>
      {NAVIGATION_CONFIG.items.map((item) => {
        const Label = <Trans i18nKey={item.label} defaults={item.label} />;
        const active = isRouteActive(item.path, path, 3);

        const className = getSidebarItemClassBuilder()({ collapsed, active });

        return (
          <Link
            key={item.path}
            href={item.path}
            className={classNames(className, 'mt-[10px]')}
            style={{ paddingRight: 0 }}
          >
            <If
              condition={collapsed}
              fallback={<item.Icon className={iconClassName} />}
            >
              <Tooltip>
                <TooltipTrigger>
                  <item.Icon className={iconClassName} />
                </TooltipTrigger>

                <TooltipContent side={'right'} sideOffset={20}>
                  {Label}
                </TooltipContent>
              </Tooltip>
            </If>

            <span>
              {Label}
              {item.badge && (
                <span className="inline-block ml-2 px-1.5 py-0.5 text-[11px] font-medium rounded-full text-white" style={{ backgroundImage: 'linear-gradient(91.62deg, rgb(51, 71, 250) -10.42%, rgb(212, 120, 227) 100%)' }}>
                  {item.badge}
                </span>
              )}
              {(item.label === 'common:modelTabLabel') && (
                <span className="inline-block ml-2 px-2 py-0.5 text-[11px] font-medium rounded-full text-white" style={{ backgroundImage: 'linear-gradient(91.62deg, rgb(51, 71, 250) -10.42%, rgb(212, 120, 227) 100%)' }}>
                  {Number(userModelsData?.data?.length || 0) + Number(userSharedModelsData?.data?.length || 0)}
                </span>
              )}
            </span>
          </Link>
        );
      })}

      <div>
        {/* <Link
          href="/shared-with-me"
          className={classNames(sharedClassName, 'mt-[10px]')}
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
        {/* <Link href="/settings" className={classNames(getSidebarItemClassBuilder()({ collapsed, active: isRouteActive('/settings', path, 3) }), 'mt-[10px]')}>
          <RiSettings4Line className="w-4 h-4 transition-all duration-200 transform group-hover:-rotate-12" />
          <span>Settings</span>
        </Link> */}


        {/* <Link href="/download-audio-plugin" className={classNames(getSidebarItemClassBuilder()({ collapsed, active: isRouteActive('/download-audio-plugin', path, 3) }), 'mt-[10px]')}>
          <FiDownloadCloud className="w-4 h-4 transition-all duration-200 transform group-hover:-rotate-12" />
          <span>
            Download Plugin
          </span>
        </Link>
        */}
        <Link href="/api" className={classNames(getSidebarItemClassBuilder()({ collapsed, active: isRouteActive('/api', path, 3) }), 'mt-[10px]')}>
          <BiCodeAlt className="w-4 h-4 transition-all duration-200 transform group-hover:-rotate-12" />
          <span className="flex items-center overflow-hidden whitespace-nowrap">
            Developer API
            <span className="inline-block ml-2 px-1.5 py-0.5 text-[11px] font-medium rounded-full text-white" style={{ backgroundImage: 'linear-gradient(91.62deg, rgb(51, 71, 250) -10.42%, rgb(212, 120, 227) 100%)' }}>
              BETA
            </span>
          </span>
        </Link>
        {/* <Link href="/artists" className={classNames(sharedClassName, 'mt-[10px]')}>
          <span>For Artists</span>
        </Link> */}
        <Link href="/affiliate" className={classNames(getSidebarItemClassBuilder()({ collapsed, active: isRouteActive('/affiliate', path, 3) }), 'mt-[10px]')}>
          <MdOutlineHandshake className="w-4 h-4 transition-all duration-200 transform group-hover:-rotate-12" />
          <span>Affiliates</span>
        </Link>
      </div>
    </div>
  );
}

export default AppSidebarNavigation;

function getSidebarItemClassBuilder() {
  return cva(
    [
      `flex w-full items-center rounded-lg border-transparent text-[14px] font-normal text-gray-600 transition-colors duration-300 font-custom letter-spacing-[0.2px] group`,
    ],
    {
      variants: {
        collapsed: {
          true: `justify-center space-x-0 px-0.5 py-2.5 [&>span]:hidden`,
          false: `py-2.5 px-3 pr-12 pl-4 space-x-3`,
        },
        active: {
          true: ` !font-medium text-current dark:text-primary-contrast bg-gradient-to-r from-[#150e23] to-[#4b369b]`,
          false: `text-gray-600 ring-transparent hover:bg-primary-50 dark:text-gray-300 dark:hover:bg-primary-300/5 dark:hover:text-white`,
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
          className: `font-medium text-current dark:bg-accent-bg dark:text-primary-contrast [&>svg]:fill-[url(#paint0_radial_1361_7696)]`,
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
      `flex w-full items-center rounded-lg border-transparent text-sm font-[400] text-gray-600 transition-colors duration-300 font-system`,
    ],
    {
      variants: {
        collapsed: {
          true: `justify-center space-x-0 px-0.5 py-2.5 [&>span]:hidden`,
          false: `py-2.5 px-3 pr-12 pl-4 space-x-3`,
        },
        active: {
          true: `bg-primary-50 font-medium text-current dark:bg-accent-bg dark:text-primary-contrast`,
          false: `text-gray-600 ring-transparent hover:bg-primary-50 dark:text-gray-300 dark:hover:bg-primary-300/5 dark:hover:text-white`,
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
          className: `font-medium text-current dark:bg-accent-bg dark:text-primary-contrast [&>svg]:stroke-[url(#paint0_radial_1361_7696)]`,
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
  return cva(['transform transition-all duration-200 group-hover:-rotate-12  '], {
    variants: {
      collapsed: {
        true: `h-6`,
        false: `h-5`,
      },
    },
  });
}
