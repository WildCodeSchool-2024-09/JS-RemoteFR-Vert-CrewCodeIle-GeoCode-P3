export default function getBirthdate(birthday: Date) {
  const birthDate = birthday
    .toISOString()
    .split("T")[0]
    .split("-")
    .reverse()
    .join("/");
  return birthDate;
}
