import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import Trans from '~/core/ui/Trans';
import classNames from 'classnames';
import { cva } from "class-variance-authority";
import mainLogo from '~/../public/images/revocalize-white-logo.svg';
import type UserData from '~/core/session/types/user-data';

import {
  ArrowRightCircleIcon,
  ArrowLeftCircleIcon,
} from '@heroicons/react/24/outline';

import Logo from '~/core/ui/Logo';
import LogoMini from '~/core/ui/Logo/LogoMini';
import IconButton from '~/core/ui/IconButton';
import { TooltipContent, Tooltip, TooltipTrigger } from '~/core/ui/Tooltip';

import configuration from '~/configuration';
import SidebarContext from '~/lib/contexts/sidebar';
import AppSidebarNavigation from './AppSidebarNavigation_V2';
import OrganizationsSelector from './organizations/OrganizationsSelector_V2';
import Image from 'next/image';
import Link from 'next/link';
import useUserSession from '~/core/hooks/use-user-session';
import OrganizationContext from '~/lib/contexts/organization';
import useGetOrganizationSubscriptionActive from '~/lib/subscriptions/hooks/use-get-organization-subscription-active';
import { SET_CURRENT_PLAN, useGlobalState } from '~/lib/contexts/GlobalStore';

const AppSidebar: React.FC = () => {
  const { collapsed, setCollapsed } = useContext(SidebarContext);

  const className = getClassNameBuilder()({
    collapsed,
  });

  return (
    <div className={className}>
      <div
        className={
          'mx-3 flex w-full flex-col space-y-7 rounded-xl bg-[#161616] px-4 py-[24px]'
        }
      >
        <div className="flex justify-start w-full">
          <Link
            href="/ai-voice-generator"
            className="flex flex-row items-center justify-between w-full"
          >
            <Image src={mainLogo} alt="logo" />
            <p className="px-[8px] py-[6px] rounded-[4px] h-[22px]  text-[12px] flex items-center justify-center bg-gradient-radial text-black-700">
              BETA
            </p>
          </Link>
        </div>
        <div>
          {/* <OrganizationsSelector /> */}
        </div>
        <AppSidebarNavigation collapsed={collapsed} />
      </div>
      {/* <AppSidebarFooterMenu collapsed={collapsed} setCollapsed={setCollapsed} /> */}
    </div>
  );
};

function AppSidebarHeader({
  collapsed,
}: React.PropsWithChildren<{ collapsed: boolean }>) {
  const logoHref = configuration.paths.appHome;

  return (
    <div className={'flex px-2.5 py-1'}>
      {collapsed ? (
        <LogoMini href={logoHref} />
      ) : (
        <Logo href={logoHref} hideBeta={true} />
      )}
    </div>
  );
}

function AppSidebarFooterMenu(
  props: React.PropsWithChildren<{
    collapsed: boolean;
    setCollapsed: (collapsed: boolean) => void;
  }>
) {
  const { organization } = useContext(OrganizationContext);
  const [state, dispatch] = useGlobalState();
  const [creditsUsed, setCreditsUsed] = useState<any>(null);
  const [percentage, setPercentage] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  // const { mutate: getOrganizationSubscriptionActive } =
  //   useGetOrganizationSubscriptionActive();

  useEffect(() => {
    setCreditsUsed(state.currentPlan?.credits - (organization?.credits || 0));
  }, [state.currentPlan?.credits]);

  useEffect(() => {
      setPercentage(
        `${
          100 - (creditsUsed / state.currentPlan?.credits) * 100 > 0
            ? 100 - (creditsUsed / state.currentPlan?.credits) * 100
            : 0
        }%`
      );
  }, [creditsUsed, state.currentPlan?.credits]);

  // useEffect(() => {
  //   const getCurrentPlanSubscription = async () => {
  //     const getOrganizationSubscriptionData =
  //       (await getOrganizationSubscriptionActive(organization?.id)) as any;

  //     const product = configuration.stripe.products.find(
  //       (i: any) =>
  //         i.stripeProductId === getOrganizationSubscriptionData?.[0]?.price_id
  //     );

  //     dispatch({
  //       type: SET_CURRENT_PLAN,
  //       payload: product,
  //     });
  //   };
  //   setLoading(true);
  //   getCurrentPlanSubscription();
  //   setLoading(false);
  // }, [organization?.id, state.currentPlan?.credits, dispatch]);

  return (
    <div
      className={classNames(`absolute bottom-8 w-full`, {
        'px-6': !props.collapsed,
        'flex justify-center px-2': props.collapsed,
      })}
    >
      <div
        className={
          'flex items-center space-x-2 text-sm text-gray-500 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white'
        }
      >
        {!loading && state.currentPlan?.credits && organization?.credits && (
          <div className="w-full rounded-[5px] bg-[#160E24] px-[10px] py-[16px]">
            <div className="flex flex-row items-center justify-between w-full">
              <p className="text-[13px] font-semibold">
                {state.currentPlan?.name} Plan
              </p>
              <p className="text-[13px] font-medium text-[#C4C6CC]">
                {Math.round(state.currentPlan?.credits - (organization?.credits || 0))}{' '}
                credits used
              </p>
            </div>
            <div className="mb-[10px] mt-[15px] h-px w-full bg-[#251D35]" />
            <div className="flex h-[10px] w-full rounded-[40px] bg-[#251D35]">
              <div
                className={`h-full rounded-[40px] bg-gradient-radial`}
                style={{ width: percentage }}
              />
            </div>
            <Link href="/plans">
              <button className="mt-[16px] w-full rounded-[5px] bg-[radial-gradient(133.02%_176.97%_at_-20.56%_-17.05%,_#FEDC8F_0%,_#F16681_42.02%,_#A76DFA_70.78%,_#33D6FA_91.05%)] py-[10px] text-[12px] font-semibold text-white">
                Upgrade
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

function CollapsibleButton(
  props: React.PropsWithChildren<{
    collapsed: boolean;
    onClick: (collapsed: boolean) => void;
  }>
) {
  if (props.collapsed) {
    return (
      <Tooltip>
        <TooltipTrigger>
          <IconButton
            as={'div'}
            onClick={() => props.onClick(!props.collapsed)}
          >
            <ArrowRightCircleIcon className={'h-6'} />
          </IconButton>
        </TooltipTrigger>

        <TooltipContent>
          <Trans i18nKey={'common:expandSidebar'} />
        </TooltipContent>
      </Tooltip>
    );
  }

  const className = classNames({
    '[&>span]:hidden justify-center': props.collapsed,
  });

  return (
    <div className={className}>
      <button
        className={'flex items-center space-x-2 bg-transparent font-system'}
        onClick={() => props.onClick(!props.collapsed)}
      >
        <ArrowLeftCircleIcon className={'h-6'} />

        <span>
          <Trans i18nKey={'common:collapseSidebar'} />
        </span>
      </button>
    </div>
  );
}

export default AppSidebar;

function getClassNameBuilder() {
  return cva(
    ['relative flex hidden h-screen flex-row justify-center py-4 lg:flex'],
    {
      variants: {
        collapsed: {
          true: `w-[5rem]`,
          false: `w-2/12 max-w-xs sm:min-w-[12rem] lg:min-w-[15rem]`,
        },
      },
    }
  );
}
