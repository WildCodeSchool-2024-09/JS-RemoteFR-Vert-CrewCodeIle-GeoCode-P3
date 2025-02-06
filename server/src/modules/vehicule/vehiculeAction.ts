import type { RequestHandler } from "express";
import type { UserVehiculeProps } from "../../../../client/src/assets/definition/lib";
import VehiculeRepository from "./VehiculeRepository";

const readVehiculeInfo: RequestHandler = async (req, res, next) => {
  try {
    const { userMail, vehiculeId } = req.body;
    const UserId = await VehiculeRepository.readUserByEmail(userMail);

    const vehiculeInfo: UserVehiculeProps[] =
      await VehiculeRepository.readUserVehicule(UserId, vehiculeId);
    if (vehiculeInfo.length > 0) {
      res.status(201).json(vehiculeInfo);
    } else {
      res.status(400).json({ message: "Aucun véhicule enregistré" });
    }
  } catch (e) {
    next(e);
  }
};
const readPrimaryUserCar: RequestHandler = async (req, res, next) => {
  try {
    const { userMail } = req.body;
    const UserId = await VehiculeRepository.readUserByEmail(userMail);

    const vehiculeInfo: UserVehiculeProps[] =
      await VehiculeRepository.readPrimaryCar(UserId);
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
    const { carId, ...userVehicule } = req.body;

    const mail = req.params.id;

    const newVehicule = await VehiculeRepository.updateUserVehicule(
      userVehicule,
      mail,
      carId,
    );
    console.info(userVehicule);
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
    const userMail = req.params.id;

    const newVehiculeId =
      await VehiculeRepository.createNewVehicule(vehiculeInfo);
    const userId = await VehiculeRepository.readUserByEmail(userMail);
    const insertVehiculeId = await VehiculeRepository.createNewUserCar(
      Number(userId),
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
    const userMail = req.params.id;

    const userId = await VehiculeRepository.readUserByEmail(userMail);

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
  readPrimaryUserCar,
  updateUserVehiculeInfo,
  addUserVehicule,
  browseVehicule,
};
