import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { Appointment } from "@/utils/global";

const AppointmentsPage = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [message, setMessage] = useState<string>("");
  const router = useRouter();
  const { date } = router.query;

  useEffect(() => {
    if (date) {
      fetchAppointments();
    }
  }, [date]);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get(`/api/appointments?date=${date}`);
      setAppointments(response.data);
    } catch (error) {
      console.error("Error fetching appointments:", error);
      setMessage("Failed to fetch appointments. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <h2 className="text-2xl font-semibold mb-6">
              Appointments for {date}
            </h2>
            {message && (
              <div className="mb-4 p-4 rounded bg-red-100 text-red-700">
                {message}
              </div>
            )}
            {appointments.length > 0 ? (
              <ul className="divide-y divide-gray-200">
                {appointments.map((appointment, index) => (
                  <li key={index} className="py-4">
                    <div className="flex justify-between">
                      <span className="font-medium">{appointment.name}</span>
                      <span className="text-gray-500">
                        {new Date(appointment.slot).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                    <div className="text-sm text-gray-500">
                      {appointment.email}
                    </div>
                    <div className="text-sm text-gray-500">
                      {appointment.phone}
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-center text-gray-500">
                No appointments for this date.
              </p>
            )}
            <button
              onClick={() => router.push("/")}
              className="mt-6 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Back to Booking
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentsPage;
