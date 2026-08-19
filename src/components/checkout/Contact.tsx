"use client";

import { motion } from "motion/react";
import { formatPhoneNumber } from "@/utils/phone";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut" as const },
};

interface ContactProps {
  contact: {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
  };
  setContact: React.Dispatch<
    React.SetStateAction<{
      firstName: string;
      lastName: string;
      phone: string;
      email: string;
    }>
  >;
}

const Contact = ({ contact, setContact }: ContactProps) => {
  return (
    <motion.div {...fadeUp} className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <p className="font-bakery-noto text-2xl font-bold text-black md:text-3xl">
          Contact
        </p>
        <span className="text-xs text-black/50">
          Auto-filled from your profile
        </span>
      </div>

      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <p className="font-bakery-noto text-sm font-bold text-black md:text-base">
            First Name
          </p>
          <input
            type="text"
            placeholder="First Name"
            value={contact.firstName}
            onChange={(e) =>
              setContact({ ...contact, firstName: e.target.value })
            }
            className="border-bakery-gray focus:border-bakery-olive rounded-xl border-2 bg-white px-4 py-3.5 text-base text-black transition-colors outline-none md:text-lg"
          />
        </div>

        <div className="flex flex-col gap-2">
          <p className="font-bakery-noto text-sm font-bold text-black md:text-base">
            Last Name
          </p>
          <input
            type="text"
            placeholder="Last Name"
            value={contact.lastName}
            onChange={(e) =>
              setContact({ ...contact, lastName: e.target.value })
            }
            className="border-bakery-gray focus:border-bakery-olive rounded-xl border-2 bg-white px-4 py-3.5 text-base text-black transition-colors outline-none md:text-lg"
          />
        </div>

        <div className="flex flex-col gap-2">
          <p className="font-bakery-noto text-sm font-bold text-black md:text-base">
            Phone Number
          </p>
          <input
            type="tel"
            placeholder="(555) 555-5555"
            value={contact.phone}
            onChange={(e) =>
              setContact({
                ...contact,
                phone: formatPhoneNumber(e.target.value),
              })
            }
            className="border-bakery-gray focus:border-bakery-olive rounded-xl border-2 bg-white px-4 py-3.5 text-base text-black transition-colors outline-none md:text-lg"
          />
        </div>

        <div className="flex flex-col gap-2">
          <p className="font-bakery-noto text-sm font-bold text-black md:text-base">
            Email
          </p>
          <input
            type="email"
            placeholder="username@example.com"
            value={contact.email}
            onChange={(e) => setContact({ ...contact, email: e.target.value })}
            className="border-bakery-gray focus:border-bakery-olive rounded-xl border-2 bg-white px-4 py-3.5 text-base text-black transition-colors outline-none md:text-lg"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default Contact;
