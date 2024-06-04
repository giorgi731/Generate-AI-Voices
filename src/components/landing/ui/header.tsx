import Link from 'next/link'
import Logo from '~/core/ui/Logo/Logo'
import { ChevronRightIcon } from 'lucide-react'

export default function Header() {
  return (
    <header className="absolute z-30 w-full">
      <div className="max-w-6xl px-4 mx-auto sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">

          { /* Site branding */}
          <div className="mr-4 shrink-0">
            <Logo className='!invert' />
          </div>

          { /* Desktop navigation */}
          <nav className="flex grow">

            { /* Desktop sign in links */}
            <ul className="flex flex-wrap items-center justify-end grow">
              <li>
                <Link className="text-sm font-medium text-slate-200 hover:text-white transition duration-150 ease-in-out font-system" href="/sign-in">Sign in</Link>
              </li>
              <li className="ml-6">
                <Link className="btn-sm text-slate-200 py-1.5 hover:text-white transition duration-150 ease-in-out w-full group [background:linear-gradient(theme(colors.revocalize.950),_theme(colors.revocalize.950))_padding-box,_conic-gradient(theme(colors.slate.400),_theme(colors.slate.700)_25%,_theme(colors.slate.700)_75%,_theme(colors.slate.400)_100%)_border-box] relative before:absolute before:inset-0 before:bg-slate-800/30 before:rounded-full before:pointer-events-none" href="/sign-up">
                  <span className="relative inline-flex items-center font-medium font-system">
                    Sign up 
                    <ChevronRightIcon className={'h-4 pt-0.5 ml-1 my-auto group-hover:translate-x-1 text-revocalize-500 transition-transform duration-200 group-hover:text-white'} />
                    {/* <span className="tracking-normal text-purple-500 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-1">-&gt;</span> */}
                  </span>
                </Link>
              </li>
            </ul>

          </nav>

        </div>
      </div>
    </header>
  )
}
