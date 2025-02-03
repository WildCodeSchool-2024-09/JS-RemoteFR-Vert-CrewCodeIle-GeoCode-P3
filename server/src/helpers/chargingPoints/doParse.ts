import parser from "csv-parser";
import type { ParamsDictionary, Request } from "express-serve-static-core";
import type { ParsedQs } from "qs";
import type { parsefileIrve } from "../../lib/definitions";
import type { parsefileIrve2 } from "../../lib/definitions";

function doParse(
  req: Request<
    ParamsDictionary,
    string,
    string,
    ParsedQs,
    Record<string, string>
  >,
) {
  const tableauResultats: parsefileIrve2[][] = [];
  const resultsMemory: Record<string, string>[] = [];

  const stream = require("node:stream").Readable.from(req.file?.buffer);
  stream
    .pipe(parser())
    .on("data", (data: Record<string, string>) => {
      const resultdDataStream = Object.entries(data).reduce(
        (acc, [key, value]) => {
          acc[key] = value;
          return acc;
        },
        {} as Record<string, string>,
      );

      resultsMemory.push(resultdDataStream);
    })
    .on("end", () => {
      // processing the table to retrieve the useful columns in "selectedColumns"
      const selectedColumns = resultsMemory.map((row) => ({
        id_station_itinerance: row.id_station_itinerance.trim(),
        nom_station: row.nom_station.trim(),
        adresse_station: row.adresse_station.trim(),
        id_pdc_itinerance: row.id_pdc_itinerance.trim(),
        puissance_nominale: Number.parseInt(row.puissance_nominale),
        type_ef: Boolean(row.type_ef),
        type_2: Boolean(row.type_2),
        type_combo_ccs: Boolean(row.type_combo_ccs),
        type_chademo: Boolean(row.type_chademo),
        type_autre: Boolean(row.type_autre),
        consolidated_longitude: Number.parseFloat(
          row.consolidated_longitude.replace(",", "."),
        ),
        consolidated_latitude: Number.parseFloat(
          row.consolidated_latitude.replace(",", "."),
        ),
      }));

      tableauResultats.push(selectedColumns);
    });
  return tableauResultats;
}

export default doParse;
