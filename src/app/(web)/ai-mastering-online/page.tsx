import { Metadata } from 'next';
import MasteringPage from './MasteringPage';

/* Metadata */
import { defaultMetadata } from '~/app/metadata';

const pageTitle = 'Free Online AI-Powered Audio Mastering'
const pageDescription = 'Experience the best online audio mastering service with our AI-powered tool. Instantly master your music, get your tracks enhanced by award-winning engineers, and discover the power of AI in audio mastering.'
const pageUrl = '/ai-voice-generator';
export const metadata: Metadata = {
  ...defaultMetadata,
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    url: pageUrl,
    title: pageTitle,
    description: pageDescription,
  }
};

export default function MasteringPageWrapper() {
  return <MasteringPage />;
}