'use client';

import { useCallback } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';

import If from '~/core/ui/If';
import Trans from '~/core/ui/Trans';
import OAuthProviders from '~/app/(auth)/components/OAuthProviders';

import EmailPasswordSignInContainer from '~/app/(auth)/components/EmailPasswordSignInContainer';
import PhoneNumberSignInContainer from '~/app/(auth)/components/PhoneNumberSignInContainer';
import EmailLinkAuth from '~/app/(auth)/components/EmailLinkAuth';

import configuration from '~/configuration';

function SignInMethodsContainer() {
  const router = useRouter();
  const destinationPath = useSearchParams()?.get('destination');
  const onSignIn = useCallback(() => {
    if (destinationPath) {
      router.push(destinationPath);
    } else {
      router.push(configuration.paths.appHome);
    }
  }, [router, destinationPath]);

  return (
    <>
      <OAuthProviders returnUrl={destinationPath || ''} />

      <If condition={configuration.auth.providers.emailPassword}>
        <div>
          <span className={'text-xs text-gray-400'}>
            <Trans i18nKey={'auth:orContinueWithEmail'} />
          </span>
        </div>

        <EmailPasswordSignInContainer onSignIn={onSignIn} />
      </If>

      <If condition={configuration.auth.providers.phoneNumber}>
        <PhoneNumberSignInContainer onSignIn={onSignIn} />
      </If>

      <If condition={configuration.auth.providers.emailLink}>
        <EmailLinkAuth />
      </If>
    </>
  );
}

export default SignInMethodsContainer;
