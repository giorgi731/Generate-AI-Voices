import AppContainer from '~/app/(app)/components/AppContainer';
import Image from 'next/image';
import Link from 'next/link';

const AffiliatePage = () => {
  return (
    <AppContainer>
        <div className="flex bg-[#160e26] my-4 py-16 pb-28 w-full flex-col items-center justify-center rounded-lg group hover:saturate-[1.4] transition-all duration-500" 
            style={{backgroundImage: 'url("/images/backgrounds/gradient_3.png")', backgroundSize: 'cover'}}>
            <section className="flex items-center justify-center w-full px-4 mx-auto text-center md:px-6" style={{maxWidth: '1080px'}}>
                <div className="flex flex-col items-center justify-center pt-10 max-w-[720px]">
                    <p className="mt-3 text-[#e099fa] font-semibold tracking-wide">Affiliate Program</p>
                    <h2 className="mt-5 font-black dark:text-white text-3xl md:text-5xl leading-[53px]">Earn money by sharing the <br/>AI Voice platform you love!</h2>
                    <p className="mt-7 text-gray-700 dark:text-gray-400 text-lg md:text-2xl max-w-[620px] leading-[38px]">
                        <span className="text-black dark:text-white underline decoration-yellow-200 underline-offset-[6px]">Earn 30% recurring commission on every sale</span> you help us make. Commissions are paid every month via PayPal
                    </p>
                    <Link className="mt-14 mb-5 rounded-lg border-[1px] px-[35px] py-[16px] font-[500] bg-white text-black-700 hover:bg-[#FFFFFFB2] disabled:bg-[#FFFFFF0D] disabled:text-[#FFFFFF4D] transition-all duration-200"
                        href="https://revocalize-ai.getrewardful.com/"
                        target="_blank"
                    >
                        Join Affiliate Program <span className='ml-2'>→</span>
                    </Link>
                </div>
            </section>
        </div>
    </AppContainer>
  );
};

export default AffiliatePage;
