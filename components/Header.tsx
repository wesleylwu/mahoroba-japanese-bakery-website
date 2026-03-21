"use client";

type HeaderProps = {
  children: React.ReactNode;
};

const Header = ({ children }: HeaderProps) => {
  return (
    <div className="font-bakery-noto bg-bakery-burgundy flex flex-col items-center justify-center p-10 text-center text-2xl leading-normal font-bold tracking-wide text-white sm:text-3xl md:text-4xl md:leading-relaxed md:tracking-wider lg:text-5xl xl:text-6xl xl:leading-loose xl:tracking-widest 2xl:text-7xl">
      {children}
    </div>
  );
};

export default Header;
