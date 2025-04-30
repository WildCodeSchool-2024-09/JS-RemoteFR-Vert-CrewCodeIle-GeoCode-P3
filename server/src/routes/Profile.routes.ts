import express from "express";
import { upload } from "../middlewares/multer.middelware";
import profilAction from "../modules/profil/profilAction";

const router = express.Router();

router.get("/api/profile/:id", profilAction.readUserInfo);
router.get("/api/profile/book/:id", profilAction.readReservation);
router.put(
  "/api/profile/:id",
  upload.single("photo"),
  profilAction.validateUser,
  profilAction.EditProfil,
);

router.delete("/api/profile/book/:id", profilAction.deleteBooking);

export default router;
