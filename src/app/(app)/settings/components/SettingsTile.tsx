'use client';
import { useContext } from 'react';
import { BiSolidPurchaseTag } from 'react-icons/bi';
import Heading from '~/core/ui/Heading';
import If from '~/core/ui/If';
import OrganizationContext from '~/lib/contexts/organization';

const SettingsTile: React.FCC<{
  heading?: string | React.ReactNode;
  subHeading?: string | React.ReactNode;
  actions?: React.ReactNode;
  plugin?: string | React.ReactNode;
}> = ({ children, heading, subHeading, actions, plugin }) => {
  const { organization } = useContext(OrganizationContext);

  return (
    <div className={'flex w-full flex-col space-y-6'}>
      <div className={'flex flex-col space-y-1.5'}>
        <div className={'flex items-center justify-between'}>
          <If condition={heading}>
            <div className={'mb-3 mt-1 flex flex-col'}>
              <Heading type={4}>
                <span className={'font-medium'}>{heading}</span>
              </Heading>
              <div className="flex items-end gap-5 pt-[1px] text-sm text-gray-500 dark:text-gray-400">
                <If condition={subHeading}>
                  <p>{subHeading}</p>
                </If>
              </div>
            </div>
            <If condition={organization?.plugin_purchased}>
              <If condition={plugin}>
                <BiSolidPurchaseTag />
                <p>{plugin}</p>
              </If>
            </If>
          </If>

          <If condition={actions}>{actions}</If>
        </div>
      </div>

      <div className={'w-[370px] rounded-lg'}>{children}</div>
    </div>
  );
};

export default SettingsTile;
