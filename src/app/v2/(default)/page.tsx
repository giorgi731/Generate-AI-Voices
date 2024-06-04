export const metadata = {
  title: 'Home - Stellar',
  description: 'Page description',
};

import Hero from '~/components/landing/hero';
import Clients from '~/components/landing/clients';
import Features from '~/components/landing/features';
import Features02 from '~/components/landing/features-02';
import Features03 from '~/components/landing/features-03';
import TestimonialsCarousel from '~/components/landing/testimonials-carousel';
import Features04 from '~/components/landing/features-04';
import Pricing from '~/components/landing/pricing';
import Testimonials from '~/components/landing/testimonials';
import Cta from '~/components/landing/cta';
import WaveformAudioPlayer from '~/app/(app)/components/WaveformAudioPlayer';

export default function Home() {
  return (
    <>
      <Hero />
      {/* <Clients /> */}

      {/* Audio Demo Comparison */}
      <div className="flex flex-col items-center justify-between w-full mt-6 sm:mt-10">
        <div className="flex flex-col mt-4 mb-16 space-y-10">
          <div className="flex flex-col sm:flex-row sm:space-x-8">
            <div>
              <h3 className="mb-5 font-sans text-lg font-semibold text-center">Original Voice</h3>
              <WaveformAudioPlayer src="https://upcdn.io/kW15bDv/raw/uploads/demo/weeknd_before.wav" />
            </div>
            <div className="mt-8 sm:mt-0">
              <h3 className="mb-5 font-sans text-lg font-semibold text-center">Generated Voice</h3>
              <WaveformAudioPlayer src="https://upcdn.io/kW15bDv/raw/uploads/demo/weeknd_after.wav" />
              <p className="mt-5 text-sm italic text-center text-gray-500">*untuned</p>
            </div>
          </div>
        </div>
      </div>

      <Features />
      <Features02 />
      <Features03 />
      <TestimonialsCarousel />
      <Features04 />
      <Pricing />
      <Testimonials />
      <Cta />
    </>
  );
}
