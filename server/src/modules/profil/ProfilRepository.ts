import type {
  BookingProps,
  UserProps,
} from "../../../../client/src/assets/definition/lib";
import databaseClient, { type Result } from "../../../database/client";

class ProfilRepository {
  async ReadUserData(id: string) {
    const [rows] = await databaseClient.query(
      `SELECT firstName, lastName, city, photo, birthday, zipCode 
          FROM user
          WHERE email = ? `,
      [id],
    );
    return rows as UserProps[];
  }

  async UpdateUserInfo(
    user: Omit<UserProps, "id" | "password" | "confirm" | "dbpassword">,
  ) {
    const [result] = await databaseClient.query<Result>(
      `UPDATE user
        SET firstName = ?, lastName = ?,  birthday =  DATE_FORMAT(STR_TO_DATE(?, '%d/%m/%Y'), '%Y/%m/%d') ,photo = ?, city = ?, zipCode = ?
        WHERE email = ?`,
      [
        user.firstName,
        user.lastName,
        user.birthday,
        user.photo,
        user.city,
        user.zipCode,
        user.email,
      ],
    );

    return result.affectedRows;
  }

  async ReadBooking(id: string) {
    const [rows] = await databaseClient.query(
      `SELECT start_book b, end_book b, name s, address s
      FROM book AS b
      JOIN terminal AS t ON t.id = b.terminal_id
      JOIN station AS s ON s.id_station = t.station_id
      JOIN user AS u ON u.id = b.user_id
      WHERE u.email = ?;`,
      [id],
    );
    return rows as BookingProps[];
  }

  async DestroyBooking(id: number) {
    const [result] = await databaseClient.query<Result>(
      `DELETE FROM book
      WHERE id= ?`,
      [id],
    );
    return result.affectedRows;
  }
}

export default new ProfilRepository();
