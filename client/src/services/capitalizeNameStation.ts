export default function capitalizeNameStation(name: string | undefined) {
  let lowerStr = null;
  lowerStr = name?.toLowerCase();
  const splitStr = lowerStr?.split(/[ -]+/);
  let capitalizeName = "";
  splitStr?.map((n) => {
    capitalizeName += n.charAt(0).toUpperCase().concat(n.slice(1)).concat(" ");
  });
  return capitalizeName;
}
