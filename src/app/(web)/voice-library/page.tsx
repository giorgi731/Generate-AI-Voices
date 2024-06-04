'use client';
import React from 'react';
import AppContainer from '../../(app)/components/AppContainer';
// import PrincingCard from '../../(app)/components/PrincingCard';
// import useGetModels from '~/lib/models/hooks/use-get-models';
import Link from 'next/link';
import Image from 'next/image';
import { SparklesIcon } from '@heroicons/react/24/outline';

const VoiceMarketplace = () => {
  // const modelsData = useGetModels();
  // console.log(modelsData.data);

  return (
      <AppContainer>
        {/* Coming soon section */}
        <div className="flex bg-[#160e26] my-4 py-16 pb-20 w-full flex-col items-center justify-center rounded-lg group hover:saturate-[1.4] transition-all duration-500" 
            style={{backgroundImage: 'url("/images/backgrounds/gradient_2.png")', backgroundSize: 'cover'}}>
            <section className="flex items-center justify-center w-full px-4 mx-auto text-center md:px-6" style={{maxWidth: '1080px'}}>
                <div className="flex flex-col items-center justify-center pt-10 max-w-[800px]">
                    <p className="mt-3 text-[#e099fa] font-semibold tracking-wide">AI Voice Marketplace</p>
                    <h2 className="mt-4 font-black dark:text-white text-3xl md:text-5xl leading-[55px]">
                      Officially Licensed AI Voices
                      <br/> from professional singers
                    </h2>
                    <p className="mt-7 text-gray-700 dark:text-gray-400 text-lg md:text-2xl max-w-[700px] leading-[38px]">
                        Revocalize.ai is the first platform to work directly with artists to train and license their AI voices for commercial-use.
                        <br/>The result is the 
                        <span className="text-black dark:text-white underline decoration-yellow-200 underline-offset-[6px]">
                          {" "}highest quality AI voices
                        </span>
                        {" "}available anywhere.
                    </p>
                    <Link className="mt-10 mb-12 rounded-lg border-[1px] px-[35px] py-[16px] font-[500] bg-white text-black-700 hover:bg-[#FFFFFFB2] disabled:bg-[#FFFFFF0D] disabled:text-[#FFFFFF4D] transition-all duration-200"
                        href="#"
                        target="_blank"
                    >
                        Join the beta <span className='ml-2'>→</span>
                    </Link>
                    {/* <Image src="/images/ai-voices-vst-audio-plugin.webp" width={700} height={350} alt="Revocalize.ai AI Voice VST Audio Plugin for DAWs" 
                        className='shadow-xl rounded-xl'
                    /> */}
                </div>
            </section>
        </div>
        
        {/* TODO: Temporarily disabled page */}
        {/* <div>
          <h3 className="mb-[25px] text-[24px] font-semibold">Starter</h3>
          <div className="flex flex-row justify-between w-full overflow-x-scroll">
            {modelsData?.data
              ?.filter((item: any) => item.model_type === 'starter')
              .map((i: any) => {
                return <PrincingCard price={i.cost} name={i.name} id={i.id} />;
              })}
          </div>
          <h3 className="mb-[25px] mt-[25px] text-[24px] font-semibold">
            Creator
          </h3>
          <div className="flex flex-row justify-between w-full overflow-x-scroll">
            {modelsData?.data
              ?.filter((item: any) => item.model_type === 'creator')
              .map((i: any) => {
                return <PrincingCard price={i.cost} name={i.name} id={i.id} />;
              })}
          </div>
          <h3 className="mb-[25px] mt-[25px] text-[24px] font-semibold">Pro</h3>
          <div className="flex flex-row justify-between w-full overflow-x-scroll">
            {modelsData?.data
              ?.filter((item: any) => item.model_type === 'pro')
              .map((i: any) => {
                return <PrincingCard price={i.cost} name={i.name} id={i.id} />;
              })}
          </div>
        </div> */}
      </AppContainer>
  );
};

export default VoiceMarketplace;
