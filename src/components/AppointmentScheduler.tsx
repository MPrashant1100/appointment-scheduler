import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import SlotCard from "./SlotCard";
import AppointmentForm from "./AppointmentForm";
import { Appointment, Slot } from "@/utils/global";

const AppointmentScheduler = () => {
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  const [availableSlots, setAvailableSlots] = useState<Slot[]>([]);
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetchSlots();
    fetchBookedAppointments();
  }, [selectedDate]);

  const fetchSlots = async () => {
    try {
      const slot = await axios.get(`/api/slot?date=${selectedDate}`);
      setAvailableSlots(slot.data);
    } catch (error) {
      console.error("Error fetching slots:", error);
    }
  };

  const fetchBookedAppointments = async () => {
    try {
      const bookedAppointment = await axios.get(
        `/api/appointments?date=${selectedDate}`
      );
      const bookedSlots = bookedAppointment.data.map(
        (appointment: Appointment) => appointment.slot
      );
      setBookedSlots(bookedSlots);
    } catch (error) {
      console.error("Error fetching booked appointments:", error);
    }
  };

  const handleBookingSuccess = () => {
    fetchSlots();
    fetchBookedAppointments()
    setSelectedSlot(null);
  };

  const viewAppointments = () => {
    router.push(`/appointments?date=${selectedDate}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <h2 className="text-2xl font-semibold mb-6">
              Gynoveda Clinic Appointment Booking
            </h2>
            <div className="mb-4">
              <label
                htmlFor="date"
                className="block text-sm font-medium text-gray-700"
              >
                Select Date
              </label>
              <input
                type="date"
                id="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
            <div className="grid grid-cols-3 gap-2 mb-4">
              {availableSlots.map((slot) => (
                <SlotCard
                  key={slot}
                  slot={slot}
                  isSelected={selectedSlot === slot}
                  isBooked={bookedSlots.includes(slot)}
                  onClick={() => setSelectedSlot(slot)}
                />
              ))}
            </div>
            {selectedSlot && (
              <AppointmentForm
                selectedSlot={selectedSlot}
                onBookingSuccess={handleBookingSuccess}
              />
            )}
            <button
              onClick={viewAppointments}
              className="mt-4 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              View Appointments
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentScheduler;
