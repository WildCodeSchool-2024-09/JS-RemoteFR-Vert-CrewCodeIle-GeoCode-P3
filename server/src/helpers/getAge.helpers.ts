export default function calculateAge(birthday: string) {
  const currentDate = new Date(Date.now());
  const birthDate = new Date(birthday);

  let age = currentDate.getFullYear() - birthDate.getFullYear();
  const monthDifference = currentDate.getMonth() - birthDate.getMonth();

  if (
    monthDifference < 0 ||
    (monthDifference === 0 && currentDate.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return `${age} ans`;
}
