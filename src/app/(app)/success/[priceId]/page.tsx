'use client';
import React, { useMemo } from 'react';
import Link from 'next/link'
import configuration from '~/configuration';
function page(props: any) {
  const planName = useMemo(() => {

    const selectedProduct = configuration.stripe.products.filter(product => {
      return product.stripeProductId === props.params.priceId ? true : false
    });
    if (selectedProduct.length > 0) {
      return selectedProduct[0].name;
    } else {
      return 'Invalid plan'
    }
  }, [props.params.priceId])

  return (
    <div className="flex flex-col items-center pt-10">
      {planName !== 'Free' && (

        <h1 className="text-3xl font-bold text-white mt-10">Congrats! </h1>
      )}
      {planName && (
        <h1 className="text-2xl font-bold text-white mt-10">
          You've just upgraded to {planName}
        </h1>
      )}
      <div className="mt-5">
        <Link href="/create-ai-voice">
          <button className="text-sm relative flex flex-row items-center rounded-lg bg-white px-5 py-2.5 text-black-700 transition-all duration-200 hover:bg-[#FFFFFFB2] disabled:bg-[#FFFFFF0D] disabled:text-[#FFFFFF4D]">
            Create Your AI voice
          </button>
        </Link>
      </div>
    </div >
  );
}

export default page;
