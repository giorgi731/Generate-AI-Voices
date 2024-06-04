'use client';
import React, { useEffect, useMemo, useState, useCallback, useContext } from 'react';
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
import useUserId from '~/core/hooks/use-user-id';
import useGetOrganization from '~/lib/organizations/hooks/use-get-organization';
import { getCookie } from '~/core/generic/cookies';
import OrganizationContext from '~/lib/contexts/organization';
// import { client } from '@/lib/blog/sanity.client';

const UpgradePage = () => {
  const userId = useUserId()
  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
  const { organization } = useContext(OrganizationContext);
  const [state, dispatch] = useGlobalState();
  const [loadingState, setLoadingState] = useState<any>({ planId: null, loading: false })
  const [modals, setModals] = useState<any>({
    free: false,
    starter: false,
    creator: false
  })

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
    setLoadingState({ planId: selectedProduct?.stripeProductId, loading: true })

    // const stripe = (await stripePromise) as Stripe;
    // const getOrganizationSubscriptionData = (await getOrganizationSubscriptionActive(organizationData?.data?.id)) as any;

    // if (getOrganizationSubscriptionData !== false) {
    //   await fetch("/api/stripe/checkout-test-mode", {
    //     method: "post",
    //     body: JSON.stringify({ products: [{ price: selectedProduct?.stripeProductId, quantity: 1 }], organizationId: organizationData?.data?.id }, null),
    //     headers: {
    //       "content-type": "application/json",
    //     },
    //   });

    //   dispatch({
    //     type: SET_CURRENT_PLAN,
    //     payload: configuration.stripe.products[index],
    //   });
    //   setLoadingState({ planId: selectedProduct?.stripeProductId, loading: false })
    // }
    // else {
    // const { error } = await stripe?.redirectToCheckout({
    //   lineItems: [{ price: selectedProduct?.stripeProductId, quantity: 1 }],
    //   mode: 'subscription',
    //   successUrl: 'https://www.revocalize.ai/ai-voice-generator',
    //   cancelUrl: 'https://www.revocalize.ai/plans',
    //   clientReferenceId: organization?.id.toString(),
    // });
    // if (error) console.error(error);
    const stripe = (await stripePromise) as Stripe;
    // Fetch the checkout session from your backend
    const response = await fetch("/api/stripe/subscription-checkout", {
      method: "post",
      body: JSON.stringify({
        products: [{ price: selectedProduct?.stripeProductId, quantity: 1 }],
        userId: userId,
        organizationId: organization?.id
      }, null),
      headers: {
        "content-type": "application/json",
      },
    });

    const session = await response.json();

    const { error } = await stripe.redirectToCheckout({
      sessionId: session.id,
    });
    // }
  }, [organization?.id])


  const handleCheckout = useCallback(async () => {
    setLoadingState({ planId: 'slot', loading: true })
    const stripe = (await stripePromise) as Stripe;

    // const { error } = await stripe?.redirectToCheckout({
    //   lineItems: [{ price: "price_1O5IKnGTd5P8ZJtn7FExmZ8C", quantity }],
    //   // lineItems: [{ price: "price_1NyC5RGTd5P8ZJtnRUH2kRgT", quantity }],
    //   mode: "payment",
    //   successUrl: `https://www.revocalize.ai/success/price_1O5IKnGTd5P8ZJtn7FExmZ8C/${quantity}`,
    //   cancelUrl: 'https://www.revocalize.ai/plans',
    //   clientReferenceId: `${organization?.id.toString()}/${quantity}`,
    // });
    // if (error) console.error(error);
    // Fetch the checkout session from your backend
    const response = await fetch("/api/stripe/checkout", {
      method: "post",
      body: JSON.stringify({
        products: [{ price: "price_1O5IKnGTd5P8ZJtn7FExmZ8C", quantity }],
        userId: userId,
        organizationId: organization?.id
      }, null),
      headers: {
        "content-type": "application/json",
      },
    });

    const session = await response.json();

    const { error } = await stripe.redirectToCheckout({
      sessionId: session.id,
    });
  }, [quantity, organization?.id])

  return (
    <AppContainer className='container'>
      {/* <div className="back [700px] flex h-full w-full flex-col items-center justify-center rounded-lg bg-[#160E24] px-[40px] py-3">
          test
        </div> */}
      <div className="px-3 lg:px-[0]">
        <div className="rounded-[12px] pb-[60px] mb-[16px]">
          <div className="py-6 px-6 lg:pt-[45px] lg:pb-2 text-center ">
            <h1 className="mb-[5px] text-[32px] font-[700] text-white text-center">
              Simple and transparent pricing.
            </h1>
            <p className="font-[400] text-center">
              Upgrade now to train faster and convert more.
            </p>
            <div className="text-center">
              <svg className="inline-block" xmlns="http://www.w3.org/2000/svg" height="100" width="200" viewBox="-17.85 -6.5 154.7 39"><path d="M113 26H6c-3.314 0-6-2.686-6-6V6c0-3.314 2.686-6 6-6h107c3.314 0 6 2.686 6 6v14c0 3.314-2.686 6-6 6zm5-20c0-2.761-2.239-5-5-5H6C3.239 1 1 3.239 1 6v14c0 2.761 2.239 5 5 5h107c2.761 0 5-2.239 5-5z" fill="#FFF" opacity=".749" fillRule="evenodd" /><path d="M60.7 18.437h-1.305l1.01-2.494-2.01-5.072h1.379l1.263 3.452 1.273-3.452h1.379zm-5.01-2.178c-.452 0-.916-.168-1.336-.495v.369h-1.347V8.566h1.347v2.663c.42-.316.884-.484 1.336-.484 1.41 0 2.378 1.136 2.378 2.757 0 1.62-.968 2.757-2.378 2.757zm-.284-4.357c-.368 0-.737.158-1.052.474v2.252c.315.315.684.473 1.052.473.758 0 1.284-.652 1.284-1.599s-.526-1.6-1.284-1.6zm-7.852 3.862c-.41.327-.873.495-1.336.495-1.4 0-2.378-1.137-2.378-2.757 0-1.621.978-2.757 2.378-2.757.463 0 .926.168 1.336.484V8.566h1.358v7.567h-1.358zm0-3.388c-.305-.316-.673-.474-1.041-.474-.769 0-1.295.653-1.295 1.6 0 .947.526 1.599 1.295 1.599.368 0 .736-.158 1.041-.473zm-8.019 1.494c.084.8.716 1.347 1.599 1.347.485 0 1.021-.179 1.568-.495v1.127c-.599.273-1.199.41-1.789.41-1.589 0-2.704-1.158-2.704-2.799 0-1.589 1.094-2.715 2.599-2.715 1.379 0 2.315 1.084 2.315 2.63 0 .148 0 .316-.021.495zm1.221-2.084c-.653 0-1.158.485-1.221 1.211h2.294c-.042-.716-.473-1.211-1.073-1.211zm-4.768.832v3.515h-1.347v-5.262h1.347v.526c.379-.421.842-.652 1.294-.652.148 0 .295.01.442.052v1.2c-.147-.042-.315-.063-.473-.063-.442 0-.916.242-1.263.684zm-6.009 1.252c.084.8.715 1.347 1.599 1.347.484 0 1.021-.179 1.568-.495v1.127c-.6.273-1.2.41-1.789.41-1.589 0-2.704-1.158-2.704-2.799 0-1.589 1.094-2.715 2.599-2.715 1.378 0 2.315 1.084 2.315 2.63 0 .148 0 .316-.021.495zm1.22-2.084c-.652 0-1.157.485-1.22 1.211h2.294c-.042-.716-.474-1.211-1.074-1.211zm-5.925 4.347L24.2 12.555l-1.063 3.578h-1.21l-1.81-5.262h1.347l1.063 3.578 1.063-3.578h1.22l1.063 3.578 1.063-3.578h1.347l-1.799 5.262zm-8.231.126c-1.589 0-2.715-1.147-2.715-2.757 0-1.621 1.126-2.757 2.715-2.757s2.705 1.136 2.705 2.757c0 1.61-1.116 2.757-2.705 2.757zm0-4.388c-.789 0-1.336.663-1.336 1.631s.547 1.631 1.336 1.631c.779 0 1.326-.663 1.326-1.631s-.547-1.631-1.326-1.631zm-5.915 1.662h-1.21v2.6H8.571V8.892h2.557c1.474 0 2.526.958 2.526 2.326s-1.052 2.315-2.526 2.315zm-.189-3.546H9.918v2.452h1.021c.779 0 1.326-.495 1.326-1.221 0-.736-.547-1.231-1.326-1.231zm100.177 4.064h-5.559c.127 1.331 1.102 1.723 2.209 1.723 1.127 0 2.015-.238 2.789-.628v2.287c-.771.428-1.79.736-3.147.736-2.766 0-4.704-1.732-4.704-5.156 0-2.892 1.644-5.188 4.345-5.188 2.697 0 4.105 2.295 4.105 5.203 0 .275-.025.87-.038 1.023zm-4.085-3.911c-.71 0-1.499.536-1.499 1.815h2.936c0-1.278-.74-1.815-1.437-1.815zm-8.923 8.029c-.994 0-1.601-.419-2.009-.718l-.006 3.213-2.839.604-.001-13.254h2.5l.148.701c.392-.366 1.111-.89 2.224-.89 1.994 0 3.872 1.796 3.872 5.102 0 3.608-1.858 5.242-3.889 5.242zm-.662-7.829c-.651 0-1.06.238-1.356.563l.017 4.219c.276.299.673.539 1.339.539 1.05 0 1.754-1.143 1.754-2.672 0-1.485-.715-2.649-1.754-2.649zm-8.297-2.326h2.85v9.952h-2.85zm0-3.178l2.85-.606v2.313l-2.85.606zm-3.039 6.383v6.747h-2.838V8.014h2.455l.178.839c.665-1.222 1.992-.974 2.37-.838v2.61c-.361-.117-1.494-.287-2.165.594zm-6.086 3.256c0 1.673 1.792 1.152 2.155 1.007v2.311c-.378.208-1.064.376-1.992.376-1.685 0-2.95-1.241-2.95-2.922l.013-9.109 2.772-.59.002 2.466h2.156v2.421h-2.156zm-3.539.484c0 2.044-1.627 3.21-3.988 3.21-.979 0-2.049-.19-3.105-.644v-2.711c.953.518 2.167.907 3.108.907.633 0 1.089-.17 1.089-.695 0-1.355-4.316-.845-4.316-3.988 0-2.01 1.535-3.213 3.838-3.213.941 0 1.881.144 2.822.519v2.675c-.864-.467-1.961-.731-2.824-.731-.595 0-.965.172-.965.615 0 1.278 4.341.67 4.341 4.056z" fill="#FFF" fillRule="evenodd" /></svg>
            </div>
          </div>

          <div className="flex w-full flex-col justify-center py-0 lg:py-[20px] sm:flex-row px-2 lg:px-[0]">
            <div className="relative mt-5 rounded-lg p-0.5  sm:mt-0 w-[100%] lg:w-[28%] sm:ml-[8px] sm:mr-[8px]">
              <div className="back flex h-[530px] flex-col items-start rounded-lg bg-[#221A2F] p-[25px]">
                <div className="block w-[42px] mb-3 mt-1">
                  <img src="data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64' aria-labelledby='title' aria-describedby='desc' role='img' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3EMicrophone%3C/title%3E%3Cdesc%3EA line styled icon from Orion Icon Library.%3C/desc%3E%3Cpath data-name='layer2' d='M41 32a10 10 0 0 1-10 10 10 10 0 0 1-10-10V12A10 10 0 0 1 31 2a10 10 0 0 1 10 10z' fill='none' stroke='%23ffffff' stroke-miterlimit='10' strokeWidth='3' strokeLinejoin='round' strokeLinecap='round'%3E%3C/path%3E%3Cpath data-name='layer1' d='M49 22v10a18 18 0 0 1-18 18 18 18 0 0 1-18-18V22m18 28v12m-10 0h20' fill='none' stroke='%23ffffff' stroke-miterlimit='10' strokeWidth='3' strokeLinejoin='round' strokeLinecap='round'%3E%3C/path%3E%3C/svg%3E" alt="Microphone" />
                </div>
                <div className="flex flex-row items-center justify-between w-full">


                  <p className="text-[20px] font-medium text-[#ffffff]">
                    Free
                  </p>
                  {(isActivePlan(0)) && (
                    <div className="rounded-full bg-white p-px">
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
                    1 Starter AI voices
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
                    <button className="w-full p-px  rounded-lg h-12" onClick={() => setModals((prev: any) => ({ ...prev, free: !prev.free }))}>
                      <div className="back flex h-full w-full flex-row items-center justify-center rounded-lg bg-transparent py-3 border-[1px] border-white">
                        <p className="mr-[8px] text-md flex justify-center items-center font-semibold text-[#ffffff]">
                          {loadingState.loading && loadingState.planId === configuration.stripe.products[0].stripeProductId ? <AnimatePresence>
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                              <RiLoader2Fill className="ml-2 text-lg text-white animate-spin" />
                            </motion.div>
                          </AnimatePresence> : isUpgradingPlan(0) ? 'Downgrade Plan' : 'Downgrade to Free'}
                        </p>
                      </div>
                    </button>
                  </div>
                )}
                {modals?.free && <div className='absolute h-[calc(100%-50px)] w-[calc(100%-50px)] bg-gradient-radial rounded-lg'>
                  <div className='flex justify-center items-center h-full font-bold text-sm text-white flex-col'>
                    <p>Are you sure you want to downgrade to Free?</p>
                    <div className='mt-4'>
                      <button className='border-[1px] border-white px-4 py-2 rounded-lg hover:bg-white hover:text-black-500' onClick={() => handleSubscribe(configuration.stripe.products[0], 0)}>
                        {loadingState.loading && loadingState.planId === configuration.stripe.products[0].stripeProductId ? <AnimatePresence>
                          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                            <RiLoader2Fill className="ml-2 text-lg text-white animate-spin" />
                          </motion.div>
                        </AnimatePresence> : "Confirm"}
                      </button>
                      <button className='ml-4 bg-black-500 px-4 py-2 rounded-lg' onClick={() => setModals((prev: any) => ({ ...prev, free: !prev.free }))}>CANCEL</button>
                    </div>
                  </div>
                </div>}
              </div>
            </div>
            <div className="relative mt-5 rounded-lg p-0.5  sm:mt-0 w-[100%] lg:w-[28%] sm:ml-[8px] sm:mr-[8px] text-[#ffffff]">
              <div className="back flex h-[530px] flex-col items-start rounded-lg bg-[#ffffff] p-[25px]" style={{
                background: 'linear-gradient(140.78deg, #784CFF 0%, #BF3EBB 100%)',
                backgroundBlendMode: 'soft-light, overlay, difference, normal'
              }}>
                <div className="block w-[42px] mb-3 mt-1">
                  <img src="data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64' aria-labelledby='title' aria-describedby='desc' role='img' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3EPodcast%3C/title%3E%3Cdesc%3EA line styled icon from Orion Icon Library.%3C/desc%3E%3Cpath data-name='layer2' d='M44 22.6a15.9 15.9 0 0 0 1-5.6c0-8.3-6.3-15-14-15S17 8.7 17 17a15.3 15.3 0 0 0 6.1 12.4A24.1 24.1 0 0 0 7 52h40' fill='none' stroke='%23ffffff' stroke-miterlimit='10' strokeWidth='3' strokeLinejoin='round' strokeLinecap='round'%3E%3C/path%3E%3Cpath data-name='layer1' fill='none' stroke='%23ffffff' stroke-miterlimit='10' strokeWidth='3' d='M47 50v12m8 0H39m16-20a8 8 0 0 1-8 8 8 8 0 0 1-8-8V30a8 8 0 0 1 8-8 8 8 0 0 1 8 8z' strokeLinejoin='round' strokeLinecap='round'%3E%3C/path%3E%3C/svg%3E" alt="Podcast" />
                </div>
                <div className="flex flex-row items-center justify-between w-full">
                  <p className="text-[20px] font-medium text-[#ffffff]">
                    Starter
                  </p>
                  {isActivePlan(1) && (
                    <div className="rounded-full bg-white p-px">
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
                    2 Ultimate AI voices
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
                      className={"w-full p-px rounded-lg h-12" + (organization?.id ? "" : " opacity-50 cursor-not-allowed")}
                      disabled={!organization?.id}
                      onClick={() => handleSubscribe(configuration.stripe.products[1], 1)}
                    >
                      <div className="back flex h-full w-full flex-row items-center justify-center rounded-lg bg-transparent py-3 border-[1px] border-white">
                        <p className="mr-[8px] text-md font-semibold text-[#ffffff]">
                          {loadingState.loading && loadingState.planId === configuration.stripe.products[1].stripeProductId ? <AnimatePresence>
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                              <RiLoader2Fill className="ml-2 text-lg text-white animate-spin" />
                            </motion.div>
                          </AnimatePresence> : isUpgradingPlan(1) ? 'Upgrade to Starter' : 'Switch to Starter'}
                        </p>
                      </div>
                    </button>
                  </div>
                )}

              </div>

              <div className='mt-5 p-[25px] flex flex-row w-full border rounded-lg border-black-50'>

                <div className='w-full'>

                  <p className="text-[20px] font-medium text-[#ffffff]">
                    Buy Additional AI Voices
                  </p>
                  <p className="block font-normal text-[#ffffff]">
                    <span className="mt-[18px] text-[48px] font-semibold">
                      $5
                    </span>{' '}
                    / voice
                  </p>
                  <div className="mb-[32px] mt-[24px] h-[0.5px] w-full bg-gradient-gray"></div>
                  <div className='flex flex-row justify-between items-center w-full mb-3'>

                    <button className='text-[30px] mr-4 px-3 rounded-lg bg-black-10' onClick={() => setQuantity(prev => {
                      if (prev > 1) {
                        return prev - 1
                      }
                      return prev
                    })}>-</button>
                    <p className='font-extrabold text-lg text-white'>{quantity}</p>
                    <button className='text-[30px] ml-4 px-3 rounded-lg bg-black-10' onClick={() => setQuantity(prev => prev + 1)}>+</button>
                  </div>
                  <button disabled={!organization?.id} className={'w-full p-px border-[1px] border-white rounded-lg h-12 text-md text-white mt-4 flex justify-center items-center ' + (organization?.id ? "" : " opacity-50 cursor-not-allowed")} onClick={handleCheckout}>
                    {loadingState.loading && loadingState.planId === 'slot' ? <AnimatePresence>
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <RiLoader2Fill className={"ml-2 text-lg text-white animate-spin " + (organization?.id ? '' : "")} />
                      </motion.div>
                    </AnimatePresence> : 'Buy Now'}
                  </button>

                </div>

              </div>

            </div>
            <div className="relative mt-5 rounded-lg p-0.5  sm:mt-0 w-[100%] lg:w-[28%] sm:ml-[8px] sm:mr-[8px]  text-[#ffffff]">
              <div className="back flex h-[530px] flex-col items-start rounded-lg bg-[#201b2c] p-[25px]" style={{
                background: 'linear-gradient(153.64deg, #7f00ff 0%, #000066 100%)',
                backgroundBlendMode: 'soft-light, overlay, difference, normal'
              }}>
                <div className="block w-[42px] mb-3 mt-1">
                  <img src="data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64' aria-labelledby='title' aria-describedby='desc' role='img' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3EVocal Microphone%3C/title%3E%3Cdesc%3EA line styled icon from Orion Icon Library.%3C/desc%3E%3Cpath data-name='layer1' fill='none' stroke='%23ffffff' stroke-miterlimit='10' strokeWidth='3' d='M9 55l-7 7' strokeLinejoin='round' strokeLinecap='round'%3E%3C/path%3E%3Cpath data-name='layer2' fill='none' stroke='%23ffffff' stroke-miterlimit='10' strokeWidth='3' d='M30 22L6 52l6 6 30.1-24M28 36l-4 4' strokeLinejoin='round' strokeLinecap='round'%3E%3C/path%3E%3Cpath data-name='layer1' fill='none' stroke='%23ffffff' stroke-miterlimit='10' strokeWidth='3' d='M30.7 12.7l20.6 20.6m-10.1.7h7.2a16.2 16.2 0 0 0 13.4-18.6 16.1 16.1 0 0 0-31.8.5v6.9a3 3 0 0 0 .9 2.1l8.2 8.2a3 3 0 0 0 2.1.9z' strokeLinejoin='round' strokeLinecap='round'%3E%3C/path%3E%3C/svg%3E" alt="Vocal Microphone" />
                </div>
                <div className="flex flex-row items-center justify-between w-full">
                  <p className="bg-gradient-radial bg-clip-text text-[20px] font-semibold text-[#ffffff]">
                    Creator
                  </p>
                  {isActivePlan(2) && (
                    <div className="rounded-full bg-white p-px">
                      <div className="back flex h-full w-full flex-col items-center justify-center rounded-full bg-[#ffffff] px-[16px] py-[8px]">
                        <p className="text-[12px] text-[#000000] uppercase">active plan</p>
                      </div>
                    </div>
                  )}
                  {!isActivePlan(2) && (
                    <div className="rounded-full bg-white p-px">
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
                    5 Ultimate AI voices
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
                      disabled={!organization?.id}
                      className={"w-full p-px rounded-lg h-12" + (organization?.id ? "" : " opacity-50 cursor-not-allowed")}
                      // onClick={() => setModals((prev: any) => ({ ...prev, creator: !prev.creator }))}
                      onClick={() => handleSubscribe(configuration.stripe.products[2], 2)}
                    >
                      <div className="back flex h-full w-full flex-row items-center justify-center rounded-lg bg-transparent py-3 border-[1px] border-white">
                        <p className="mr-[8px] text-md font-semibold text-[#ffffff]">
                          {loadingState.loading && loadingState.planId === configuration.stripe.products[2].stripeProductId ? <AnimatePresence>
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                              <RiLoader2Fill className="ml-2 text-lg text-white animate-spin" />
                            </motion.div>
                          </AnimatePresence> : isUpgradingPlan(2) ? 'Upgrade to Creator' : 'Swith to Creator'}
                        </p>
                      </div>
                    </button>
                  </div>
                )}
                {modals?.creator && <div className='absolute h-[calc(100%-50px)] w-[calc(100%-50px)] bg-gradient-radial rounded-lg'>
                  <div className='flex justify-center items-center h-full font-bold text-sm text-white flex-col'>
                    <p>CONFIRM FOR UPGRADING THE PLAN</p>
                    <div className='mt-4'>
                      <button className='border-[1px] border-white px-4 py-2 rounded-lg hover:bg-white hover:text-black-500' onClick={() => handleSubscribe(configuration.stripe.products[2], 2)}>CONFIRM</button>
                      <button className='ml-4 bg-black-500 px-4 py-2 rounded-lg' onClick={() => setModals((prev: any) => ({ ...prev, creator: !prev.creator }))}>CANCEL</button>
                    </div>
                  </div>
                </div>}
              </div>
            </div>
          </div>

        </div>
      </div>
    </AppContainer>
  );
};

export default UpgradePage;
