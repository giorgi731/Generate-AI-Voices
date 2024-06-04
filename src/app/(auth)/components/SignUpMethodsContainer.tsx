'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

import If from '~/core/ui/If';
import Trans from '~/core/ui/Trans';

import EmailPasswordSignUpContainer from '~/app/(auth)/components/EmailPasswordSignUpContainer';
import PhoneNumberSignInContainer from '~/app/(auth)/components/PhoneNumberSignInContainer';
import EmailLinkAuth from '~/app/(auth)/components/EmailLinkAuth';
import OAuthProviders from '~/app/(auth)/components/OAuthProviders';

import configuration from '~/configuration';

function SignUpMethodsContainer() {
  const router = useRouter();
  const destinationPath = useSearchParams()?.get('destination');
  const onSignUp = useCallback(() => {
    if (destinationPath) {
      router.push(destinationPath);
    } else {
      router.push("/ai-voice-generator");
    }
  }, [router]);

  return (
    <>
      <OAuthProviders returnUrl={destinationPath || ""} />

      <If condition={configuration.auth.providers.emailPassword}>
        <div>
          <span className={'text-xs text-gray-400'}>
            <Trans i18nKey={'auth:orContinueWithEmail'} />
          </span>
        </div>

        <EmailPasswordSignUpContainer onSignUp={onSignUp} />
      </If>

      <If condition={configuration.auth.providers.phoneNumber}>
        <PhoneNumberSignInContainer onSignIn={onSignUp} />
      </If>

      <If condition={configuration.auth.providers.emailLink}>
        <EmailLinkAuth />
      </If>
    </>
  );
}

export default SignUpMethodsContainer;
