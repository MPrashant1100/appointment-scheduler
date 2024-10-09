import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Appointment } from '@/utils/global';

type Slot = string;


export default function AppointmentScheduler() {
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [availableSlots, setAvailableSlots] = useState<Slot[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [bookingData, setBookingData] = useState<Appointment>({
    name: '',
    email: '',
    phone: '',
    slot: '',
  });
  const [message, setMessage] = useState<string>('');
  const [showAppointments, setShowAppointments] = useState<boolean>(false);

  useEffect(() => {
    fetchSlots();
  }, [selectedDate]);

  const fetchSlots = async () => {
    try {
      const response = await axios.get(`/api/slot?date=${selectedDate}`);
      setAvailableSlots(response.data);
    } catch (error) {
      console.error('Error fetching slots:', error);
      setMessage('Failed to fetch available slots. Please try again.');
    }
  };

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/book', bookingData);
      setMessage(response.data.message);
      fetchSlots();
      setBookingData({ name: '', email: '', phone: '', slot: '' });
    } catch (error) {
      console.error('Error booking appointment:', error);
      setMessage('Failed to book appointment. Please try again.');
    }
  };

  const fetchAppointments = async () => {
    try {
      const response = await axios.get(`/api/appointments?date=${selectedDate}`);
      setAppointments(response.data);
      setShowAppointments(true);
    } catch (error) {
      console.error('Error fetching appointments:', error);
      setMessage('Failed to fetch appointments. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <h2 className="text-2xl font-semibold mb-6">Gynoveda Clinic Appointment Booking</h2>
            <div className="mb-4">
              <label htmlFor="date" className="block text-sm font-medium text-gray-700">Select Date</label>
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
                <button
                  key={slot}
                  onClick={() => setBookingData({ ...bookingData, slot })}
                  className={`p-2 rounded ${
                    bookingData.slot === slot
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {new Date(slot).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </button>
              ))}
            </div>
            <form onSubmit={handleBooking} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  id="name"
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  value={bookingData.name}
                  onChange={(e) => setBookingData({ ...bookingData, name: e.target.value })}
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  id="email"
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  value={bookingData.email}
                  onChange={(e) => setBookingData({ ...bookingData, email: e.target.value })}
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
                <input
                  type="tel"
                  id="phone"
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  value={bookingData.phone}
                  onChange={(e) => setBookingData({ ...bookingData, phone: e.target.value })}
                />
              </div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Book Appointment
              </button>
            </form>
            {message && (
              <div className={`mt-4 p-4 rounded ${message.includes('successfully') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {message}
              </div>
            )}
            <button
              onClick={fetchAppointments}
              className="mt-4 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              View Appointments
            </button>
            {showAppointments && (
              <div className="mt-6">
                <h3 className="text-lg font-medium mb-2">Appointments for {selectedDate}</h3>
                <ul className="divide-y divide-gray-200">
                  {appointments.map((appointment, index) => (
                    <li key={index} className="py-4">
                      <div className="flex justify-between">
                        <span className="font-medium">{appointment.name}</span>
                        <span className="text-gray-500">{new Date(appointment.slot).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                      <div className="text-sm text-gray-500">{appointment.email}</div>
                      <div className="text-sm text-gray-500">{appointment.phone}</div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}