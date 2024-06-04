import Hero from '~/core/ui/Hero';
import Container from '~/core/ui/Container';
import SubHeading from '~/core/ui/SubHeading';
import Link from 'next/link';

export const metadata = {
  title: 'Terms of Service',
};

const TermsPage = () => {
  return (
    <div>
      <Container>
        <div className={'flex flex-col space-y-14'}>
          <div className={'flex flex-col items-center'}>
            <Hero>Terms of Service</Hero>
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
            <h1 className="mb-4 text-3xl font-bold">Terms of Service</h1>
            <p className="mb-5">Welcome to Revocalize AI, a product owned and operated by IREAL Meta Labs. These Terms of Service outline the terms and conditions under which you may use our website and software.</p>
            <h2 className="mb-2 text-xl font-bold">Acceptance of Terms</h2>
            <p className="mb-5">By accessing or using Revocalize AI, you agree to be bound by these Terms of Service. If you do not agree to these terms, you may not use Revocalize AI.</p>
            <h2 className="mb-2 text-xl font-bold">Privacy Policy</h2>
            <p className="mb-5">Please review our Privacy Policy, which outlines our practices regarding the collection, use, and disclosure of your personal information.</p>
            <h2 className="mb-2 text-xl font-bold">User Content</h2>
            <p className="mb-5">By using Revocalize AI, you agree that any content you upload or create using our software is your own, and you are solely responsible for it. You also agree that you will not use Revocalize AI to upload or create any content that is offensive, abusive, or infringes on the rights of others.</p>
            <h2 className="mb-2 text-xl font-bold">Intellectual Property</h2>
            <p className="mb-5">All content and materials available on Revocalize AI, including but not limited to text, graphics, logos, images, and software, are the property of IREAL Meta Labs or its licensors and are protected by United States and international copyright, trademark, and other intellectual property laws. You may not use any content or materials from Revocalize AI without our prior written consent.</p>
            <h2 className="mb-2 text-xl font-bold">Disclaimer of Warranties</h2>
            <p className="mb-5">Revocalize AI is provided "as is" and without warranty of any kind, whether express, implied, or statutory. We do not guarantee that our software will be uninterrupted or error-free, and we do not warrant that any content or materials on Revocalize AI are accurate or complete.</p>
            <h2 className="mb-2 text-xl font-bold">Limitation of Liability</h2>
            <p className="mb-5">In no event shall IREAL Meta Labs or its affiliates be liable for any direct, indirect, incidental, special, or consequential damages arising out of or in connection with your use of Revocalize AI, whether based on contract, tort, strict liability, or any other legal theory.</p>
            <h2 className="mb-2 text-xl font-bold">Modification of Terms</h2>
            <p className="mb-5">IREAL Meta Labs reserves the right to modify these Terms of Service at any time, without notice. It is your responsibility to review these terms regularly to stay informed of any changes.</p>
            <h2 className="mb-2 text-xl font-bold">Termination</h2>
            <p className="mb-5">IREAL Meta Labs may terminate your access to Revocalize AI at any time, without notice, for any reason.</p>
            <h2 className="mb-2 text-xl font-bold">Governing Law</h2>
            <p className="mb-5">These Terms of Service are governed by and construed in accordance with the laws of the State of California, without giving effect to any principles of conflicts of law.</p>
            <h2 className="mb-2 text-xl font-bold">Indemnification</h2>
            <p className="mb-5">You agree to indemnify and hold harmless IREAL Meta Labs, its affiliates, and their respective officers, directors, employees, and agents, from and against any claims, actions, suits, or proceedings, as well as any and all losses, liabilities, damages, costs, and expenses (including reasonable attorneys' fees) arising out of or related to your use of Revocalize AI, including but not limited to any content you upload or create using our software, any violation of these Terms of Service, or any infringement of any third party's rights.</p>
            <h2 className="mb-2 text-xl font-bold">Entire Agreement</h2>
            <p className="mb-5">These Terms of Service, together with our Privacy Policy, constitute the entire agreement between you and IREAL Meta Labs with respect to your use of Revocalize AI, and supersede all prior or contemporaneous communications and proposals, whether oral or written, between you and IREAL Meta Labs.</p>
            <h2 className="mb-2 text-xl font-bold">Contact Us</h2>
            <p className="mb-5">If you have any questions or concerns about these Terms of Service, please contact us at support@revocalize.ai.</p>
          </div>

          </div>
        </div>
      </Container>
    </div>
  );
};

export default TermsPage;
