"use client";

type HeaderProps = {
  children: React.ReactNode;
};

const Header = ({ children }: HeaderProps) => {
  return (
    <>
      <div className="font-bakery-noto bg-bakery-burgundy flex flex-col items-center justify-center px-6 py-10 text-center text-2xl font-bold tracking-wider text-white sm:text-3xl md:py-14 md:text-4xl">
        {children}
      </div>
      <div className="h-1 w-screen bg-black" />
    </>
  );
};

export default Header;
