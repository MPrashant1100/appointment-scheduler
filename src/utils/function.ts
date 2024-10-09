import { Appointment } from "./global";

export const bookedAppointments: Appointment[] = [];

export const addAppointment = (appointment: Appointment) => {
  bookedAppointments.push(appointment);
};

export const generateSlots = (date: Date): string[] => {
  const slots: string[] = [];
  const startTime = new Date(date.setHours(9, 0, 0, 0));
  const endTime = new Date(date.setHours(17, 0, 0, 0));

  while (startTime < endTime) {
    slots.push(new Date(startTime).toISOString());
    startTime.setMinutes(startTime.getMinutes() + 30);
  }
  return slots;
};
