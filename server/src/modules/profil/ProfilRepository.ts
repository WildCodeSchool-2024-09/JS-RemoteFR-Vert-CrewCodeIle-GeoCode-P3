import type { UserProps } from "../../../../client/src/assets/definition/lib";
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
    user: Omit<UserProps, "email" | "password" | "confirm">,
  ) {
    const [result] = await databaseClient.query<Result>(
      `UPDATE user
      SET firstName = ?, lastName = ?, photo = ?, birthday = ?, city = ?, zipCode = ?
      WHERE id = ?`,
      [
        user.firstName,
        user.lastName,
        user.photo,
        user.birthday,
        user.city,
        user.zipCode,
        user.id,
      ],
    );
    console.info(user.city);
    return result.affectedRows;
  }
}

export default new ProfilRepository();
