import express from "express";
import multer from "multer";

const router = express.Router();

// upload file into memory
const uploadIrve = multer({ storage: multer.memoryStorage() }).single("file");

// Define database update station-related route
import { downloadAndParse } from "../middlewares/dowloadAndParse.middleware";
import stationActions from "../modules/chargingPoints/stationActions";
import terminalActions from "../modules/chargingPoints/terminalActions";
router.post(
  "/api/admin/uploadStations",
  uploadIrve,
  downloadAndParse,
  stationActions.addAllStation,
  terminalActions.addAllTerminal,
);

export default router;
