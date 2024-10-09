import { SlotCardProps } from "@/utils/global";
import React from "react";

const SlotCard = ({ slot, isSelected, onClick, isBooked }: SlotCardProps) => {
  return (
    <button
      onClick={onClick}
      className={`p-2 rounded ${
        isBooked
        ? "bg-red-500 text-white cursor-not-allowed"
        : isSelected
          ? "bg-blue-500 text-white"
          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
      }`}
      disabled = {isBooked}
    >
      {new Date(slot).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })}
    </button>
  );
};

export default SlotCard;
