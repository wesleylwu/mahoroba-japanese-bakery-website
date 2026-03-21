"use client";

import { useState } from "react";
import { motion } from "motion/react";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut" as const },
};

const ProfilePage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  if (!isLoggedIn) {
    return (
      <div className="bg-bakery-cream flex h-screen w-screen items-center justify-center p-4">
        <motion.div {...fadeUp} className="w-full max-w-md">
          <div className="flex flex-col gap-6">
            <button
              onClick={() => setIsLoggedIn(true)}
              className="bg-bakery-olive hover:bg-opacity-90 cursor-pointer rounded-xl py-4 text-xl font-bold text-white shadow-lg transition-all"
            >
              Login
            </button>
            <button className="border-bakery-olive text-bakery-olive hover:bg-bakery-olive cursor-pointer rounded-xl border-2 py-4 text-xl font-bold transition-all hover:text-white">
              Create Account
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-bakery-cream flex h-screen w-screen flex-col items-center justify-center px-4">
      <motion.div {...fadeUp} className="w-full max-w-2xl">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-3">
            <label className="font-bakery-noto text-lg font-bold text-black">
              First Name
            </label>
            <input
              type="text"
              placeholder="John"
              value={user.firstName}
              onChange={(e) => setUser({ ...user, firstName: e.target.value })}
              className="border-bakery-gray rounded-xl border-2 bg-white px-4 py-4 text-lg text-black outline-none"
            />
          </div>

          <div className="flex flex-col gap-3">
            <label className="font-bakery-noto text-lg font-bold text-black">
              Last Name
            </label>
            <input
              type="text"
              placeholder="Doe"
              value={user.lastName}
              onChange={(e) => setUser({ ...user, lastName: e.target.value })}
              className="border-bakery-gray rounded-xl border-2 bg-white px-4 py-4 text-lg text-black outline-none"
            />
          </div>

          <div className="flex flex-col gap-3">
            <label className="font-bakery-noto text-lg font-bold text-black">
              Email
            </label>
            <input
              type="email"
              placeholder="username@example.com"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              className="border-bakery-gray rounded-xl border-2 bg-white px-4 py-4 text-lg text-black outline-none"
            />
          </div>

          <div className="flex flex-col gap-3">
            <label className="font-bakery-noto text-lg font-bold text-black">
              Phone Number
            </label>
            <input
              type="tel"
              placeholder="555 555 5555"
              value={user.phone}
              onChange={(e) => setUser({ ...user, phone: e.target.value })}
              className="border-bakery-gray rounded-xl border-2 bg-white px-4 py-4 text-lg text-black outline-none"
            />
          </div>

          <div className="flex flex-col gap-6 pt-8 md:flex-row">
            <button className="bg-bakery-olive hover:bg-opacity-90 flex-1 cursor-pointer rounded-xl py-4 text-lg font-bold text-white shadow-lg transition-all">
              Save Changes
            </button>
            <button
              onClick={() => setIsLoggedIn(false)}
              className="border-bakery-olive text-bakery-olive hover:bg-bakery-olive flex-1 cursor-pointer rounded-xl border-2 py-4 text-lg font-bold transition-all hover:text-white"
            >
              Sign Out
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProfilePage;
