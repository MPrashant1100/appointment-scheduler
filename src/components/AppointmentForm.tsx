import React, { useState } from "react";
import axios from "axios";
import { Appointment, AppointmentFormProps } from "@/utils/global";

const AppointmentForm = ({
  selectedSlot,
  onBookingSuccess,
}: AppointmentFormProps) => {
  const [bookingData, setBookingData] = useState<Appointment>({
    name: "",
    email: "",
    phone: "",
    slot: selectedSlot || "",
  });
  const [message, setMessage] = useState<string>("");

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const bookSlot = await axios.post("/api/book", bookingData);
      setMessage(bookSlot.data.message);
      if (bookSlot.data.success) {
        setBookingData({ name: "", email: "", phone: "", slot: "" });
        onBookingSuccess();
      }
    } catch (error) {
      console.error("Error booking appointment:", error);
      setMessage("Failed to book appointment. Please try again.");
    }
  };

  return (
    <form onSubmit={handleBooking} className="space-y-4">
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Name
        </label>
        <input
          type="text"
          id="name"
          required
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          value={bookingData.name}
          onChange={(e) =>
            setBookingData({ ...bookingData, name: e.target.value })
          }
        />
      </div>
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          required
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          value={bookingData.email}
          onChange={(e) =>
            setBookingData({ ...bookingData, email: e.target.value })
          }
        />
      </div>
      <div>
        <label
          htmlFor="phone"
          className="block text-sm font-medium text-gray-700"
        >
          Phone
        </label>
        <input
          type="tel"
          id="phone"
          required
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          value={bookingData.phone}
          onChange={(e) =>
            setBookingData({ ...bookingData, phone: e.target.value })
          }
        />
      </div>
      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Book Appointment
      </button>
      {message && (
        <div
          className={`mt-4 p-4 rounded ${
            message.includes("successfully")
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {message}
        </div>
      )}
    </form>
  );
};

export default AppointmentForm;
