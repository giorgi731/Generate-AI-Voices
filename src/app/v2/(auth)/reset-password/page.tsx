export const metadata = {
  title: 'Reset Password - Stellar',
  description: 'Page description',
}

import AuthLogo from '../auth-logo'

export default function ResetPassword() {
  return (
    <>
      { /* Page header */}
      <div className="max-w-3xl pb-12 mx-auto text-center">
        { /* Logo */}
        <AuthLogo />
        { /* Page title */}
        <h1 className="text-transparent h2 bg-clip-text bg-gradient-to-r from-revocalize-200/60 via-revocalize-100 to-revocalize-200/60">Reset your password</h1>
      </div>

      { /* Form */}
      <div className="max-w-sm mx-auto">

        <form>
          <div className="space-y-4">
            <div>
              <label className="block mb-1 text-sm font-medium text-slate-300" htmlFor="email">Email</label>
              <input id="email" className="w-full form-input" type="email" required />
            </div>
          </div>
          <div className="mt-6">
            <button className="w-full text-sm text-white bg-purple-500 btn hover:bg-purple-600 shadow-sm group">
              Reset Password <span className="tracking-normal text-purple-300 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-1">-&gt;</span>
            </button>
          </div>
        </form>

      </div>
    </>
  )
}
