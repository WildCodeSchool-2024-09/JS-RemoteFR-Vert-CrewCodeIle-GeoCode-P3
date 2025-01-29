import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";
import type { terminalTableType } from "../../lib/definitions";
import type { Station } from "../../lib/definitions";

class StationRepository {
  async readAll() {
    // Execute the SQL SELECT query to retrieve all items from the "station" table
    const [rows] = await databaseClient.query<Rows>("SELECT * FROM station");

    // Return the array of items
    return rows as Station[];
  }

  async fullUpdate(terminal: terminalTableType[]) {
    await databaseClient.query<Result>("SET FOREIGN_KEY_CHECKS=0");
    const [result] = await databaseClient.query<Result>(
      "TRUNCATE TABLE terminal",
    );

    if (terminal !== null) {
      for (const row of terminal) {
        const [result] = await databaseClient.query<Result>(
          "insert into terminal (id_terminal, power, is_type_ef, is_type_2, is_type_combo_ccs, is_type_chademo, is_type_other, station_id) values (?,?,?,?,?,?,?,?)",
          [
            row.id_pdc_itinerance,
            row.puissance_nominale,
            row.type_ef,
            row.type_2,
            row.type_combo_ccs,
            row.type_chademo,
            row.type_autre,
            row.id_station_itinerance,
          ],
        );
      }
    }
    await databaseClient.query<Result>("SET FOREIGN_KEY_CHECKS=1");
  }
} // end

export default new StationRepository();
