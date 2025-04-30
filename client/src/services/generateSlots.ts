export default function generateSlots(stepTimeSlot: number) {
  let totalMinutes = 0;
  let Hours = 0;
  let Minutes = 0;
  const slots = [];
  let i = 0;

  while (Hours < 24) {
    slots.push({
      slot: i,
      label: `${Hours}H${Minutes.toLocaleString().padEnd(2, "0")}`,
    });

    totalMinutes += stepTimeSlot;
    Hours = Math.floor(totalMinutes / 60);
    Minutes = totalMinutes % 60;
    i++;
  }
  return slots;
}
