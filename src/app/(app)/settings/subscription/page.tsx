"use client"
import Trans from '~/core/ui/Trans';
import SettingsTile from '~/app/(app)/settings/components/SettingsTile';
import BillingPortalRedirectButton from './components/BillingRedirectButton';
import OrganizationContext from '~/lib/contexts/organization';
import { useContext } from 'react';
import Link from 'next/link';

const SubscriptionSettingsPage = () => {
  const { organization } = useContext(OrganizationContext);

  console.log(organization?.subscription?.customerId, "papap")

  return (
    <SettingsTile
      heading={<Trans i18nKey={'common:subscriptionSettingsTabLabel'} />}
      subHeading={<Trans i18nKey={'subscription:subscriptionTabSubheading'} />}
    >
      {/* <BillingPortalRedirectButton customerId={organization?.subscription?.customerId as string}>
        <Trans i18nKey={'subscription:manageBilling'} />
      </BillingPortalRedirectButton> */}
      <Link href="https://checkout.revocalize.ai/p/login/fZeg0g1Fv9Cse6AdQQ">
        <button className='px-4 py-1 bg-primary-500 rounded-xl'>GO TO CUSTOMER PORTAL</button>
      </Link>

    </SettingsTile>
  );
};

export default SubscriptionSettingsPage;
