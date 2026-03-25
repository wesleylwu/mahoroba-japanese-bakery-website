"use client";

import { useState } from "react";
import { motion } from "motion/react";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut" as const },
};

const Contact = () => {
  const [contact, setContact] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
  });

  return (
    <motion.div {...fadeUp} className="flex flex-col gap-6">
      <p className="font-bakery-noto text-3xl font-bold text-black">Contact</p>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          <p className="font-bakery-noto text-lg font-bold text-black">
            First Name
          </p>
          <input
            type="text"
            placeholder="John"
            value={contact.firstName}
            onChange={(e) =>
              setContact({ ...contact, firstName: e.target.value })
            }
            className="border-bakery-gray rounded-xl border-2 bg-white px-4 py-4 text-lg text-black outline-none"
          />
        </div>

        <div className="flex flex-col gap-3">
          <p className="font-bakery-noto text-lg font-bold text-black">
            Last Name
          </p>
          <input
            type="text"
            placeholder="Doe"
            value={contact.lastName}
            onChange={(e) =>
              setContact({ ...contact, lastName: e.target.value })
            }
            className="border-bakery-gray rounded-xl border-2 bg-white px-4 py-4 text-lg text-black outline-none"
          />
        </div>

        <div className="flex flex-col gap-3">
          <p className="font-bakery-noto text-lg font-bold text-black">
            Phone Number
          </p>
          <input
            type="tel"
            placeholder="555 555 5555"
            value={contact.phone}
            onChange={(e) => setContact({ ...contact, phone: e.target.value })}
            className="border-bakery-gray rounded-xl border-2 bg-white px-4 py-4 text-lg text-black outline-none"
          />
        </div>

        <div className="flex flex-col gap-3">
          <p className="font-bakery-noto text-lg font-bold text-black">Email</p>
          <input
            type="email"
            placeholder="username@example.com"
            value={contact.email}
            onChange={(e) => setContact({ ...contact, email: e.target.value })}
            className="border-bakery-gray rounded-xl border-2 bg-white px-4 py-4 text-lg text-black outline-none"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default Contact;
