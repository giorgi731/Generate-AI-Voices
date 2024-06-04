import { Metadata } from 'next';
import APIOverviewPage from './APIOverviewPage';

/* Metadata */
import { defaultMetadata } from '~/app/metadata';

const pageTitle = 'AI Voices API – Create, Clone, Convert, & Download AI Voices in Real-Time'
const pageDescription = 'Generate AI voices in real-time with the Revocalize API – the world’s best AI voice generator. Create, clone, convert, and download AI voices in seconds.'
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

export default function APIOverviewPageWrapper() {
  return <APIOverviewPage />;
}