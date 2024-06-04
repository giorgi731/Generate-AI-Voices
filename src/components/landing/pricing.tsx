'use client'

import { useState } from 'react'

export default function Pricing() {
  const [annual, setAnnual] = useState<boolean>(true)

  return (
    <section className="relative">
      { /* Radial gradient */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10" aria-hidden="true">
        <div className="absolute top-0 flex items-center justify-center w-1/3 -translate-y-1/2 left-1/2 -translate-x-1/2 aspect-square">
          <div className="absolute inset-0 translate-z-0 bg-revocalize-500 rounded-full blur-[120px] opacity-50" />
        </div>
      </div>
      <div className="max-w-6xl px-4 mx-auto sm:px-6">
        <div className="py-12 md:py-20">
          { /* Content */}
          <div className="max-w-3xl pb-12 mx-auto text-center md:pb-20">
            <div>
              <div className="inline-flex pb-3 font-medium text-transparent bg-clip-text bg-gradient-to-r from-revocalize-400 via-revocalize-300 to-revocalize-200">Pricing plans</div>
            </div>
            <h2 className="pb-4 text-transparent h2 bg-clip-text bg-gradient-to-r from-revocalize-200/60 via-revocalize-100 to-revocalize-200/60">Flexible plans and features</h2>
            <p className="text-lg text-slate-400">All the lorem ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet.</p>
          </div>
          { /* Pricing tabs */}
          <div className="relative">
            { /* Blurred shape */}
            <div className="absolute bottom-0 -mb-20 pointer-events-none max-md:hidden left-2/3 -translate-x-1/2 blur-2xl opacity-70" aria-hidden="true">
              <svg xmlns="http://www.w3.org/2000/svg" width="434" height="427">
                <defs>
                  <linearGradient id="bs5-a" x1="19.609%" x2="50%" y1="14.544%" y2="100%">
                    <stop offset="0%" stopColor="#A855F7" />
                    <stop offset="100%" stopColor="#6366F1" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path fill="url(#bs5-a)" fillRule="evenodd" d="m661 736 461 369-284 58z" transform="matrix(1 0 0 -1 -661 1163)" />
              </svg>
            </div>
            { /* Content */}
            <div className="grid md:grid-cols-4 xl:-mx-6 text-sm [&>div:nth-of-type(-n+4)]:py-6 [&>div:nth-last-of-type(-n+4)]:pb-6 max-md:[&>div:nth-last-of-type(-n+4)]:mb-8 max-md:[&>div:nth-of-type(-n+4):nth-of-type(n+1)]:rounded-t-3xl max-md:[&>div:nth-last-of-type(-n+4)]:rounded-b-3xl md:[&>div:nth-of-type(2)]:rounded-tl-3xl md:[&>div:nth-of-type(4)]:rounded-tr-3xl md:[&>div:nth-last-of-type(3)]:rounded-bl-3xl md:[&>div:nth-last-of-type(1)]:rounded-br-3xl [&>div]:bg-slate-700/20 [&>div:nth-of-type(4n+1)]:bg-transparent max-md:[&>div:nth-of-type(4n+5)]:hidden max-md:[&>div:nth-of-type(4n+2)]:order-1 max-md:[&>div:nth-of-type(4n+3)]:order-2 max-md:[&>div:nth-of-type(4n+4)]:order-3 max-md:md:[&>div:nth-of-type(n)]:mb-0 [&>div:nth-of-type(4n+3)]:relative before:[&>div:nth-of-type(4n+3)]:absolute before:[&>div:nth-of-type(4n+3)]:-inset-px before:[&>div:nth-of-type(4n+3)]:rounded-[inherit] before:[&>div:nth-of-type(4n+3)]:border-x-2 before:[&>div:nth-of-type(3)]:border-t-2 before:[&>div:nth-last-of-type(2)]:border-b-2 before:[&>div:nth-of-type(4n+3)]:border-revocalize-500 before:[&>div:nth-of-type(4n+3)]:-z-10 before:[&>div:nth-of-type(4n+3)]:pointer-events-none">
              { /* Pricing toggle */}
              <div className="flex flex-col justify-end px-6">
                <div className="pb-5 md:border-b border-slate-800">
                  { /* Toggle switch */}
                  <div className="max-md:text-center">
                    <div className="inline-flex items-center whitespace-nowrap">
                      <div className="mr-2 text-sm font-medium text-slate-500 md:max-lg:hidden">Monthly</div>
                      <div className="relative">
                        <input type="checkbox" id="toggle" className="sr-only peer" checked={annual} onChange={() => setAnnual(!annual)} />
                        <label htmlFor="toggle" className="relative flex h-6 w-11 cursor-pointer items-center rounded-full bg-slate-400 px-0.5 outline-slate-400 transition-colors before:h-5 before:w-5 before:rounded-full before:bg-white before:shadow-sm before:transition-transform before:duration-150 peer-checked:bg-revocalize-500 peer-checked:before:translate-x-full peer-focus-visible:outline peer-focus-visible:outline-offset-2 peer-focus-visible:outline-gray-400 peer-checked:peer-focus-visible:outline-revocalize-500">
                          <span className="sr-only">Pay Yearly</span>
                        </label>
                      </div>
                      <div className="ml-2 text-sm font-medium text-slate-500">Yearly <span className="text-teal-500">(-20%)</span></div>
                    </div>
                  </div>
                </div>
              </div>
              { /* Pro price */}
              <div className="flex flex-col justify-end px-6">
                <div className="pb-4 mb-4 border-b grow border-slate-800">
                  <div className="text-base font-medium bg-clip-text text-transparent bg-gradient-to-r from-revocalize-500 to-revocalize-200 pb-0.5">Pro</div>
                  <div className="mb-1">
                    <span className="text-lg font-medium text-slate-500">$</span><span className="text-3xl font-bold text-slate-50">{annual ? '24' : '29'}</span><span className="text-sm font-medium text-slate-600">/mo</span>
                  </div>
                  <div className="text-slate-500">Everything at your fingertips.</div>
                </div>
                <div className="pb-4 border-b border-slate-800">
                  <a className="w-full btn-sm text-slate-900 bg-gradient-to-r from-white/80 via-white to-white/80 hover:bg-white transition duration-150 ease-in-out group" href="#0">
                    Get Started <span className="tracking-normal text-revocalize-500 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-1">-&gt;</span>
                  </a>
                </div>
              </div>
              { /* Team price */}
              <div className="flex flex-col justify-end px-6">
                <div className="pb-4 mb-4 border-b grow border-slate-800">
                  <div className="text-base font-medium bg-clip-text text-transparent bg-gradient-to-r from-revocalize-500 to-revocalize-200 pb-0.5">Team</div>
                  <div className="mb-1">
                    <span className="text-lg font-medium text-slate-500">$</span><span className="text-3xl font-bold text-slate-50">{annual ? '49' : '54'}</span><span className="text-sm font-medium text-slate-600">/mo</span>
                  </div>
                  <div className="text-slate-500">Everything at your fingertips.</div>
                </div>
                <div className="pb-4 border-b border-slate-800">
                  <a className="w-full text-white btn-sm bg-revocalize-500 hover:bg-revocalize-600 transition duration-150 ease-in-out group" href="#0">
                    Get Started <span className="tracking-normal text-revocalize-300 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-1">-&gt;</span>
                  </a>
                </div>
              </div>
              { /* Enterprise price */}
              <div className="flex flex-col justify-end px-6">
                <div className="pb-4 mb-4 border-b grow border-slate-800">
                  <div className="text-base font-medium bg-clip-text text-transparent bg-gradient-to-r from-revocalize-500 to-revocalize-200 pb-0.5">Enterprise</div>
                  <div className="mb-1">
                    <span className="text-lg font-medium text-slate-500">$</span><span className="text-3xl font-bold text-slate-50">{annual ? '79' : '85'}</span><span className="text-sm font-medium text-slate-600">/mo</span>
                  </div>
                  <div className="text-slate-500">Everything at your fingertips.</div>
                </div>
                <div className="pb-4 border-b border-slate-800">
                  <a className="w-full btn-sm text-slate-900 bg-gradient-to-r from-white/80 via-white to-white/80 hover:bg-white transition duration-150 ease-in-out group" href="#0">
                    Get Started <span className="tracking-normal text-revocalize-500 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-1">-&gt;</span>
                  </a>
                </div>
              </div>
              { /* # Usage */}
              <div className="flex flex-col justify-end px-6">
                <div className="py-2 mt-4 font-medium text-slate-50">Usage</div>
              </div>
              <div className="flex flex-col justify-end px-6">
                <div className="py-2 mt-4 font-medium text-slate-50 md:hidden">Usage</div>
              </div>
              <div className="flex flex-col justify-end px-6">
                <div className="py-2 mt-4 font-medium text-slate-50 md:hidden">Usage</div>
              </div>
              <div className="flex flex-col justify-end px-6">
                <div className="py-2 mt-4 font-medium text-slate-50 md:hidden">Usage</div>
              </div>
              { /* Social Connections */}
              <div className="flex flex-col justify-end px-6">
                <div className="py-2 border-b text-slate-400 border-slate-800">Social Connections</div>
              </div>
              <div className="flex flex-col justify-end px-6">
                <div className="flex items-center h-full py-2 border-b border-slate-800 text-slate-400">
                  <svg className="mr-3 shrink-0 fill-revocalize-500" xmlns="http://www.w3.org/2000/svg" width="12" height="9">
                    <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
                  </svg>
                  <span>100 <span className="md:hidden">Social Connections</span></span>
                </div>
              </div>
              <div className="flex flex-col justify-end px-6">
                <div className="flex items-center h-full py-2 border-b border-slate-800 text-slate-400">
                  <svg className="mr-3 shrink-0 fill-revocalize-500" xmlns="http://www.w3.org/2000/svg" width="12" height="9">
                    <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
                  </svg>
                  <span>250 <span className="md:hidden">Social Connections</span></span>
                </div>
              </div>
              <div className="flex flex-col justify-end px-6">
                <div className="flex items-center h-full py-2 border-b border-slate-800 text-slate-400">
                  <svg className="mr-3 shrink-0 fill-revocalize-500" xmlns="http://www.w3.org/2000/svg" width="12" height="9">
                    <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
                  </svg>
                  <span>Unlimited <span className="md:hidden">Social Connections</span></span>
                </div>
              </div>
              { /* Custom Domains */}
              <div className="flex flex-col justify-end px-6">
                <div className="py-2 border-b text-slate-400 border-slate-800">Custom Domains</div>
              </div>
              <div className="flex flex-col justify-end px-6">
                <div className="flex items-center h-full py-2 border-b border-slate-800 text-slate-400">
                  <svg className="mr-3 shrink-0 fill-revocalize-500" xmlns="http://www.w3.org/2000/svg" width="12" height="9">
                    <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
                  </svg>
                  <span>4 <span className="md:hidden">Custom Domains</span></span>
                </div>
              </div>
              <div className="flex flex-col justify-end px-6">
                <div className="flex items-center h-full py-2 border-b border-slate-800 text-slate-400">
                  <svg className="mr-3 shrink-0 fill-revocalize-500" xmlns="http://www.w3.org/2000/svg" width="12" height="9">
                    <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
                  </svg>
                  <span>Unlimited <span className="md:hidden">Custom Domains</span></span>
                </div>
              </div>
              <div className="flex flex-col justify-end px-6">
                <div className="flex items-center h-full py-2 border-b border-slate-800 text-slate-400">
                  <svg className="mr-3 shrink-0 fill-revocalize-500" xmlns="http://www.w3.org/2000/svg" width="12" height="9">
                    <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
                  </svg>
                  <span>Unlimited <span className="md:hidden">Custom Domains</span></span>
                </div>
              </div>
              { /* User Role Management */}
              <div className="flex flex-col justify-end px-6">
                <div className="py-2 border-b text-slate-400 border-slate-800">User Role Management</div>
              </div>
              <div className="flex flex-col justify-end px-6">
                <div className="flex items-center h-full py-2 border-b border-slate-800 text-slate-400">
                  <svg className="mr-3 shrink-0 fill-revocalize-500" xmlns="http://www.w3.org/2000/svg" width="12" height="9">
                    <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
                  </svg>
                  <span>Unlimited <span className="md:hidden">User Role Management</span></span>
                </div>
              </div>
              <div className="flex flex-col justify-end px-6">
                <div className="flex items-center h-full py-2 border-b border-slate-800 text-slate-400">
                  <svg className="mr-3 shrink-0 fill-revocalize-500" xmlns="http://www.w3.org/2000/svg" width="12" height="9">
                    <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
                  </svg>
                  <span>Unlimited <span className="md:hidden">User Role Management</span></span>
                </div>
              </div>
              <div className="flex flex-col justify-end px-6">
                <div className="flex items-center h-full py-2 border-b border-slate-800 text-slate-400">
                  <svg className="mr-3 shrink-0 fill-revocalize-500" xmlns="http://www.w3.org/2000/svg" width="12" height="9">
                    <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
                  </svg>
                  <span>Unlimited <span className="md:hidden">User Role Management</span></span>
                </div>
              </div>
              { /* External Databases */}
              <div className="flex flex-col justify-end px-6">
                <div className="py-2 border-b text-slate-400 border-slate-800">External Databases</div>
              </div>
              <div className="flex flex-col justify-end px-6">
                <div className="flex items-center h-full py-2 border-b border-slate-800 text-slate-400">
                  <svg className="mr-3 shrink-0 fill-revocalize-500" xmlns="http://www.w3.org/2000/svg" width="12" height="9">
                    <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
                  </svg>
                  <span>1 <span className="md:hidden">External Databases</span></span>
                </div>
              </div>
              <div className="flex flex-col justify-end px-6">
                <div className="flex items-center h-full py-2 border-b border-slate-800 text-slate-400">
                  <svg className="mr-3 shrink-0 fill-revocalize-500" xmlns="http://www.w3.org/2000/svg" width="12" height="9">
                    <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
                  </svg>
                  <span>5 <span className="md:hidden">External Databases</span></span>
                </div>
              </div>
              <div className="flex flex-col justify-end px-6">
                <div className="flex items-center h-full py-2 border-b border-slate-800 text-slate-400">
                  <svg className="mr-3 shrink-0 fill-revocalize-500" xmlns="http://www.w3.org/2000/svg" width="12" height="9">
                    <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
                  </svg>
                  <span>Unlimited <span className="md:hidden">External Databases</span></span>
                </div>
              </div>
              { /* # Features */}
              <div className="flex flex-col justify-end px-6">
                <div className="py-2 mt-4 font-medium text-slate-50">Features</div>
              </div>
              <div className="flex flex-col justify-end px-6">
                <div className="py-2 mt-4 font-medium text-slate-50 md:hidden">Features</div>
              </div>
              <div className="flex flex-col justify-end px-6">
                <div className="py-2 mt-4 font-medium text-slate-50 md:hidden">Features</div>
              </div>
              <div className="flex flex-col justify-end px-6">
                <div className="py-2 mt-4 font-medium text-slate-50 md:hidden">Features</div>
              </div>
              { /* Custom Connection */}
              <div className="flex flex-col justify-end px-6">
                <div className="py-2 border-b text-slate-400 border-slate-800">Custom Connection</div>
              </div>
              <div className="flex flex-col justify-end px-6">
                <div className="flex items-center h-full py-2 border-b border-slate-800 text-slate-400">
                  <svg className="mr-3 shrink-0 fill-revocalize-500" xmlns="http://www.w3.org/2000/svg" width="12" height="9">
                    <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
                  </svg>
                  <span><span className="md:hidden">Custom Connection</span></span>
                </div>
              </div>
              <div className="flex flex-col justify-end px-6">
                <div className="flex items-center h-full py-2 border-b border-slate-800 text-slate-400">
                  <svg className="mr-3 shrink-0 fill-revocalize-500" xmlns="http://www.w3.org/2000/svg" width="12" height="9">
                    <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
                  </svg>
                  <span><span className="md:hidden">Custom Connection</span></span>
                </div>
              </div>
              <div className="flex flex-col justify-end px-6">
                <div className="flex items-center h-full py-2 border-b border-slate-800 text-slate-400">
                  <svg className="mr-3 shrink-0 fill-revocalize-500" xmlns="http://www.w3.org/2000/svg" width="12" height="9">
                    <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
                  </svg>
                  <span><span className="md:hidden">Custom Connection</span></span>
                </div>
              </div>
              { /* Advanced Deployment Options */}
              <div className="flex flex-col justify-end px-6">
                <div className="py-2 border-b text-slate-400 border-slate-800">Advanced Deployment Options</div>
              </div>
              <div className="flex flex-col justify-end px-6">
                <div className="flex items-center h-full py-2 border-b border-slate-800 text-slate-400">
                  <svg className="mr-3 shrink-0 fill-revocalize-500" xmlns="http://www.w3.org/2000/svg" width="12" height="9">
                    <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
                  </svg>
                  <span><span className="md:hidden">Advanced Deployment Options</span></span>
                </div>
              </div>
              <div className="flex flex-col justify-end px-6">
                <div className="flex items-center h-full py-2 border-b border-slate-800 text-slate-400">
                  <svg className="mr-3 shrink-0 fill-revocalize-500" xmlns="http://www.w3.org/2000/svg" width="12" height="9">
                    <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
                  </svg>
                  <span><span className="md:hidden">Advanced Deployment Options</span></span>
                </div>
              </div>
              <div className="flex flex-col justify-end px-6">
                <div className="flex items-center h-full py-2 border-b border-slate-800 text-slate-400">
                  <svg className="mr-3 shrink-0 fill-revocalize-500" xmlns="http://www.w3.org/2000/svg" width="12" height="9">
                    <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
                  </svg>
                  <span><span className="md:hidden">Advanced Deployment Options</span></span>
                </div>
              </div>
              { /* Extra Add-ons */}
              <div className="flex flex-col justify-end px-6">
                <div className="py-2 border-b text-slate-400 border-slate-800">Extra Add-ons</div>
              </div>
              <div className="flex flex-col justify-end px-6">
                <div className="flex items-center h-full py-2 border-b border-slate-800 text-slate-400">
                  <svg className="mr-3 shrink-0 fill-revocalize-500" xmlns="http://www.w3.org/2000/svg" width="12" height="9">
                    <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
                  </svg>
                  <span><span className="md:hidden">Extra Add-ons</span></span>
                </div>
              </div>
              <div className="flex flex-col justify-end px-6">
                <div className="flex items-center h-full py-2 border-b border-slate-800 text-slate-400">
                  <svg className="mr-3 shrink-0 fill-revocalize-500" xmlns="http://www.w3.org/2000/svg" width="12" height="9">
                    <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
                  </svg>
                  <span><span className="md:hidden">Extra Add-ons</span></span>
                </div>
              </div>
              <div className="flex flex-col justify-end px-6">
                <div className="flex items-center h-full py-2 border-b border-slate-800 text-slate-400">
                  <svg className="mr-3 shrink-0 fill-revocalize-500" xmlns="http://www.w3.org/2000/svg" width="12" height="9">
                    <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
                  </svg>
                  <span><span className="md:hidden">Extra Add-ons</span></span>
                </div>
              </div>
              { /* Admin Roles */}
              <div className="flex flex-col justify-end px-6">
                <div className="py-2 border-b text-slate-400 border-slate-800">Admin Roles</div>
              </div>
              <div className="flex flex-col justify-end px-6">
                <div className="flex items-center py-2 border-b border-slate-800 text-slate-400 max-md:hidden">
                  <span><span className="md:hidden">Admin Roles</span></span>
                </div>
              </div>
              <div className="flex flex-col justify-end px-6">
                <div className="flex items-center py-2 border-b border-slate-800 text-slate-400 max-md:hidden">
                  <span><span className="md:hidden">Admin Roles</span></span>
                </div>
              </div>
              <div className="flex flex-col justify-end px-6">
                <div className="flex items-center h-full py-2 border-b border-slate-800 text-slate-400">
                  <svg className="mr-3 shrink-0 fill-revocalize-500" xmlns="http://www.w3.org/2000/svg" width="12" height="9">
                    <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
                  </svg>
                  <span><span className="md:hidden">Admin Roles</span></span>
                </div>
              </div>
              { /* Deploy and Monitor */}
              <div className="flex flex-col justify-end px-6">
                <div className="py-2 border-b text-slate-400 border-slate-800">Deploy and Monitor</div>
              </div>
              <div className="flex flex-col justify-end px-6">
                <div className="flex items-center py-2 border-b border-slate-800 text-slate-400 max-md:hidden">
                  <span><span className="md:hidden">Deploy and Monitor</span></span>
                </div>
              </div>
              <div className="flex flex-col justify-end px-6">
                <div className="flex items-center py-2 border-b border-slate-800 text-slate-400 max-md:hidden">
                  <span><span className="md:hidden">Deploy and Monitor</span></span>
                </div>
              </div>
              <div className="flex flex-col justify-end px-6">
                <div className="flex items-center h-full py-2 border-b border-slate-800 text-slate-400">
                  <svg className="mr-3 shrink-0 fill-revocalize-500" xmlns="http://www.w3.org/2000/svg" width="12" height="9">
                    <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
                  </svg>
                  <span><span className="md:hidden">Deploy and Monitor</span></span>
                </div>
              </div>
              { /* Enterprise Add-ons */}
              <div className="flex flex-col justify-end px-6">
                <div className="py-2 border-b text-slate-400 border-slate-800">Enterprise Add-ons</div>
              </div>
              <div className="flex flex-col justify-end px-6">
                <div className="flex items-center py-2 border-b border-slate-800 text-slate-400 max-md:hidden">
                  <span><span className="md:hidden">Enterprise Add-ons</span></span>
                </div>
              </div>
              <div className="flex flex-col justify-end px-6">
                <div className="flex items-center py-2 border-b border-slate-800 text-slate-400 max-md:hidden">
                  <span><span className="md:hidden">Enterprise Add-ons</span></span>
                </div>
              </div>
              <div className="flex flex-col justify-end px-6">
                <div className="flex items-center h-full py-2 border-b border-slate-800 text-slate-400">
                  <svg className="mr-3 shrink-0 fill-revocalize-500" xmlns="http://www.w3.org/2000/svg" width="12" height="9">
                    <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
                  </svg>
                  <span><span className="md:hidden">Enterprise Add-ons</span></span>
                </div>
              </div>
              { /* # Support */}
              <div className="flex flex-col justify-end px-6">
                <div className="py-2 mt-4 font-medium text-slate-50">Support</div>
              </div>
              <div className="flex flex-col justify-end px-6">
                <div className="hidden py-2 mt-4 font-medium text-slate-50">Support</div>
              </div>
              <div className="flex flex-col justify-end px-6">
                <div className="py-2 mt-4 font-medium text-slate-50 md:hidden">Support</div>
              </div>
              <div className="flex flex-col justify-end px-6">
                <div className="py-2 mt-4 font-medium text-slate-50 md:hidden">Support</div>
              </div>
              { /* Premium Support */}
              <div className="flex flex-col justify-end px-6">
                <div className="py-2 border-b text-slate-400 border-slate-800">Premium Support</div>
              </div>
              <div className="flex flex-col justify-end px-6">
                <div className="flex items-center py-2 border-b border-slate-800 text-slate-400 max-md:hidden">
                  <span><span className="md:hidden">Premium Support</span></span>
                </div>
              </div>
              <div className="flex flex-col justify-end px-6">
                <div className="flex items-center h-full py-2 border-b border-slate-800 text-slate-400">
                  <svg className="mr-3 shrink-0 fill-revocalize-500" xmlns="http://www.w3.org/2000/svg" width="12" height="9">
                    <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
                  </svg>
                  <span><span className="md:hidden">Premium Support</span></span>
                </div>
              </div>
              <div className="flex flex-col justify-end px-6">
                <div className="flex items-center h-full py-2 border-b border-slate-800 text-slate-400">
                  <svg className="mr-3 shrink-0 fill-revocalize-500" xmlns="http://www.w3.org/2000/svg" width="12" height="9">
                    <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
                  </svg>
                  <span><span className="md:hidden">Premium Support</span></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}