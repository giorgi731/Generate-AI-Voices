import Hero from '~/core/ui/Hero';
import Container from '~/core/ui/Container';
import SubHeading from '~/core/ui/SubHeading';
import Link from 'next/link';

export const metadata = {
  title: 'About',
};

const AboutPage = () => {
  return (
    <div>
      <Container>
        <div className={'flex flex-col space-y-14'}>
          <div className={'flex flex-col items-center'}>
            <Hero>About Revocalize AI</Hero>
            <SubHeading>
              The future of voice is here – and it’s yours.
            </SubHeading>
          </div>

          <div
            className={
              'm-auto flex w-full max-w-xl flex-col items-start space-y-8' +
              ' justify-center text-gray-600 dark:text-gray-400'
            }
          >

            <div>
              Revocalize AI is a revolutionary voice toolkit that allows you to clone, protect, and create unique vocal tracks in any voice.
              <br/>
              <br/>
            </div>

            <div>
              Our mission is to revolutionize the music industry through: 
            </div>
            <ul className={'list-disc list-inside'}>
              <li><b>Creation:</b> Help professionals make amazing projects come alive faster than ever before.</li>
              <li><b>Protection:</b> Providing innovative AI solutions that empower creators in ownership of their unique voice.</li>
            </ul>
              
            <div>Our vision is to use our proprietary cutting edge technologies (such as our AI Unique Voice Identity Singing Model), to help people unlock the next level in sound revolution!</div>
            
            <div>Our proprietary audio fingerprinting technology helps protect and secure your <b>Unique Voice Identity</b> (UVI).</div>

            <div>
              At Revocalize AI, we believe in making our technology accessible to everyone. That's why we've designed our product to be easy to use and integrate with all your favorite tools and platforms.
            </div>

            <div>
              Join the voice revolution with Revocalize AI. Our proprietary technologies and cutting-edge features are revolutionizing the way we interact with digital interfaces, and we're just getting started. Experience the power of AI voice synthesis for yourself and take control of your sound with Revocalize AI. 
              <br/>{" "}
              <br/>{" "}
              <Link href="/sign-up" className='underline text-fuchsia-500'>Request access to the private beta today.</Link>
            </div>

            <div className='italic'>
              – <Link href='https://sebastiandobrincu.com' target='__blank' className='underline text-fuchsia-500'>Sebastian Dobrincu</Link> and <Link href="https://www.instagram.com/iammariusmoga/" target='__blank' className='underline text-fuchsia-500'>Marius Moga</Link>
              <br />{"  "}
              Co-Founders of Revocalize AI & IREAL Meta Labs
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default AboutPage;
