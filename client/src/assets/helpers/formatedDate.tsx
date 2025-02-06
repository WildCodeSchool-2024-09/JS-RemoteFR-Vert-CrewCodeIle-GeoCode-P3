export const formatedDAte = (birthdate: Date) => {
  const getDate = new Date(birthdate);
  const getYears = getDate.getFullYear();
  const getMonth = (getDate.getMonth() + 1).toString().padStart(2, "0");
  const getDay = getDate.getDate().toString().padStart(2, "0");

  return ` ${getDay}/${getMonth}/${getYears}`;
};
