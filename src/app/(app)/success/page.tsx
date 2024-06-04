'use client';
import React from 'react';
import { useGlobalState } from '~/lib/contexts/GlobalStore';
import Link from 'next/link'
function page() {
  const [state, dispatch] = useGlobalState();


  return (
    <div className="flex flex-col items-center pt-10">
      <h1 className="text-3xl font-bold text-white mt-10">Congrats! </h1>
      {state?.currentPlan?.name && (
        <h1>
          You've just upgraded to {state?.currentPlan?.name}
        </h1>
      )}

      <div className="mt-5">
        <Link href="/ai-voice-generator">
          <button className="text-sm relative flex flex-row items-center rounded-lg bg-white px-5 py-2.5 text-black-700 transition-all duration-200 hover:bg-[#FFFFFFB2] disabled:bg-[#FFFFFF0D] disabled:text-[#FFFFFF4D]">
            Create Your AI voice
          </button>
        </Link>
      </div>
    </div >
  );
}

export default page;
