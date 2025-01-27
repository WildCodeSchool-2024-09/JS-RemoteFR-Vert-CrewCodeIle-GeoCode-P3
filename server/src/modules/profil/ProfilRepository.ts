import type {
  BookingProps,
  PhotoProps,
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
      JOIN station AS s ON s.id = t.station_id
      WHERE b.user_id = ?`,
      [id],
    );
    return rows as BookingProps[];
  }

  async UpdateUserInfo(
    user: Omit<UserProps, "email" | "password" | "confirm" | "photo">,
  ) {
    const [result] = await databaseClient.query<Result>(
      `UPDATE user
      SET firstName = ?, lastName = ?,  birthday = ?, city = ?, zipCode = ?
      WHERE id = ?`,
      [
        user.firstName,
        user.lastName,
        user.birthday,
        user.city,
        user.zipCode,
        user.id,
      ],
    );

    return result.affectedRows;
  }

  async UpdatePhoto(user: PhotoProps) {
    const [result] = await databaseClient.query<Result>(
      `UPDATE user
      SET photo = ?
      WHERE id = ?`,
      [user.photo, user.id],
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
