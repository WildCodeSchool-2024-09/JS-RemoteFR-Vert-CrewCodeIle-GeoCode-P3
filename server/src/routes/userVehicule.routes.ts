import express from "express";
import VehiculeRepository from "../modules/vehicule/VehiculeRepository";
import vehiculeAction from "../modules/vehicule/vehiculeAction";

const router = express.Router();

router.get("/api/vehicule/:id", vehiculeAction.readVehiculeInfo);
router.post("/api/vehicule", vehiculeAction.readVehiculeInfo);
router.put("/api/update/vehicule/:id", vehiculeAction.updateUserVehiculeInfo);

router.post("/api/add/vehicule/:id", vehiculeAction.addUserVehicule);
router.get("/api/all/vehicule/:id", vehiculeAction.browseVehicule);

export default router;
