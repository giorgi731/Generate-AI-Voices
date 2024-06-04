import Link from 'next/link';

import Container from '~/core/ui/Container';
import LogoImage from '~/core/ui/Logo/LogoImage';
import configuration from '~/configuration';
import Heading from '~/core/ui/Heading';
import NewsletterSignup from '~/app/(site)/components/NewsletterSignup';

const YEAR = new Date().getFullYear();

function Footer() {
  return (
    <footer className={'py-8 lg:py-24'}>
      <Container>
        <div className={'flex flex-col space-y-8 lg:flex-row lg:space-y-0'}>
          <div
            className={
              'flex w-full space-x-2 lg:w-4/12 xl:w-3/12' +
              ' xl:space-x-6 2xl:space-x-8'
            }
          >
            <div className={'flex flex-col space-y-4'}>
              <div>
                <LogoImage className={'w-[85px] md:w-[115px]'} />
              </div>

              <div>
                <p className={'text-sm text-gray-500 dark:text-gray-300'}>
                  Revocalize AI creates natural-sounding voice models by levering proprietary voice synthesizing technology. 
                  <br className={'hidden lg:block'} />{" "}
                  <br className={'hidden lg:block'} />{" "}
                  Revocalize AI is a product of IREAL Meta Labs.
                </p>
              </div>

              <div className={'flex text-xs text-gray-500 dark:text-gray-400 pt-3 font-system'}>
                <p>
                  © Copyright {YEAR} {configuration.site.siteName}. 
                  <br className={'hidden lg:block'} />{" "}
                  All Rights Reserved.
                </p>
              </div>
            </div>
          </div>

          <div
            className={
              'flex flex-col space-y-8 lg:space-y-0 lg:space-x-6' +
              ' xl:space-x-16 2xl:space-x-20' +
              ' w-full lg:flex-row lg:justify-end'
            }
          >
            <div>
              <div className={'flex flex-col space-y-4'}>
                <Heading type={6}>About</Heading>

                <FooterSectionList>
                  <FooterLink>
                    <Link href={'/about'}>Who we are</Link>
                  </FooterLink>
                  {/* <FooterLink>
                    <Link href={'/blog'}>Blog</Link>
                  </FooterLink> */}
                  <FooterLink>
                    <Link href={'mailto:contact@revocalize.ai'}>Contact</Link>
                  </FooterLink>
                </FooterSectionList>
              </div>
            </div>

            <div>
              <div className={'flex flex-col space-y-4'}>
                <Heading type={6}>Product</Heading>

                <FooterSectionList>
                  <FooterLink>
                    <Link href={'/pricing'}>Pricing</Link>
                  </FooterLink>
                  <FooterLink>
                    <Link href={'/sign-up'}>Request beta access</Link>
                  </FooterLink>
                  <FooterLink>
                    <Link href={'https://docs.revocalize.ai'}>
                      API Docs
                      <span className={'ml-1.5 inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800'}>
                        New
                      </span>
                    </Link>
                  </FooterLink>
                </FooterSectionList>
              </div>
            </div>

            <div>
              <div className={'flex flex-col space-y-4'}>
                <Heading type={6}>Legal</Heading>

                <FooterSectionList>
                  <FooterLink>
                    <Link href={'/terms'}>Terms of Service</Link>
                  </FooterLink>
                  <FooterLink>
                    <Link href={'/privacy'}>Privacy Policy</Link>
                  </FooterLink>
                  {/* <FooterLink>
                    <Link href={'#'}>Cookie Policy</Link>
                  </FooterLink> */}
                </FooterSectionList>
              </div>
            </div>

            <NewsletterSignup />
          </div>
        </div>
      </Container>
    </footer>
  );
}

function FooterSectionList(props: React.PropsWithChildren) {
  return (
    <ul className={'flex flex-col space-y-4 text-gray-500 dark:text-gray-400'}>
      {props.children}
    </ul>
  );
}

function FooterLink(props: React.PropsWithChildren) {
  return (
    <li
      className={
        'text-sm [&>a]:transition-colors [&>a]:hover:text-gray-800' +
        ' dark:[&>a]:hover:text-white'
      }
    >
      {props.children}
    </li>
  );
}

export default Footer;
