'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Trans from '~/core/ui/Trans';
import AuthErrorMessage from './AuthErrorMessage';
import useSignUpWithEmailAndPasswordMutation from '~/core/hooks/use-sign-up-with-email-password';
import If from '~/core/ui/If';
import Alert from '~/core/ui/Alert';

import EmailPasswordSignUpForm from '~/app/(auth)/components/EmailPasswordSignUpForm';
import configuration from '~/configuration';
import getBrowserFingerprint from 'get-browser-fingerprint';

const requireEmailConfirmation = configuration.auth.requireEmailConfirmation;

const EmailPasswordSignUpContainer: React.FCC<{
  onSignUp?: () => unknown;
  onSubmit?: (userId?: string) => void;
  onError?: (error?: unknown) => unknown;
}> = ({ onSignUp, onSubmit, onError }) => {
  const signUpMutation = useSignUpWithEmailAndPasswordMutation();
  const redirecting = useRef(false);
  const loading = signUpMutation.isMutating || redirecting.current;
  const [showVerifyEmailAlert, setShowVerifyEmailAlert] = useState(false);

  const callOnErrorCallback = useCallback(() => {
    if (signUpMutation.error && onError) {
      onError(signUpMutation.error);
    }
  }, [signUpMutation.error, onError]);

  useEffect(() => {
    callOnErrorCallback();
  }, [callOnErrorCallback]);

  const onSignupRequested = useCallback(
    async (params: { email: string; password: string }) => {
      if (loading) {
        return;
      }

      try {
        redirecting.current = true;
        const uuid = getBrowserFingerprint({ enableWebgl: true });
        const data = await signUpMutation.trigger({ ...params, uuid });

        if (requireEmailConfirmation) {
          setShowVerifyEmailAlert(true);

          if (onSubmit) {
            const userId = data?.user?.id;
            onSubmit(userId);
          }
        } else {
          onSignUp && onSignUp();
        }
      } catch (error) {
        if (onError) {
          onError(error);
        }
      } finally {
        redirecting.current = false;
      }
    },
    [loading, onError, onSignUp, onSubmit, signUpMutation]
  );

  console.log(signUpMutation, 'sign-up error');
  return (
    <>
      <If condition={showVerifyEmailAlert}>
        <Alert type={'success'}>
          <Alert.Heading>
            <Trans i18nKey={'auth:emailConfirmationAlertHeading'} />
          </Alert.Heading>

          <p data-cy={'email-confirmation-alert'}>
            <Trans i18nKey={'auth:emailConfirmationAlertBody'} />
          </p>
        </Alert>
      </If>

      <If condition={!showVerifyEmailAlert}>
        <AuthErrorMessage error={signUpMutation.error} />

        <EmailPasswordSignUpForm
          onSubmit={onSignupRequested}
          loading={loading}
        />
      </If>
    </>
  );
};

export default EmailPasswordSignUpContainer;
