import { Metadata } from 'next';

const description = 'Revocalize AI is a cutting-edge AI voice platform. Create studio-quality AI voices in one-click, or choose from our officially licensed AI voice models.';

export const defaultMetadata: Metadata = {
  metadataBase: new URL('https://www.revocalize.ai'),
  title: {
    template: '%s | Revocalize AI',
    default: 'Revocalize AI',
  },
  description,
  category: 'technology',
  applicationName: 'Revocalize AI',
  // themeColor: '#ff1451',
  type: 'website',
  openGraph: {
    locale: 'en_US',
    site_name: 'Revocalize AI',
    images: [
      {
        url: 'https://www.revocalize.ai/revocalize-og.png',
        width: 1616,
        height: 848,
      }
    ],
    // @ts-ignore:next-line
    type: 'website',
  },
  twitter: {
    title: 'Revocalize AI',
    creator: '@revocalize',
    creatorId: '1649372940419383296',
    description,
    card: 'summary_large_image',
    images: ['https://www.revocalize.ai/revocalize-og.png'],
  },
  author: 'Revocalize AI',
  keywords:
    'AI voice synthesizer, Vocal synthesis software, Music production tool, Virtual assistant technology, Interactive storytelling software, Language learning tool, Customer service automation, Speech impairment assistive technology, Natural language processing, Audio fingerprinting technology',
  siteName: 'Revocalize AI',
  siteUrl: 'https://www.revocalize.ai',
  //   alternates: {
  //     canonical: '',
  //     languages: {
  //       'en-US': '/en-US',
  //       'de-DE': '/de-DE',
  //     },
  //   },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  // icons: {
  //   icon: { url: "/favicon/favicon-32x32.png", type: "image/png" },
  //   apple: '/favicon/apple-icon.png',
  //   other: { url: '/favicon/apple-icon-precomposed.png',rel: 'apple-touch-icon-precomposed'},
  //   shortcut: { url: "/favicon/favicon-32x32.png", type: "image/png" },
  // },
};
