import type { UserProps } from "../../../../client/src/assets/definition/lib";
import databaseClient from "../../../database/client";

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
}

export default new ProfilRepository();
