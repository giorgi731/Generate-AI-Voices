import { Metadata } from 'next';
import DownloadPluginPage from './DownloadPluginPage';

/* Metadata */
import { defaultMetadata } from '~/app/metadata';

const pageTitle = 'Download AI Voice Generator Plugin for free'
const pageDescription = 'Download the free AI Voice Generator plugin for Logic Pro, Pro Tools, Ableton, FL Studio, and more. Convert vocals into any AI voice in seconds.'
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

export default function DownloadPluginPageWrapper() {
  return <DownloadPluginPage />;
}