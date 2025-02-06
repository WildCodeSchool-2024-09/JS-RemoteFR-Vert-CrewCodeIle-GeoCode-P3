import express from "express";
import VehiculeRepository from "../modules/vehicule/VehiculeRepository";
import vehiculeAction from "../modules/vehicule/vehiculeAction";

const router = express.Router();

router.get("/api/vehicule/:id", vehiculeAction.readPrimaryUserCar);
router.post("/api/vehicule", vehiculeAction.readVehiculeInfo);
router.put("/api/vehicule/update/:id", vehiculeAction.updateUserVehiculeInfo);

router.post("/api/vehicule/add/:id", vehiculeAction.addUserVehicule);
router.get("/api/vehicule/all/:id", vehiculeAction.browseVehicule);

router.get("/api/vehicule");

export default router;
