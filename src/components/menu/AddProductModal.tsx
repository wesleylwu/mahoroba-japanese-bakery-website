"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { HiOutlineX } from "react-icons/hi";
import { toast } from "react-toastify";
import { ProductType } from "@/src/types/Type";

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProductAdded: (product: ProductType) => void;
}

const CATEGORY_OPTIONS = [
  { label: "Sweet", value: "sweet" },
  { label: "Savory", value: "savory" },
  { label: "Pies & Danishes", value: "pies-and-danishes" },
  { label: "Loaves & Rolls", value: "loaves-and-rolls" },
];

const overlayAnimation = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

const modalAnimation = {
  initial: { opacity: 0, scale: 0.95, y: 15 },
  animate: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.95, y: 15 },
  transition: { duration: 0.25, ease: "easeOut" as const },
};

const AddProductModal = ({
  isOpen,
  onClose,
  onProductAdded,
}: AddProductModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [inputs, setInputs] = useState({
    title: "",
    desc: "",
    price: "",
    catSlug: "sweet",
  });
  const [file, setFile] = useState<File | undefined>();
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const item = e.target.files?.[0];
    setFile(item);
  };

  const upload = async () => {
    const cloudName =
      process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "twjr22of";
    const uploadPreset =
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "bakery_preset";

    const data = new FormData();
    data.append("file", file!);
    data.append("upload_preset", uploadPreset);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: "POST",
        body: data,
      },
    );

    const resData = await res.json();
    return resData.secure_url;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) {
      toast.error("Please select a product image.");
      return;
    }

    setIsSubmitting(true);
    try {
      const url = await upload();
      const res = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: inputs.title,
          desc: inputs.desc,
          price: parseFloat(inputs.price),
          catSlug: inputs.catSlug,
          img: url,
        }),
      });

      if (res.ok) {
        const newProduct = await res.json();
        toast.success("Product added successfully!");
        onProductAdded(newProduct);
        onClose();
      } else {
        toast.error("Failed to create product.");
      }
    } catch {
      toast.error("An error occurred while uploading.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          {...overlayAnimation}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />

        <motion.div
          {...modalAnimation}
          className="relative z-10 max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl md:p-8"
        >
          <div className="border-bakery-gray flex items-center justify-between border-b pb-4">
            <div>
              <h2 className="font-bakery-noto text-xl font-bold text-black md:text-2xl">
                Add New Product
              </h2>
              <p className="text-xs text-black/50">
                Add a new pastry to the menu
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-black/60 transition-colors hover:text-black"
            >
              <HiOutlineX size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="title"
                className="font-bakery-noto text-sm font-bold text-black"
              >
                Product Title
              </label>
              <input
                id="title"
                type="text"
                name="title"
                placeholder="e.g. Strawberry Anko"
                value={inputs.title}
                onChange={handleChange}
                required
                className="border-bakery-gray focus:border-bakery-olive rounded-xl border-2 px-3.5 py-2.5 text-sm text-black transition-colors outline-none"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="desc"
                className="font-bakery-noto text-sm font-bold text-black"
              >
                Description
              </label>
              <textarea
                id="desc"
                name="desc"
                rows={3}
                placeholder="Short description of taste, texture, and ingredients..."
                value={inputs.desc}
                onChange={handleChange}
                required
                className="border-bakery-gray focus:border-bakery-olive rounded-xl border-2 px-3.5 py-2.5 text-sm text-black transition-colors outline-none"
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="price"
                  className="font-bakery-noto text-sm font-bold text-black"
                >
                  Price ($)
                </label>
                <input
                  id="price"
                  type="number"
                  step="0.01"
                  name="price"
                  placeholder="3.50"
                  value={inputs.price}
                  onChange={handleChange}
                  required
                  className="border-bakery-gray focus:border-bakery-olive rounded-xl border-2 px-3.5 py-2.5 text-sm text-black transition-colors outline-none"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="catSlug"
                  className="font-bakery-noto text-sm font-bold text-black"
                >
                  Category
                </label>
                <select
                  id="catSlug"
                  name="catSlug"
                  value={inputs.catSlug}
                  onChange={handleChange}
                  className="border-bakery-gray focus:border-bakery-olive rounded-xl border-2 bg-white px-3.5 py-2.5 text-sm text-black transition-colors outline-none"
                >
                  {CATEGORY_OPTIONS.map((cat) => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="image"
                className="font-bakery-noto text-sm font-bold text-black"
              >
                Product Image
              </label>
              <input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                required
                className="border-bakery-gray file:bg-bakery-burgundy file:font-bakery-noto rounded-xl border-2 p-2 text-xs text-black/60 file:mr-3 file:cursor-pointer file:rounded-lg file:border-0 file:px-3 file:py-1.5 file:text-xs file:font-bold file:text-white file:transition-opacity hover:file:opacity-90"
              />
            </div>

            <div className="mt-4 flex gap-3">
              <button
                type="button"
                onClick={onClose}
                disabled={isSubmitting}
                className="border-bakery-gray hover:bg-bakery-gray/30 flex-1 cursor-pointer rounded-xl border-2 py-3 text-sm font-bold text-black transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-bakery-burgundy hover:bg-bakery-burgundy/90 flex-1 cursor-pointer rounded-xl py-3 text-sm font-bold text-white shadow-md transition-all disabled:opacity-50"
              >
                {isSubmitting ? "Creating..." : "Save Product"}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default AddProductModal;
