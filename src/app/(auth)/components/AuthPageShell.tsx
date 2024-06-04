import Logo from '~/core/ui/Logo';
import SlideUpTransition from '~/core/ui/SlideUpTransition';
import I18nProvider from '~/i18n/I18nProvider';

function AuthPageShell({
  children,
  language,
}: React.PropsWithChildren<{
  language?: string;
}>) {
  return (
    <SlideUpTransition>
      <div className="fixed top-[-428px] w-[534px] h-[534px] mx-auto left-0 right-0 z-0 hover:saturate-[1.4] transition-all duration-300 ease-in-out"
       style={{backgroundImage: "linear-gradient(223.6deg, rgb(1, 240, 255) 8.21%, rgb(127, 184, 239) 38.98%, rgb(209, 41, 241) 68.31%, rgb(29, 29, 41) 112.47%)", filter: "blur(136px)"}}></div>
      <div className={`flex h-screen flex-col items-center justify-center space-y-4 md:space-y-8 lg:bg-gray-50 dark:bg-[#0a0118]`}>
        <div className={`font-sans flex w-full relative z-10 max-w-sm flex-col items-center space-y-4 rounded-lg border-transparent px-2 py-10 md:w-8/12 md:px-8 md:py-7 lg:w-5/12 lg:px-7 xl:w-4/12 2xl:w-3/12`}>
          <Logo />
          <I18nProvider lang={language}>{children}</I18nProvider>
        </div>
      </div>
    </SlideUpTransition>
  );
}

export default AuthPageShell;
