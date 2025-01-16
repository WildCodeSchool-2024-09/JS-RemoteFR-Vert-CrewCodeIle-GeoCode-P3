import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type Station = {
  id: number;
  name: string;
  adress: string;
  latitude: number;
  longitude: number;
};

class StationRepository {
  async readAll() {
    // Execute the SQL SELECT query to retrieve all items from the "station" table
    const [rows] = await databaseClient.query<Rows>("select * from station");

    // Return the array of items
    return rows as Station[];
  }
}
export default new StationRepository();
