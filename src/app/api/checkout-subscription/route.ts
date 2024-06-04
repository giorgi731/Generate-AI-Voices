import Stripe from 'stripe';
import { NextResponse } from 'next/server';
import { throwInternalServerErrorException } from '~/core/http-exceptions';
import getLogger from '~/core/logger';
import { NextApiResponse } from 'next';

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY as string, {
  apiVersion: '2022-11-15',
});

export async function POST(req: any, res: NextApiResponse) {
  try {
    if (req.method === 'POST') {
      try {
        const { priceId } = await req.json();

        const session = await stripe.checkout.sessions.create({
          mode: 'subscription',
          payment_method_types: ['card'],
          line_items: [{ price: priceId, quantity: 1 }],
          success_url: 'https://www.revocalize.ai/success' + priceId,
          cancel_url: 'https://www.revocalize.ai/failed',
        });

        

        return NextResponse.json({
          sessionId: session.id,
        });
      } catch (error: any) {
        console.log(error);
      }
    } else {
      res.setHeader('Allow', 'POST');
    }
  } catch (e) {
    getLogger().error(e, `Error`);

    return throwInternalServerErrorException();
  }
}
