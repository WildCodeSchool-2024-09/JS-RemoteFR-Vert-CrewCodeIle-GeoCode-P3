import databaseClient from "../../../database/client";

class VehiculeRepository {
  async readUserVehicule(id: number) {
    const [rows] = await databaseClient.query(
      `SELECT b.label, m.label, s.label
        FROM user_car AS u
        JOIN car AS c ON car.id = u.car_id
        JOIN brand AS b ON b.id = c.brand_id
        JOIN model AS m ON m.id = c.model_id
        JOIN socket AS s ON s.id = c.socket_id
        WHERE user_id = ?
        `,
      [id],
    );
    return [rows];
  }
}

export default new VehiculeRepository();
