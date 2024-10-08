export type Appointment = {
    name: string;
    email: string;
    phone: string;
    slot: string;
  };
  
export const bookedAppointments: Appointment[] = [];

export const addAppointment = (appointment: Appointment) => {
    bookedAppointments.push(appointment);
  };