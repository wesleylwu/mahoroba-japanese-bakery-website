"use client";

import { motion } from "motion/react";

const slideUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, ease: "easeOut" as const },
};

const slideUpDelayed = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, delay: 0.2, ease: "easeOut" as const },
};

const Information = () => {
  return (
    <div className="bg-bakery-cream flex flex-col items-center overflow-hidden pt-8 pb-12 md:pt-14">
      <motion.div
        {...slideUp}
        className="bg-bakery-olive grid h-auto w-[95vw] max-w-6xl grid-cols-1 gap-10 rounded-3xl border-4 border-black p-6 text-white sm:w-[90vw] sm:p-8 md:w-[85vw] md:grid-cols-3 md:gap-6 md:p-10 lg:w-[80vw] lg:gap-8 lg:p-12 xl:w-[75vw] 2xl:w-[65vw] 2xl:p-16"
      >
        <div className="flex flex-col items-center justify-start text-center md:items-start md:text-left">
          <p className="font-bakery-noto text-lg font-bold sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl">
            Address
          </p>
          <p className="font-bakery-noto mt-2 text-xs sm:mt-4 sm:text-sm md:mt-6 md:text-base lg:mt-8 lg:text-lg 2xl:text-xl">
            4900 Freeport Blvd, <br />
            Sacramento, CA 95822
          </p>
        </div>

        <div className="flex flex-col items-center justify-start text-center md:items-start md:text-left">
          <p className="font-bakery-noto text-lg font-bold sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl">
            Hours
          </p>
          <p className="font-bakery-noto mt-2 text-xs sm:mt-4 sm:text-sm md:mt-6 md:text-base lg:mt-8 lg:text-lg 2xl:text-xl">
            Tue – Sun: 7:30 AM – 3:00 PM
            <br />
            Closed Monday
          </p>
        </div>

        <div className="flex flex-col items-center justify-start text-center md:items-start md:text-left">
          <p className="font-bakery-noto text-lg font-bold sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl">
            Contact
          </p>
          <p className="font-bakery-noto mt-2 text-xs sm:mt-4 sm:text-sm md:mt-6 md:text-base lg:mt-8 lg:text-lg 2xl:text-xl">
            Phone: (916) 454-1879 <br />
            Email: usamahoroba@gmail.com
          </p>
        </div>
      </motion.div>

      <motion.div
        {...slideUpDelayed}
        className="mt-8 h-[40vh] w-[95vw] max-w-6xl overflow-hidden rounded-3xl border-4 border-black sm:w-[90vw] md:mt-10 md:h-[60vh] md:w-[85vw] lg:h-[70vh] lg:w-[80vw] xl:w-[75vw] 2xl:w-[65vw]"
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
