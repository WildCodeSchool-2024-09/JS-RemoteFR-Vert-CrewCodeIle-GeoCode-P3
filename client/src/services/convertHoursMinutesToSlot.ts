export default function () {
  const presentTime = new Date();
  const slotHours = presentTime.getHours();
  const slotMinutes = presentTime.getMinutes();
  const totalMinutes = slotHours * 60 + slotMinutes;
  const nowtSlotToShow = Math.floor((totalMinutes * 2) / 60);
  return nowtSlotToShow;
}
