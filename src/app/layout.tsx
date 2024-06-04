import './globals.css';
import { Analytics } from '@vercel/analytics/react';

import { cookies } from 'next/headers';
import classNames from 'classnames';
import initializeServerI18n from '~/i18n/i18n.server';
import { I18N_COOKIE_NAME } from '~/i18n/i18n.settings';
import ThemeSetter from '~/components/ThemeSetter';
import Fonts from '~/components/Fonts';
import configuration from '~/configuration';

/* Metadata */
import { defaultMetadata } from './metadata';
import { AudioContextProvider } from './AudioContext';
export const metadata = defaultMetadata;
import 'intro.js/introjs.css';
import 'intro.js/themes/introjs-modern.css'
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const i18n = await initializeServerI18n(getLanguageCookie());

  return (
    <html lang="en" className='dark'>
      <AudioContextProvider>
        <Fonts />
        <ThemeSetter />
        <Analytics />
        <body className="overflow-x-hidden">
          <svg className="transform transition-all duration-200 group-hover:-rotate-12   h-5" width="16"
            viewBox="0 0 16 16" fill="white" xmlns="http://www.w3.org/2000/svg"
            style={{ height: 0 }}>
            <defs>
              <radialGradient id="paint0_radial_1361_7696" cx="0" cy="0" r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(-2.11164 -1.61115) rotate(39.6323) scale(25.365 19.0296)">
                <stop stopColor="#FEDC8F"></stop>
                <stop offset="0.420236" stopColor="#F16681"></stop>
                <stop offset="0.707757" stopColor="#A76DFA"></stop>
                <stop offset="0.910465" stopColor="#33D6FA"></stop>
              </radialGradient>
            </defs>

          </svg>
          {children}
        </body>
      </AudioContextProvider>

    </html>
  );
}

// function getClassName() {
//   const theme = cookies().get('theme')?.value;
//   const dark = theme === 'dark' || !theme;
//   return classNames({ dark });
// }

// function getLanguageCookie() {
//   return cookies().get(I18N_COOKIE_NAME)?.value;
// }

// export const metadata = {
//   title: configuration.site.name,
//   description: configuration.site.description,
//   openGraph: {
//     url: configuration.site.siteUrl,
//     siteName: configuration.site.siteName,
//     description: configuration.site.description,
//   },
//   themeColor: configuration.site.themeColor,
//   twitter: {
//     card: 'summary_large_image',
//     title: configuration.site.name,
//     description: configuration.site.description,
//     creator: configuration.site.twitterHandle,
//   },
//   icons: {
//     icon: '/assets/images/favicon/favicon.ico',
//     shortcut: '/shortcut-icon.png',
//     apple: '/assets/images/favicon/apple-touch-icon.png',
//     other: {
//       rel: 'apple-touch-icon-precomposed',
//       url: '/apple-touch-icon-precomposed.png',
//     },
//   },
// };
