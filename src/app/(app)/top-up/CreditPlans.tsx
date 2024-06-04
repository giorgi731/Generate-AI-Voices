'use client';

import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import useUserId from '~/core/hooks/use-user-id';
import useCreateCheckout from '~/lib/stripe/use-create-checkout';

const CreditPlans = () => {
  const { createCheckout } = useCreateCheckout(useUserId());

  const data = [
    { id: 1, price: 50, credits: 150, packageName: 'Package 1' },
    { id: 2, price: 100, credits: 250, packageName: 'Package 2' },
    { id: 3, price: 200, credits: 450, packageName: 'Package 3' },
    { id: 4, price: 250, credits: 550, packageName: 'Package 4' },
  ] as Plan[];

  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
  );

  const handleClick = async (item: Plan) => {
    const { id, price, credits, packageName } = item;
    const session = (await createCheckout({
      id,
      price,
      credits,
      packageName,
    })) as any;

    const stripe = await stripePromise;
    const result = await stripe?.redirectToCheckout({
      sessionId: session?.sessionId,
    });

    if (result?.error) {
      console.error(result.error);
    }
  };

  return (
    <div className="flex flex-row justify-center">
      {data.map((item, index) => {
        return (
          <button
            className="flex flex-col items-center justify-center w-64 h-64 mx-4 border-8 border-white cursor-pointer rounded-xl hover:bg-fuchsia-500"
            key={index}
            onClick={() => handleClick(item)}
          >
            <h2 className="text-4xl">
              price: <span className="text-blue-400">{item.price}$</span>
            </h2>
            <p className="mt-6 text-xl font-extrabold">
              credits: <span className="text-blue-200">{item.credits}</span>
            </p>
          </button>
        );
      })}
    </div>
  );
};

type Plan = {
  id: number;
  price: number;
  credits: number;
  packageName: string;
};

export default CreditPlans;
