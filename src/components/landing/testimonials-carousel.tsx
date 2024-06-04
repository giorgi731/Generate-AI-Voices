'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Particles from './particles'
import Highlighter, { HighlighterItem } from './highlighter'

import CarouselImg01 from '@/public/images/carousel-icon-01.svg'
import CarouselImg02 from '@/public/images/carousel-icon-02.svg'
import CarouselImg03 from '@/public/images/carousel-icon-03.svg'
import CarouselImg04 from '@/public/images/carousel-icon-04.svg'
import CarouselImg05 from '@/public/images/carousel-icon-05.svg'

// Import Swiper
import Swiper, { Navigation } from 'swiper'
import 'swiper/swiper.min.css'
Swiper.use([Navigation])

export default function TestimonialsCarousel() {

  const [swiperInitialized, setSwiperInitialized] = useState<boolean>(false)

  useEffect(() => {
    const carousel = new Swiper('.testimonials-carousel', {
      breakpoints: {
        320: {
          slidesPerView: 1
        },
        640: {
          slidesPerView: 2
        },
        1024: {
          slidesPerView: 3
        }
      },
      grabCursor: true,
      loop: false,
      centeredSlides: false,
      initialSlide: 0,
      spaceBetween: 24,
      navigation: {
        nextEl: '.carousel-next',
        prevEl: '.carousel-prev',
      },
    })
    setSwiperInitialized(true)
  }, [])

  return (
    <section>
      <div className="max-w-6xl px-4 mx-auto sm:px-6">
        <div className="pt-12 md:pt-20">

          { /* Section header */}
          <div className="max-w-3xl pb-12 mx-auto text-center md:pb-20">
            <div>
              <div className="inline-flex pb-3 font-medium text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-purple-200">The security first platform</div>
            </div>
            <h2 className="pb-4 text-transparent h2 bg-clip-text bg-gradient-to-r from-revocalize-200/60 via-revocalize-100 to-revocalize-200/60">Spot issues faster</h2>
            <p className="text-lg text-slate-400">All the lorem ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet.</p>
          </div>

          { /* Carousel built with Swiper.js [https://swiperjs.com/] */}
          { /* * Custom styles in src/css/additional-styles/theme.scss */}
          <div className="relative before:absolute before:inset-0 before:-translate-x-full before:z-20 before:bg-gradient-to-l before:from-transparent before:to-revocalize-950 before:to-20% after:absolute after:inset-0 after:translate-x-full after:z-20 after:bg-gradient-to-r after:from-transparent after:to-revocalize-950 after:to-20%">
            <div className="testimonials-carousel swiper-container group">
              <Highlighter className="swiper-wrapper w-fit" refresh={swiperInitialized}>
                { /* Carousel items */}
                <HighlighterItem className="h-auto swiper-slide group/slide">
                  <div className="relative h-full bg-revocalize-950 rounded-[inherit] z-20 overflow-hidden">
                    { /* Particles animation */}
                    <Particles className="absolute inset-0 -z-10 opacity-0 group-[.swiper-slide-active]/slide:opacity-100 group-hover/slide:opacity-100 transition-opacity duration-500 ease-in-out" quantity={3} refresh={swiperInitialized} /> 
                    { /* Radial gradient */}
                    <div className="absolute bottom-0 w-1/3 pointer-events-none translate-y-1/2 left-1/2 -translate-x-1/2 -z-10 aspect-square" aria-hidden="true">
                      <div className="absolute inset-0 translate-z-0 rounded-full bg-revocalize-950 group-[.swiper-slide-active]/slide:bg-purple-500 transition-colors duration-500 ease-in-out blur-[60px]" />
                    </div>
                    <div className="flex flex-col h-full p-6">
                      <Image className="mb-3" src={CarouselImg01} width={56} height={56} alt="Icon 01" />
                      <div className="grow">
                        <div className="mb-1 text-lg font-bold">Anonymous User</div>
                        <div className="mb-3 text-slate-400">Incorporate rich user profiling, and facilitate more transactions.</div>
                      </div>
                      <div className="text-right">
                        <a className="inline-flex items-center text-sm font-medium text-slate-300 hover:text-white transition duration-150 ease-in-out group" href="#0">Learn More <span className="tracking-normal text-purple-500 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-1">-&gt;</span></a>
                      </div>
                    </div>
                  </div>
                </HighlighterItem>
                <HighlighterItem className="h-auto swiper-slide group/slide">
                  <div className="relative h-full bg-revocalize-950 rounded-[inherit] z-20 overflow-hidden">
                    { /* Particles animation */}
                    <Particles className="absolute inset-0 -z-10 opacity-0 group-[.swiper-slide-active]/slide:opacity-100 group-hover/slide:opacity-100 transition-opacity duration-500 ease-in-out" quantity={3} refresh={swiperInitialized} />                     
                    { /* Radial gradient */}
                    <div className="absolute bottom-0 w-1/3 pointer-events-none translate-y-1/2 left-1/2 -translate-x-1/2 -z-10 aspect-square" aria-hidden="true">
                      <div className="absolute inset-0 translate-z-0 rounded-full bg-slate-800 group-[.swiper-slide-active]/slide:bg-purple-500 transition-colors duration-500 ease-in-out blur-[60px]" />
                    </div>
                    <div className="flex flex-col h-full p-6">
                      <Image className="mb-3" src={CarouselImg02} width={56} height={56} alt="Icon 01" />
                      <div className="grow">
                        <div className="mb-1 text-lg font-bold">Bot Detection</div>
                        <div className="mb-3 text-slate-400">Incorporate rich user profiling, and facilitate more transactions.</div>
                      </div>
                      <div className="text-right">
                        <a className="inline-flex items-center text-sm font-medium text-slate-300 hover:text-white transition duration-150 ease-in-out group" href="#0">Learn More <span className="tracking-normal text-purple-500 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-1">-&gt;</span></a>
                      </div>
                    </div>
                  </div>
                </HighlighterItem>
                <HighlighterItem className="h-auto swiper-slide group/slide">
                  <div className="relative h-full bg-revocalize-950 rounded-[inherit] z-20 overflow-hidden">
                    { /* Particles animation */}
                    <Particles className="absolute inset-0 -z-10 opacity-0 group-[.swiper-slide-active]/slide:opacity-100 group-hover/slide:opacity-100 transition-opacity duration-500 ease-in-out" quantity={3} refresh={swiperInitialized} />                     
                    { /* Radial gradient */}
                    <div className="absolute bottom-0 w-1/3 pointer-events-none translate-y-1/2 left-1/2 -translate-x-1/2 -z-10 aspect-square" aria-hidden="true">
                      <div className="absolute inset-0 translate-z-0 rounded-full bg-slate-800 group-[.swiper-slide-active]/slide:bg-purple-500 transition-colors duration-500 ease-in-out blur-[60px]" />
                    </div>
                    <div className="flex flex-col h-full p-6">
                      <Image className="mb-3" src={CarouselImg03} width={56} height={56} alt="Icon 01" />
                      <div className="grow">
                        <div className="mb-1 text-lg font-bold">Social integrations</div>
                        <div className="mb-3 text-slate-400">Incorporate rich user profiling, and facilitate more transactions.</div>
                      </div>
                      <div className="text-right">
                        <a className="inline-flex items-center text-sm font-medium text-slate-300 hover:text-white transition duration-150 ease-in-out group" href="#0">Learn More <span className="tracking-normal text-purple-500 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-1">-&gt;</span></a>
                      </div>
                    </div>
                  </div>
                </HighlighterItem>
                <HighlighterItem className="h-auto swiper-slide group/slide">
                  <div className="relative h-full bg-revocalize-950 rounded-[inherit] z-20 overflow-hidden">
                    { /* Particles animation */}
                    <Particles className="absolute inset-0 -z-10 opacity-0 group-[.swiper-slide-active]/slide:opacity-100 group-hover/slide:opacity-100 transition-opacity duration-500 ease-in-out" quantity={3} refresh={swiperInitialized} />                     
                    { /* Radial gradient */}
                    <div className="absolute bottom-0 w-1/3 pointer-events-none translate-y-1/2 left-1/2 -translate-x-1/2 -z-10 aspect-square" aria-hidden="true">
                      <div className="absolute inset-0 translate-z-0 rounded-full bg-slate-800 group-[.swiper-slide-active]/slide:bg-purple-500 transition-colors duration-500 ease-in-out blur-[60px]" />
                    </div>
                    <div className="flex flex-col h-full p-6">
                      <Image className="mb-3" src={CarouselImg04} width={56} height={56} alt="Icon 01" />
                      <div className="grow">
                        <div className="mb-1 text-lg font-bold">Progressive Profiling</div>
                        <div className="mb-3 text-slate-400">Incorporate rich user profiling, and facilitate more transactions.</div>
                      </div>
                      <div className="text-right">
                        <a className="inline-flex items-center text-sm font-medium text-slate-300 hover:text-white transition duration-150 ease-in-out group" href="#0">Learn More <span className="tracking-normal text-purple-500 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-1">-&gt;</span></a>
                      </div>
                    </div>
                  </div>
                </HighlighterItem>
                <HighlighterItem className="h-auto swiper-slide group/slide">
                  <div className="relative h-full bg-revocalize-950 rounded-[inherit] z-20 overflow-hidden">
                    { /* Particles animation */}
                    <Particles className="absolute inset-0 -z-10 opacity-0 group-[.swiper-slide-active]/slide:opacity-100 group-hover/slide:opacity-100 transition-opacity duration-500 ease-in-out" quantity={3} refresh={swiperInitialized} />                     
                    { /* Radial gradient */}
                    <div className="absolute bottom-0 w-1/3 pointer-events-none translate-y-1/2 left-1/2 -translate-x-1/2 -z-10 aspect-square" aria-hidden="true">
                      <div className="absolute inset-0 translate-z-0 rounded-full bg-slate-800 group-[.swiper-slide-active]/slide:bg-purple-500 transition-colors duration-500 ease-in-out blur-[60px]" />
                    </div>
                    <div className="flex flex-col h-full p-6">
                      <Image className="mb-3" src={CarouselImg05} width={56} height={56} alt="Icon 05" />
                      <div className="grow">
                        <div className="mb-1 text-lg font-bold">Secure Access</div>
                        <div className="mb-3 text-slate-400">Incorporate rich user profiling, and facilitate more transactions.</div>
                      </div>
                      <div className="text-right">
                        <a className="inline-flex items-center text-sm font-medium text-slate-300 hover:text-white transition duration-150 ease-in-out group" href="#0">Learn More <span className="tracking-normal text-purple-500 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-1">-&gt;</span></a>
                      </div>
                    </div>
                  </div>
                </HighlighterItem>
              </Highlighter>
            </div>
          </div>

          { /* Arrows */}
          <div className="flex justify-end mt-8">
            <button className="relative z-20 flex items-center justify-center w-12 h-12 carousel-prev group">
              <span className="sr-only">Previous</span>
              <svg className="w-4 h-4 fill-slate-500 group-hover:fill-purple-500 transition duration-150 ease-in-out" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.7 14.7l1.4-1.4L3.8 9H16V7H3.8l4.3-4.3-1.4-1.4L0 8z" />
              </svg>
            </button>
            <button className="relative z-20 flex items-center justify-center w-12 h-12 carousel-next group">
              <span className="sr-only">Next</span>
              <svg className="w-4 h-4 fill-slate-500 group-hover:fill-purple-500 transition duration-150 ease-in-out" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.3 14.7l-1.4-1.4L12.2 9H0V7h12.2L7.9 2.7l1.4-1.4L16 8z" />
              </svg>
            </button>
          </div>

        </div>
      </div>
    </section>
  )
}