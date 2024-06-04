'use client';

import { Stripe, loadStripe } from '@stripe/stripe-js';
import { useCallback, useEffect, useState } from 'react';
import configuration from '~/configuration';
import useUserId from '~/core/hooks/use-user-id';
import useCurrentOrganization from '~/lib/organizations/hooks/use-current-organization';
import AppContainer from '../components/AppContainer';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '~/components/ui/accordion';
import Loading from '../loading';

export default function DownloadPluginPage() {
  const organization = useCurrentOrganization();
  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
  );
  const userId = useUserId();
  const [loading, setLoading] = useState<boolean>(true);
  const redirectToCheckoutPage = useCallback(async () => {
    const stripe = (await stripePromise) as Stripe;
    if (organization && userId) {
      if (!organization.plugin_purchased) {
        const response = await fetch('/api/stripe/checkout', {
          method: 'post',
          body: JSON.stringify(
            {
              products: [
                {
                  price: configuration.stripe.plugin.stripeProductId,
                  quantity: 1,
                },
              ],
              userId: userId,
              organizationId: organization?.id,
              success_url: 'https://www.revocalize.ai/plugin-purchase/success/',
              cancel_url: 'https://www.revocalize.ai/',
            },
            null
          ),
          headers: {
            'content-type': 'application/json',
          },
        });
        setLoading(false);
        const session = await response.json();
        const { error } = await stripe.redirectToCheckout({
          sessionId: session.id,
        });
      } else {
        setLoading(false);
      }
    }
  }, [organization, userId]);

  useEffect(() => {
    redirectToCheckoutPage();
  }, [redirectToCheckoutPage]);

  const FAQ = [
    {
      question: 'What is the Revocalize VST Plugin?',
      answer: `The Revocalize VST Plugin is a revolutionary tool that transforms your vocals into any AI voice within seconds, directly within your Digital Audio Workstation (DAW).`,
    },
    {
      question: 'How do I install the Revocalize VST Plugin?',
      answer: `You can install the Revocalize VST Plugin by downloading the installer from our website and running it on your system. Follow the on-screen instructions for a smooth setup.`,
    },
    {
      question: 'Which DAWs are compatible with the Revocalize VST Plugin?',
      answer: `The Revocalize VST Plugin is compatible with major DAWs including Logic Pro, Ableton Live, FL Studio, and more.`,
    },
    {
      question: 'Do I need an internet connection to use the Revocalize VST Plugin?',
      answer: `Yes, an active internet connection is required to use the Revocalize VST Plugin as it accesses our cloud-based AI voice models in real-time.`,
    },
  ];

  return (
    <div>
      {loading && <Loading />}
      {organization?.plugin_purchased && (
        <AppContainer>
          {
            <>
              <div
                className="group my-0 flex w-full flex-col items-center justify-center rounded-xl px-6 py-6 transition-all duration-500 hover:saturate-[1.4] lg:px-0 lg:py-[100px]"
                style={{
                  background: 'linear-gradient(328.78deg, #030086 14.45%, #BD6177 84.36%), linear-gradient(301.28deg, #209B4A 0%, #7000FF 100%), radial-gradient(100% 138.56% at 100% 0%, #D50000 0%, #00FFE0 100%), radial-gradient(100% 148.07% at 0% 0%, #D50000 0%, #00FFFF 100%)',
                  backgroundBlendMode: 'soft-light, overlay, difference, normal',
                }}
              >
                <div className="flex flex-col items-center justify-center text-center">
                  <div className="mb-3 mt-1 block w-[42px]">
                    <img
                      className="rotate-180"
                      src="data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64' aria-labelledby='title' aria-describedby='desc' role='img' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3ERecord%3C/title%3E%3Cdesc%3EA line styled icon from Orion Icon Library.%3C/desc%3E%3Cpath data-name='layer1' d='M44 50a12 12 0 0 1-12 12 12 12 0 0 1-12-12V31a12 12 0 0 1 12-12 12 12 0 0 1 12 12z' fill='none' stroke='%23ffffff' stroke-miterlimit='10' strokeWidth='3' strokeLinejoin='round' strokeLinecap='round'%3E%3C/path%3E%3Cpath data-name='layer2' d='M12 37.7V31a20 20 0 0 1 20-20 20 20 0 0 1 20 20v6.7M12 35h40M32 11V2' fill='none' stroke='%23ffffff' stroke-miterlimit='10' strokeWidth='3' strokeLinejoin='round' strokeLinecap='round'%3E%3C/path%3E%3Cpath data-name='layer1' fill='none' stroke='%23ffffff' stroke-miterlimit='10' strokeWidth='3' d='M20 44h8m-7.8 8H28m8 0h7.8M36 44h8' strokeLinejoin='round' strokeLinecap='round'%3E%3C/path%3E%3C/svg%3E"
                      alt="Record"
                    />
                  </div>
                  <h1 className="mb-5 text-2xl font-black dark:text-white md:text-4xl">
                    Download VST Plugin
                  </h1>

                  <p className="font-[400] text-white text-center">
                    Transform your vocals into any AI voice in seconds using our
                    revolutionary VST plugin <br className='hidden md:block' />for your favorite DAW: Logic Pro,
                    Ableton, FL Studio, and more.
                  </p>
                  <div className="flex justify-center mt-5 gap-7">
                    <a
                      href="https://revocalize.s3.us-east-2.amazonaws.com/plugin_installer/RevocalizeAI_VST_Plugin.dmg"
                      download
                      className="group mt-8 rounded-lg bg-white px-10 py-5 font-semibold text-black-700 transition-all duration-200 hover:bg-[#FFFFFFB2] disabled:bg-[#FFFFFF0D] disabled:text-[#FFFFFF4D]"
                    >
                      Download For Mac
                    </a>

                    <a
                      href="https://revocalize.s3.us-east-2.amazonaws.com/plugin_installer/RevocalizeAI_VST_Plugin.exe"
                      download
                      className="group mt-8 rounded-lg bg-white px-10 py-5 font-semibold text-black-700 transition-all duration-200 hover:bg-[#FFFFFFB2] disabled:bg-[#FFFFFF0D] disabled:text-[#FFFFFF4D]"
                    >
                      Download For Windows
                    </a>
                  </div>
                </div>
              </div>

              <div className="mx-auto mb-[30px] mt-[13px] rounded-xl py-20">
                <div className="w-full pl-[30px]">
                  <h1 className="mb-5 text-2xl font-black text-center dark:text-white md:text-4xl">
                    VST Plugin FAQ.
                  </h1>
                  <div className="flex flex-row w-full py-2 align-top faq-row">
                    <Accordion
                      type="single"
                      collapsible
                      className="mx-auto max-w-2xl !flex-col items-center"
                    >
                      {FAQ.map((faq, index) => (
                        <AccordionItem
                          value={`item-${index}`}
                          className="w-full"
                          key={index}
                        >
                          <AccordionTrigger>{faq.question}</AccordionTrigger>
                          <AccordionContent>{faq.answer}</AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                </div>
              </div>
            </>
          }
        </AppContainer>
      )}
    </div>
  );
}
