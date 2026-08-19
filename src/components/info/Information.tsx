"use client";

import { motion } from "motion/react";
import {
  IoLocationOutline,
  IoTimeOutline,
  IoCallOutline,
} from "react-icons/io5";

const slideUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7, ease: "easeOut" as const },
};

const slideUpDelayed = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7, delay: 0.15, ease: "easeOut" as const },
};

const Information = () => {
  return (
    <div className="bg-bakery-cream flex flex-col items-center px-4 py-12 md:py-16">
      <motion.div
        {...slideUp}
        className="bg-bakery-olive mx-auto grid w-full max-w-6xl grid-cols-1 gap-8 rounded-3xl p-8 text-white shadow-xl md:grid-cols-3 md:gap-6 md:p-10"
      >
        <div className="flex flex-col items-center text-center md:items-start md:text-left">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
            <IoLocationOutline size={26} />
          </div>
          <p className="font-bakery-noto text-lg font-bold md:text-xl">
            Address
          </p>
          <p className="font-bakery-noto mt-2 text-sm leading-relaxed text-white/90 sm:text-base">
            4900 Freeport Blvd, <br />
            Sacramento, CA 95822
          </p>
        </div>

        <div className="flex flex-col items-center text-center md:items-start md:text-left">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
            <IoTimeOutline size={26} />
          </div>
          <p className="font-bakery-noto text-lg font-bold md:text-xl">Hours</p>
          <p className="font-bakery-noto mt-2 text-sm leading-relaxed text-white/90 sm:text-base">
            Tue – Sun: 7:30 AM – 3:00 PM
            <br />
            <span className="text-bakery-cream/70">Closed Monday</span>
          </p>
        </div>

        <div className="flex flex-col items-center text-center md:items-start md:text-left">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
            <IoCallOutline size={26} />
          </div>
          <p className="font-bakery-noto text-lg font-bold md:text-xl">
            Contact
          </p>
          <p className="font-bakery-noto mt-2 text-sm leading-relaxed text-white/90 sm:text-base">
            Phone: (916) 454-1879 <br />
            Email: usamahoroba@gmail.com
          </p>
        </div>
      </motion.div>

      <motion.div
        {...slideUpDelayed}
        className="border-bakery-gray mx-auto mt-8 h-[350px] w-full max-w-6xl overflow-hidden rounded-3xl border-2 shadow-lg md:mt-10 md:h-[450px]"
      >
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3121.240378411082!2d-121.50394338466655!3d38.53488247962846!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x809ad0c123456789%3A0x123456789abcdef!2s4900%20Freeport%20Blvd%2C%20Sacramento%2C%20CA%2095822!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </motion.div>
    </div>
  );
};

export default Information;
