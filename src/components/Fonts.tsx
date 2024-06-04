'use client';

import { Inter as HeadingFont} from 'next/font/google';
import localFont from 'next/font/local';
import { useServerInsertedHTML } from 'next/navigation';

const sans = HeadingFont({
  subsets: ['latin'],
  preload: true,
  variable: '--font-family-sans',
  fallback: ['system-ui', 'Helvetica Neue', 'Helvetica', 'Arial'],
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
});

// const heading = HeadingFont({
//   subsets: ['latin'],
//   variable: '--font-family-heading',
//   fallback: ['--font-family-sans'],
//   weight: ['400', '500'],
//   display: 'swap',
// });

function Fonts() {
  useServerInsertedHTML(() => {
    return (
      <style
        key={'fonts'}
        dangerouslySetInnerHTML={{
          __html: `
          :root {
            --font-family-sans: ${sans.style.fontFamily},'-apple-system', 'BlinkMacSystemFont', 'system-ui', 'Segoe UI', 'Roboto',
              'Ubuntu', 'sans-serif';
            --font-system: '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'Segoe UI', 'Roboto';
            --font-custom: ${TTFirsNeue.style.fontFamily};
          }
        `,
        }}
      />
    );
  });

  return null;
}

export default Fonts;

export function PagesDirectoryFonts() {
  return (
    <style jsx global>
      {`
        :root {
          --font-family-sans: ${sans.style.fontFamily}, '-apple-system',
            'BlinkMacSystemFont', 'system-ui', 'Segoe UI', 'Roboto', 'Ubuntu',
            'sans-serif';
          --font-system: '-apple-system', 'BlinkMacSystemFont', 'system-ui',
            'Segoe UI', 'Roboto';
          --font-custom: ${TTFirsNeue.style.fontFamily};
        }
      `}
    </style>
  );
}

const TTFirsNeue = localFont({
  variable: '--font-custom',
  preload: true,
  fallback: ['system-ui', 'Helvetica Neue', 'Helvetica', 'Arial'],
  src: [
    {
      path: '../../public/fonts/Roobert/Roobert-Heavy.woff2',
      weight: '800',
      style: 'normal',
    },
    // {
    //   path: '../../public/fonts/TT-Firs-Neue/TTFirsNeue-ExtraBoldItalic.woff2',
    //   weight: '800',
    //   style: 'italic',
    // },
    {
      path: '../../public/fonts/Roobert/Roobert-Light.woff2',
      weight: '200',
      style: 'normal',
    },
    // {
    //   path: '../../public/fonts/TT-Firs-Neue/TTFirsNeue-ExtraLightItalic.woff2',
    //   weight: '200',
    //   style: 'italic',
    // },
    {
      path: '../../public/fonts/Roobert/Roobert-Light.woff2',
      weight: '300',
      style: 'normal',
    },
    // {
    //   path: '../../public/fonts/TT-Firs-Neue/TTFirsNeue-LightItalic.woff2',
    //   weight: '300',
    //   style: 'italic',
    // },
    {
      path: '../../public/fonts/Roobert/Roobert-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    // {
    //   path: '../../public/fonts/TT-Firs-Neue/TTFirsNeue-Italic.woff2',
    //   weight: '400',
    //   style: 'italic',
    // },
    {
      path: '../../public/fonts/Roobert/Roobert-SemiBold.woff2',
      weight: '500',
      style: 'normal',
    },
    // {
    //   path: '../../public/fonts/TT-Firs-Neue/TTFirsNeue-MediumItalic.woff2',
    //   weight: '500',
    //   style: 'italic',
    // },
    {
      path: '../../public/fonts/Roobert/Roobert-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    // {
    //   path: '../../public/fonts/TT-Firs-Neue/TTFirsNeue-BoldItalic.woff2',
    //   weight: '700',
    //   style: 'italic',
    // },
    {
      path: '../../public/fonts/Roobert/Roobert-SemiBold.woff2',
      weight: '600',
      style: 'normal',
    },
    // {
    //   path: '../../public/fonts/TT-Firs-Neue/TTFirsNeue-DemiBoldItalic.woff2',
    //   weight: '600',
    //   style: 'italic',
    // },
    // {
    //   path: '../../public/fonts/TT-Firs-Neue/TTFirsNeue-Black.woff2',
    //   weight: '900',
    //   style: 'normal',
    // },
    // {
    //   path: '../../public/fonts/TT-Firs-Neue/TTFirsNeue-BlackItalic.woff2',
    //   weight: '900',
    //   style: 'italic',
    // },
    // {
    //   path: '../../public/fonts/TT-Firs-Neue/TTFirsNeue-Thin.woff2',
    //   weight: '100',
    //   style: 'normal',
    // },
    // {
    //   path: '../../public/fonts/TT-Firs-Neue/TTFirsNeue-ThinItalic.woff2',
    //   weight: '100',
    //   style: 'italic',
    // },
  ],
});

export { TTFirsNeue };
