import type { RequestHandler } from "express";
import type { UserVehiculeProps } from "../../../../client/src/assets/definition/lib";
import VehiculeRepository from "./VehiculeRepository";

const readVehiculeInfo: RequestHandler = async (req, res, next) => {
  try {
    const { userId, vehiculeId } = req.body;

    const vehiculeInfo: UserVehiculeProps[] =
      await VehiculeRepository.readUserVehicule(userId, vehiculeId);

    if (vehiculeInfo.length > 0) {
      res.status(201).json(vehiculeInfo);
    } else {
      res.status(400).json({ message: "Aucun véhicule enregistré" });
    }
  } catch (e) {
    next(e);
  }
};
const updateUserVehiculeInfo: RequestHandler = async (req, res, next) => {
  try {
    const vehiculeInfo = req.body;

    const newVehicule =
      await VehiculeRepository.updateUserVehicule(vehiculeInfo);
    console.info(newVehicule);
    if (newVehicule) {
      res.status(201).json({ message: "Le véhicule a bien été modifié" });
    }
  } catch (e) {
    next(e);
  }
};

const addUserVehicule: RequestHandler = async (req, res, next) => {
  try {
    const vehiculeInfo = req.body;
    const userId = Number(req.params.id);

    const newVehiculeId =
      await VehiculeRepository.createNewVehicule(vehiculeInfo);
    const insertVehiculeId = await VehiculeRepository.createNewUserCar(
      userId,
      newVehiculeId,
    );
    console.info(userId);
    if (insertVehiculeId) {
      res.status(201).json({ message: "Le véhicule à bien été ajouté" });
    } else {
      res.status(400).json({
        message: "Un problème est survenu, veuillez rééssayer ultérieurement",
      });
    }
  } catch (e) {
    next(e);
  }
};
const browseVehicule: RequestHandler = async (req, res, next) => {
  try {
    const userId = Number(req.params.id);

    const allUserVehicule = await VehiculeRepository.readAllVehicule(userId);

    if (allUserVehicule.length === 0) {
      res.status(400).json({ message: "Aucun véhicule trouvé" });
    } else {
      res.json(allUserVehicule);
    }
  } catch (e) {
    next(e);
  }
};

export default {
  readVehiculeInfo,
  updateUserVehiculeInfo,
  addUserVehicule,
  browseVehicule,
};
