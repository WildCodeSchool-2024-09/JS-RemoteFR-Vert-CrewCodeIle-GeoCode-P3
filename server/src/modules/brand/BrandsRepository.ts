import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type VehiculeProps = {
  id_brand: number;
  id_socket: number;
  id_model: number;
  brand: string;
  model: string;
  socket: string;
  is_brand_delete?: boolean;
  is_socket_delete?: boolean;
};

class BrandsRepository {
  async readAll() {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT m.id AS id_model, b.id AS id_brand, s.id AS id_socket, b.label AS brand, m.label AS model, s.label AS socket FROM brand AS b JOIN model AS m ON b.id=m.brand_id JOIN socket AS s ON s.id=m.socket_id ORDER BY brand",
    );
    return rows;
  }

  async create(brandAndModel: VehiculeProps) {
    const { brand, model, socket, id_brand, id_socket, id_model } =
      brandAndModel;
    let resultBrand = null;
    let resultModel = null;
    let resultSocket = null;

    if (id_brand < 0) {
      const [brandResult] = await databaseClient.query<Result>(
        "INSERT INTO brand (label) VALUE (?);",
        [brand],
      );
      resultBrand = brandResult.insertId;
    }

    if (id_socket < 0) {
      const [socketResult] = await databaseClient.query<Result>(
        "INSERT INTO socket (label) VALUE (?);",
        [socket],
      );
      resultSocket = socketResult.insertId;
    }

    if (model !== null) {
      if (id_brand < 0 && id_socket < 0) {
        //
        await databaseClient.query<Result>("SET FOREIGN_KEY_CHECKS=0");
        const [modelResult] = await databaseClient.query<Result>(
          "INSERT INTO model (label, brand_id, socket_id) VALUE (?, ?, ?);",
          [model, resultBrand, resultSocket],
        );
        await databaseClient.query<Result>("SET FOREIGN_KEY_CHECKS=1");
        resultModel = modelResult.insertId;
        //
      } else if (id_brand < 0 && id_socket >= 0) {
        //
        await databaseClient.query<Result>("SET FOREIGN_KEY_CHECKS=0");
        const [modelResult] = await databaseClient.query<Result>(
          "INSERT INTO model (label, brand_id, socket_id) VALUE (?, ?, ?);",
          [model, resultBrand, id_socket],
        );
        await databaseClient.query<Result>("SET FOREIGN_KEY_CHECKS=1");
        resultModel = modelResult.insertId;
        //
      } else if (id_brand >= 0 && id_socket < 0) {
        //
        await databaseClient.query<Result>("SET FOREIGN_KEY_CHECKS=0");
        const [modelResult] = await databaseClient.query<Result>(
          "INSERT INTO model (label, brand_id, socket_id) VALUE (?, ?, ?);",
          [model, id_brand, resultSocket],
        );
        await databaseClient.query<Result>("SET FOREIGN_KEY_CHECKS=1");
        resultModel = modelResult.insertId;
        //
      } else if (id_brand >= 0 && id_socket >= 0) {
        //
        await databaseClient.query<Result>("SET FOREIGN_KEY_CHECKS=0");
        const [modelResult] = await databaseClient.query<Result>(
          "INSERT INTO model (label, brand_id, socket_id) VALUE (?, ?, ?);",
          [model, id_brand, id_socket],
        );
        await databaseClient.query<Result>("SET FOREIGN_KEY_CHECKS=1");
        resultModel = modelResult.insertId;
        //
      }
    }

    return {
      id_brand: id_brand >= 0 ? id_brand : resultBrand,
      id_model: id_model >= 0 ? id_model : resultModel,
      id_socket: id_socket >= 0 ? id_socket : resultSocket,
    };
  }

  async deleteVehicle(vehicle: VehiculeProps) {
    const { id_model, id_brand, id_socket, is_brand_delete, is_socket_delete } =
      vehicle;
    let resultModel = null;
    let resultSocket = null;
    let resultBrand = null;

    const [modelResult] = await databaseClient.query<Result>(
      "DELETE from model WHERE id = ?",
      [id_model],
    );
    resultModel = modelResult;

    if (is_brand_delete === true) {
      const [brandResult] = await databaseClient.query<Result>(
        "DELETE from brand WHERE id = ?",
        [id_brand],
      );
      resultBrand = brandResult;
    }

    if (is_socket_delete === true) {
      const [socketResult] = await databaseClient.query<Result>(
        "DELETE from socket WHERE id = ?",
        [id_socket],
      );
      resultSocket = socketResult;
    }

    return {
      brand: resultBrand,
      model: resultModel,
      socket: resultSocket,
    };
  }
}

export default new BrandsRepository();
