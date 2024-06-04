'use client';

// import { Transition } from '@headlessui/react';

function SlideUpTransition(props: React.PropsWithChildren) {
  return (
    <div style={{
      "perspective": "100vw"
    }}>
      {props.children}
    </div>
    // <Transition
    //   show
    //   appear
    //   enter={'transition-all duration-500 ease-in-out'}
    //   enterFrom={'opacity-0 translate-y-4'}
    //   enterTo={'opacity-100 translate-y-0'}
    //   style={{
    //     "perspective": "100vw"
    //   }}
    // >
    //   {props.children}
    // </Transition>
  );
}

export default SlideUpTransition;
