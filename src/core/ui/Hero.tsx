const Hero: React.FCC = ({ children, className }) => {
  return (
    <h1
      className={`my-2 text-3xl font-medium lg:leading-tight
        tracking-tight dark:text-white
        sm:my-6 md:leading-none lg:text-4xl ${className}`}
    >
      {children}
    </h1>
  );
};

export default Hero;
