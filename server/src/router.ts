import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Define maps-related routes

// Define search bar-related route
import adressDataGouvRouter from "./routes/adressDataGouv.routes";
router.use("/", adressDataGouvRouter);

// Define database station-related route
import showStationsMap from "./routes/showStationsMap.routes";
router.use("/", showStationsMap);

/* import stationActions from "./modules/stations/stationActions";
router.get("/api/station/", stationActions.browse); */

export default router;
