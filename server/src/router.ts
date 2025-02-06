import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Defin register-related routes
import RegisterRouter from "./routes/formRegister.routes";

router.use("/", RegisterRouter);
// Defin form-contact routes

import contactRouter from "./routes/formContact.routes";

router.use("/", contactRouter);

/* ************************************************************************* */
// Define search bar-related route
import adressDataGouvRouter from "./routes/adressDataGouv.routes";
router.use("/", adressDataGouvRouter);

// Define database station-related route
import showStationsMap from "./routes/showStationsMap.routes";
router.use("/", showStationsMap);

// Define database station-related route
import updateStations from "./routes/updateStations.routes";
router.use("/", updateStations);

//  Define database marker-related route
import marker from "./routes/marker.routes";
router.use("/", marker);

export default router;
