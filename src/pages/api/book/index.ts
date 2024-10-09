import { bookedAppointments, addAppointment } from "@/utils/global";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { name, email, phone, slot } = req.body;

  if (!name || !email || !phone || !slot) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const isSlotBooked = bookedAppointments.some(
    (appointment) => appointment.slot === slot
  );

  if (isSlotBooked) {
    return res.status(400).json({ message: "Slot already booked" });
  }

  addAppointment({ name, email, phone, slot });

  return res.status(201).json({ message: "Appointment booked successfully" });
}
