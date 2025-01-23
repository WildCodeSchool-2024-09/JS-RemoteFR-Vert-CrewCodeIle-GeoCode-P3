import type {
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
}

export default new ProfilRepository();
