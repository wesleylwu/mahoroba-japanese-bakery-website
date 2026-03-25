"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import NavbarLinks from "@/src/data/NavbarLinks";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { CgProfile } from "react-icons/cg";
import { HiOutlineShoppingCart, HiMenuAlt3 } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import Logo from "@/public/Logo.svg";
import Cart, { CartItemType } from "@/src/components/Cart";
import StrawberryAnko from "@/public/menu/StrawberryAnko.webp";
import Sunrise from "@/public/menu/Sunrise.webp";

const hoverScale = {
  whileHover: { scale: 1.05 },
  transition: { duration: 0.2 },
};

const MOCK_CART_ITEMS: CartItemType[] = [
  {
    id: "mock-1",
    title: "Strawberry Anko",
    description:
      "Soft Japanese bread filled with sweet red bean paste and fresh strawberry flavor.",
    price: "3.50",
    category: "sweet",
    image: StrawberryAnko,
    quantity: 2,
  },
  {
    id: "mock-2",
    title: "Sunrise",
    description:
      "Classic Japanese melon pan with a crisp cookie crust and fluffy interior.",
    price: "3.25",
    category: "loaves & rolls",
    image: Sunrise,
    quantity: 1,
  },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const [cartItems, setCartItems] = useState<CartItemType[]>(MOCK_CART_ITEMS);

  const pathname = usePathname();

  const handleClick = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const middleLinks = NavbarLinks.filter(
    (item) =>
      item.text !== "profile" &&
      item.text !== "cart" &&
      item.text !== "contact",
  );

  const handleUpdateQuantity = (id: string, newQuantity: number) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item,
      ),
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  return (
    <div className="font-bakery-quicksand bg-black text-white">
      <div className="hidden items-center justify-between border-b py-6 md:flex md:px-12 lg:px-20 xl:px-24 2xl:px-40">
        <div className="w-1/4">
          <Link href="/" className="flex items-center">
            <Image src={Logo} alt="Mahoroba Logo" priority />
          </Link>
        </div>

        <div className="flex w-2/4 justify-evenly text-lg tracking-wide uppercase">
          {middleLinks.map(({ link, text }, index) => {
            const isActive =
              pathname === `/${link}` || pathname.startsWith(`/${link}/`);

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
              href="/profile"
              className={`transition-colors ${
                pathname === "/profile" ? "text-bakery-red" : "text-white"
              }`}
            >
              <CgProfile />
            </Link>
          </motion.div>
          <motion.div {...hoverScale}>
            <button
              onClick={() => setIsCartOpen(true)}
              className={`flex cursor-pointer items-center transition-colors ${
                pathname === "/checkout" ? "text-bakery-red" : "text-white"
              }`}
            >
              <HiOutlineShoppingCart />
            </button>
          </motion.div>
        </div>
      </div>

      <div className="md:hidden">
        <div className="flex items-center justify-between border-b px-6 py-4">
          <div>
            <Link href="/" onClick={closeMenu}>
              <Image src={Logo} alt="Mahoroba Logo" />
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <motion.div
              onClick={handleClick}
              className="text-white hover:cursor-pointer"
              {...hoverScale}
            >
              {isOpen ? <IoClose size={36} /> : <HiMenuAlt3 size={36} />}
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ height: 0 }}
          animate={{ height: isOpen ? "auto" : 0 }}
          className="overflow-hidden bg-black"
        >
          <div className="flex flex-col items-center gap-6 py-8">
            {middleLinks.map(({ link, text }, index) => {
              const isActive =
                pathname === `/${link}` || pathname.startsWith(`/${link}/`);

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
                  href="/profile"
                  onClick={closeMenu}
                  className={`text-4xl ${
                    pathname === "/profile" ? "text-bakery-red" : "text-white"
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
                <motion.div {...hoverScale}>
                  <button
                    onClick={() => {
                      closeMenu();
                      setIsCartOpen(true);
                    }}
                    className={`flex cursor-pointer items-center text-4xl transition-colors ${
                      pathname === "/checkout"
                        ? "text-bakery-red"
                        : "text-white"
                    }`}
                  >
                    <HiOutlineShoppingCart />
                  </button>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
      />
    </div>
  );
};

export default Navbar;
