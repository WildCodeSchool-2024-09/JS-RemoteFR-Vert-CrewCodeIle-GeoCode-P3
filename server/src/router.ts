import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Define item-related routes

// Defin register-related routes
import RegisterRouter from "./routes/formRegister.routes";

router.use("/", RegisterRouter);

/* ************************************************************************* */

export default router;
