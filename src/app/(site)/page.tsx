import Image from 'next/image';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import Container from '~/core/ui/Container';
import SubHeading from '~/core/ui/SubHeading';
import Button from '~/core/ui/Button';
import Divider from '~/core/ui/Divider';
import Hero from '~/core/ui/Hero';
import Heading from '~/core/ui/Heading';
import SlideUpTransition from '~/core/ui/SlideUpTransition';
import {
  GaugeIcon,
  LanguagesIcon,
  LaughIcon,
  RadioIcon,
  Settings2Icon,
  WandIcon,
} from 'lucide-react';
import Link from 'next/link';

import { Metadata } from 'next';
import WaveformAudioPlayer from '../(app)/components/WaveformAudioPlayer';

export const dynamic = 'force-dynamic'
export const metadata: Metadata = {
  title: {
    absolute: 'Revocalize AI | Clone, protect & create unique voices with AI',
  },
  alternates: {
    canonical: '/',
  },
};

export default function Home() {
  return (
    <>
      <Container>
        <SlideUpTransition>
          {/* Animated grid */}
          <div
            className="absolute -z-10 hidden max-h-[75vh] min-h-[75vh] w-full flex-col justify-center overflow-hidden py-6 sm:py-12 lg:flex"
            style={{
              transform: 'scale3d(1, 1, 2) rotate3d(1, 0, 0, 60deg)',
            }}
          >
            <div className="grid gap-24">
              <div className="relative h-px w-full bg-[#f4d5fc] dark:bg-[#1a0a33]">
                <div className="absolute inset-0 h-full w-20 animate-movex bg-gradient-to-l from-white opacity-0 shadow-[-10px_0_18px_4px_var(--tw-shadow-color)] shadow-fuchsia-500/50"></div>
              </div>
              <div className="relative h-px w-full bg-[#f4d5fc] dark:bg-[#1a0a33]"></div>
              <div className="relative h-px w-full bg-[#f4d5fc] dark:bg-[#1a0a33]">
                <div className="animation-delay-[4s] absolute inset-0 h-full w-20 animate-movex bg-gradient-to-l from-white opacity-0 shadow-[-10px_0_18px_4px_var(--tw-shadow-color)] shadow-fuchsia-500/50"></div>
              </div>
              <div className="relative h-px w-full bg-[#f4d5fc] dark:bg-[#1a0a33]"></div>
              <div className="relative h-px w-full bg-[#f4d5fc] dark:bg-[#1a0a33]">
                <div className="animation-delay-[2s] absolute inset-0 h-full w-20 animate-movex bg-gradient-to-l from-white opacity-0 shadow-[-10px_0_18px_4px_var(--tw-shadow-color)] shadow-fuchsia-500/50"></div>
              </div>
              <div className="relative h-px w-full bg-[#f4d5fc] dark:bg-[#1a0a33]"></div>
            </div>

            <div className="absolute inset-0 grid grid-cols-6 gap-24">
              <div className="relative h-full w-px bg-[#f4d5fc] dark:bg-[#1a0a33]"></div>
              <div className="relative h-full w-px bg-[#f4d5fc] dark:bg-[#1a0a33]">
                <div className="absolute inset-0 h-20 w-full animate-movey bg-gradient-to-t from-white opacity-0 shadow-[-10px_0_18px_4px_var(--tw-shadow-color)] shadow-fuchsia-500/50"></div>
              </div>
              <div className="relative h-full w-px bg-[#f4d5fc] dark:bg-[#1a0a33]"></div>
              <div className="relative h-full w-px bg-[#f4d5fc] dark:bg-[#1a0a33]">
                <div className="animation-delay-[4s] absolute inset-0 h-20 w-full animate-movey bg-gradient-to-t from-white opacity-0 shadow-[-10px_0_18px_4px_var(--tw-shadow-color)] shadow-fuchsia-500/50"></div>
              </div>
              <div className="relative h-full w-px bg-[#f4d5fc] dark:bg-[#1a0a33]"></div>
              <div className="relative h-full w-px bg-[#f4d5fc] dark:bg-[#1a0a33]">
                <div className="animation-delay-[2s] absolute inset-0 h-20 w-full animate-movey bg-gradient-to-t from-white opacity-0 shadow-[-10px_0_18px_4px_var(--tw-shadow-color)] shadow-fuchsia-500/50"></div>
              </div>
            </div>
          </div>

          <div
            className={
              'my-10 flex flex-col items-center md:flex-row lg:my-20' +
              ' mx-auto flex-1 justify-center'
            }
          >
            <div
              className={'flex w-full flex-1 flex-col items-center space-y-12'}
            >
              <Link href="/sign-up" target="_blank" className="mb-2">
                <div className="animate-shine relative isolate mx-auto mb-0 w-max overflow-hidden rounded-full bg-primary-500/10 py-1.5 pl-5 pr-3.5 transition-colors duration-150 before:absolute before:inset-0 before:-translate-x-full before:transform before:animate-[shimmer_2s_infinite] before:border-t before:border-fuchsia-100/10 before:bg-gradient-to-r before:from-transparent before:via-fuchsia-100/10 before:to-transparent before:filter hover:bg-primary-500/20 active:bg-primary-500/30 dark:hover:bg-primary-500/20 dark:active:bg-primary-500/30">
                  <span className="relative z-10 flex items-center">
                    {/* Sparkles icon */}
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth="0"
                      viewBox="0 0 20 20"
                      className="relative w-3 h-3 -left-1 text-primary-500 opacity-80"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    <p className="text-sm font-medium tracking-normal font-system text-primary-500">
                      Try the private beta – request early access
                    </p>
                    <ChevronRightIcon className={'ml-1 h-3 text-primary-500'} />
                  </span>
                </div>
              </Link>

              <HeroTitle>
                <div className="relative mx-auto hidden h-[78px] text-center lg:inline-block lg:w-[950px]">
                  <div className="absolute left-0 right-0 [perspective:100vmin] ">
                    <div className="animation-delay-[6000ms] h-[84px] origin-center animate-cube tracking-tight [transform-style:preserve-3d]">
                      <span
                        className="absolute left-0 right-0 h-[84px] whitespace-nowrap from-20% font-black [backface-visibility:hidden] [transform:translateZ(3.5vmin)] dark:bg-gradient-to-b
                      dark:from-white dark:via-white dark:to-[#ffffffb3] dark:bg-clip-text dark:text-transparent"
                      >
                        Sing like any singer
                      </span>{' '}
                      <span
                        className="absolute left-0 right-0 h-[80px] whitespace-nowrap from-20% font-black [backface-visibility:hidden] [transform:rotateX(-90deg)_translateZ(3.5vmin)_translateY(-2px)] dark:bg-gradient-to-b
                      dark:from-white dark:via-white dark:to-[#ffffffb3] dark:bg-clip-text dark:text-transparent"
                      >
                        Protect your voice
                      </span>{' '}
                      <span
                        className="absolute left-0 right-0 h-[80px] whitespace-nowrap from-20% font-black [backface-visibility:hidden] [transform:rotateX(180deg)_translateZ(3.5vmin)_translateY(0px)] dark:bg-gradient-to-b
                      dark:from-white dark:via-white dark:to-[#ffffffb3] dark:bg-clip-text dark:text-transparent"
                      >
                        Create unique vocal tracks
                      </span>{' '}
                      <span
                        className="absolute left-0 right-0 h-[84px] whitespace-nowrap from-20% font-black [backface-visibility:hidden] [transform:rotateX(90deg)_translateZ(3.5vmin)_translateY(-7px)] dark:bg-gradient-to-b
                      dark:from-white dark:via-white dark:to-[#ffffffb3] dark:bg-clip-text dark:text-transparent"
                      >
                        Fingerprint your voice
                      </span>{' '}
                    </div>
                  </div>
                </div>
                <span className="inline from-20% font-extrabold dark:bg-gradient-to-b dark:from-white dark:via-white dark:to-[#ffffffb3] dark:bg-clip-text dark:text-transparent lg:hidden">
                  Sing like any singer
                </span>
                <br className="hidden md:block" />{' '}
                <span
                  className={
                    'TextGradient font-extrabold leading-[1.2] tracking-tight saturate-[1.3]'
                  }
                >
                  using AI. Automagically.
                </span>
              </HeroTitle>

              <div
                className={
                  'text-center font-sans text-lg font-medium text-neutral-500 dark:text-neutral-300' +
                  ' flex max-w-2xl flex-col space-y-1 backdrop-blur-sm md:w-full'
                }
              >
                <span>
                  Instantly record & convert your voice into any other voice
                  with Revocalize{' '}
                </span>
                <span>
                  Clone, protect, and create unique vocal tracks in any voice ✨
                </span>{' '}
                <span>Own your voice. Forever.</span>
              </div>

              <div
                className={
                  'flex w-full flex-col items-center space-x-4 space-y-4 lg:w-auto lg:flex-row lg:space-y-0'
                }
              >
                <a
                  href="/sign-up"
                  className="relative w-full overflow-hidden ring-offset-black group rounded-xl bg-black-700 px-28 py-7 ring-red-500/50 will-change-transform focus:outline-none focus:ring-1 focus:ring-offset-0"
                >
                  <span className="absolute inset-[3px] z-10 flex items-center justify-center space-x-2 rounded-[9px] bg-white bg-gradient-to-t from-neutral-100  pl-2 font-system font-medium text-black-600 transition-colors duration-200 group-hover:text-black-700 dark:inset-[1.5px] dark:rounded-[11px] dark:bg-[#18093e] dark:from-[#070116] dark:text-neutral-300 dark:group-hover:text-white">
                    Create your AI voice
                    <ChevronRightIcon
                      className={
                        'my-auto ml-1 h-4 pt-0.5 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-white'
                      }
                    />
                  </span>
                  <span
                    aria-hidden
                    className="absolute inset-0 z-0 scale-x-[2.0] blur before:absolute before:inset-0 before:top-1/2 before:aspect-square before:animate-disco before:bg-gradient-conic before:from-purple-700 before:via-red-500 before:to-amber-400"
                  />
                </a>

                <Button
                  color={'secondary'}
                  href={'/pricing'}
                  className="!mx-0 w-full whitespace-nowrap rounded-xl font-system text-neutral-700 dark:text-neutral-400 dark:hover:text-white lg:!mx-4"
                >
                  <span className={'flex items-center space-x-2'}>
                    View Pricing
                  </span>
                </Button>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center justify-between w-full mt-6 sm:mt-10">
            <div className="flex flex-col mt-4 mb-16 space-y-10">
              <div className="flex flex-col sm:flex-row sm:space-x-8">
                <div>
                  <h3 className="mb-5 font-sans text-lg font-semibold text-center">
                    Original Voice
                  </h3>
                  <WaveformAudioPlayer src="https://file-examples.com/storage/fef677cdf46481c8d96f8cd/2017/11/file_example_WAV_10MG.wav" />
                </div>
                <div className="mt-8 sm:mt-0">
                  <h3 className="mb-5 font-sans text-lg font-semibold text-center">
                    Generated Voice
                  </h3>
                  <WaveformAudioPlayer src="https://file-examples.com/storage/fef677cdf46481c8d96f8cd/2017/11/file_example_WAV_10MG.wav" />
                  <p className="mt-5 text-sm italic text-center text-gray-500">
                    *untuned
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* <div className={'flex justify-center py-12'}>
              <Image
                className={
                  'hero-image-shadow rounded-2xl' +
                  ' shadow-primary-500/40 dark:shadow-primary-500/30'
                }
                width={2688}
                height={1824}
                src={`/assets/images/dashboard-dark.webp`}
                alt={`App Image`}
              />
            </div> */}
        </SlideUpTransition>
      </Container>

      <Container>
        <div
          className={
            'relative flex flex-col items-center justify-center space-y-24 py-12'
          }
        >
          <div
            className={
              'flex max-w-3xl flex-col items-center space-y-4 text-center dark:backdrop-blur-sm'
            }
          >
            <Image
              src="/assets/images/logo/revocalize-logo-mark.png"
              alt="Revocalize.ai Logo Mark"
              width={37}
              height={40}
              className="my-5 transition-all duration-300 cursor-pointer saturate-150 hover:scale-110 hover:sepia"
            />

            <Link href={"/plugin-purchase"}>testttttt</Link>
            <Hero className="transition-all [&:has(span:hover)]:text-gray-500">
              Through proprietary{' '}
              <span className="underline transition-colors hover:text-green-100">
                AI voice fingerprinting
              </span>
              <br className={'hidden md:block'} /> Revocalize AI morphs any
              voice with
              <br className={'hidden md:block'} />{' '}
              <span className="underline transition-colors hover:text-yellow-100">
                never-before-heard
              </span>{' '}
              accuracy.
            </Hero>

            <SubHeading className="!mt-8 max-w-2xl">
              Our AI voice modeling & fingerprinting technology leverages
              <br className={'hidden md:block'} /> <b>millions of hours</b> of
              audio training data to create a
              <br className={'hidden md:block'} /> high-fidelity unique
              voiceprint for each singer.
            </SubHeading>
          </div>

          <div className={'grid gap-12 py-8 lg:grid-cols-3'}>
            <div className={'flex flex-col space-y-2 text-center'}>
              <FeatureIcon>
                <LanguagesIcon className={'h-6'} />
              </FeatureIcon>
              <Heading type={4}>Works in any language</Heading>

              <div
                className={'mx-auto max-w-sm text-gray-500 dark:text-gray-400'}
              >
                Your voice model will keep the original accent, tone, and
                pronunciation. No matter the language.
              </div>
            </div>

            <div className={'flex flex-col space-y-2 text-center'}>
              <FeatureIcon>
                <LaughIcon className={'h-6'} />
              </FeatureIcon>
              <Heading type={4}>Emotional range</Heading>

              <div
                className={'mx-auto max-w-sm text-gray-500 dark:text-gray-400'}
              >
                Revocalize AI conveys the true emotions through the voice: from
                excitement to sadness and more.
              </div>
            </div>

            <div className={'flex flex-col space-y-2 text-center'}>
              <FeatureIcon>
                <RadioIcon className={'h-6'} />
              </FeatureIcon>
              <Heading type={4}>Real-Time Auto Tune</Heading>

              <div
                className={'mx-auto max-w-sm text-gray-500 dark:text-gray-400'}
              >
                Revocalize AI can tune your vocals in real-time to help you
                reach those pesky high notes.
              </div>
            </div>

            <div className={'flex flex-col space-y-2 text-center'}>
              <FeatureIcon>
                <WandIcon className={'h-6'} />
              </FeatureIcon>
              <Heading type={4}>Auto-generate variations</Heading>

              <div
                className={'mx-auto max-w-sm text-gray-500 dark:text-gray-400'}
              >
                Automatically generate multiple unique variations of any voice –
                each with its own unique emotion.
              </div>
            </div>

            <div className={'flex flex-col space-y-2 text-center'}>
              <FeatureIcon>
                <Settings2Icon className={'h-6'} />
              </FeatureIcon>
              <Heading type={4}>Voice modulation</Heading>

              <div
                className={'mx-auto max-w-sm text-gray-500 dark:text-gray-400'}
              >
                Easily adjust the pitch, volume, speed of singing or speech to
                create sweeter-sounding output.
              </div>
            </div>

            <div className={'flex flex-col space-y-2 text-center'}>
              <FeatureIcon>
                <GaugeIcon className={'h-6'} />
              </FeatureIcon>
              <Heading type={4}>Beautiful Web Interface</Heading>

              <div
                className={'mx-auto max-w-sm text-gray-500 dark:text-gray-400'}
              >
                Create, edit and use your generated voice models through our
                hand-crafted web app.
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* <Divider /> */}

      <Container>
        <div className={'py-12'}>
          <div
            className={
              'shiny-card flex flex-col justify-between rounded-lg lg:flex-row' +
              ' space-y-4 bg-primary-50 px-14 py-10 dark:bg-primary-500/5' +
              ' lg:space-y-0'
            }
          >
            <div className={'flex flex-col justify-between space-y-2'}>
              <Heading type={3}>
                <p className={'text-gray-800 dark:text-white'}>
                  The future of voice is here – and it’s yours.
                </p>
              </Heading>

              <Heading type={4}>
                <p className={'text-primary-500'}>
                  Request early access, today.
                </p>
              </Heading>
            </div>

            <div className={'my-auto flex flex-col justify-center'}>
              <Link
                href="/sign-up"
                className="flex items-center justify-center w-full h-12 px-6 font-medium transition-all rounded-lg text-md bg-primary-500 font-system text-primary-contrast ring-primary-200 ring-offset-1 hover:bg-primary-600 focus:ring-2 active:bg-primary-700 lg:w-auto"
              >
                Request early access
                <ChevronRightIcon className={'ml-2 h-4'} />
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}

function HeroTitle({ children }: React.PropsWithChildren) {
  return (
    <h1
      className={
        'mx-auto block font-sans' +
        ' text-center text-4xl text-black-500 dark:text-white md:text-5xl' +
        '  font-heading font-medium xl:text-7xl'
      }
    >
      {children}
    </h1>
  );
}

function FeatureIcon(props: React.PropsWithChildren) {
  return (
    <div className={'flex justify-center'}>
      <div
        className={'rounded-xl bg-primary-500/10 p-4 dark:bg-primary-500/10'}
      >
        {props.children}
      </div>
    </div>
  );
}
