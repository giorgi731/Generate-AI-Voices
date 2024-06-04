import React, { useCallback, useContext, useEffect, useState } from "react";
import Trans from "~/core/ui/Trans";
import classNames from "classnames";
import { cva } from "class-variance-authority";
import mainLogo from "~/../public/images/mainLogo.svg";
import { ArrowRightCircleIcon, ArrowLeftCircleIcon } from "@heroicons/react/24/outline";
import IconButton from "~/core/ui/IconButton";
import { TooltipContent, Tooltip, TooltipTrigger } from "~/core/ui/Tooltip";

import SidebarContext from "~/lib/contexts/sidebar";
import AppSidebarNavigation from "./AppSidebarNavigation_V2";
import OrganizationsSelector from "./organizations/OrganizationsSelector_V2";
import Image from "next/image";
import Link from "next/link";
import useUserSession from "~/core/hooks/use-user-session";
import OrganizationContext from "~/lib/contexts/organization";
// import useGetOrganizationSubscriptionActive from "~/lib/subscriptions/hooks/use-get-organization-subscription-active";
import { SET_CURRENT_PLAN, useGlobalState } from "~/lib/contexts/GlobalStore";
import useUserId from "~/core/hooks/use-user-id";
import { motion } from "framer-motion";
import Spinner from "~/core/ui/Spinner";
import Loading from "../loading";
import { loadStripe, Stripe } from "@stripe/stripe-js";

const AppSidebar: React.FC = () => {
	const { collapsed, setCollapsed } = useContext(SidebarContext);
	const userId = useUserId();
	const { organization } = useContext(OrganizationContext);
	// const { data: organizationData }: any = useGetOrganization()
	const className = getClassNameBuilder()({ collapsed });

	return (
		<div className={className}>
			<div className={"ml-[16px] mr-[5px] flex w-full flex-col space-y-7 rounded-xl bg-[#160E24] px-3 py-2"}>
				<div className="flex justify-center w-full">
					<Link href="/ai-voice-generator">
						<Image src={mainLogo} alt="logo" className="mb-3 mt-4 min-w-[160px]" />
					</Link>
				</div>
				{userId && <OrganizationsSelector organizationData={organization} />}

				{!userId && (
					<div className="w-full px-[10px] py-[16px]">
						<Link href="/sign-in">
							<button className="w-full rounded-lg py-[10px] font-semibold ease-in-out outline-none bg-white text-black-700 hover:bg-[#FFFFFFB2] disabled:bg-[#FFFFFF0D] disabled:text-[#FFFFFF4D] transition-all duration-200">Sign In</button>
						</Link>
					</div>
				)}
				
				<AppSidebarNavigation collapsed={collapsed} />
			</div>
			<AppSidebarFooterMenu userId={userId} collapsed={collapsed} setCollapsed={setCollapsed} />
		</div>
	);
};

export function AppSidebarFooterMenu(
	props: React.PropsWithChildren<{
		userId?: string;
		collapsed: boolean;
		setCollapsed: (collapsed: boolean) => void;
	}>,
) {
	const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

	const { userId, collapsed, setCollapsed } = props;
	const { organization } = useContext(OrganizationContext);

	const [state, dispatch] = useGlobalState();
	const [creditsUsed, setCreditsUsed] = useState<any>(null);
	const [percentage, setPercentage] = useState<any>(null);
	const [loading, setLoading] = useState(false);
	const [checkoutLoading, setCheckoutLoading] = useState<boolean>(false);

	// const product = useMemo(() => {
	// 	if (activeSub) {
	// 		return configuration.stripe.products.find((i: any) => i.stripeProductId === activeSub?.data?.subscription?.data?.priceId) ?? configuration.stripe.products[0]
	// 	}
	// }, [activeSub?.data?.subscription?.data?.priceId, organization?.id]) as any
	// const { mutate: getOrganizationSubscriptionActive } = useGetOrganizationSubscriptionActive();

	useEffect(() => {
		setCreditsUsed(state.currentPlan?.credits - (organization?.credits || 0));
	}, [state.currentPlan?.credits]);

	useEffect(() => {
		setPercentage(`${100 - (creditsUsed / state.currentPlan?.credits) * 100 > 0 ? 100 - (creditsUsed / state.currentPlan?.credits) * 100 : 0}%`);
	}, [creditsUsed, state.currentPlan?.credits]);
	
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

	return (
		<div
			className={classNames(`absolute bottom-8 w-full`, {
				"px-6": !props.collapsed,
				"flex justify-center px-2": props.collapsed,
			})}
		>
			<div className={"flex flex-col items-center space-x-2 text-sm text-gray-500 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white"}>
				{userId != undefined && !organization && <div className="flex justify-center w-full h-52"><Spinner /></div>}
				{userId && organization && (
					<motion.div className="w-full rounded-[5px] bg-[#160E24] pl-[10px] py-[16px]" initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
						<div className="flex flex-row items-center justify-between w-full mb-[5px]">
							<p className="text-[13px] font-semibold text-white">{state.currentPlan?.name} Plan</p>
							<Link href={"/plans"}>
								<p className="text-[13px] text-[#C4C6CC] cursor-pointer hover:underline">
									{Math.round(organization?.credits || 0)} {/* credits used */} mins left {/* change credits to minutes */}
								</p>
							</Link>
						</div>
						<div className="flex flex-row items-center w-full">
							<p className="text-[13px] font-semibold flex-1 text-white">AI Voices</p>
							<div className="flex items-center ">

								<p className="text-[13px]  text-[#C4C6CC]" onClick={handleCheckout}>
									{(organization?.slots || 0)} left <span className="cursor-pointer hover:underline">({checkoutLoading ? 'Please wait...' : 'Buy More'})</span>
								</p>
							</div>
						</div>
						{/* <div className="mb-[10px] mt-1 h-px w-full bg-[#251D35]" />
						<div className="flex h-[10px] w-full rounded-[40px] bg-[#251D35]">
							<div className={`h-full rounded-[40px] bg-white`} style={{ width: percentage }} />
						</div>  */}
						<Link href="/plans">
							<button className="p-[1px] mt-4 w-full rounded-lg from-rose-400 via-fuchsia-500 to-indigo-500 bg-gradient-to-r">
								<span className="block text-black px-4 py-3 font-semibold rounded-lg bg-[#150e23] hover:bg-transparent hover:text-white transition duration-200">
									{state.currentPlan?.name === "Creator" ? "Manage Plan" : "Upgrade to convert more"}
								</span>
							</button>
						</Link>
					</motion.div>
				)}
			</div>
		</div>
	);
}

function CollapsibleButton(
	props: React.PropsWithChildren<{
		collapsed: boolean;
		onClick: (collapsed: boolean) => void;
	}>,
) {
	if (props.collapsed) {
		return (
			<Tooltip>
				<TooltipTrigger>
					<IconButton as={"div"} onClick={() => props.onClick(!props.collapsed)}>
						<ArrowRightCircleIcon className={"h-6"} />
					</IconButton>
				</TooltipTrigger>

				<TooltipContent>
					<Trans i18nKey={"common:expandSidebar"} />
				</TooltipContent>
			</Tooltip>
		);
	}

	const className = classNames({
		"[&>span]:hidden justify-center": props.collapsed,
	});

	return (
		<div className={className}>
			<button className={"flex items-center space-x-2 bg-transparent font-system"} onClick={() => props.onClick(!props.collapsed)}>
				<ArrowLeftCircleIcon className={"h-6"} />

				<span>
					<Trans i18nKey={"common:collapseSidebar"} />
				</span>
			</button>
		</div>
	);
}

export default AppSidebar;

function getClassNameBuilder() {
	return cva(["relative flex h-screen flex-row justify-center py-4 lg:flex"], {
		variants: {
			collapsed: {
				true: `w-[5rem]`,
				false: `w-2/12 max-w-xs  lg:min-w-[17rem]`,
			},
		},
	});
}
