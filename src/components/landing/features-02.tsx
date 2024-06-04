import Image from 'next/image'
import Particles from './particles'
import Highlighter, { HighlighterItem } from './highlighter'

import FeatureImg01 from '@/public/images/feature-image-01.png'
import FeatureImg02 from '@/public/images/feature-image-02.png'
import FeatureImg03 from '@/public/images/feature-image-03.png'
import { ChevronRightIcon } from 'lucide-react'
import { GaugeIcon, LanguagesIcon, LaughIcon, RadioIcon, Settings2Icon, WandIcon } from 'lucide-react';
import Heading from '~/core/ui/Heading'


export default function Features02() {
  return (
    <section className="relative">

      { /* Particles animation */}
      <div className="absolute top-0 -mt-24 -ml-32 left-1/2 -translate-x-1/2 -z-10 w-80 h-80">
        <Particles className="absolute inset-0 -z-10" quantity={6} staticity={30} />    
      </div>

      <div className="max-w-6xl px-4 mx-auto sm:px-6">
        <div className="pt-16 md:pt-32">

          { /* Section header */}
          <div className="max-w-3xl pb-12 mx-auto text-center md:pb-20">
            <h2 className="pb-4 text-transparent h2 bg-clip-text bg-gradient-to-r from-revocalize-200/60 via-revocalize-100 to-revocalize-200/60">Faster. Smarter.</h2>
            <p className="text-lg text-revocalize-150/80 font-system">There are many variations available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.</p>
          </div>

          { /* Highlighted boxes */}
          <div className="relative pb-12 md:pb-20">
            { /* Blurred shape */}
            <div className="absolute bottom-0 -mb-20 opacity-50 pointer-events-none left-1/2 -translate-x-1/2 blur-2xl" aria-hidden="true">
              <svg xmlns="http://www.w3.org/2000/svg" width="434" height="427">
                <defs>
                  <linearGradient id="bs2-a" x1="19.609%" x2="50%" y1="14.544%" y2="100%">
                    <stop offset="0%" stopColor="#6366F1" />
                    <stop offset="100%" stopColor="#6366F1" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path fill="url(#bs2-a)" fillRule="evenodd" d="m346 898 461 369-284 58z" transform="translate(-346 -898)" />
              </svg>
            </div>
            { /* Grid */}
            <Highlighter className="grid md:grid-cols-12 gap-6 group">
              { /* Box #1 */}
              <div className="md:col-span-12" data-aos="fade-down">
                <HighlighterItem>
                  <div className="relative h-full bg-revocalize-950 rounded-[inherit] z-20 overflow-hidden">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      { /* Blurred shape */}
                      <div className="absolute top-0 right-0 blur-2xl" aria-hidden="true">
                        <svg xmlns="http://www.w3.org/2000/svg" width="342" height="393">
                          <defs>
                            <linearGradient id="bs-a" x1="19.609%" x2="50%" y1="14.544%" y2="100%">
                              <stop offset="0%" stopColor="#6366F1" />
                              <stop offset="100%" stopColor="#6366F1" stopOpacity="0" />
                            </linearGradient>
                          </defs>
                          <path fill="url(#bs-a)" fillRule="evenodd" d="m104 .827 461 369-284 58z" transform="translate(0 -112.827)" opacity=".7" />
                        </svg>
                      </div>
                      { /* Radial gradient */}
                      <div className="absolute bottom-0 flex items-center justify-center h-full pointer-events-none translate-y-1/2 left-1/2 -translate-x-1/2 -z-10 aspect-square" aria-hidden="true">
                        <div className="absolute inset-0 translate-z-0 bg-purple-500 rounded-full blur-[120px] opacity-70" />
                        <div className="absolute w-1/4 h-1/4 translate-z-0 bg-purple-400 rounded-full blur-[40px]" />
                      </div>
                      { /* Text */}
                      <div className="md:max-w-[480px] shrink-0 order-1 md:order-none p-6 pt-0 md:p-8 md:pr-0">
                        <div className="mb-5">
                          <div>
                            <h3 className="inline-flex pb-1 text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-revocalize-200/70 via-revocalize-100 to-revocalize-200/70">Optimized for security</h3>
                            <p className="text-revocalize-150/70 font-system">Optimize for user experience and privacy. Use social login integrations, lower user friction, incorporate rich user profiling, and facilitate more transactions.</p>
                          </div>
                        </div>
                        <div>
                          <a className="btn-sm text-slate-300 hover:text-white transition duration-150 ease-in-out [background:linear-gradient(theme(colors.revocalize.950),_theme(colors.revocalize.950))_padding-box,_conic-gradient(theme(colors.slate.400),_theme(colors.slate.700)_25%,_theme(colors.slate.700)_75%,_theme(colors.slate.400)_100%)_border-box] relative before:absolute before:inset-0 before:bg-revocalize-600/50/30 before:rounded-full before:pointer-events-none" href="#0">
                            <span className="relative inline-flex items-center group font-system">
                              Learn more 
                              <ChevronRightIcon className={'h-4 ml-1 my-auto group-hover:translate-x-1 transition-transform duration-200 group-hover:text-white'} />
                            </span>
                          </a>
                        </div>
                      </div>
                      { /* Image */}
                      <div className="relative w-full h-64 overflow-hidden md:h-auto">
                        <Image className="absolute bottom-0 left-1/2 -translate-x-1/2 mx-auto max-w-none md:relative md:left-0{md}transla{}-x-0" src={FeatureImg01} width="504" height="400" alt="Feature 01" />
                      </div>
                    </div>
                  </div>
                </HighlighterItem>
              </div>
              { /* Box #2 */}
              <div className="md:col-span-7" data-aos="fade-down">
                <HighlighterItem>
                  <div className="relative h-full bg-revocalize-950 rounded-[inherit] z-20 overflow-hidden">
                    <div className="flex flex-col">
                      { /* Radial gradient */}
                      <div className="absolute bottom-0 w-1/2 pointer-events-none translate-y-1/2 left-1/2 -translate-x-1/2 -z-10 aspect-square" aria-hidden="true">
                        <div className="absolute inset-0 translate-z-0 bg-revocalize-600/50 rounded-full blur-[80px]" />
                      </div>
                      { /* Text */}
                      <div className="md:max-w-[480px] shrink-0 order-1 md:order-none p-6 pt-0 md:p-8 md:pr-0">
                        <div>
                          <h3 className="inline-flex pb-1 text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-revocalize-200/60 via-revocalize-100 to-revocalize-200/60">Extensibility</h3>
                          <p className="text-revocalize-150/80 font-system">Your login box must find the right balance between user convenience, privacy and security.</p>
                        </div>
                      </div>
                      { /* Image */}
                      <div className="relative w-full h-64 overflow-hidden md:h-auto md:pb-8">
                        <Image className="absolute bottom-0 mx-auto left-1/2 -translate-x-1/2 max-w-none md:max-w-full md:relative md:left-0 md:translate-x-0" src={FeatureImg02} width={536} height={230} alt="Feature 02" />
                      </div>
                    </div>
                  </div>
                </HighlighterItem>
              </div>
              { /* Box #3 */}
              <div className="md:col-span-5" data-aos="fade-down">
                <HighlighterItem>
                  <div className="relative h-full bg-revocalize-950 rounded-[inherit] z-20 overflow-hidden">
                    <div className="flex flex-col">
                      { /* Radial gradient */}
                      <div className="absolute bottom-0 w-1/2 pointer-events-none translate-y-1/2 left-1/2 -translate-x-1/2 -z-10 aspect-square" aria-hidden="true">
                        <div className="absolute inset-0 translate-z-0 bg-revocalize-600/50 rounded-full blur-[80px]" />
                      </div>
                      { /* Text */}
                      <div className="md:max-w-[480px] shrink-0 order-1 md:order-none p-6 pt-0 md:p-8 md:pr-0">
                        <div>
                          <h3 className="inline-flex pb-1 text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-revocalize-200/60 via-revocalize-100 to-revocalize-200/60">Infinite options</h3>
                          <p className="text-revocalize-150/80 font-system">Quickly apply filters to refine your issues lists and create custom views.</p>
                        </div>
                      </div>
                      { /* Image */}
                      <div className="relative w-full h-64 overflow-hidden md:h-auto md:pb-8">
                        <Image className="absolute bottom-0 mx-auto left-1/2 -translate-x-1/2 max-w-none md:max-w-full md:relative md:left-0 md:translate-x-0" src={FeatureImg03} width={230} height={230} alt="Feature 03" />
                      </div>
                    </div>
                  </div>
                </HighlighterItem>
              </div>
            </Highlighter>
          </div>

          { /* Features list */}

          
          <div className={'grid gap-12 lg:grid-cols-3 py-8'}>
                <div className={'flex flex-col space-y-2 text-center'}>
                  <FeatureIcon>
                    <LanguagesIcon className={'h-6'} />
                  </FeatureIcon>
                  <Heading type={4}>Works in any language</Heading>

                  <div className={'text-revocalize-100/60 font-system dark:text-gray-400 max-w-sm mx-auto'}>
                    Your voice model will keep the original accent, tone, and pronunciation. No matter the language.
                  </div>
                </div>

                <div className={'flex flex-col space-y-2 text-center'}>
                  <FeatureIcon>
                    <LaughIcon className={'h-6'} />
                  </FeatureIcon>
                  <Heading type={4}>Emotional range</Heading>

                  <div className={'text-revocalize-100/60 font-system dark:text-gray-400 max-w-sm mx-auto'}>
                    Revocalize AI conveys the true emotions through the voice: from excitement to sadness and more.
                  </div>
                </div>

                <div className={'flex flex-col space-y-2 text-center'}>
                  <FeatureIcon>
                    <RadioIcon className={'h-6'} />
                  </FeatureIcon>
                  <Heading type={4}>Real-Time Auto Tune</Heading>

                  <div className={'text-revocalize-100/60 font-system dark:text-gray-400 max-w-sm mx-auto'}>
                    Revocalize AI can tune your vocals in real-time to help you reach those pesky high notes.
                  </div>
                </div>

                <div className={'flex flex-col space-y-2 text-center'}>
                  <FeatureIcon>
                    <WandIcon className={'h-6'} />
                  </FeatureIcon>
                  <Heading type={4}>Auto-generate variations</Heading>

                  <div className={'text-revocalize-100/60 font-system dark:text-gray-400 max-w-sm mx-auto'}>
                    Automatically generate multiple unique variations of any voice – each with its own unique emotion.
                  </div>
                </div>

                <div className={'flex flex-col space-y-2 text-center'}>
                  <FeatureIcon>
                    <Settings2Icon className={'h-6'} />
                  </FeatureIcon>
                  <Heading type={4}>Voice modulation</Heading>

                  <div className={'text-revocalize-100/60 font-system dark:text-gray-400 max-w-sm mx-auto'}>
                    Easily adjust the pitch, volume, speed of singing or speech to create sweeter-sounding output.
                  </div>
                </div>

                <div className={'flex flex-col space-y-2 text-center'}>
                  <FeatureIcon>
                    <GaugeIcon className={'h-6'} />
                  </FeatureIcon>
                  <Heading type={4}>Beautiful Web Interface</Heading>

                  <div className={'text-revocalize-100/60 font-system dark:text-gray-400 max-w-sm mx-auto'}>
                    Create, edit and use your generated voice models through our hand-crafted web app.
                  </div>
                </div>
              </div>
          
          
        </div>
      </div>
    </section>
  )
}

function FeatureIcon(props: React.PropsWithChildren) {
  return (
    <div className={'flex justify-center'}>
      <div
        className={'rounded-xl bg-revocalize-700/30 p-4'}
      >
        {props.children}
      </div>
    </div>
  );
}
