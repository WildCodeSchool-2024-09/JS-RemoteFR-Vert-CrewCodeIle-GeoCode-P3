import type { RequestHandler } from "express";
import VehiculeRepository from "./VehiculeRepository";

const readVehiculeInfo: RequestHandler = async (req, res, next) => {
  const userId = Number(req.params.id);

  const vehiculeInfo = await VehiculeRepository.readUserVehicule(userId);
};
