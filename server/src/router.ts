import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Define item-related routes

// Defin register-related routes
import RegisterRouter from "./routes/formRegister.routes";
import ProfilRouter from "./routes/profil.routes";

router.use("/", ProfilRouter);

router.use("/", RegisterRouter);

/* ************************************************************************* */

export default router;
