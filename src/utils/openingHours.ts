// Centralized opening hours configuration
// Update this file to change opening times across the entire site

export interface OpeningHourEntry {
  day: string;
  hours: string;
  kitchen: string;
  isClosedDay: boolean;
}

// Full opening hours with kitchen times
export const openingHours: OpeningHourEntry[] = [
  { day: "Montag", hours: "Ruhetag", kitchen: "", isClosedDay: true },
  { day: "Dienstag", hours: "17:30 – 23:00", kitchen: "17:30 – 21:30", isClosedDay: false },
  { day: "Mittwoch", hours: "17:30 – 23:00", kitchen: "17:30 – 21:30", isClosedDay: false },
  { day: "Donnerstag", hours: "11:30 – 23:00", kitchen: "11:30 – 13:30 / 17:30 – 21:30", isClosedDay: false },
  { day: "Freitag", hours: "11:30 – 23:00", kitchen: "11:30 – 13:30 / 17:30 – 21:30", isClosedDay: false },
  { day: "Samstag", hours: "17:30 – 23:00", kitchen: "17:30 – 21:30", isClosedDay: false },
  { day: "Sonntag", hours: "Ruhetag", kitchen: "", isClosedDay: true }
];

// Condensed version for footer/hero
export const condensedHours: OpeningHourEntry[] = [
  { day: "Mo & So", hours: "Ruhetag", kitchen: "", isClosedDay: true },
  { day: "Di–Mi", hours: "17:30 – 23:00", kitchen: "17:30 – 21:30", isClosedDay: false },
  { day: "Do–Fr", hours: "11:30 – 23:00", kitchen: "11:30 – 13:30 / 17:30 – 21:30", isClosedDay: false },
  { day: "Sa", hours: "17:30 – 23:00", kitchen: "17:30 – 21:30", isClosedDay: false }
];
