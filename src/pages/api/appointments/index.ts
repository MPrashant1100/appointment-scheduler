import { NextApiRequest, NextApiResponse } from "next";
import { Appointment, bookedAppointments } from "@/utils/global";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { date } = req.query;

  if (!date) {
    return res.status(400).json({ message: "Date is required" });
  }

  const filteredAppointments = bookedAppointments.filter(
    (appointment: Appointment) =>
      new Date(appointment.slot).toDateString() ===
      new Date(date as string).toDateString()
  );

  return res.status(200).json(filteredAppointments);
}
