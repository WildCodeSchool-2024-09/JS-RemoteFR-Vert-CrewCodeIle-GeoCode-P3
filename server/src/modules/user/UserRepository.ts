import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type AdminUserProps = {
  id: number;
  age: string;
  firstname: string;
  lastname: string;
  birthday: string;
  email: string;
  city: string;
  zipcode: number;
};

class UserRepository {
  async readAll() {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT birthday, city, email, firstname, id, lastname, zipcode FROM user",
    );
    return rows;
  }

  async update(user: AdminUserProps) {
    const { firstname, lastname, email, city, zipcode, birthday, id } = user;

    const [result] = await databaseClient.query<Result>(
      "UPDATE user SET firstName = ?, lastName = ?, birthday = ?, email = ?, city = ?, zipCode = ? WHERE id = ?",
      [firstname, lastname, birthday, email, city, zipcode, id],
    );

    return result.affectedRows;
  }

  async delete(userId: number) {
    const [result] = await databaseClient.query<Result>(
      "DELETE FROM user WHERE id = ?",
      [userId],
    );

    return result.affectedRows;
  }
}

export default new UserRepository();
