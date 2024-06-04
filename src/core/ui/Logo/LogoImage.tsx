import Image from 'next/image';
import mainLogo from '~/../public/images/mainLogo.svg';

const LogoImage: React.FCC<{
  className?: string;
  hideBeta?: boolean;
}> = ({ className, hideBeta }) => {
  return (
    <div className='inline-flex items-center cursor-pointer group'>
      <Image src={mainLogo} alt="Revocalize AI Logo" className="mb-3 mt-4 min-w-[150px]" />
      {!hideBeta && (
        <span className="inline-block ml-2 px-1.5 py-0.5 text-[11px] font-semibold rounded-full text-white align-middle" 
        style={{backgroundImage: "linear-gradient(91.62deg, rgb(51, 71, 250) -10.42%, rgb(212, 120, 227) 100%)", height: '20px'}}>
          BETA
        </span>
      )}
    </div>
  );
};

export default LogoImage;
