'use client';

import Link from 'next/link';
import classNames from 'classnames';
import { usePathname } from 'next/navigation';

import Trans from '~/core/ui/Trans';
import isRouteActive from '~/core/generic/is-route-active';

interface LinkModel {
  path: string;
  label: string;
}

const NavigationMenuItem: React.FCC<{
  link: LinkModel;
  badge?: string;
  disabled?: boolean;
  className?: string;
  prefetch?: React.ComponentProps<typeof Link>['prefetch'];
  depth?: number;
}> = ({ link, badge, disabled, prefetch, className, depth = 2 }) => {
  const label = link.label;
  const pathName = usePathname() ?? '';
  const isActive = isRouteActive(link.path, pathName, depth);

  const itemClassName = classNames(`NavigationItem`, className, {
    [`NavigationItemActive`]: isActive,
    [`NavigationItemNotActive`]: !isActive,
  });

  return (
    <Link
      prefetch={prefetch}
      className={itemClassName}
      aria-disabled={disabled}
      href={disabled ? '' : link.path}
    >
      <Trans i18nKey={label}>
        {label}
        {badge && (
          <span className={'font-custom ml-1.5 inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800'}>
            {badge}
          </span>
        )}  
      </Trans>
    </Link>
  );
};

export default NavigationMenuItem;
