import { NextApiRequest, NextApiResponse } from 'next';

const generateSlots = (date: Date): string[] => {
  const slots: string[] = [];
  const startTime = new Date(date.setHours(9, 0, 0, 0));
  const endTime = new Date(date.setHours(17, 0, 0, 0));

  while (startTime < endTime) {
    slots.push(new Date(startTime).toISOString());
    startTime.setMinutes(startTime.getMinutes() + 30);
  }
  return slots;
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { date } = req.query;

  if (!date) {
    return res.status(400).json({ message: 'Date is required' });
  }

  const requestedDate = new Date(date as string);
  const slots = generateSlots(requestedDate);
  return res.status(200).json(slots);
}
