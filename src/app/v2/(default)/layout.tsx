'use client'

import { useEffect } from 'react'

import AOS from 'aos'
import 'aos/dist/aos.css'

import Header from '~/components/landing/ui/header'
// import Footer from '~/components/landing/ui/footer'
import Footer from '~/app/(site)/components/Footer';

import SiteHeader from '~/app/(site)/components/SiteHeader';


export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode
}) {  

  useEffect(() => {
    AOS.init({
      once: true,
      disable: 'phone',
      duration: 1000,
      easing: 'ease-out-cubic',
    })
  })

  return (
    <>
      <SiteHeader />
      
      <main className="grow">

        {children}

      </main>

      <Footer />
    </>
  )
}
