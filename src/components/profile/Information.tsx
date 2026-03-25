"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { FcGoogle } from "react-icons/fc";

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

  // Simulates receiving data back from a Google Auth provider
  const handleGoogleLogin = () => {
    setUser({
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@gmail.com",
      phone: "", // Phone is usually left blank for the user to fill out
    });
    setIsLoggedIn(true);
  };

  const handleSignOut = () => {
    setUser({ firstName: "", lastName: "", email: "", phone: "" });
    setIsLoggedIn(false);
  };

  if (!isLoggedIn) {
    return (
      <div className="bg-bakery-cream flex h-screen w-screen items-center justify-center p-4">
        <motion.div {...fadeUp} className="w-full max-w-md">
          <div className="border-bakery-gray flex flex-col gap-6 rounded-3xl border bg-white p-8 shadow-xl">
            <div className="mb-4 text-center">
              <h2 className="font-bakery-noto mb-2 text-2xl font-bold text-black">
                Welcome Back
              </h2>
              <p className="text-black/60">Sign in to manage your orders</p>
            </div>

            <button
              onClick={handleGoogleLogin}
              className="border-bakery-gray flex cursor-pointer items-center justify-center gap-3 rounded-xl border-2 bg-white py-4 text-xl font-bold text-black transition-all hover:bg-gray-50"
            >
              <FcGoogle size={28} />
              Continue with Google
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-bakery-cream flex min-h-screen w-screen flex-col items-center justify-center px-4 py-12">
      <motion.div {...fadeUp} className="w-full max-w-2xl">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-3">
            <label className="font-bakery-noto text-lg font-bold text-black">
              First Name
            </label>
            <input
              type="text"
              placeholder="First Name"
              value={user.firstName}
              onChange={(e) => setUser({ ...user, firstName: e.target.value })}
              className="border-bakery-gray focus:border-bakery-olive rounded-xl border-2 bg-white px-4 py-4 text-lg text-black transition-colors outline-none"
            />
          </div>

          <div className="flex flex-col gap-3">
            <label className="font-bakery-noto text-lg font-bold text-black">
              Last Name
            </label>
            <input
              type="text"
              placeholder="Last Name"
              value={user.lastName}
              onChange={(e) => setUser({ ...user, lastName: e.target.value })}
              className="border-bakery-gray focus:border-bakery-olive rounded-xl border-2 bg-white px-4 py-4 text-lg text-black transition-colors outline-none"
            />
          </div>

          <div className="flex flex-col gap-3">
            <label className="font-bakery-noto text-lg font-bold text-black">
              Email{" "}
              <span className="text-sm font-normal text-black/50">
                (Linked to Google)
              </span>
            </label>
            <input
              type="email"
              disabled
              value={user.email}
              className="border-bakery-gray cursor-not-allowed rounded-xl border-2 bg-gray-100 px-4 py-4 text-lg text-black/60 outline-none"
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
              className="border-bakery-gray focus:border-bakery-olive rounded-xl border-2 bg-white px-4 py-4 text-lg text-black transition-colors outline-none"
            />
          </div>

          <div className="flex flex-col gap-6 pt-8 md:flex-row">
            <button className="bg-bakery-olive hover:bg-bakery-olive/90 flex-1 cursor-pointer rounded-xl py-4 text-lg font-bold text-white shadow-lg transition-all">
              Save Changes
            </button>
            <button
              onClick={handleSignOut}
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
