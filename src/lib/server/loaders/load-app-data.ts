import { cookies, headers } from 'next/headers';

import getCurrentOrganization from '~/lib/server/organizations/get-current-organization';
import { parseOrganizationIdCookie } from '~/lib/server/cookies/organization.cookie';

import getUIStateCookies from '~/lib/server/loaders/utils/get-ui-state-cookies';
import { getUserDataById } from '../queries';

import getSupabaseServerClient from '~/core/supabase/server-client';
import requireSession from '~/lib/user/require-session';
import getLogger from '~/core/logger';

import configuration from '~/configuration';
// import initializeServerI18n from '~/i18n/i18n.server';
// import getLanguageCookie from '~/i18n/get-language-cookie';
// import { MEMBERSHIPS_TABLE, ORGANIZATIONS_TABLE } from '../../db-tables';
// import { getFirstOrganizationByUserId } from '~/lib/organizations/database/queries';

const loadAppData = async () => {
  try {
    const client = getSupabaseServerClient();
    const sessionResult = await requireSession(client);

    if ('redirect' in sessionResult) {
      return sessionResult;
    }

    const user = sessionResult.user;

    // Execute these operations in parallel
    const [userRecord, csrfToken] = await Promise.all([
      getUserDataById(client, user.id), // Fetch user record
      getCsrfToken(), // Get CSRF token
    ]);

    if (!userRecord) {
      return redirectToOnboarding();
    }

    let currentOrganizationId;
    try {
      currentOrganizationId = Number(await parseOrganizationIdCookie(cookies()));
    } catch (error) {
      getLogger().warn(`Could not parse organization id cookie: ${JSON.stringify(error)}`);
      return redirectToHomePage();
    }

    const language = 'en'; // Consider fetching this dynamically or using environment variables

    return {
      accessToken: sessionResult.access_token,
      language,
      csrfToken,
      session: sessionResult,
      user: { ...userRecord, email: sessionResult.user.email },
      organization: null,
      organizationId: null,
      role: userRecord.role,
      ui: getUIStateCookies(),
    };
  } catch (error) {
    getLogger().warn(`Could not load application data: ${JSON.stringify(error)}`);
    return redirectToHomePage();
  }
};

function redirectToOnboarding() {
  return redirectTo(configuration.paths.onboarding);
}

function redirectToHomePage() {
  return redirectTo('/');
}

function getCsrfToken() {
  return headers().get('X-CSRF-Token');
}

function redirectTo(destination: string) {
  return {
    data: undefined,
    redirect: true,
    destination,
  };
}

export default loadAppData;
