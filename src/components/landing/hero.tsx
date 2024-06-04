import Image from 'next/image'
import Particles from './particles'
import Illustration from '@/public/images/glow-bottom.svg'
import { ArrowRightIcon, ChevronRightIcon } from 'lucide-react'

export default function Hero() {
  return (
    <section>
      <div className="relative max-w-6xl px-4 mx-auto sm:px-6">

        { /* Particles animation */}
        <Particles className="absolute inset-0 -z-10" />

        { /* Illustration */}
        <div className="absolute inset-0 -z-10 -mx-28 rounded-b-[3rem] pointer-events-none overflow-hidden" aria-hidden="true">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 -z-10">
            <Image src={Illustration} className="max-w-none hue-rotate-[10deg]" width={2146} priority alt="Hero Illustration" />
          </div>
        </div>

        <div className="pt-32 pb-16 md:pt-52 md:pb-32">

          { /* Hero content */}
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-6" data-aos="fade-down">
              <div className="relative inline-flex before:absolute before:inset-0 before:bg-revocalize-500 before:blur-md">
                <a className="btn-sm py-1.5 pl-2 pr-1 text-revocalize-100 hover:text-white transition duration-150 ease-in-out group [background:linear-gradient(theme(colors.revocalize.500),_theme(colors.revocalize.500))_padding-box,_linear-gradient(theme(colors.revocalize.500),_theme(colors.revocalize.200)_75%,_theme(colors.transparent)_100%)_border-box] relative before:absolute before:inset-0 before:bg-slate-800/50 before:rounded-full before:pointer-events-none shadow" href="#0">
                  <span className="relative inline-flex items-center font-system">
                    {/* Sparkles icon */}
                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 20 20" className="relative w-3 h-3 mr-2 left-1 text-revocalize-100 " height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clipRule="evenodd"></path></svg>
                    Try the private beta – request early access
                    <ArrowRightIcon className={'h-4 pt-0.5 ml-1 pr-1 my-auto group-hover:translate-x-1 transition-transform duration-200 gorup-hover:text-white'} />
                    {/* API Studio is now in beta <span className="tracking-normal text-revocalize-400 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-1">-&gt;</span> */}
                  </span>
                </a>
              </div>
            </div>
            <h1 className="pb-6 text-transparent h1 font-system bg-clip-text bg-gradient-to-r from-slate-200/60 via-slate-100 to-slate-200/60" data-aos="fade-down">
              The All-In-One
              <br/>{' '}
              AI Singing Voice Toolkit
            </h1>
            <p className="mb-8 font-sans text-lg font-medium text-revocalize-100/90 leading-8" data-aos="fade-down" data-aos-delay="200">
              Instantly record & convert your voice into any other voice with Revocalize
              <br/>
              Clone, protect, and create unique vocal tracks in any voice ✨
              <br/>
              Own your voice. Forever.
            </p>
            <div className="max-w-xs mx-auto sm:max-w-none sm:inline-flex sm:justify-center space-y-4 sm:space-y-0 sm:space-x-4" data-aos="fade-down" data-aos-delay="400">
                <div className="relative inline-flex before:absolute before:inset-0 before:bg-revocalize-500 before:blur-md">
                  <a href="/sign-up" className="relative w-full overflow-hidden rounded-full group bg-black-700 px-28 py-7 ring-red-500/50 ring-offset-black will-change-transform focus:outline-none focus:ring-1 focus:ring-offset-0">
                    <span className="absolute inset-[1.8px] rounded-full z-10 pl-2 flex space-x-2 items-center justify-center bg-[#3b2065] bg-gradient-to-t from-revocalize-950 text-neureal-300 font-system font-medium transition-colors duration-200 group-hover:text-white">
                      Create your AI model
                      <ChevronRightIcon className={'h-4 pt-0.5 ml-1 my-auto group-hover:translate-x-1 transition-transform duration-200 group-hover:text-white'} />
                    </span>
                    <span aria-hidden className="absolute inset-0 z-0 scale-x-[2.0] blur before:absolute before:inset-0 before:top-1/2 before:aspect-square before:animate-disco before:bg-gradient-conic before:from-revocalize-600 before:via-red-400 before:to-amber-300" />
                  </a>
                </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  )
}