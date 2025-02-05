import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type VehiculeProps = {
  id_brand: number;
  id_socket: number;
  id_model: number;
  brand: string;
  model: string;
  socket: string;
};

class BrandsRepository {
  async readAll() {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT m.id AS id_model, b.id AS id_brand, s.id AS id_socket, b.label AS brand, m.label AS model, s.label AS socket FROM brand AS b JOIN model AS m ON b.id=m.brand_id JOIN socket AS s ON s.id=m.socket_id ORDER BY brand",
    );
    return rows;
  }

  async update(brandAndModel: VehiculeProps) {
    const { brand, model, socket, id_brand, id_socket, id_model } =
      brandAndModel;
    const [resultBrand] = await databaseClient.query<Result>(
      "UPDATE brand SET label=? WHERE id=?",
      [brand, id_brand],
    );
    const [resultSocket] = await databaseClient.query<Result>(
      "UPDATE socket SET label=? WHERE id=?",
      [socket, id_socket],
    );
    const [resultModel] = await databaseClient.query<Result>(
      "UPDATE model SET label=? WHERE id=?",
      [model, id_model],
    );

    return (
      resultBrand.affectedRows +
      resultSocket.affectedRows +
      resultModel.affectedRows
    );
  }
}

export default new BrandsRepository();
