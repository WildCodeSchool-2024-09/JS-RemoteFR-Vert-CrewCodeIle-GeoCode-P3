import express from "express";
import VehiculeRepository from "../modules/vehicule/VehiculeRepository";
import vehiculeAction from "../modules/vehicule/vehiculeAction";

const router = express.Router();

router.get("/api/vehicule/:id", vehiculeAction.readVehiculeInfo);

export default router;
