'use client';

import { FormEvent, useEffect, useRef, useState } from 'react';
import { useCallback } from 'react';
import Confetti from 'react-confetti';

import Heading from '~/core/ui/Heading';
import Button from '~/core/ui/Button';
import TextField from '~/core/ui/TextField';
import SubHeading from '~/core/ui/SubHeading';
import useUserSession from '~/core/hooks/use-user-session';
import Link from 'next/link';
import Hero from '~/core/ui/Hero';
import { FacebookShareButton, PinterestShareButton, PinterestIcon, RedditShareButton, RedditIcon, WhatsappShareButton, WhatsappIcon, LinkedinShareButton, FacebookIcon, LinkedinIcon } from 'next-share';
import { ShareIcon } from 'lucide-react';

export interface OrganizationInfoStepData {
  organization: string;
}

const OrganizationInfoStep: React.FCC<{
  onSubmit: (data: OrganizationInfoStepData) => void;
}> = ({ onSubmit }) => {
  const user = useUserSession();
  const displayName = user?.data?.displayName ?? user?.auth?.user.email ?? '';

  const handleFormSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const data = new FormData(event.currentTarget);
      const organization = data.get(`organization`) as string;

      onSubmit({
        organization,
      });
    },
    [onSubmit]
  );

  return (
    <WaitingList />
    // <form
    //   onSubmit={handleFormSubmit}
    //   className={'flex w-full flex-1 flex-col space-y-6'}
    // >


    //   <div className={'flex flex-col space-y-1.5'}>
    //     <Heading type={2}>Hi, {displayName}</Heading>
    //     <SubHeading>Let&apos;s create your organization.</SubHeading>
    //   </div>

    //   <div className={'flex flex-1 flex-col space-y-2'}>
    //     <TextField>
    //       <TextField.Label>
    //         Your organization&apos;s name
    //         <TextField.Input
    //           required
    //           name={'organization'}
    //           placeholder={'Organization Name'}
    //         />
    //       </TextField.Label>
    //     </TextField>

    //     <div>
    //       <Button type={'submit'}>
    //         <span className={'flex items-center space-x-2'}>
    //           <span>Continue</span>
    //           <ArrowRightIcon className={'h-5'} />
    //         </span>
    //       </Button>
    //     </div>
    //   </div>
    // </form>
  );
};


const WaitingList = () => {

  const [isLoaded, setIsLoaded] = useState(false);
  const { width, height } = useWindowSize()
  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);

      setTimeout(() => {
        setIsLoaded(false);
      }, 8000); // stop confetti after 3 seconds
    }, 500); // wait 1 second before starting confetti
  }, []);

  return (
    <>
      <div className="px-4 py-5 mx-auto text-center sm:p-6">
        <SubHeading className='max-w-3xl !mt-6'>
          Be the first to try Revocalize AI ✨
        </SubHeading>
        <Hero className="transition-all [&:has(span:hover)]:text-gray-500 font-bold !my-11">
          You're <span className='font-extrabold underline transition-colors hover:text-green-100 animate-pulse'>21,287</span> out of <span className='font-extrabold underline transition-colors hover:text-yellow-100'>125,128</span> in line.
        </Hero>

        {/* <div className="flex items-center justify-center py-4 mt-2 mb-10 bg-gray-100 rounded-lg">
          <span className="mr-2 font-bold text-gray-700">You are in position: </span>
          <span className="mr-2 font-bold text-red-600">{queuePosition}</span>
          <span className="font-bold text-gray-700">out of 10,000</span>
        </div> */}
        <p className="text-lg text-gray-300 mb-7">Get early access by referring your friends.<br/> The more friends that join, the sooner you'll get access.</p>
        <div className="flex items-center justify-center">
          <Button type={'submit'} className='px-1 pt-1 pb-2' onClick={() => {navigator.clipboard.writeText("https://www.revocalize.ai/?ref=21287")}}>
              <span className={'flex items-center space-x-2'}>
                <ShareIcon className={'h-4'} />
                <span className='pt-1'>Share Referral Link</span>
              </span>
          </Button>
        </div>
        <p className="mb-3 text-gray-300 text-md mt-7">Or share with friends:</p>
        <div className="flex items-center justify-center">
          <FacebookShareButton url={'https://www.revocalize.ai'} >
            <FacebookIcon size={40} className='rounded-xl mr-3.5' />
          </FacebookShareButton>
          
          <PinterestShareButton url={'https://www.revocalize.ai'} media={''}>
            <PinterestIcon size={40} className='rounded-xl mr-3.5' />
          </PinterestShareButton>

          <RedditShareButton url={'https://www.revocalize.ai'} >
            <RedditIcon size={40} className='rounded-xl mr-3.5' />
          </RedditShareButton>

          <WhatsappShareButton url={'https://www.revocalize.ai'} >
            <WhatsappIcon size={40} className='rounded-xl mr-3.5' />
          </WhatsappShareButton>

          <LinkedinShareButton url={'https://www.revocalize.ai'} >
            <LinkedinIcon size={40} className='rounded-xl' />
          </LinkedinShareButton>
        </div>

      </div>
      <Confetti recycle={isLoaded} width={width} height={height} className='mx-auto'/>
    </>
  );
};



export default OrganizationInfoStep;

// Hook
function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState({
    width: 2000,
    height: 1000,
  });
  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    // Add event listener
    window.addEventListener("resize", handleResize);
    // Call handler right away so state gets updated with initial window size
    handleResize();
    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount
  return windowSize;
}