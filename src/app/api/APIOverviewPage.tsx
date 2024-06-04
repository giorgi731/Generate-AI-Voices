import AppLayout from '../(web)/layout';
import AppContainer from '../(app)/components/AppContainer';
import Image from 'next/image';
import Link from 'next/link';

const APIOverviewPage = () => {
  return (
    <AppLayout>
        <AppContainer>
            <div className="flex bg-[#160e26] my-4 py-10 w-full flex-col items-center justify-center rounded-lg group hover:saturate-[1.4] transition-all duration-500" 
                style={{backgroundImage: 'url("https://cdn.pika.style/backgrounds/pika-series-2/series-2-pika-wallpaper-4.png")', backgroundSize: 'cover'}}>
                <div className="flex flex-col items-center justify-center">
                    <p className="mt-5 text-[#e099fa] font-semibold tracking-wide">Exclusive Early Access</p>
                    <h2 className="text-[52px] my-3 font-black text-white text-3xl md:text-5xl">Revocalize.ai Developer API</h2>
                    <p className="mt-2 text-center">
                        Convert voices to any AI voice model in seconds and train custom voice models. 
                        <br/>
                        Integrate the power of Revocalize AI in your own applications.
                    </p>

                    <Link
                        href="https://docs.revocalize.ai/"
                        target="_blank"
                        className="my-7 rounded-lg border-[1px] px-[35px] py-[16px] font-[500] bg-white text-black-700 hover:bg-[#FFFFFFB2] disabled:bg-[#FFFFFF0D] disabled:text-[#FFFFFF4D] transition-all duration-200"
                    >
                        Start using the API
                    </Link>
                    <Image
                        src="/images/revocalize_api.png" 
                        width={650}
                        height={650}
                        className="rounded-lg"
                        alt="Revocalize.ai API" 
                    />  
                </div>
            </div>

        </AppContainer>
    </AppLayout>
  );
};

export default APIOverviewPage;
