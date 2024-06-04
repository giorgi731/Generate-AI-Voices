export default function Cta() {
  return (
    <section>
      <div className="max-w-6xl px-4 mx-auto sm:px-6">
        <div className="relative px-8 py-12 md:py-20 rounded-[3rem] overflow-hidden">
          { /* Radial gradient */}
          <div className="absolute top-0 flex items-center justify-center w-1/3 pointer-events-none -translate-y-1/2 left-1/2 -translate-x-1/2 -z-10 aspect-square" aria-hidden="true">
            <div className="absolute inset-0 translate-z-0 bg-revocalize-500 rounded-full blur-[120px] opacity-70" />
            <div className="absolute w-1/4 h-1/4 translate-z-0 bg-revocalize-400 rounded-full blur-[40px]" />
          </div>
          { /* Blurred shape */}
          <div className="absolute bottom-0 left-0 opacity-50 pointer-events-none translate-y-1/2 blur-2xl -z-10" aria-hidden="true">
            <svg xmlns="http://www.w3.org/2000/svg" width="434" height="427">
              <defs>
                <linearGradient id="bs5-a" x1="19.609%" x2="50%" y1="14.544%" y2="100%">
                  <stop offset="0%" stopColor="#A855F7" />
                  <stop offset="100%" stopColor="#6366F1" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path fill="url(#bs5-a)" fillRule="evenodd" d="m0 0 461 369-284 58z" transform="matrix(1 0 0 -1 0 427)" />
            </svg>
          </div>
          { /* Content */}
          <div className="max-w-3xl mx-auto text-center">
            <div>
              <div className="inline-flex pb-3 font-medium text-transparent bg-clip-text bg-gradient-to-r from-revocalize-500 to-revocalize-200">The voice first platform</div>
            </div>
            <h2 className="pb-4 text-transparent h2 bg-clip-text bg-gradient-to-r from-revocalize-200/60 via-revocalize-100 to-revocalize-200/60">Take control of your voice</h2>
            <p className="mb-8 text-lg text-slate-400">
              All the lorem ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet.
            </p>
            <div>
              <a className="btn text-slate-900 bg-gradient-to-r from-white/80 via-white to-white/80 hover:bg-white transition duration-150 ease-in-out group" href="#0">
                Get Started <span className="tracking-normal text-revocalize-500 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-1">-&gt;</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}