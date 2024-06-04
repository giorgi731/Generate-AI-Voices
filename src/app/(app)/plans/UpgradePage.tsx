'use client';
import React, { useEffect, useMemo, useState, useCallback } from 'react';
import AppContainer from '../components/AppContainer';
import AppHeader from '../components/AppHeader';
import { Stripe, loadStripe } from '@stripe/stripe-js';
import checkIcon from '~/../public/images/check-circle.svg';
import closeIcon from '~/../public/images/close-icon.svg';
import Image from 'next/image';
import useCurrentOrganization from '~/lib/organizations/hooks/use-current-organization';
import { SET_CURRENT_PLAN, useGlobalState } from '~/lib/contexts/GlobalStore';
import configuration from '~/configuration';
import { useRouter } from 'next/navigation';
import useGetOrganizationSubscriptionActive from '~/lib/subscriptions/hooks/use-get-organization-subscription-active';
import Spinner from '~/core/ui/Spinner';
import { RiLoader2Fill } from 'react-icons/ri';
import { AnimatePresence, motion } from 'framer-motion';
// import { client } from '@/lib/blog/sanity.client';

const UpgradePage = () => {
  const stripePromise = loadStripe('pk_live_51N6bGPGTd5P8ZJtncrTEVPmQMJXTvi7J13yXUu7lJwDVfVwZKw6tvw4l3BqUSE57q80EHKxE0rTUTSsBnnWlFniE00jfWEZZgx');
  const organization = useCurrentOrganization();
  const [state, dispatch] = useGlobalState();
  const [loadingState, setLoadingState] = useState<any>({ planId: null, loading: false })
  const [selectedPlan, setSelectedPlan] = useState<any>(null)
  const [quantity, setQuantity] = useState<number>(1)
  // const { mutate: getOrganizationSubscriptionActive } = useGetOrganizationSubscriptionActive();

  const isActivePlan = useMemo(() => (id: number) => {
    if (state.currentPlan?.name === configuration.stripe.products[id].name) {
      return true
    }

    if ((!state.currentPlan?.name && id === 0)) {
      return true
    }

    return false
  }, [state.currentPlan?.name])

  const isUpgradingPlan = useMemo(() => (index: any) => {
    const productIndex = configuration.stripe.products.findIndex(item => item.name === state.currentPlan?.name);

    if (productIndex === 1 && index === 0) {
      return false
    }

    if (productIndex === 1 && index === 2) {
      return true
    }

    if (productIndex < (configuration.stripe.products.length - 1)) {
      return true
    }

    if (productIndex <= (configuration.stripe.products.length - 1)) {
      return false
    }

    return true
  }, [state.currentPlan?.name]);

  const getRewardfulClientReferenceId = () => {
    if (typeof window !== 'undefined') return (window as any).Rewardful && (window as any).Rewardful.referral || ('checkout_' + (new Date).getTime());
    else return null;
  };


  const handleSubscribe = useCallback(async (selectedProduct: any, index: number) => {
    // setLoadingState({ planId: selectedProduct?.stripeProductId, loading: true })

    // const stripe = (await stripePromise) as Stripe;
    // const getOrganizationSubscriptionData = (await getOrganizationSubscriptionActive(organization?.id)) as any;

    // if (getOrganizationSubscriptionData !== false) {
    //   await fetch("/api/stripe/checkout-test-mode", {
    //     method: "post",
    //     body: JSON.stringify({ products: [{ price: selectedProduct?.stripeProductId, quantity: 1 }], organizationId: organization?.id }, null),
    //     headers: {
    //       "content-type": "application/json",
    //     },
    //   });
    //   // const product = configuration.stripe.products.find((i: any) => i.stripeProductId === getOrganizationSubscriptionData?.[0]?.priceId);

    //   // console.log(selectedProduct, "aosoaos", product, getOrganizationSubscriptionData)

    //   dispatch({
    //     type: SET_CURRENT_PLAN,
    //     payload: configuration.stripe.products[index],
    //   });
    //   setLoadingState({ planId: selectedProduct?.stripeProductId, loading: false })
    // }
    // else {
    //   // const { error } = await stripe?.redirectToCheckout({
    //   //   lineItems: [{ price: selectedProduct?.stripeProductId, quantity: 1 }],
    //   //   mode: 'subscription',
    //   //   successUrl: 'https://www.revocalize.ai/ai-voice-generator',
    //   //   cancelUrl: 'https://www.revocalize.ai/plans',
    //   //   clientReferenceId: organization?.id.toString(),
    //   // });
    //   // if (error) console.error(error);
    //   const stripe = (await stripePromise) as Stripe;

    //   // Fetch the checkout session from your backend
    //   const response = await fetch("/api/stripe/subscription-checkout", {
    //     method: "post",
    //     body: JSON.stringify({ products: [{ price: selectedProduct?.stripeProductId, quantity: 1 }] }, null),
    //     headers: {
    //       "content-type": "application/json",
    //     },
    //   });

    //   const session = await response.json();

    //   const { error } = await stripe.redirectToCheckout({
    //     sessionId: session.id,
    //   });
    // }
  }, [organization])


  const handleCheckout = useCallback(async () => {
    const stripe = (await stripePromise) as Stripe;

    const { error } = await stripe?.redirectToCheckout({
      lineItems: [{ price: "price_1NyC5RGTd5P8ZJtnRUH2kRgT", quantity }],
      mode: "payment",
      successUrl: 'https://www.revocalize.ai/ai-voice-generator',
      cancelUrl: 'https://www.revocalize.ai/plans',
      clientReferenceId: organization?.id.toString(),
    });
    if (error) console.error(error);
  }, [quantity])




  return (
    <AppContainer className='container'>
      {/* <div className="back [700px] flex h-full w-full flex-col items-center justify-center rounded-lg bg-[#160E24] px-[40px] py-3">
          test
        </div> */}

      <div className="bg-[#181026] rounded-[12px] pb-[60px] mb-[16px]">
        <div className="px-[29px] py-[45px] mt-4 text-center">
          <h1 className="mb-[5px] text-[32px] font-[700] text-white text-center">
            Revocalize.ai Pricing Plans
          </h1>
          <p className="font-[400] text-center">
            Train faster and convert more with the ultimate toolkit for AI creators.
          </p>
        </div>

        <div className="flex w-full flex-col justify-center py-[20px] sm:flex-row">
          <div className="relative mt-5 rounded-lg p-0.5  sm:mt-0 w-[28%] sm:ml-[8px] sm:mr-[8px]">
            <div className="back flex h-full flex-col items-start rounded-lg bg-[#221A2F] p-[25px]">
              <div className="flex flex-row items-center justify-between w-full h-11">
                <p className="text-[20px] font-medium text-[#ffffff]">
                  Free
                </p>
                {(isActivePlan(0)) && (
                  <div className="p-px bg-white rounded-full">
                    <div className="back flex h-full w-full flex-col items-center justify-center rounded-full bg-[#ffffff] px-[16px] py-[8px]">
                      <p className="text-[12px] text-[#000000] uppercase">active plan</p>
                    </div>
                  </div>
                )}
              </div>
              <p className="font-normal text-[#ffffff]">
                <span className="mt-[18px] text-[48px] font-semibold">
                  $0
                </span>{' '}
                / month
              </p>
              <div className="mb-[32px] mt-[24px] h-[0.5px] w-full bg-gradient-gray" />
              <div className="flex flex-row">
                <Image src={checkIcon} alt="check icon" />
                <p className="ml-[7px] font-semibold text-sm">5 minutes of conversion / month</p>
              </div>
              <div className="mt-[18px] flex flex-row">
                <Image src={checkIcon} alt="check icon" />
                <p className="ml-[7px] font-semibold text-sm">
                  3 “Starter” AI voices
                </p>
              </div>
              <div className="mt-[18px] flex flex-row">
                <Image src={checkIcon} alt="check icon" />
                <p className="ml-[7px] font-semibold text-sm">
                  Standard queue priority
                </p>
              </div>
              <div className="mt-[18px] flex flex-row">
                <Image src={closeIcon} alt="check icon" />
                <p className="ml-[7px] font-semibold text-[#ffffff] opacity-50 text-sm">
                  Licensed AI Voices Library{' '}
                </p>
              </div>
              <div className="mt-[18px] flex flex-row">
                <Image src={closeIcon} alt="check icon" />
                <p className="ml-[7px] font-semibold text-[#ffffff] opacity-50 text-sm">
                  AI Voice Effects
                </p>
              </div>

              {!isActivePlan(0) && (
                <div className="mt-[43px] flex w-full justify-center flex-col">
                  <button className="w-full h-12 p-px rounded-lg" onClick={() => handleSubscribe(configuration.stripe.products[0], 0)}>
                    <div className="back flex h-full w-full flex-row items-center justify-center rounded-lg bg-transparent py-3 border-[1px] border-white">
                      <p className="mr-[8px] text-md font-semibold text-[#ffffff]">
                        {loadingState.loading && loadingState.planId === configuration.stripe.products[0].stripeProductId ? <AnimatePresence>
                          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                            <RiLoader2Fill className="ml-2 text-lg text-white animate-spin" />
                          </motion.div>
                        </AnimatePresence> : isUpgradingPlan(0) ? 'Upgrade' : 'Downgrade'}
                      </p>
                    </div>
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="relative mt-5 rounded-lg p-0.5  sm:mt-0 w-[28%] sm:ml-[8px] sm:mr-[8px] text-[#ffffff]">
            <div className="back flex h-full flex-col items-start rounded-lg bg-[#ffffff] p-[25px]" style={{
              background: 'linear-gradient(140.78deg, #784CFF 0%, #BF3EBB 100%)',
              backgroundBlendMode: 'soft-light, overlay, difference, normal'
            }}>
              <div className="flex flex-row items-center justify-between w-full h-11">
                <p className="text-[20px] font-medium text-[#ffffff]">
                  Starter
                </p>
                {isActivePlan(1) && (
                  <div className="p-px bg-white rounded-full">
                    <div className="back flex h-full w-full flex-col items-center justify-center rounded-full bg-[#ffffff] px-[16px] py-[8px]">
                      <p className="text-[12px] text-[#000000] uppercase">active plan</p>
                    </div>
                  </div>
                )}
              </div>
              <p className="font-normal">
                <span className="mt-[18px] text-[48px] font-semibold">
                  $9
                </span>{' '}
                / month
              </p>
              <div className="mb-[32px] mt-[24px] h-[0.5px] w-full bg-gradient-gray" />
              <div className="flex flex-row">
                <Image src={checkIcon} alt="check icon" />
                <p className="ml-[7px] font-semibold text-sm">120 minutes of conversion / month</p>
              </div>
              <div className="mt-[18px] flex flex-row">
                <Image src={checkIcon} alt="check icon" />
                <p className="ml-[7px] font-semibold text-sm">
                  2 “Ultimate” AI voices
                </p>
              </div>
              <div className="mt-[18px] flex flex-row">
                <Image src={checkIcon} alt="check icon" />
                <p className="ml-[7px] font-semibold text-sm">
                  Priority Training
                </p>
              </div>
              <div className="mt-[18px] flex flex-row">
                <Image src={checkIcon} alt="check icon" />
                <p className="ml-[7px] font-semibold text-sm">
                  Licensed AI Voices Library
                </p>
              </div>
              <div className="mt-[18px] flex flex-row">
                <Image src={checkIcon} alt="check icon" />
                <p className="ml-[7px] font-semibold text-sm">
                  AI Voice Effects
                </p>
              </div>

              {!isActivePlan(1) && (
                <div className="mt-[43px] flex w-full justify-center flex-col">
                  <button
                    className="w-full h-12 p-px rounded-lg"
                    onClick={() => handleSubscribe(configuration.stripe.products[1], 1)}
                  >
                    <div className="back flex h-full w-full flex-row items-center justify-center rounded-lg bg-transparent py-3 border-[1px] border-white">
                      <p className="mr-[8px] text-md font-semibold text-[#ffffff]">
                        {loadingState.loading && loadingState.planId === configuration.stripe.products[1].stripeProductId ? <AnimatePresence>
                          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                            <RiLoader2Fill className="ml-2 text-lg text-white animate-spin" />
                          </motion.div>
                        </AnimatePresence> : isUpgradingPlan(1) ? 'Upgrade' : 'Downgrade'}
                      </p>
                    </div>
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="relative mt-5 rounded-lg p-0.5  sm:mt-0 w-[28%] sm:ml-[8px] sm:mr-[8px]  text-[#ffffff]">
            <div className="back flex h-full flex-col items-start rounded-lg bg-[#201b2c] p-[25px]" style={{
              background: 'linear-gradient(153.64deg, #7f00ff 0%, #000066 100%)',
              backgroundBlendMode: 'soft-light, overlay, difference, normal'
            }}>
              <div className="flex flex-row items-center justify-between w-full h-11">
                <p className="bg-gradient-radial bg-clip-text text-[20px] font-semibold text-[#ffffff]">
                  Creator
                </p>
                {isActivePlan(2) && (
                  <div className="p-px bg-white rounded-full">
                    <div className="back flex h-full w-full flex-col items-center justify-center rounded-full bg-[#ffffff] px-[16px] py-[8px]">
                      <p className="text-[12px] text-[#000000] uppercase">active plan</p>
                    </div>
                  </div>
                )}
                {!isActivePlan(2) && (
                  <div className="p-px bg-white rounded-full">
                    <div className="back flex h-full w-full flex-col items-center justify-center rounded-full bg-[#ffffff] px-[16px] py-[8px]">
                      <p className="text-[12px] text-[#000000] uppercase">most popular</p>
                    </div>
                  </div>
                )}
              </div>
              <p className="font-normal">
                <span className="mt-[18px] text-[48px] text-[#ffffff] font-semibold">
                  $39
                </span>{' '}
                / month
              </p>
              <div className="mb-[32px] mt-[24px] h-[0.5px] w-full bg-gradient-gray" />
              <div className="flex flex-row">
                <Image src={checkIcon} alt="check icon" />
                <p className="ml-[7px] font-semibold text-sm">Unlimited conversion minutes</p>
              </div>
              <div className="mt-[18px] flex flex-row">
                <Image src={checkIcon} alt="check icon" />
                <p className="ml-[7px] font-semibold text-sm">
                  5 “Ultimate” AI voices
                </p>
              </div>
              <div className="mt-[18px] flex flex-row">
                <Image src={checkIcon} alt="check icon" />
                <p className="ml-[7px] font-semibold text-sm">
                  Priority Training
                </p>
              </div>
              <div className="mt-[18px] flex flex-row">
                <Image src={checkIcon} alt="check icon" />
                <p className="ml-[7px] font-semibold text-sm">
                  Licensed AI Voices Library
                </p>
              </div>
              <div className="mt-[18px] flex flex-row">
                <Image src={checkIcon} alt="check icon" />
                <p className="ml-[7px] font-semibold text-sm">AI Voice Effects</p>
              </div>

              {!isActivePlan(2) && (
                <div className="mt-[43px] flex w-full justify-center flex-col">
                  <button
                    className="w-full h-12 p-px rounded-lg"
                    onClick={() => handleSubscribe(configuration.stripe.products[2], 2)}
                  >
                    <div className="back flex h-full w-full flex-row items-center justify-center rounded-lg bg-transparent py-3 border-[1px] border-white">
                      <p className="mr-[8px] text-md font-semibold text-[#ffffff]">
                        {loadingState.loading && loadingState.planId === configuration.stripe.products[2].stripeProductId ? <AnimatePresence>
                          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                            <RiLoader2Fill className="ml-2 text-lg text-white animate-spin" />
                          </motion.div>
                        </AnimatePresence> : isUpgradingPlan(2) ? 'Upgrade' : 'Downgrade'}
                      </p>
                    </div>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className='flex flex-row justify-center w-full'>
          <div className='h-44 w-44 bg-white-700'>
            <div className='flex flex-row items-center'>
              <button className='text-[30px] mr-4 px-3 rounded-lg bg-black-50' onClick={() => setQuantity(prev => {
                if (prev > 1) {
                  return prev - 1
                }
                return prev
              })}>-</button>
              <p className='text-lg font-extrabold text-white'>{quantity}</p>
              <button className='text-[30px] ml-4 px-3 rounded-lg bg-black-50' onClick={() => setQuantity(prev => prev + 1)}>+</button>
            </div>
            <button className='mt-4 text-lg font-extrabold text-blue-500' onClick={handleCheckout}>TOP-UP SLOTS</button>
          </div>
        </div>
      </div>

    </AppContainer>
  );
};

export default UpgradePage;
