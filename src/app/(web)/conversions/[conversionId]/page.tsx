'use client';
import React, { useEffect, useState } from 'react';
import useGetAudioConversionById from '~/lib/audio_conversions/hooks/use-get-audio-conversion-by-id';
import WaveformAudioPlayer from '~/app/(app)/components/WaveformAudioPlayer';
import malePopImage from '~/../public/images/male-pop.jpg';
import AppHeader from '~/app/(app)/components/AppHeader';
import AppContainer from '~/app/(app)/components/AppContainer';
import Image from 'next/image';

const page = ({ params }: any) => {
  const conversionData = useGetAudioConversionById(params.conversionId) as any;
  const [timeDifference, setTimeDifference] = useState('');

  useEffect(() => {
    const today = new Date() as any;
    const createdOn = new Date(conversionData?.data?.date) as any;

    const diffInMillis = today - createdOn;
    const diffInSeconds = Math.floor(diffInMillis / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInSeconds < 60) {
      setTimeDifference(`${diffInSeconds} seconds ago`);
    } else if (diffInMinutes < 60) {
      setTimeDifference(`${diffInMinutes} minutes ago`);
    } else if (diffInHours < 24) {
      setTimeDifference(`${diffInHours} hours ago`);
    } else {
      setTimeDifference(`${diffInDays} days ago`);
    }
  }, [conversionData]);

  return (
    <>
      <AppHeader>
        <input
          className="rounded-[5px] bg-[#2B2041] px-[16px] py-[3px] text-[13px]"
          placeholder="Search artist voices"
        />
      </AppHeader>

      <AppContainer></AppContainer>
      <div className="flex items-center justify-center w-full h-screen">
        <div className="flex w-full flex-col items-center lg:w-[600px]">
          <Image
            src={malePopImage}
            alt="male singer"
            height={72}
            width={72}
            className="mb-[15px] rounded-full"
          />
          <h2 className="mt-[15px] text-[28px] font-[600] text-white">
            {conversionData?.data?.name}
          </h2>
          <h2 className="mt-[15px] text-white">{timeDifference}</h2>
          {conversionData?.data?.result?.map((i: any) => {
            return <WaveformAudioPlayer src={i} variant="tertiary" />;
          })}
        </div>
      </div>
    </>
  );
};

export default page;
