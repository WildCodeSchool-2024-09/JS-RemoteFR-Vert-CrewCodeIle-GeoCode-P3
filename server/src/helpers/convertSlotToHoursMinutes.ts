export default function convertSlotToHoursMinutes(slot: number) {
  const newSartSlot = new Date();

  const totalMinutes = slot * 30;
  const slotHours = Math.floor(totalMinutes / 60);
  const slotMinutes = totalMinutes % 60;
  newSartSlot.setUTCHours(slotHours, slotMinutes);

  const newEndSlot = newSartSlot.setUTCMinutes(slotMinutes + 30);

  return [newSartSlot, newEndSlot];
}
