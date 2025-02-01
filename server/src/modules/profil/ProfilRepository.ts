import type {
  BookingProps,
  UserProps,
} from "../../../../client/src/assets/definition/lib";
import databaseClient, { type Result } from "../../../database/client";

class ProfilRepository {
  async ReadUserData(id: number) {
    const [rows] = await databaseClient.query(
      `SELECT firstName, lastName, city, photo, birthday, zipCode 
        FROM user
        WHERE id = ? `,
      [id],
    );
    return rows as UserProps[];
  }

  async ReadBooking(id: number) {
    const [rows] = await databaseClient.query(
      `SELECT start_book b, end_book b, name s, address s
      FROM book AS b
      JOIN terminal AS t ON t.id = b.terminal_id
      JOIN station AS s ON s.id_station = t.station_id
      WHERE b.user_id = ?`,
      [id],
    );
    return rows as BookingProps[];
  }

  async UpdateUserInfo(
    user: Omit<UserProps, "email" | "password" | "confirm">,
  ) {
    const [result] = await databaseClient.query<Result>(
      `UPDATE user
      SET firstName = ?, lastName = ?,  birthday =  DATE_FORMAT(STR_TO_DATE(?, '%d/%m/%Y'), '%Y/%m/%d') ,photo = ?, city = ?, zipCode = ?
      WHERE id = ?`,
      [
        user.firstName,
        user.lastName,
        user.birthday,
        user.photo,
        user.city,
        user.zipCode,
        user.id,
      ],
    );

    return result.affectedRows;
  }

  async DestroyBooking(id: number) {
    const [result] = await databaseClient.query<Result>(
      `DELETE FROM BOOk
      WHERE id= ?`,
      [id],
    );
    result.affectedRows;
  }
}

export default new ProfilRepository();
