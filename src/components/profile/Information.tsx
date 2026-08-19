"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { FcGoogle } from "react-icons/fc";
import { useSession, signIn, signOut } from "next-auth/react";
import { Session } from "next-auth";
import { toast } from "react-toastify";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { formatPhoneNumber, isValidPhoneNumber } from "@/utils/phone";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut" as const },
};

const ProfileForm = ({ session }: { session: Session | null }) => {
  const queryClient = useQueryClient();
  const isAdmin = session?.user?.isAdmin ?? false;

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: session?.user?.email || "",
    phone: "",
  });

  const [isSaving, setIsSaving] = useState(false);

  const { data: profileData, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const res = await fetch("/api/profile");
      if (!res.ok) throw new Error("Failed to fetch profile");
      return res.json();
    },
  });

  useEffect(() => {
    if (profileData) {
      setUser({
        firstName: profileData.firstName || "",
        lastName: profileData.lastName || "",
        email: profileData.email || session?.user?.email || "",
        phone: formatPhoneNumber(profileData.phone || ""),
      });
    }
  }, [profileData, session]);

  const handleSaveChanges = async (e: React.FormEvent) => {
    e.preventDefault();

    if (user.phone && !isValidPhoneNumber(user.phone)) {
      toast.error("Please enter a valid 10-digit phone number.");
      return;
    }

    setIsSaving(true);

    try {
      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: user.firstName,
          lastName: user.lastName,
          phone: user.phone,
          email: user.email || session?.user?.email,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Profile updated successfully!");
        queryClient.invalidateQueries({ queryKey: ["profile"] });
      } else {
        toast.error(data.message || "Failed to update profile.");
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred while saving.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSaveChanges} className="flex flex-col gap-8">
      <div className="border-bakery-gray flex items-center justify-between border-b pb-4">
        <div>
          <p className="font-bakery-noto text-xl font-bold text-black">
            Account Status
          </p>
          <p className="text-sm font-normal text-black/50">
            {isAdmin ? "Administrator Privileges" : "Standard Customer"}
          </p>
        </div>
        <span
          className={`font-bakery-noto rounded-full px-4 py-1.5 text-sm font-bold tracking-wider uppercase ${
            isAdmin
              ? "bg-bakery-burgundy text-white"
              : "bg-bakery-gray text-black/70"
          }`}
        >
          {isAdmin ? "Admin" : "Customer"}
        </span>
      </div>

      {isAdmin && (
        <Link
          href="/menu"
          className="bg-bakery-burgundy hover:bg-bakery-burgundy/90 font-bakery-noto flex items-center justify-center gap-2 rounded-xl py-4 text-base font-bold text-white shadow-md transition-all"
        >
          Manage & Add Products (Menu)
        </Link>
      )}

      <div className="flex flex-col gap-3">
        <p className="font-bakery-noto text-base font-bold text-black md:text-lg">
          First Name
        </p>
        <input
          type="text"
          placeholder="First Name"
          value={user.firstName}
          onChange={(e) => setUser({ ...user, firstName: e.target.value })}
          className="border-bakery-gray focus:border-bakery-olive rounded-xl border-2 bg-white px-4 py-3.5 text-base text-black transition-colors outline-none md:text-lg"
        />
      </div>

      <div className="flex flex-col gap-3">
        <p className="font-bakery-noto text-base font-bold text-black md:text-lg">
          Last Name
        </p>
        <input
          type="text"
          placeholder="Last Name"
          value={user.lastName}
          onChange={(e) => setUser({ ...user, lastName: e.target.value })}
          className="border-bakery-gray focus:border-bakery-olive rounded-xl border-2 bg-white px-4 py-3.5 text-base text-black transition-colors outline-none md:text-lg"
        />
      </div>

      <div className="flex flex-col gap-3">
        <div className="font-bakery-noto flex items-center justify-between text-base font-bold text-black md:text-lg">
          <p>Email</p>
          <span className="text-xs font-normal text-black/50">
            (Linked to Google)
          </span>
        </div>
        <input
          type="email"
          disabled
          value={user.email}
          className="border-bakery-gray bg-bakery-gray/40 cursor-not-allowed rounded-xl border-2 px-4 py-3.5 text-base text-black/60 outline-none md:text-lg"
        />
      </div>

      <div className="flex flex-col gap-3">
        <p className="font-bakery-noto text-base font-bold text-black md:text-lg">
          Phone Number
        </p>
        <input
          type="tel"
          placeholder="(555) 555-5555"
          value={user.phone}
          onChange={(e) =>
            setUser({ ...user, phone: formatPhoneNumber(e.target.value) })
          }
          className="border-bakery-gray focus:border-bakery-olive rounded-xl border-2 bg-white px-4 py-3.5 text-base text-black transition-colors outline-none md:text-lg"
        />
      </div>

      <div className="flex flex-col gap-4 pt-6 md:flex-row">
        <button
          type="submit"
          disabled={isSaving || isLoading}
          className="bg-bakery-olive hover:bg-bakery-olive/90 flex-1 cursor-pointer rounded-xl py-4 text-base font-bold text-white shadow-lg transition-all disabled:opacity-50 md:text-lg"
        >
          {isSaving ? "Saving..." : "Save Changes"}
        </button>
        <button
          type="button"
          onClick={() => signOut()}
          className="border-bakery-olive text-bakery-olive hover:bg-bakery-olive flex-1 cursor-pointer rounded-xl border-2 py-4 text-base font-bold transition-all hover:text-white md:text-lg"
        >
          Sign Out
        </button>
      </div>
    </form>
  );
};

const Information = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="bg-bakery-cream flex min-h-[60vh] w-full items-center justify-center p-4">
        <p className="font-bakery-noto text-lg font-bold text-black/60">
          Loading profile...
        </p>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return (
      <div className="bg-bakery-cream flex min-h-[60vh] w-full items-center justify-center p-4">
        <motion.div {...fadeUp} className="w-full max-w-md">
          <div className="border-bakery-gray flex flex-col gap-6 rounded-3xl border-2 bg-white p-8 shadow-xl">
            <div className="mb-2 text-center">
              <p className="font-bakery-noto mb-1 text-2xl font-bold text-black">
                Welcome Back
              </p>
              <p className="text-sm text-black/60">
                Sign in to manage your profile and orders
              </p>
            </div>

            <button
              onClick={() => signIn("google")}
              className="border-bakery-gray hover:bg-bakery-gray/30 flex cursor-pointer items-center justify-center gap-3 rounded-xl border-2 bg-white py-3.5 text-base font-bold text-black shadow-sm transition-all md:text-lg"
            >
              <FcGoogle size={24} />
              Continue with Google
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-bakery-cream flex min-h-screen w-full flex-col items-center px-4 py-12">
      <motion.div {...fadeUp} className="w-full max-w-2xl">
        <div className="border-bakery-gray rounded-3xl border-2 bg-white p-6 shadow-xl md:p-10">
          <ProfileForm session={session} />
        </div>
      </motion.div>
    </div>
  );
};

export default Information;
