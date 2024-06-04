import Container from '~/core/ui/Container';
import PricingTable from '~/components/PricingTable';
import Hero from '~/core/ui/Hero';
import SubHeading from '~/core/ui/SubHeading';

import { Metadata } from 'next';
export const metadata: Metadata = {
    title: 'Pricing',
    alternates: {
        canonical: '/pricing',
    }
};

function PricingPage() {
  return (
    <Container>
      <div className={'flex flex-col space-y-8'}>
        <div className={'flex flex-col items-center'}>
          <Hero>Pricing</Hero>
          <SubHeading>
            Stress-free pricing. Unleash your full creative potential.
          </SubHeading>
        </div>

        <PricingTable />
      </div>
    </Container>
  );
}

export default PricingPage;
