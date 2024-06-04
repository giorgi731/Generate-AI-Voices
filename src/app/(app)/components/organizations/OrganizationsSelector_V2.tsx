import { useCallback, useContext, useState, useTransition } from 'react';
import { Cog6ToothIcon, PlusCircleIcon } from '@heroicons/react/24/outline';
import type UserSession from '~/core/session/types/user-session';
import { SelectArrow } from '@radix-ui/react-select';
import { useGlobalState } from "~/lib/contexts/GlobalStore";
import type Organization from '~/lib/organizations/types/organization';
import useUserOrganizationsQuery from '~/lib/organizations/hooks/use-user-organizations-query';
import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectSeparator,
  SelectGroup,
  SelectAction,
  SelectLabel,
  SelectValue,
} from '~/core/ui/SelectOrganization';

import If from '~/core/ui/If';
import Trans from '~/core/ui/Trans';
import useRefresh from '~/core/hooks/use-refresh';
import { setCookie } from '~/core/generic/cookies';

import UserSessionContext from '~/core/session/contexts/user-session';
import CreateOrganizationModal from './CreateOrganizationModal';
import type MembershipRole from '~/lib/organizations/types/membership-role';
import useCurrentOrganization from '~/lib/organizations/hooks/use-current-organization';
import useSetCurrentOrganization from '~/lib/organizations/hooks/use-set-current-organization';
import { CogIcon, Edit3Icon, LogOutIcon, PlusIcon } from 'lucide-react';
import Link from 'next/link';
import OrganizationContext from '~/lib/contexts/organization';
import useSignOut from '~/core/hooks/use-sign-out';
import useUserSession from '~/core/hooks/use-user-session';
import useGetOrganization from '~/lib/organizations/hooks/use-get-organization';

const OrganizationsSelector = ({ organizationData }: any) => {
  const [isOrganizationModalOpen, setIsOrganizationModalOpen] = useState(false);
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const userInfo = useUserSession()
  const { organization } = useContext(OrganizationContext)
  const [isPending, startTransition] = useTransition();
  // const organization = useCurrentOrganization();
  const signOut = useSignOut();
  const { userSession } = useContext(UserSessionContext);
  const refresh = useRefresh();
  const setCurrentOrganizationMutation = useSetCurrentOrganization();
  const [state, dispatch] = useGlobalState()

  // const userId = userSession?.data?.id as string;



  // const { data, isLoading } = useUserOrganizationsQuery(userId);

  const onOrganizationChange = useCallback(
    async (organizationId: string) => {
      await setCurrentOrganizationMutation.trigger(organizationId);
      setCookie('organizationId', organizationId.toString());
      startTransition(() => {
        refresh();
      });
    },
    [refresh, setCurrentOrganizationMutation]
  );

  const isChangingOrganization = isPending || setCurrentOrganizationMutation.isMutating;

  return (
    <>
      <Select
        disabled={isChangingOrganization}
        open={isSelectOpen}
        value={organization?.id?.toString()}
        onValueChange={onOrganizationChange}
        onOpenChange={setIsSelectOpen}
      >
        <SelectTrigger
          data-cy={'organization-selector'}
          className={'bg-transparent dark:!hover:bg-[#FFFFFF0D]'}
          value={organization?.name?.toString()}
        >
          <span className={'max-w-[5rem] text-sm lg:max-w-[12rem] lg:text-base'}>
            <OrganizationItem organization={{ name: userSession?.auth?.user?.email }} />
            <span hidden>
              <SelectValue className='text-[#FFFFFF99] text-sm'>{userSession?.auth?.user?.email}</SelectValue>
            </span>
          </span>
        </SelectTrigger>

        <SelectContent
          position={'popper'}
          className="w-full px-3 py-4"
          sideOffset={5}
        >
          <SelectArrow />
          <p className="text-[#ffffff] text-sm font-semibold">{userInfo?.data?.displayName}</p>
          <p className="text-[#B2B2B2] text-sm">{userSession?.auth?.user?.email}</p>
          {/* <SelectGroup>
            <OrganizationsOptions
              organizations={data ?? []}
              organizationId={organization?.id}
            />

            <If condition={isLoading}>
              <SelectItem value={selectedOrganizationId ?? ''}>
                <OrganizationItem organization={organization} />
              </SelectItem>
            </If>
          </SelectGroup>
          <button
            onClick={() => {
              setIsSelectOpen(false);
              setIsOrganizationModalOpen(true);
            }}
            data-cy={'create-organization-button'}
            className={'!mt-[16px] flex flex-row items-center truncate'}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
            >
              <g clip-path="url(#clip0_820_9746)">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M28.3849 19.3831L7.7323 31.2949C7.08214 31.7643 6.29801 32.0114 5.49623 31.9996C3.37678 31.9924 1.65626 30.2839 1.63402 28.1645L1.62049 28.0561L1.62049 3.88005C1.61814 1.73952 3.35143 0.00235159 5.49197 1.33482e-06C6.17377 -0.000760912 6.84368 0.178374 7.43413 0.519239L28.3849 12.6073C30.256 13.6469 30.93 16.0065 29.8904 17.8776C29.5389 18.5101 29.0174 19.0316 28.3849 19.3831ZM15 10C15 9.44772 14.5523 9 14 9C13.4477 9 13 9.44771 13 10L13 15L8 15C7.44772 15 7 15.4477 7 16C7 16.5523 7.44772 17 8 17L13 17L13 22C13 22.5523 13.4477 23 14 23C14.5523 23 15 22.5523 15 22L15 17L20 17C20.5523 17 21 16.5523 21 16C21 15.4477 20.5523 15 20 15L15 15L15 10Z"
                  fill="url(#paint0_radial_820_9746)"
                />
              </g>
              <defs>
                <radialGradient
                  id="paint0_radial_820_9746"
                  cx="0"
                  cy="0"
                  r="1"
                  gradientUnits="userSpaceOnUse"
                  gradientTransform="translate(35.2809 -6.58065) rotate(126.661) scale(54.368 39.7688)"
                >
                  <stop stopColor="#FEDC8F" />
                  <stop offset="0.420236" stopColor="#F16681" />
                  <stop offset="0.707757" stopColor="#A76DFA" />
                  <stop offset="0.910465" stopColor="#33D6FA" />
                </radialGradient>
                <clipPath id="clip0_820_9746">
                  <rect
                    width="32"
                    height="32"
                    fill="white"
                    transform="translate(32) rotate(90)"
                  />
                </clipPath>
              </defs>
            </svg>

            <span className="ml-[8px] text-[16px] text-white/75 hover:text-white/95">
              <Trans i18nKey={'organization:createNewWorkspace'} />
            </span>
          </button> */}
          <SelectSeparator className="!my-[15px] w-[100%] mx-auto" />
          <Link href="/settings/profile" className='flex flex-row items-center py-2 px-3 hover:bg-[#FFFFFF0D] rounded-[5px] transition-colors duration-200'>
            <Edit3Icon size={16} />
            <p className='text-sm text-[#ffffff] ml-2.5'>Edit Account</p>
          </Link>
          {state.currentPlan?.name != 'Free' &&
            <Link href="/settings/subscription" className='flex flex-row items-center py-2 px-3 hover:bg-[#FFFFFF0D] rounded-[5px] transition-colors duration-200'>
              <CogIcon size={16} />
              <p className='text-sm text-[#ffffff] ml-2.5'>Manage Subscriptions</p>
            </Link>
          }
          <button className='flex flex-row items-center py-2 px-3 hover:bg-[#FFFFFF0D] rounded-[5px] transition-colors duration-200' onClick={signOut}>
            <LogOutIcon size={16} />
            <p className='text-sm text-[#ffffff] ml-2.5'>Sign out</p>
          </button>
        </SelectContent>
      </Select>

      <CreateOrganizationModal
        setIsOpen={setIsOrganizationModalOpen}
        isOpen={isOrganizationModalOpen}
      />
    </>
  );
};

function OrganizationsOptions(
  props: React.PropsWithChildren<{
    organizations: Array<{
      organization: Organization;
      role: MembershipRole;
    }>;
    organizationId: Maybe<number>;
  }>
) {
  return (
    <>
      {props.organizations.map(({ organization }) => {
        return (
          <SelectItem
            data-cy={`organization-selector-${organization.name}`}
            value={organization.id.toString()}
            textValue={organization.name}
            key={organization.id}
          >
            <OrganizationItem organization={organization} />
          </SelectItem>
        );
      })}
    </>
  );
}

function OrganizationItem({ organization }: { organization: any }) {
  const imageSize = 18;

  if (!organization)
    return null;

  const { name } = organization;

  return (
    <span
      data-cy={'organization-selector-item'}
      className={`flex max-w-[12rem] items-center space-x-2`}
    >
      <If condition="">
        <span className={'flex items-center'}>
          <img
            loading={'lazy'}
            style={{
              width: imageSize,
              height: imageSize,
            }}
            width={imageSize}
            height={imageSize}
            alt={`${name} Logo`}
            className={'object-contain'}
            src=""
          />
        </span>
      </If>

      <span className={'w-auto truncate font-medium text-[14px]'}>
        {name}
      </span>
    </span>
  );
}

export default OrganizationsSelector;
