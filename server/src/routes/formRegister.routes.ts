import express from "express";

import registerAction from "../modules/register/registerAction";

const router = express.Router();

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

export default router;
