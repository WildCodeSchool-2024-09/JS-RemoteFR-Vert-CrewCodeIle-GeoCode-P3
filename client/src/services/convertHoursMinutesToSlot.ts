export default function (stepTimeSlot: number) {
  // calculate the number of time slots per hour
  const NumberSlotPerHour = 60 / stepTimeSlot;

  const presentTime = new Date();
  const slotHours = presentTime.getHours();
  const slotMinutes = presentTime.getMinutes();
  const totalMinutes = slotHours * 60 + slotMinutes;

  return Math.floor((totalMinutes * NumberSlotPerHour) / 60);
}
