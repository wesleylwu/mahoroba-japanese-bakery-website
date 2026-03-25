"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut" as const },
};

interface PickupProps {
  setTipAmount: (amount: number) => void;
  subtotal: number;
}

const Pickup = ({ setTipAmount, subtotal }: PickupProps) => {
  const [orderTime, setOrderTime] = useState<"asap" | "later">("asap");
  const [selectedTip, setSelectedTip] = useState<number | "custom">(0);
  const [customTip, setCustomTip] = useState("");

  const [cardNumber, setCardNumber] = useState("");
  const [expDate, setExpDate] = useState("");
  const [cvv, setCvv] = useState("");

  const tipPercentages = [10, 15, 18, 20];

  useEffect(() => {
    if (selectedTip !== "custom") {
      setTipAmount((subtotal * selectedTip) / 100);
    } else {
      setTipAmount(parseFloat(customTip) || 0);
    }
  }, [selectedTip, customTip, subtotal, setTipAmount]);

  const handleCustomTipChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (Number(val) < 0) return;
    setCustomTip(val);
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, "");
    setCardNumber(val.slice(0, 16));
  };

  const handleExpDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, "");
    if (val.length >= 2) {
      const month = parseInt(val.slice(0, 2), 10);
      if (month > 12) {
        val = "12" + val.slice(2);
      } else if (month === 0 && val.length >= 2) {
        val = "01" + val.slice(2);
      }
    }
    if (val.length > 2) {
      val = val.slice(0, 2) + "/" + val.slice(2, 4);
    }
    setExpDate(val);
  };

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, "");
    setCvv(val.slice(0, 4));
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
                className="accent-bakery-olive h-5 w-5"
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
                className="accent-bakery-olive h-5 w-5"
              />
              <p>Later</p>
            </div>
          </div>

          {orderTime === "later" && (
            <div className="mt-2 grid grid-cols-2 gap-4">
              <select className="border-bakery-gray appearance-none rounded-xl border-2 bg-white px-4 py-4 text-lg text-black outline-none">
                <option>Today</option>
                <option>Tomorrow</option>
              </select>
              <select className="border-bakery-gray appearance-none rounded-xl border-2 bg-white px-4 py-4 text-lg text-black outline-none">
                <option>10:00 AM</option>
                <option>10:30 AM</option>
                <option>11:00 AM</option>
              </select>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <p className="font-bakery-noto text-2xl font-bold text-black">
          Payment
        </p>

        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Card Number"
            value={cardNumber}
            onChange={handleCardNumberChange}
            className="border-bakery-gray rounded-xl border-2 bg-white px-4 py-4 text-lg text-black outline-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="MM/YY"
            value={expDate}
            onChange={handleExpDateChange}
            className="border-bakery-gray rounded-xl border-2 bg-white px-4 py-4 text-lg text-black outline-none"
          />
          <input
            type="text"
            placeholder="Security Code"
            value={cvv}
            onChange={handleCvvChange}
            className="border-bakery-gray rounded-xl border-2 bg-white px-4 py-4 text-lg text-black outline-none"
          />
        </div>

        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Name on Card"
            className="border-bakery-gray rounded-xl border-2 bg-white px-4 py-4 text-lg text-black outline-none"
          />
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <p className="font-bakery-noto text-2xl font-bold text-black">
          Billing Address
        </p>

        <select className="border-bakery-gray appearance-none rounded-xl border-2 bg-white px-4 py-4 text-lg text-black outline-none">
          <option>United States</option>
          <option>Canada</option>
        </select>

        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="First Name"
            className="border-bakery-gray rounded-xl border-2 bg-white px-4 py-4 text-lg text-black outline-none"
          />
          <input
            type="text"
            placeholder="Last Name"
            className="border-bakery-gray rounded-xl border-2 bg-white px-4 py-4 text-lg text-black outline-none"
          />
        </div>

        <input
          type="text"
          placeholder="Address"
          className="border-bakery-gray rounded-xl border-2 bg-white px-4 py-4 text-lg text-black outline-none"
        />

        <input
          type="text"
          placeholder="Apt, suite, etc. (optional)"
          className="border-bakery-gray rounded-xl border-2 bg-white px-4 py-4 text-lg text-black outline-none"
        />

        <div className="grid grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="City"
            defaultValue="West Sacramento"
            className="border-bakery-gray rounded-xl border-2 bg-white px-4 py-4 text-lg text-black outline-none"
          />
          <input
            type="text"
            placeholder="State"
            className="border-bakery-gray rounded-xl border-2 bg-white px-4 py-4 text-lg text-black outline-none"
          />
          <input
            type="text"
            placeholder="ZIP Code"
            className="border-bakery-gray rounded-xl border-2 bg-white px-4 py-4 text-lg text-black outline-none"
          />
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <p className="font-bakery-noto text-2xl font-bold text-black">Tips</p>

        <div className="grid grid-cols-3 gap-4 md:grid-cols-5">
          {tipPercentages.map((percent) => (
            <button
              key={percent}
              onClick={() => setSelectedTip(percent)}
              className={`rounded-xl border-2 py-3 text-lg font-bold transition-all ${
                selectedTip === percent
                  ? "bg-bakery-olive border-bakery-olive text-white"
                  : "border-bakery-gray hover:border-bakery-olive bg-white text-black"
              }`}
            >
              <p>{percent}%</p>
            </button>
          ))}
          <button
            onClick={() => setSelectedTip("custom")}
            className={`rounded-xl border-2 py-3 text-lg font-bold transition-all ${
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
    </motion.div>
  );
};

export default Pickup;
