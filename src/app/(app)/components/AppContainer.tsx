'use client'
import Link from "next/link";
import mainLogo from "~/../public/images/mainLogo.svg";
import Image from "next/image";
import { Button } from "~/components/ui/button";
import { useCallback, useContext, useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import AppSidebarNavigation from "./AppSidebarNavigation_V2";
import SidebarContext from "~/lib/contexts/sidebar";
import useUserId from "~/core/hooks/use-user-id";
import OrganizationsSelector from "./organizations/OrganizationsSelector_V2";
import { AppSidebarFooterMenu } from "./AppSidebar_V2";
import { SET_CURRENT_PLAN, useGlobalState } from "~/lib/contexts/GlobalStore";
import useGetOrganization from "~/lib/organizations/hooks/use-get-organization";
import { AnimatePresence, motion } from "framer-motion";
import OrganizationContext from "~/lib/contexts/organization";
import useGetOrganizationSubscriptionActive from "~/lib/subscriptions/hooks/use-get-organization-subscription-active";
import configuration from "~/configuration";
import Spinner from "~/core/ui/Spinner";
import { loadStripe, Stripe } from "@stripe/stripe-js";

function AppContainer(props: React.PropsWithChildren & { className?: string }) {
  const [showMenu, setShowMenu] = useState<boolean>(false)
  const { collapsed, setCollapsed } = useContext(SidebarContext);
  const userId = useUserId();
  const { organization, setOrganization } = useContext(OrganizationContext);
  const [state, dispatch] = useGlobalState();
  const [creditsUsed, setCreditsUsed] = useState<any>(null);
  const [percentage, setPercentage] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
  const [checkoutLoading, setCheckoutLoading] = useState<boolean>(false);
  
  const handleCheckout = useCallback(async () => {
    setCheckoutLoading(true)
    const stripe = (await stripePromise) as unknown as Stripe;
    const response = await fetch("/api/stripe/checkout", {
      method: "post",
      body: JSON.stringify({
        products: [{ price: "price_1O5IKnGTd5P8ZJtn7FExmZ8C", quantity: 1 }],
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

    setCheckoutLoading(false)
  }, [organization?.id])

  // const product = useMemo(() => configuration.stripe.products.find((i: any) => i.stripeProductId === activeSub?.subscription?.data?.priceId ? i : configuration.stripe.products[0]), [activeSub?.subscription?.data?.priceId])
  // const { mutate: getOrganizationSubscriptionActive } = useGetOrganizationSubscriptionActive();

  useEffect(() => {
    setCreditsUsed(state.currentPlan?.credits - (organization?.credits || 0));
  }, [state.currentPlan?.credits]);

  useEffect(() => {
    setPercentage(`${100 - (creditsUsed / state.currentPlan?.credits) * 100 > 0 ? 100 - (creditsUsed / state.currentPlan?.credits) * 100 : 0}%`);
  }, [creditsUsed, state.currentPlan?.credits]);

  // useEffect(() => {
  //   const getCurrentPlanSubscription = async () => {
  //     const getOrganizationSubscriptionData = (await getOrganizationSubscriptionActive(organizationData?.data?.id)) as any;

  //     if (getOrganizationSubscriptionData !== false) {
  //       const product = configuration.stripe.products.find((i: any) => i.stripeProductId === getOrganizationSubscriptionData?.[0]?.price_id);
  //       dispatch({
  //         type: SET_CURRENT_PLAN,
  //         payload: product,
  //       });
  //       setOrganization(getOrganizationSubscriptionData.organization)
  //     } else {
  //       dispatch({
  //         type: SET_CURRENT_PLAN,
  //         payload: configuration.stripe.products[0],
  //       });
  //     };
  //   }
  //   setLoading(true);
  //   getCurrentPlanSubscription();
  //   setLoading(false);
  // }, [organizationData?.data?.id, state.currentPlan?.credits, dispatch]);

  return (
    <div className={`sm:pr-4 sm:w-full w-[100%] xl:w-[99%] mx-auto lg:${props.className}`}>
      <div className="w-full lg:hidden pl-5 pr-1 py-2 bg-[#160E24] flex justify-between items-center mb-3 md:mb-4">
        <Image src={mainLogo} alt="logo" className="mb-3 mt-4 min-w-[160px]" />
        <Button className="text-white bg-transparent" onClick={() => setShowMenu(true)}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32px" height="32px" fill="white">
            <path d="M 8 5 C 6.3550302 5 5 6.3550302 5 8 C 5 9.6449698 6.3550302 11 8 11 L 24 11 C 25.64497 11 27 9.6449698 27 8 C 27 6.3550302 25.64497 5 24 5 L 8 5 z M 8 7 L 24 7 C 24.56503 7 25 7.4349698 25 8 C 25 8.5650302 24.56503 9 24 9 L 8 9 C 7.4349698 9 7 8.5650302 7 8 C 7 7.4349698 7.4349698 7 8 7 z M 8 13 C 6.3550302 13 5 14.35503 5 16 C 5 17.64497 6.3550302 19 8 19 L 24 19 C 25.64497 19 27 17.64497 27 16 C 27 14.35503 25.64497 13 24 13 L 8 13 z M 8 15 L 24 15 C 24.56503 15 25 15.43497 25 16 C 25 16.56503 24.56503 17 24 17 L 8 17 C 7.4349698 17 7 16.56503 7 16 C 7 15.43497 7.4349698 15 8 15 z M 8 21 C 6.3550302 21 5 22.35503 5 24 C 5 25.64497 6.3550302 27 8 27 L 24 27 C 25.64497 27 27 25.64497 27 24 C 27 22.35503 25.64497 21 24 21 L 8 21 z M 8 23 L 24 23 C 24.56503 23 25 23.43497 25 24 C 25 24.56503 24.56503 25 24 25 L 8 25 C 7.4349698 25 7 24.56503 7 24 C 7 23.43497 7.4349698 23 8 23 z" />
          </svg>
        </Button>

      </div>
      {showMenu && (
        <div className="fixed top-0 w-auto right-0 bg-[#160E24] h-full block z-40 px-4 overflow-y-auto">
          <div className="flex justify-end pb-5 pl-5 pr-1 pt-7">
            <MdClose size={25} onClick={() => setShowMenu(false)} />
          </div>

          {userId && <OrganizationsSelector />}

          {!userId && (
            <div className="w-full px-[10px] py-[16px]">
              <Link href="/sign-in">
                <button className="w-full rounded-lg py-[10px] font-semibold ease-in-out outline-none bg-white text-black-700 hover:bg-[#FFFFFFB2] disabled:bg-[#FFFFFF0D] disabled:text-[#FFFFFF4D] transition-all duration-200">Sign In</button>
              </Link>
            </div>
          )}

          <AppSidebarNavigation collapsed={false} />
          {!organization && <div className="flex items-center justify-center w-full h-32"><Spinner /></div>}
          {userId && organization && (
            <motion.div className="w-full rounded-[5px] bg-[#160E24] px-[10px] py-[16px]" initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div className="flex flex-row items-center justify-between w-full">
                <p className="text-[13px] font-semibold text-white">{state.currentPlan?.name} Plan</p>
                <p className="text-[13px] text-[#C4C6CC]">
                  {(organization?.credits || 0)} {/* credits used */} mins left {/* change credits to minutes */}
                </p>
              </div>
              <div className="flex flex-row items-center justify-between w-full">
                <p className="text-[13px] font-semibold text-white">AI voices</p>
                <p className="text-[13px]  text-[#C4C6CC]" onClick={handleCheckout}>
                  {(organization?.slots || 0)} left <span className="cursor-pointer hover:underline">({checkoutLoading ? 'Please wait...' : 'Buy More'})</span>
                </p>
              </div>
              {/* <div className="mb-[10px] mt-1 h-px w-full bg-[#251D35]" />
              <div className="flex h-[10px] w-full rounded-[40px] bg-[#251D35]">
                <div className={`h-full rounded-[40px] bg-white`} style={{ width: percentage }} />
              </div> */}
              <Link href="/plans">
                <button className="p-[1px] mt-4 w-full rounded-lg from-rose-400 via-fuchsia-500 to-indigo-500 bg-gradient-to-r">
                  <span className="block text-black px-4 py-3 font-semibold rounded-lg bg-[#150e23] hover:bg-transparent hover:text-white transition duration-200">{state.currentPlan?.name === "Creator" ? "Manage Plan" : "Upgrade to convert more"}</span>
                </button>
              </Link>
            </motion.div>
          )}
        </div>
      )}
      {props.children}
    </div>
  );
}

export default AppContainer;
