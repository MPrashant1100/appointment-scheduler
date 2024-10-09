import { generateSlots } from "@/utils/function";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { date } = req.query;

  if (!date) {
    return res.status(400).json({ message: "Date is required" });
  }

  const requestedDate = new Date(date as string);
  const slots = generateSlots(requestedDate);
  return res.status(200).json(slots);
}
