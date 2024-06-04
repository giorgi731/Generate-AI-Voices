import AppContainer from '~/app/(app)/components/AppContainer';
import Image from 'next/image';
import Link from 'next/link';
import { FiDownloadCloud } from 'react-icons/fi';

import { Metadata } from 'next'
export const metadata:Metadata = {
    title: 'Free AI Music Tools',
    description: 'Generate studio-quality AI voices in one-click, or choose from our officially licensed AI voice models. Get started instantly.'
};

const ToolsPage = () => {
  return (
    <AppContainer>
        <div className="flex bg-[#160e26] my-4 py-16 pb-20 w-full flex-col items-center justify-center rounded-lg group hover:saturate-[1.4] transition-all duration-500" 
            style={{backgroundImage: 'url("/images/backgrounds/gradient_2.png")', backgroundSize: 'cover'}}>
            <section className="flex items-center justify-center w-full px-4 mx-auto text-center md:px-6" style={{maxWidth: '1080px'}}>
                <div className="flex flex-col items-center justify-center pt-10 max-w-[800px]">
                    <p className="mt-3 text-[#e099fa] font-semibold tracking-wide">Free AI Voice VST Plugin</p>
                    <h2 className="mt-4 font-black dark:text-white text-3xl md:text-5xl leading-[55px]">Convert vocals in your DAW<br/> with the Revocalize.ai VST plugin</h2>
                    <p className="mt-7 text-gray-700 dark:text-gray-400 text-lg md:text-2xl max-w-[700px] leading-[38px]">
                        <span className="text-black dark:text-white underline decoration-yellow-200 underline-offset-[6px]">
                            Transform vocals into any AI voice
                        </span>
                        {" "}in seconds using our free VST plugin for Logic Pro, Pro Tools, Ableton, FL Studio, and more.
                    </p>
                    <Link className="mt-10 mb-12 rounded-lg border-[1px] px-[35px] py-[16px] font-[500] bg-white text-black-700 hover:bg-[#FFFFFFB2] disabled:bg-[#FFFFFF0D] disabled:text-[#FFFFFF4D] transition-all duration-200"
                        href="#"
                        target="_blank"
                    >
                        <FiDownloadCloud className="inline-block mr-3 -mt-1" size={20} />
                        Download Plugin
                    </Link>
                    <Image src="/images/ai-voices-vst-audio-plugin.webp" width={700} height={350} alt="Revocalize.ai AI Voice VST Audio Plugin for DAWs" 
                        className='shadow-xl rounded-xl'
                    />
                </div>
            </section>
        </div>
    </AppContainer>
  );
};

export default ToolsPage;
