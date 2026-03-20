import Image from "next/image";
import Logo from "@/public/Logo.svg";

const Footer = () => {
  return (
    <>
      {" "}
      <div className="h-1 w-screen bg-black" />
      <footer className="bg-bakery-burgundy font-bakery-quicksand py-4 text-white">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row md:px-12 lg:px-20 xl:px-24 2xl:px-40">
          <div className="flex w-full justify-center md:w-1/3 md:justify-start">
            <Image src={Logo} alt="Mahoroba Logo" />
          </div>

          <div className="flex w-full justify-center text-center text-sm tracking-wide text-white md:w-1/3 md:text-base">
            © 2026 Mahoroba Japanese Bakery.
            <br className="md:hidden" /> All rights reserved.
          </div>

          <div className="flex w-full justify-center text-center md:w-1/3 md:justify-end md:text-right">
            <div className="flex flex-col items-center gap-1 text-base tracking-wide md:items-end">
              <p className="mb-2 w-fit border-b border-white pb-1 font-bold uppercase">
                Contact
              </p>
              <p>(916) 454-1879</p>
              <p>usamahoroba@gmail.com</p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
