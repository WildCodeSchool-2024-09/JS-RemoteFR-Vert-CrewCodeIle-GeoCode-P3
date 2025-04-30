import express from "express";

const router = express.Router();

// Define database station-related route
import stationActions from "../modules/chargingPoints/stationActions";
router.get("/api/stations", stationActions.browse);

export default router;
