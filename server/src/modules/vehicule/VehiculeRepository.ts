import type {
  UserVehiculeProps,
  VehiculeProps,
} from "../../../../client/src/assets/definition/lib";
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

  async updateUserVehicule(userVehicule: VehiculeProps) {
    const { brand, model, socket } = userVehicule;
    const insertId = await databaseClient.query(
      `UPDATE car
      JOIN user_car AS u ON u.car_id = car.id
  SET brand_id = ?, model_id = ?, socket_id = ?
  WHERE u.user_id = 15;`,
      [brand, model, socket],
    );
    return insertId;
  }
}

export default new VehiculeRepository();
