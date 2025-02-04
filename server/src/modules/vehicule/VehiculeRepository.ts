import type { UserVehiculeProps } from "../../../../client/src/assets/definition/lib";
import databaseClient, { type Rows } from "../../../database/client";

class VehiculeRepository {
  async readUserVehicule(id: number) {
    const [rows] = await databaseClient.query(
      `SELECT b.label AS brand, m.label AS model, s.label AS socket
            FROM user_car AS u
            JOIN car AS c ON c.id = u.car_id
            JOIN brand AS b ON b.id = c.brand_id
            JOIN model AS m ON m.id = c.model_id
            JOIN socket AS s ON s.id = c.socket_id
            WHERE user_id = ?;

        `,
      [id],
    );
    return rows as UserVehiculeProps[];
  }
}

export default new VehiculeRepository();
