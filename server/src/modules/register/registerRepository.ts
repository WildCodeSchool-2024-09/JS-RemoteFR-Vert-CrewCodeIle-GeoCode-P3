import type {
  BrandProps,
  ModelProps,
  SocketProps,
  UserProps,
  VehiculeProps,
} from "../../../../client/src/assets/definition/lib";
import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

class RegisterRepository {
  async createUserInfo(register: Omit<UserProps, "id">) {
    // Insert user information in DB, table user
    const [result] = await databaseClient.query<Result>(
      `INSERT INTO user (firstName, lastName, email, birthday, city, zipCode,password) 
            VALUES(?,?,?,?,?,?,?)`,
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

  // Insert vehicule user information in DB, table car
  async createVehicleInfo(register: Omit<VehiculeProps, "id">) {
    const [result] = await databaseClient.query<Result>(
      `INSERT INTO car (brand_id, model_id, socket_id)
            VALUES(?,?,?)`,
      [register.brand, register.model, register.socket],
    );
    return result.insertId;
  }

  async readUserEmail(email: string) {
    const [rows] = await databaseClient.query<Rows>(
      `SELECT *
      FROM user
      WHERE email = ?`,
      [email],
    );
    return rows[0] as UserProps;
  }

  async readAll() {
    const [rows] = await databaseClient.query<Rows>(
      `SELECT label, id 
            FROM brand`,
    );
    return rows as BrandProps[];
  }

  // Recover all mail from table user
  async readAllMail() {
    const [rows] = await databaseClient.query<Rows>(
      `SELECT email 
            FROM user`,
    );
    return rows as UserProps[];
  }

  // Recover model link to brand from table model
  async readModel(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      `SELECT m.label, m.id, m.socket_id
            FROM model AS m 
            JOIN brand AS b ON b.id = m.brand_id 
            WHERE m.brand_id = ?`,
      [id],
    );
    return rows as ModelProps[];
  }

  // Recover socket link to model from table socket
  async readSocket(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      `SELECT s.label, s.id 
            FROM socket AS s 
            JOIN model AS m ON s.id = m.socket_id 
            WHERE m.socket_id = ?`,
      [id],
    );
    return rows[0] as SocketProps;
  }
}

export default new RegisterRepository();
