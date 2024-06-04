import Link from 'next/link';
import LogoImage from './LogoImage';

const Logo: React.FCC<{ href?: string; className?: string; hideBeta?: boolean }> = ({
  href,
  className,
  hideBeta=false,
}) => {
  return (
    <Link href={href ?? '/'}>
      <LogoImage className={className} hideBeta={hideBeta} />
    </Link>
  );
};

export default Logo;
