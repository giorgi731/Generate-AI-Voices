'use client';
import React from 'react';
import Link from 'next/link';
function page(props: any) {
  return (
    <div className="flex flex-col items-center pt-10">
      <h1 className="mt-10 text-3xl font-bold text-white">Success!</h1>
      {props.params.quantity && (
        <h1 className="mt-10 text-2xl font-bold text-white">
          You have just purchased voice slots. You can now create {props.params.quantity} extra AI Voices!
        </h1>
      )}
      <div className="mt-5">
        <Link href="/create-ai-voice">
          <button className="relative flex flex-row items-center rounded-lg bg-white px-5 py-2.5 text-sm text-black-700 transition-all duration-200 hover:bg-[#FFFFFFB2] disabled:bg-[#FFFFFF0D] disabled:text-[#FFFFFF4D]">
            Create Your AI voice
          </button>
        </Link>
      </div>
    </div>
  );
}

export default page;
