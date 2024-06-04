import { Metadata } from 'next';
import { ConvertPage } from './ConvertPage';

/* Metadata */
import { defaultMetadata } from '~/app/metadata';

const pageTitle = 'AI Voice Generator: Voice Cloning & Realistic Text to Speech'
const pageDescription = 'Generate studio-quality AI voices in one-click, or choose from our officially licensed AI voice models. Get started instantly.'
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

export default function ConvertPageWrapper() {
  return <ConvertPage />;
}