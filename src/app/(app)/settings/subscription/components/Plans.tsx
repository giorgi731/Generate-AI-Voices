'use client';

import useCurrentOrganization from '~/lib/organizations/hooks/use-current-organization';

import If from '~/core/ui/If';
import Trans from '~/core/ui/Trans';

import SubscriptionCard from './SubscriptionCard';

import { canChangeBilling } from '~/lib/organizations/permissions';
import PlanSelectionForm from '~/app/(app)/settings/subscription/components/PlanSelectionForm';
import IfHasPermissions from '~/app/(app)/components/IfHasPermissions';
import BillingPortalRedirectButton from '~/app/(app)/settings/subscription/components/BillingRedirectButton';
import Link from "next/link"

const Plans: React.FC = () => {
  const organization = useCurrentOrganization();

  if (!organization) {
    return null;
  }

  const customerId = organization.subscription?.customerId;
  const subscription = organization.subscription?.data;

  if (!subscription) {
    return (
      <PlanSelectionForm customerId={customerId} organization={organization} />
    );
  }

  return (
    <div className={'flex flex-col space-y-4'}>
      <SubscriptionCard subscription={subscription} />

      <IfHasPermissions condition={canChangeBilling}>
        <If condition={customerId}>
          <div className={'flex flex-col space-y-2'}>
            {/* <BillingPortalRedirectButton customerId={customerId as string}>
              <Trans i18nKey={'subscription:manageBilling'} />
            </BillingPortalRedirectButton> */}
            <Link href="https://checkout.revocalize.ai/p/login/test_8wMeYI8pq5me57q5kk">
              <button className='px-4 py-1 bg-primary-500 rounded-xl'>GO TO CUSTOMER PORTAL</button>
            </Link>

            <span className={'text-xs text-gray-500 dark:text-gray-400'}>
              <Trans i18nKey={'subscription:manageBillingDescription'} />
            </span>
          </div>
        </If>
      </IfHasPermissions>
    </div>
  );
};

export default Plans;
