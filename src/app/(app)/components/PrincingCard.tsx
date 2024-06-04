import React from 'react';
import WaveformAudioPlayer from './WaveformAudioPlayer';
import threeDots from '@/public/images/threeDots.svg';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const PrincingCard = ({ price, name, id }: any) => {
  const route = useRouter();

  return (
    <div>
      <div className="mx-[24px] my-[0] flex w-[300px] flex-col rounded-[16px] bg-[#170E27] p-[24px]">
        <p className="text-[14px] font-medium">Start from</p>
        <p className="font-normal">
          <span className="mt-[18px] text-[48px] font-semibold">
            ${Math.floor(price / 30)}
          </span>
        </p>
        <div className="mx-[0] my-[24px] h-[1px] w-full bg-[linear-gradient(90deg,_rgba(255,_97,_137,_0.00)_0%,_#FFF_52.48%,_rgba(255,_97,_137,_0.00)_100%)]" />
        <WaveformAudioPlayer src="https://revocalize.s3.us-east-2.amazonaws.com/output/1112345/30_05_2023_11_00_07_None.wav" />
        <div className="mt-[24px] h-[1px] w-full bg-[linear-gradient(90deg,_rgba(255,_97,_137,_0.00)_0%,_#FFF_52.48%,_rgba(255,_97,_137,_0.00)_100%)]" />
        <div className="flex flex-row items-center justify-between w-full mt-8">
          <p>{name}</p>
          <Image src={threeDots} alt="threeDots icon" />
        </div>
        <div className="flex flex-row items-center justify-between w-full mt-5">
          <p className="text-gray-600">
            By {name.split('(') ? name.split('(')[0] : name}
          </p>
          <p className="text-gray-600">a day ago</p>
        </div>
        <div className="mt-[43px] flex w-full justify-center">
          <button onClick={() => route.push(`/voice-library/${id}`)}>
            <div className="w-full rounded-[32px] border-[1px] border-solid border-[white] bg-[#170E27] px-[80px] py-[15px]">
              View More
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrincingCard;
