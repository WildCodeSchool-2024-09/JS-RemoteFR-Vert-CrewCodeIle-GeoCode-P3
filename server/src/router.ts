import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Defin register-related routes
import RegisterRouter from "./routes/formRegister.routes";
import ProfileRouter from "./routes/profile.routes";

router.use("/", ProfileRouter);

router.use("/", RegisterRouter);
// Defin form-contact routes

import contactRouter from "./routes/formContact.routes";

router.use("/", contactRouter);

/* ************************************************************************* */

export default router;
