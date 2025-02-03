import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";
import type { stationTableType } from "../../lib/definitions";
import type { Station } from "../../lib/definitions";

class StationRepository {
  async readAll() {
    const [rows] = await databaseClient.query<Rows>("SELECT * FROM station");

    return rows as Station[];
  }

  async fullUpdate(station: stationTableType[]) {
    if (station !== null) {
      // disable foreign key before TRUNCATE TABLE
      await databaseClient.query<Result>("SET FOREIGN_KEY_CHECKS=0");
      const [result] = await databaseClient.query<Result>(
        "TRUNCATE TABLE station",
      );

      for (const row of station) {
        const [result] = await databaseClient.query<Result>(
          "INSERT INTO station (id_station, name, address, latitude, longitude) values (?,?,?,?,?)",
          [
            row.id_station_itinerance,
            row.nom_station,
            row.adresse_station,
            row.consolidated_latitude,
            row.consolidated_longitude,
          ],
        );
      }
      // enable foreign key control
      await databaseClient.query<Result>("SET FOREIGN_KEY_CHECKS=1");
    }
  }
} // end

export default new StationRepository();
