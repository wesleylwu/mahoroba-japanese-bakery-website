"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import NavbarLinks from "@/data/NavbarLinks";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { CgProfile } from "react-icons/cg";
import { HiOutlineShoppingCart, HiMenuAlt3 } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import Logo from "@/public/Logo.svg";

const hoverScale = {
  whileHover: { scale: 1.05 },
  transition: { duration: 0.2 },
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const handleClick = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const middleLinks = NavbarLinks.filter(
    (item) =>
      item.text !== "login" && item.text !== "cart" && item.text !== "contact",
  );

  return (
    <div className="font-bakery-quicksand bg-black text-white">
      <div className="hidden items-center justify-between border-b py-6 md:flex md:px-12 lg:px-20 xl:px-24 2xl:px-40">
        <motion.div {...hoverScale} className="w-1/4">
          <Link href="/" className="flex items-center">
            <Image src={Logo} alt="Mahoroba Logo" priority />
          </Link>
        </motion.div>

        <div className="flex w-2/4 justify-evenly text-lg tracking-wide uppercase">
          {middleLinks.map(({ link, text }, index) => {
            const isActive = pathname === `/${link}`;
            return (
              <motion.div key={index} {...hoverScale}>
                <Link
                  href={`/${link}`}
                  className={`transition-colors ${
                    isActive
                      ? "text-bakery-red border-bakery-red border-b-2 pb-1 font-bold"
                      : "text-white"
                  }`}
                >
                  {text}
                </Link>
              </motion.div>
            );
          })}
        </div>

        <div className="flex w-1/4 justify-end gap-8 text-3xl">
          <motion.div {...hoverScale}>
            <Link
              href="/login"
              className={`transition-colors ${
                pathname === "/login" ? "text-bakery-red" : "text-white"
              }`}
            >
              <CgProfile />
            </Link>
          </motion.div>
          <motion.div {...hoverScale}>
            <Link
              href="/cart"
              className={`transition-colors ${
                pathname === "/cart" ? "text-bakery-red" : "text-white"
              }`}
            >
              <HiOutlineShoppingCart />
            </Link>
          </motion.div>
        </div>
      </div>

      <div className="md:hidden">
        <div className="flex items-center justify-between border-b px-6 py-4">
          <motion.div {...hoverScale}>
            <Link href="/" onClick={closeMenu}>
              <Image src={Logo} alt="Mahoroba Logo" />
            </Link>
          </motion.div>

          <motion.div
            onClick={handleClick}
            className="text-white hover:cursor-pointer"
            {...hoverScale}
          >
            {isOpen ? <IoClose size={36} /> : <HiMenuAlt3 size={36} />}
          </motion.div>
        </div>

        <motion.div
          initial={{ height: 0 }}
          animate={{ height: isOpen ? "auto" : 0 }}
          className="overflow-hidden bg-black"
        >
          <div className="flex flex-col items-center gap-6 py-8">
            {middleLinks.map(({ link, text }, index) => {
              const isActive = pathname === `/${link}`;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isOpen ? 1 : 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={`/${link}`}
                    onClick={closeMenu}
                    className={`text-xl tracking-wide uppercase ${
                      isActive
                        ? "text-bakery-red border-bakery-red border-b-2 pb-1 font-bold"
                        : "text-white"
                    }`}
                  >
                    {text}
                  </Link>
                </motion.div>
              );
            })}

            <div className="flex gap-10 pt-6">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: isOpen ? 1 : 0 }}
                transition={{ delay: middleLinks.length * 0.1 }}
              >
                <Link
                  href="/login"
                  onClick={closeMenu}
                  className={`text-4xl ${
                    pathname === "/login" ? "text-bakery-red" : "text-white"
                  }`}
                >
                  <CgProfile />
                </Link>
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: isOpen ? 1 : 0 }}
                transition={{ delay: (middleLinks.length + 1) * 0.1 }}
              >
                <Link
                  href="/cart"
                  onClick={closeMenu}
                  className={`text-4xl ${
                    pathname === "/cart" ? "text-bakery-red" : "text-white"
                  }`}
                >
                  <HiOutlineShoppingCart />
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Navbar;
