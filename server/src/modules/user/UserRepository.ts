import databaseClient from "../../../database/client";

import type { Rows } from "../../../database/client";

class UserRepository {
  async readAll() {
    const [rows] = await databaseClient.query<Rows>("SELECT * FROM contact");
    return rows;
  }
}

export default new UserRepository();
