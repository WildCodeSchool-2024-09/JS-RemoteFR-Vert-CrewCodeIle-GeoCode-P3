import express from "express";
import { upload } from "../middlewares/multer.middelware";
import profilAction from "../modules/profil/profilAction";

const router = express.Router();

router.get("/api/profile/:id", profilAction.readUserInfo);

router.put(
  "/api/profile/:id",
  upload.single("photo"),
  profilAction.validateUser,
  profilAction.EditProfil,
);

export default router;
