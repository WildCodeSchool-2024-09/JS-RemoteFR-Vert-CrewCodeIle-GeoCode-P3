import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";
import type { InputProps } from "../../../../client/src/assets/definition/lib";

class RegisterRepository {
  async create(register: Omit<InputProps, "id">) {
    // VOIR INSERTION DANS BRAND / MODEL / SOCKET
    const [result] = await databaseClient.query<Result>(
      "INSERT INTO user (firstName, lastName, email, birthday, city, zipcode,password) values(?,?,?,?,?,?,?) JOIN",
      [
        register.firstName,
        register.lastName,
        register.email,
        register.birthday,
        register.city,
        register.zipCode,
        register.password,
      ],
    );
    return result.insertId;
  }
  async readAll() {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT b.label FROM brand AS b",
    );
    return rows as InputProps[];
  }

  async read(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT m.label, s.label FROM model AS m JOIN brand AS b ON b.id = m.brand_id JOIN socket AS s ON s.id = m.socket_id WHERE id = ?",
      [id],
    );
    return rows[0] as InputProps;
  }
}

export default new RegisterRepository();
