export interface Appointment {
  name: string;
  email: string;
  phone: string;
  slot: string;
};

export type Slot = string;

export interface SlotCardProps {
  slot: string;
  isSelected: boolean;
  onClick: () => void;
};

export interface AppointmentFormProps {
  selectedSlot: string | null;
  onBookingSuccess: () => void;
};
