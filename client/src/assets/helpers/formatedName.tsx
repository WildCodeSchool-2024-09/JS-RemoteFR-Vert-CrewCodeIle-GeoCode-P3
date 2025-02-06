export const formatedName = (name: string) => {
  const firstLetter = name.charAt(0).toUpperCase();
  const capitalize = firstLetter + name.slice(1);
  return capitalize;
};
