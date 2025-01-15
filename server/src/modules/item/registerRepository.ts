import type {
  BrandProps,
  InputProps,
  ModelProps,
  SocketProps,
} from "../../../../client/src/assets/definition/lib";
import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

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
      "SELECT label, id FROM brand ",
    );
    return rows as BrandProps[];
  }

  async readModel(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT m.label, m.id, m.socket_id FROM model AS m JOIN brand AS b ON b.id = m.brand_id WHERE m.brand_id = ?",
      [id],
    );
    return rows as ModelProps[];
  }
  async readSocket(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT s.label, s.id FROM socket AS s JOIN model AS m ON s.id = m.socket_id WHERE m.socket_id = ?",
      [id],
    );
    return rows[0] as SocketProps;
  }
}

export default new RegisterRepository();
