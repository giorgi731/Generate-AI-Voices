import Hero from '~/core/ui/Hero';
import Container from '~/core/ui/Container';
import SubHeading from '~/core/ui/SubHeading';
import Link from 'next/link';

export const metadata = {
  title: 'Privacy Policy',
};

const PrivacyPage = () => {
  return (
    <div>
      <Container>
        <div className={'flex flex-col space-y-14'}>
          <div className={'flex flex-col items-center'}>
            <Hero>Privacy Policy</Hero>
            <SubHeading>
              Last updated: {new Date().toLocaleDateString()}
            </SubHeading>
          </div>

          <div
            className={
              'm-auto flex w-full max-w-2xl flex-col items-start space-y-8' +
              ' justify-center text-gray-600 dark:text-gray-400'
            }
          >

          <div className="p-4">
            <h1 className="mb-4 text-3xl font-bold">Privacy Policy</h1>
            <p className="mb-5">Revocalize AI, a product owned and operated by IREAL Meta Labs, is committed to protecting the privacy of our users. This Privacy Policy outlines our practices regarding the collection, use, and disclosure of your personal information.</p>
            <h2 className="mb-2 text-xl font-bold">Collection of Information</h2>
            <p className="mb-5">We may collect personal information from you, such as your name, email address, and payment information, when you use Revocalize AI. We may also collect information about your use of our software, including your IP address, browser type, and operating system.</p>
            <h2 className="mb-2 text-xl font-bold">Use of Information</h2>
            <p className="mb-5">We use the information we collect to provide and improve our services, to personalize your experience, and to communicate with you about our products and services. We may also use your information to analyze how you use our software and to identify trends and patterns.</p>
            <h2 className="mb-2 text-xl font-bold">Disclosure of Information</h2>
            <p className="mb-5">We do not sell or rent your personal information to third parties. However, we may share your information with our service providers and business partners who assist us in providing our services. We may also disclose your information if required by law or to protect our rights or the rights of our users.</p>
            <h2 className="mb-2 text-xl font-bold">Security</h2>
            <p className="mb-5">We take reasonable measures to protect the security of your personal information. However, no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee the absolute security of your information.</p>
            <h2 className="mb-2 text-xl font-bold">Cookies</h2>
            <p className="mb-5">We use cookies to collect information about your use of Revocalize AI. Cookies are small text files that are stored on your device when you visit a website. We use cookies to personalize your experience and to improve our services.</p>
            <h2 className="mb-2 text-xl font-bold">Third-Party Websites</h2>
            <p className="mb-5">Revocalize AI may contain links to third-party websites. We are not responsible for the privacy practices or content of these websites. We encourage you to review the privacy policies of these websites before providing any personal information.</p>
            <h2 className="mb-2 text-xl font-bold">Children's Privacy</h2>
            <p className="mb-5">Revocalize AI is not intended for use by children under the age of 13. We do not knowingly collect personal information from children under the age of 13. If you are a parent or guardian and believe that your child has provided us with personal information, please contact us immediately.</p>
            <h2 className="mb-2 text-xl font-bold">Changes to this Policy</h2>
            <p className="mb-5">IREAL Meta Labs reserves the right to modify this Privacy Policy at any time, without notice. It is your responsibility to review this policy regularly to stay informed of any changes.</p>
            <h2 className="mb-2 text-xl font-bold">Contact Us</h2>
            <p className="mb-5">If you have any questions or concerns about this Privacy Policy, please contact us at support@revocalize.ai.</p>
          </div>

          </div>
        </div>
      </Container>
    </div>
  );
};

export default PrivacyPage;
