import { OrganizationSubscription } from './organization-subscription';

interface Organization {
  id: number;
  name: string;
  // timezone?: string;
  credits?: number;
  // logoURL?: string | null;
  api_key: string;
  slots: number;
  subscription?: {
    customerId: Maybe<string>;
    data: OrganizationSubscription;
  };
  plugin_purchased?: boolean;
}

export default Organization;
