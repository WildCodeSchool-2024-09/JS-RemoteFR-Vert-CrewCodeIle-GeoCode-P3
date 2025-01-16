import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Define item-related routes
import itemActions from "./modules/item/itemActions";

router.get("/api/items", itemActions.browse);
router.get("/api/items/:id", itemActions.read);
router.post("/api/items", itemActions.add);

// Defin register-related routes
import registerAction from "./modules/item/registerAction";
router.get("/api/register", registerAction.browseBrand);
router.get("/api/register/mail", registerAction.browseMail);
router.get("/api/register/:id", registerAction.readModel);
router.get("/api/register/socket/:id", registerAction.readSocket);
router.post(
  "/api/register",
  registerAction.validateUser,
  registerAction.addUserInfo,
);
router.post(
  "/api/register/vehicule",
  registerAction.validateVehicule,
  registerAction.addVehicleInfo,
);

/* ************************************************************************* */

export default router;
