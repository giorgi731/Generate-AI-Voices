'use client';

import React, { use, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { Session } from '@supabase/supabase-js';

import useCollapsible from '~/core/hooks/use-sidebar-state';
import AppSidebar from '~/app/(app)/components/AppSidebar_V2';
import Toaster from '~/app/(app)/components/Toaster';
import MembershipRole from '~/lib/organizations/types/membership-role';
import UserData from '~/core/session/types/user-data';
import Organization from '~/lib/organizations/types/organization';
import UserSession from '~/core/session/types/user-session';

import OrganizationContext from '~/lib/contexts/organization';
import CsrfTokenContext from '~/lib/contexts/csrf';
import SidebarContext from '~/lib/contexts/sidebar';
import UserSessionContext from '~/core/session/contexts/user-session';
import I18nProvider from '~/i18n/I18nProvider';

import { setCookie } from '~/core/generic/cookies';
import AuthChangeListener from '~/app/(app)/components/AuthChangeListener';
import getSupabaseServerClient from '~/core/supabase/server-client';
import {
  GlobalStateProvider,
  SET_CURRENT_PLAN,
  useGlobalState,
} from '~/lib/contexts/GlobalStore';
import Script from 'next/script';
import useGetOrganization from '~/lib/organizations/hooks/use-get-organization';
import { getOrganizationById } from '~/lib/organizations/database/queries';
import useGetCurrentOrganization from '~/lib/organizations/hooks/use-get-current-organization';
import useCurrentOrganization from '~/lib/organizations/hooks/use-current-organization';
import useGetOrganizationSubscriptionActive from '~/lib/subscriptions/hooks/use-get-organization-subscription-active';
import configuration from '~/configuration';

interface Data {
  accessToken: Maybe<string>;
  language: string;
  csrfToken: string | null;
  session: Session;
  user: UserData;
  organization: Organization;
  role: MembershipRole;
  ui: {
    sidebarState?: string;
    theme?: string;
  };
  organizationId: number,
}

const RouteShell: React.FCC<{ data: Data; }> = ({ data, children }) => {
  const { data: activeOrg } = useGetOrganizationSubscriptionActive() as any;


  const userSessionContext: UserSession = useMemo(() => {
    return {
      auth: data.session,
      data: data.user,
      role: data.role,
    };
  }, [data]);

  const [organization, setOrganization] = useState<Maybe<Organization>>(
    activeOrg || undefined
  );
  // const { mutate: getCurrentOrganization } = useGetCurrentOrganization();
  const [userSession, setUserSession] =
    useState<Maybe<UserSession>>(userSessionContext);

  const updateCurrentOrganization = useCallback(async () => {
    const organization = activeOrg
    // const organization = await getCurrentOrganization(data.user.id, Number(data.organizationId))
    if (organization) {
      setOrganization(activeOrg)
      setCookie('organizationId', activeOrg?.id);
    }
  }, [activeOrg]);

  const updateCurrentUser = useCallback(() => {
    if (userSessionContext.auth) {
      setUserSession(userSessionContext);
    }
  }, [userSessionContext]);

  useEffect(() => { updateCurrentOrganization() }, [updateCurrentOrganization]);
  useEffect(updateCurrentUser, [updateCurrentUser]);

  // TODO: Rewardful integration (maybe re-enable later)
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     const rewardfulScript1 = document.createElement('script');
  //     rewardfulScript1.innerHTML = `(function(w,r){w._rwq=r;w[r]=w[r]||function(){(w[r].q=w[r].q||[]).push(arguments)}})(window,'rewardful');`;
  //     document.body.appendChild(rewardfulScript1);
  //     const rewardfullScript2 = document.createElement('script');
  //     rewardfullScript2.src = 'https://r.wdfl.co/rw.js';
  //     rewardfullScript2.async = true;
  //     rewardfullScript2.dataset.rewardful = 'efc206';
  //     document.body.appendChild(rewardfullScript2);
  //   }, 5000); // 5 seconds
  //   return () => {
  //     clearTimeout(timer);
  //   };
  // }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    (window as any).intercomSettings = !(userSession && userSession.data && userSession.data.id)
      ? {
        api_base: "https://api-iam.intercom.io",
        app_id: "vs0vjfi3"
      }
      : {
        app_id: 'vs0vjfi3',
        background_color: '#a927d6',
        user_id: userSession.data.id,
        email: userSession?.auth?.user?.email,
        ...(userSession.data.displayName && { name: userSession.data.displayName }),
        ...(userSession.data.balance && { credit_balance: userSession.data.balance }),
        ...((userSession?.auth?.user && userSession.auth?.user.user_metadata.picture) && {
          avatar: {
            type: "avatar",
            image_url: userSession.auth?.user.user_metadata.picture
          }
        }),
        // created_at: user.created_at,
      }
  }, [userSession]);

  return (
    <UserSessionContext.Provider value={{ userSession, setUserSession }}>
      <GlobalStateProvider>
        <OrganizationContext.Provider value={{ organization, setOrganization }}>
          <CsrfTokenContext.Provider value={data.csrfToken}>
            <I18nProvider lang={data.language}>
              <AuthChangeListener accessToken={data.accessToken}
              // whenSignedOut='/'
              >
                <main>
                  <Toaster />

                  <RouteShellWithSidebar collapsed={data?.ui?.sidebarState === 'collapsed'}>
                    {children}
                  </RouteShellWithSidebar>
                </main>
              </AuthChangeListener>
            </I18nProvider>
          </CsrfTokenContext.Provider>
        </OrganizationContext.Provider>
      </GlobalStateProvider>
    </UserSessionContext.Provider>
  );
};

export default RouteShell;

export function RouteShellWithSidebar(
  props: React.PropsWithChildren<{
    collapsed: boolean;
  }>
) {
  const [collapsed, setCollapsed] = useCollapsible(props.collapsed);
  const { organization } = useContext(OrganizationContext);
  const [state, dispatch] = useGlobalState();

  useEffect(() => {
    const product = configuration.stripe.products.find((i: any) => i.stripeProductId === organization?.subscription?.data?.priceId);

    if (!product) {
      dispatch({
        type: SET_CURRENT_PLAN,
        payload: configuration.stripe.products[0],
      });
    } else {
      dispatch({
        type: SET_CURRENT_PLAN,
        payload: product,
      });
    }
  }, [organization?.subscription])


  return (
    <div
      className={'flex h-full flex-1 md:overflow-hidden font-custom'}
    >
      <SidebarContext.Provider value={{ collapsed, setCollapsed }}>
        <div className={'hidden lg:block'}>
          <AppSidebar />
        </div>

        <div className={'relative md:mx-auto h-screen w-full md:overflow-y-auto md:mt-3 xl:mt-4'}>
          <div>{props.children}</div>
        </div>
      </SidebarContext.Provider>

      {/* Intercom for landing pages */}
      <Script id="intercom" strategy='lazyOnload'>{`(function(){var w=window;var ic=w.Intercom;if(typeof ic==="function"){ic('reattach_activator');ic('update',w.intercomSettings);}else{var d=document;var i=function(){i.c(arguments);};i.q=[];i.c=function(args){i.q.push(args);};w.Intercom=i;var l=function(){var s=d.createElement('script');s.type='text/javascript';s.async=true;s.src='https://widget.intercom.io/widget/vs0vjfi3';var x=d.getElementsByTagName('script')[0];x.parentNode.insertBefore(s,x);};if(document.readyState==='complete'){l();}else if(w.attachEvent){w.attachEvent('onload',l);}else{w.addEventListener('load',l,false);}}})();`}</Script>
    </div>
  );
}

