import Link from 'next/link';
import Bars3Icon from '@heroicons/react/24/outline/Bars3Icon';

import NavigationMenuItem from '~/core/ui/Navigation/NavigationItem';
import NavigationMenu from '~/core/ui/Navigation/NavigationMenu';

import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenu,
  DropdownMenuTrigger,
} from '~/core/ui/Dropdown';

const links = {
  SignIn: {
    label: 'Sign In',
    path: '/sign-in',
  },
  // About: {
  //   label: "What's the magic?",
  //   path: '/about',
  // },
  Pricing: {
    label: 'Pricing',
    path: '/pricing',
  },
  APIDocs: {
    label: 'API Docs',
    path: 'https://docs.revocalize.ai',
    badge: 'New',
  },
  // FAQ: {
  //   label: 'FAQ',
  //   path: '/faq',
  // },
};

const SiteNavigation = () => {
  return (
    <>
      <div className={'hidden items-center space-x-0.5 lg:flex'}>
        <NavigationMenu>
          <NavigationMenuItem
            className={'flex lg:hidden'}
            link={links.SignIn}
          />

          <NavigationMenuItem link={links.Pricing} />
          <NavigationMenuItem link={links.APIDocs} badge={links.APIDocs.badge} />
          {/* <NavigationMenuItem link={links.About} /> */}
          {/* <NavigationMenuItem link={links.FAQ} /> */}
        </NavigationMenu>
      </div>

      <div className={'ml-4 flex items-center lg:hidden'}>
        <MobileDropdown />
      </div>
    </>
  );
};

function MobileDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Bars3Icon className={'h-9'} />
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        {Object.values(links).map((item) => {
          const className = 'flex items-center w-full h-full';

          return (
            <DropdownMenuItem key={item.path}>
              <Link className={className} href={item.path}>
                {item.label}
              </Link>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default SiteNavigation;
