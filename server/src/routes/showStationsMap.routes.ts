import express from "express";

const router = express.Router();

// Define database station-related route
import stationActions from "../modules/stations/stationActions";
router.get("/api/station/", stationActions.browse);

export default router;
