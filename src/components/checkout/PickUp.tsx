"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import {
  LinkAuthenticationElement,
  PaymentElement,
} from "@stripe/react-stripe-js";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut" as const },
};

interface PickupProps {
  setTipAmount: (amount: number) => void;
  subtotal: number;
  setPickupTime: (time: string) => void;
}

const generateTimeOptions = () => {
  const times = [];
  let currentHour = 8;
  let currentMinute = 0;

  while (currentHour < 13 || (currentHour === 13 && currentMinute === 0)) {
    const period = currentHour >= 12 ? "PM" : "AM";
    const displayHour = currentHour > 12 ? currentHour - 12 : currentHour;
    const displayMinute = currentMinute.toString().padStart(2, "0");

    times.push(`${displayHour}:${displayMinute} ${period}`);

    currentMinute += 10;
    if (currentMinute >= 60) {
      currentMinute = 0;
      currentHour += 1;
    }
  }
  return times;
};

const generateDateOptions = () => {
  const dates = [];
  const today = new Date();

  for (let i = 1; i <= 14; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);

    if (i === 1) {
      dates.push("Tomorrow");
    } else {
      const options: Intl.DateTimeFormatOptions = {
        weekday: "short",
        month: "short",
        day: "numeric",
      };
      dates.push(date.toLocaleDateString("en-US", options));
    }
  }
  return dates;
};

const Pickup = ({ setTipAmount, subtotal, setPickupTime }: PickupProps) => {
  const [orderTime, setOrderTime] = useState<"asap" | "later">("asap");
  const [selectedTip, setSelectedTip] = useState<number | "custom">(0);
  const [customTip, setCustomTip] = useState("");

  const timeOptions = generateTimeOptions();
  const dateOptions = generateDateOptions();

  const [selectedDate, setSelectedDate] = useState(dateOptions[0]);
  const [selectedTime, setSelectedTime] = useState(timeOptions[0]);

  const tipPercentages = [10, 15, 18, 20];

  useEffect(() => {
    if (selectedTip !== "custom") {
      setTipAmount((subtotal * selectedTip) / 100);
    } else {
      setTipAmount(parseFloat(customTip) || 0);
    }
  }, [selectedTip, customTip, subtotal, setTipAmount]);

  useEffect(() => {
    if (orderTime === "asap") {
      setPickupTime("ASAP");
    } else {
      setPickupTime(`${selectedDate} at ${selectedTime}`);
    }
  }, [orderTime, selectedDate, selectedTime, setPickupTime]);

  const handleCustomTipChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (Number(val) < 0) return;
    setCustomTip(val);
  };

  return (
    <motion.div {...fadeUp} className="flex flex-col gap-10">
      <div className="flex flex-col gap-6">
        <p className="font-bakery-noto text-3xl font-bold text-black">Pickup</p>
        <div className="text-lg text-black">
          <p>4900 Freeport Blvd,</p>
          <p>West Sacramento, CA 95822</p>
        </div>

        <div className="flex flex-col gap-4">
          <p className="font-bakery-noto text-lg font-bold text-black">
            Order Time
          </p>
          <div className="flex gap-6">
            <div
              onClick={() => setOrderTime("asap")}
              className="flex cursor-pointer items-center gap-3 text-lg"
            >
              <input
                type="radio"
                name="orderTime"
                value="asap"
                checked={orderTime === "asap"}
                readOnly
                className="accent-bakery-olive h-5 w-5 cursor-pointer"
              />
              <p>ASAP</p>
            </div>
            <div
              onClick={() => setOrderTime("later")}
              className="flex cursor-pointer items-center gap-3 text-lg"
            >
              <input
                type="radio"
                name="orderTime"
                value="later"
                checked={orderTime === "later"}
                readOnly
                className="accent-bakery-olive h-5 w-5 cursor-pointer"
              />
              <p>Later</p>
            </div>
          </div>

          {orderTime === "later" && (
            <div className="mt-2 grid grid-cols-2 gap-4">
              <select
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="border-bakery-gray cursor-pointer appearance-none rounded-xl border-2 bg-white px-4 py-4 text-lg text-black outline-none"
              >
                {dateOptions.map((date, index) => (
                  <option key={index} value={date}>
                    {date}
                  </option>
                ))}
              </select>
              <select
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                className="border-bakery-gray cursor-pointer appearance-none rounded-xl border-2 bg-white px-4 py-4 text-lg text-black outline-none"
              >
                {timeOptions.map((time, index) => (
                  <option key={index} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <p className="font-bakery-noto text-2xl font-bold text-black">Tips</p>

        <div className="grid grid-cols-3 gap-4 md:grid-cols-5">
          {tipPercentages.map((percent) => (
            <button
              key={percent}
              type="button"
              onClick={() => setSelectedTip(percent)}
              className={`cursor-pointer rounded-xl border-2 py-3 text-lg font-bold transition-all ${
                selectedTip === percent
                  ? "bg-bakery-olive border-bakery-olive text-white"
                  : "border-bakery-gray hover:border-bakery-olive bg-white text-black"
              }`}
            >
              <p>{percent}%</p>
            </button>
          ))}
          <button
            type="button"
            onClick={() => setSelectedTip("custom")}
            className={`cursor-pointer rounded-xl border-2 py-3 text-lg font-bold transition-all ${
              selectedTip === "custom"
                ? "bg-bakery-olive border-bakery-olive text-white"
                : "border-bakery-gray hover:border-bakery-olive bg-white text-black"
            }`}
          >
            <p>Custom</p>
          </button>
        </div>

        {selectedTip === "custom" && (
          <div className="mt-2 flex flex-col gap-3">
            <input
              type="number"
              min="0"
              placeholder="Enter custom tip amount"
              value={customTip}
              onChange={handleCustomTipChange}
              className="border-bakery-gray rounded-xl border-2 bg-white px-4 py-4 text-lg text-black outline-none"
            />
          </div>
        )}
      </div>

      <div className="flex flex-col gap-6">
        <p className="font-bakery-noto text-2xl font-bold text-black">
          Payment
        </p>

        <LinkAuthenticationElement id="link-authentication-element" />
        <PaymentElement id="payment-element" options={{ layout: "tabs" }} />
      </div>
    </motion.div>
  );
};

export default Pickup;
