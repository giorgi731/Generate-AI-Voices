import Link from 'next/link';
import Trans from '~/core/ui/Trans';

import Heading from '~/core/ui/Heading';
import configuration from '~/configuration';
import SignInMethodsContainer from '~/app/(auth)/components/SignInMethodsContainer';
import { useSearchParams } from 'next/navigation';
import { headers } from 'next/headers';

const SIGN_UP_PATH = configuration.paths.signUp;

export const metadata = {
  title: 'Sign In',
};

function SignInPage() {
  const headersList = headers()
  const path = headersList.get('x-url')
  const url = new URL(path || "");
  const destinationPath = url.searchParams.get('destination');
  return (
    <>
      <div>
        <Heading type={6}>
          <span className={'font-medium font-custom'}>
            <Trans i18nKey={'auth:signInHeading'} />
          </span>
        </Heading>
      </div>

      <SignInMethodsContainer />

      <div className={'flex justify-center text-sm'}>
        <p className={'flex space-x-1'}>
          <span className="font-custom">
            <Trans i18nKey={'auth:doNotHaveAccountYet'} />
          </span>

          <Link
            className={'text-primary-800 hover:underline dark:text-primary-500 font-custom'}
            href={SIGN_UP_PATH + (destinationPath ? '?destination=' + encodeURIComponent(destinationPath) : "")}
          >
            <Trans i18nKey={'auth:signUp'} />
          </Link>
        </p>
      </div>
    </>
  );
}

export default SignInPage;
