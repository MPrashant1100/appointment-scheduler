import { SlotCardProps } from "@/utils/global";
import React from "react";

const SlotCard = ({ slot, isSelected, onClick }: SlotCardProps) => {
  return (
    <button
      onClick={onClick}
      className={`p-2 rounded ${
        isSelected
          ? "bg-blue-500 text-white"
          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
      }`}
    >
      {new Date(slot).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })}
    </button>
  );
};

export default SlotCard;
