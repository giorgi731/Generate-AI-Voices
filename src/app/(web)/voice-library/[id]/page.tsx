'use client';
import React from 'react';
import AppHeader from '../../../(app)/components/AppHeader';
import { SparklesIcon } from '@heroicons/react/24/outline';
import AppContainer from '../../../(app)/components/AppContainer';
import { useParams } from 'next/navigation';
import useGetModelById from '~/lib/models/hooks/use-get-model-by-id';
import Image from 'next/image';
import profilePicture from '~/../public/images/profilePic.png';
import WaveformAudioPlayer from '../../../(app)/components/WaveformAudioPlayer';
import starIcon from '~/../public/images/star.svg';
import filledStarIcon from '~/../public/images/filled-star.svg';

function ModelPage() {
  const params = useParams();
  const modelData = useGetModelById(params?.id);

  return (
    <div>
      {/*<div><AppHeader
      Icon={<SparklesIcon className={'h-6 dark:text-primary-500'} />}
      >
        <input
          className="rounded-[5px] bg-[#2B2041] px-[16px] py-[3px] text-[13px]"
          placeholder="Search artist voices"
        />
      </AppHeader></div>*/}

      <AppContainer>
        <div className="flex flex-row justify-between">
          <div className="mr-[48px] flex flex-[1] flex-col pr-[47px] [border-right:1px_solid_#1D1326]">
            <h2 className="mb-[30px] text-[24px] font-semibold">
              {modelData?.data?.name}
            </h2>
            <div className="flex flex-row items-center">
              <Image src={profilePicture} alt="profile picture" />
              <div className="ml-[20px] w-full rounded-3xl bg-gradient-to-br from-yellow-500 via-purple-500 to-cyan-500 p-px">
                <div className="back flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-3xl bg-[black]">
                  <WaveformAudioPlayer src="https://revocalize.s3.us-east-2.amazonaws.com/output/1112345/30_05_2023_11_00_07_None.wav" />
                </div>
              </div>
            </div>
            <div className="mt-[39px] flex flex-row justify-between pb-[33px] [border-bottom:1px_solid_#1D1326]">
              <p>
                <span className="text-[32px] font-semibold">$25</span> / 10
                minutes
              </p>
              <div className="rounded-3xl bg-gradient-to-br from-yellow-500 via-purple-500 to-cyan-500 p-0.5">
                <button className="back flex h-full w-full flex-col items-center justify-center rounded-3xl bg-[rgba(0,0,0,_0.7)] px-[40px] py-[10px] backdrop-blur-[15px] backdrop-filter">
                  List on marketplace
                </button>
              </div>
            </div>
            <p className="mt-[32] font-medium">Description</p>
            <p className="mt-[16px] w-[623px] text-[14px] font-light text-[#AAADB3]">
              Lorem ipsum dolor sit amet consectetur. Nunc orci fringilla
              commodo libero mauris sagittis penatibus at ornare. Pretium
              gravida ultrices a non posuere fermentum phasellus egestas. Neque
              sed purus sollicitudin varius. Fames diam aliquam enim velit
              aliquet nec in elementum varius.
            </p>
            <p className="mt-[32] font-medium">Details</p>
            <div className="mt-[16px] flex flex-row">
              <div className="flex w-[308px] justify-between rounded-[16px] bg-[rgba(22,_14,_34,_1)] p-[24px]">
                <div>
                  <p>Time trained</p>
                  <p>55 minutes</p>
                </div>
                <div className="flex flex-row">
                  <Image
                    alt="star icon"
                    src={filledStarIcon}
                    width={20}
                    height={20}
                  />
                  <Image
                    alt="star icon"
                    src={starIcon}
                    width={20}
                    height={20}
                  />
                  <Image
                    alt="star icon"
                    src={starIcon}
                    width={20}
                    height={20}
                  />
                </div>
              </div>
              <div className="ml-[24px] flex w-[308px] justify-between rounded-[16px] bg-[rgba(22,_14,_34,_1)] p-[24px]">
                <div>
                  <p>Time trained</p>
                  <p>55 minutes</p>
                </div>
                <div className="flex flex-row">
                  <Image
                    alt="star icon"
                    src={filledStarIcon}
                    width={20}
                    height={20}
                  />
                  <Image
                    alt="star icon"
                    src={starIcon}
                    width={20}
                    height={20}
                  />
                  <Image
                    alt="star icon"
                    src={starIcon}
                    width={20}
                    height={20}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="h-[464px] rounded-3xl bg-gradient-to-br from-yellow-500 via-purple-500 to-cyan-500 p-px">
            <div className="back flex h-full w-full flex-col items-center justify-center rounded-3xl bg-[black]">
              <div className="w-[352px] overflow-y-scroll p-[30px]">
                <div className="flex w-full flex-row pb-[21px] [border-bottom:1px_solid_white]">
                  <p className="flex flex-[1]">Gender:</p>
                  <p className="flex flex-[1] text-[#AAADB3]">
                    {modelData?.data?.gender}
                  </p>
                </div>
                <div className="mt-[19] flex flex-row pb-[21] [border-bottom:1px_solid_white]">
                  <p className="flex flex-[1]">Age:</p>
                  <p className="flex flex-[1] text-[#AAADB3]">
                    {modelData?.data?.age}
                  </p>
                </div>
                <div className="flex w-full flex-row pb-[21px] [border-bottom:1px_solid_white]">
                  <p className="flex flex-[1]">Voice Type:</p>
                  <p className="flex flex-[1] text-[#AAADB3]">Curbing</p>
                </div>
                <div className="flex w-full flex-row pb-[21px] [border-bottom:1px_solid_white]">
                  <p className="flex flex-[1]">Status:</p>
                  <p className="flex flex-[1] text-[#AAADB3]">Public</p>
                </div>
                <div className="flex w-full flex-row pb-[21px] [border-bottom:1px_solid_white]">
                  <p className="flex flex-[1]">Age:</p>
                  <p className="flex flex-[1] text-[#AAADB3]">Young Adult</p>
                </div>
                <div className="flex w-full flex-row pb-[21px] [border-bottom:1px_solid_white]">
                  <p className="flex flex-[1]">Genre:</p>
                  <p className="flex flex-[1] text-[#AAADB3]">Pop</p>
                </div>
                <div className="flex w-full flex-row pb-[21px] [border-bottom:1px_solid_white]">
                  <p className="flex flex-[1]">Vocal Range:</p>
                  <p className="flex flex-[1] text-[#AAADB3]">High voice</p>
                </div>
                <div className="flex w-full flex-row pb-[21px] [border-bottom:1px_solid_white]">
                  <p className="flex flex-[1]">Time Spend:</p>
                  <p className="flex flex-[1] text-[#AAADB3]">15 hours</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AppContainer>
    </div>
  );
}

export default ModelPage;
