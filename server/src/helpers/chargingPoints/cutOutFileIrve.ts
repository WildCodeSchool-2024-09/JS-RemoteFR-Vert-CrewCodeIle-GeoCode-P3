import type { fileIrveType } from "../../lib/definitions";
import type { stationTableType } from "../../lib/definitions";
import type { terminalTableType } from "../../lib/definitions";

function addRowsStation(nRows: stationTableType) {
  const elment = {
    id_station_itinerance: nRows.id_station_itinerance,
    nom_station: nRows.nom_station,
    adresse_station: nRows.adresse_station,
    consolidated_latitude: nRows.consolidated_latitude,
    consolidated_longitude: nRows.consolidated_longitude,
  };
  return elment;
}

function addRowsTerminal(nRows: terminalTableType) {
  const elment = {
    id_pdc_itinerance: nRows.id_pdc_itinerance,
    puissance_nominale: nRows.puissance_nominale,
    type_ef: nRows.type_ef,
    type_2: nRows.type_2,
    type_combo_ccs: nRows.type_combo_ccs,
    type_chademo: nRows.type_chademo,
    type_autre: nRows.type_autre,
    id_station_itinerance: nRows.id_station_itinerance,
  };
  return elment;
}

export default function cutOutFileIrve(formattedFileIrve: fileIrveType[]) {
  // reception of the file to separate into two tables (station and terminal)
  const station: stationTableType[] = [];
  const terminal: terminalTableType[] = [];
  // sort by id_station
  formattedFileIrve.sort((x, y) =>
    x.id_station_itinerance.localeCompare(y.id_station_itinerance),
  );

  // we process the first record
  const line1 = formattedFileIrve[0];
  let currentStation = formattedFileIrve[0].id_station_itinerance;

  station.push(addRowsStation(line1));
  terminal.push(addRowsTerminal(line1));

  //then everything else
  for (const nlines of formattedFileIrve.splice(1)) {
    if (currentStation === nlines.id_station_itinerance) {
      terminal.push(addRowsTerminal(nlines));
    } else {
      currentStation = nlines.id_station_itinerance;
      station.push(addRowsStation(nlines));
      terminal.push(addRowsTerminal(nlines));
    }
  }

  return [station, terminal];
}
