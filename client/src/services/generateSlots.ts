export default function generateSlots(stepTimeslot: number) {
  type slotsType = {
    slot: number;
    label: string;
  };
  const slotsTime = new Date();

  const setHours = 0;
  const setMinutes = 0;
  const slots: slotsType[] = [{ slot: 0, label: "0H00" }];
  let i = 1;

  while (i < 24) {
    slotsTime.setUTCHours(setHours, setMinutes + stepTimeslot);
    slots[i] = {
      slot: i,
      label: `${slotsTime.getHours()}H${slotsTime.getMinutes()}`,
    };
    i++;
  }
  return slots;
}
