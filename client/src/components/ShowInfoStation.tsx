import type { MarkerType } from "../assets/definition/lib";

export default function ShowInfoStation({
  findStation,
  distance,
}: { findStation: MarkerType[] | undefined; distance: number }) {
  return (
    <>
      <div className="m-5">
        <div className="flex items-center justify-start">
          <img
            className="h-16 object-scale-down rounded-md border-gray-600"
            src={"./src/assets/images/photo_station.png"}
            alt="{Photo de la station de recharge}"
          />
          <span>
            <h1 className="m-1 lg:font-paragraph lg:text-[22px] font-paragraph text-lg">
              {findStation?.[0].name}
            </h1>
          </span>
        </div>
        <div className="flex items-start justify-start">
          <img
            className="mt-2 h-5 object-scale-down border-gray-600"
            src={"./src/assets/images/adress.png"}
            alt="{image}"
          />
          <span>
            <h2 className="m-1 lg:font-paragraph lg:text-lg font-paragraph text-lg">
              {findStation?.[0].address}
            </h2>
          </span>
        </div>
        <h2>Distance : {distance} km.</h2>
        <hr />
        <h2>Puissance de charge :</h2>
        <ul>
          {findStation?.map((m) => (
            <li key={m.power}>
              <div className="flex items-start justify-start">
                {" "}
                <img
                  className=" h-5 object-scale-down border-gray-600"
                  src={"./src/assets/images/prise_type-1.png"}
                  alt="{image}"
                />
                {m.power} Kwh
                <span className="ml-1 inline-block px-2  text-sm bg-darkColor text-white rounded-xl">
                  x{m.nb_power}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
