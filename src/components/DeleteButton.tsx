"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { HiOutlineTrash } from "react-icons/hi";
import { toast } from "react-toastify";

interface DeleteButtonProps {
  id: string;
  className?: string;
}

const DeleteButton = ({ id, className }: DeleteButtonProps) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return null;
  }

  if (status === "unauthenticated" || !session?.user.isAdmin) {
    return null;
  }

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!window.confirm("Are you sure you want to delete this product?")) {
      return;
    }

    const res = await fetch(`/api/products/${id}`, {
      method: "DELETE",
    });

    if (res.status === 200) {
      toast.success("The product has been deleted!");
      router.refresh();
    } else {
      const data = await res.json();
      toast.error(data.message);
    }
  };

  return (
    <button
      onClick={handleDelete}
      className={`bg-bakery-red cursor-pointer rounded-full p-2 text-white transition-colors hover:opacity-80 ${className}`}
    >
      <HiOutlineTrash size={18} />
    </button>
  );
};

export default DeleteButton;
