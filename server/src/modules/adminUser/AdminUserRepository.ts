import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type AdminUserProps = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  birthday: string;
  city: string;
  zipCode: number;
};

class UserRepository {
  async readAll() {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT u.id AS user_id, u.firstName, u.lastName, u.birthday, u.email, u.photo, u.city, u.zipCode, c.id AS car_id, b.label AS brand_label, m.label AS model_label, s.label AS socket_label FROM user AS u LEFT JOIN user_car AS uc ON u.id = uc.user_id LEFT JOIN car AS c ON uc.car_id = c.id LEFT JOIN brand b ON c.brand_id = b.id LEFT JOIN  model m ON c.model_id = m.id LEFT JOIN socket s ON c.socket_id = s.id;",
    );
    return rows;
  }

  async update(user: AdminUserProps) {
    const { firstName, lastName, email, city, zipCode, birthday, id } = user;

    const [result] = await databaseClient.query<Result>(
      "UPDATE user SET firstname = ?, lastname = ?, birthday = ?, email = ?, city = ?, zipCode = ? WHERE id = ?",
      [firstName, lastName, birthday, email, city, zipCode, id],
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
