import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  
  // cookies().getAll(); // Keep cookies in the JS execution context for Next.js build
  const token_hash = req.nextUrl.searchParams.get('token_hash') || req.nextUrl.searchParams.get('token')
  const next = req.nextUrl.searchParams.get('next') ?? '/app';
  const email = req.nextUrl.searchParams.get('email'); 

  console.log(`searchParams: ${req.nextUrl.searchParams}`);
  console.log(`token_hash: ${token_hash}`);
  console.log(`next: ${next}`);

  if (token_hash) {
    console.log(`Verifying OTP for token_hash: ${token_hash}`);
    const supabase = createRouteHandlerClient({ cookies });
    const { error } = await supabase.auth.verifyOtp({
      type: 'magiclink',
      //@ts-ignore
      token_hash
    });
    if (!error) {
      return NextResponse.redirect(new URL(`/${next.slice(1)}`, req.url));
    } else {
      console.error(`Error verifying OTP:`)
      console.error(error);
    }
  }
  // return the user to an error page with some instructions
  return NextResponse.redirect(new URL('/auth/auth-code-error', req.url));
}