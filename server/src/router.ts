import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Define search bar-related route
import adressDataGouvRouter from "./routes/adressDataGouv.routes";
router.use("/", adressDataGouvRouter);

// Define database station-related route
import showStationsMap from "./routes/showStationsMap.routes";
router.use("/", showStationsMap);

// Defin register-related routes
import RegisterRouter from "./routes/formRegister.routes";
router.use("/", RegisterRouter);

// Define login to follow
import loginRouter from "./routes/login.routes";
router.use(loginRouter);

// Defin form-contact routes
import contactRouter from "./routes/formContact.routes";
router.use("/", contactRouter);

import ProfilRouter from "./routes/profile.routes";
router.use("/", ProfilRouter);
/* ************************************************************************* */

// Define database station-related route
import updateStations from "./routes/updateStations.routes";
router.use("/", updateStations);

export default router;
