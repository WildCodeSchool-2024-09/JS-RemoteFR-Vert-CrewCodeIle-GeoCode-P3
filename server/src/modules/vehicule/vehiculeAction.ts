import type { RequestHandler } from "express";
import type { UserVehiculeProps } from "../../../../client/src/assets/definition/lib";
import VehiculeRepository from "./VehiculeRepository";

const readVehiculeInfo: RequestHandler = async (req, res, next) => {
  try {
    const userId = Number(req.params.id);

    const vehiculeInfo: UserVehiculeProps[] =
      await VehiculeRepository.readUserVehicule(userId);
    console.info(vehiculeInfo);
    if (vehiculeInfo.length > 0) {
      res.status(201).json({ vehiculeInfo });
    } else {
      res.status(400).json({ message: "Aucun véhicule enregistré" });
    }
  } catch (e) {
    next(e);
  }
};

export default { readVehiculeInfo };
