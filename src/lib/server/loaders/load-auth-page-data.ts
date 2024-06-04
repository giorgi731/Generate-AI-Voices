import configuration from '~/configuration';

import getSupabaseServerClient from '~/core/supabase/server-client';
import initializeServerI18n from '~/i18n/i18n.server';
import getLanguageCookie from '~/i18n/get-language-cookie';
import verifyRequiresMfa from '~/core/session/utils/check-requires-mfa';
import { headers } from 'next/headers';

const loadAuthPageData = async () => {
  const { language } = await initializeServerI18n(getLanguageCookie());

  try {
    const client = getSupabaseServerClient();

    const {
      data: { session },
    } = await client.auth.getSession();

    const requiresMultiFactorAuthentication = await verifyRequiresMfa(client);

    // If the user is logged in and does not require multi-factor authentication,
    // redirect them to the home page.

    if (session && !requiresMultiFactorAuthentication) {
      const headersList = headers()
      const path = headersList.get('x-url')
      const url = new URL(path || "");
      const destinationPath = url.searchParams.get('destination');

      return {
        redirect: true,
        destination: destinationPath || configuration.paths.appHome,
      };
    }

    return {
      language,
    };
  } catch (e) {
    return {
      language,
    };
  }
};

export default loadAuthPageData;
