export default function convertSlotToHoursMinutes(
  slot: number,
  slotDuration: number,
) {
  const newSartSlot = new Date();
  const newEndSlot = new Date();

  const totalMinutes = slot * slotDuration;
  const slotHours = Math.floor(totalMinutes / 60);
  const slotMinutes = totalMinutes % 60;
  newSartSlot.setHours(slotHours, slotMinutes);
  newEndSlot.setHours(slotHours, slotMinutes + slotDuration);

  return [newSartSlot, newEndSlot];
}
