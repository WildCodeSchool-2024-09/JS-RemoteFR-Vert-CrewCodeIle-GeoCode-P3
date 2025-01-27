import express from "express";
import multer from "multer";
import profilAction from "../modules/profil/profilAction";
import registerAction from "../modules/register/registerAction";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname.split(" ").join("_"));
  },
});
const upload = multer({ storage: storage });

const router = express.Router();

router.get("/api/profile/:id", profilAction.readUserInfo);
router.get("/api/profile/book/:id", profilAction.readReservation);
router.put(
  "/api/profile/:id",

  profilAction.EditProfil,
);
router.put(
  "/api/profile/upload/:id",
  upload.single("photo"),
  profilAction.EditPhoto,
);
router.delete("/api/profile/book/:id", profilAction.deleteBooking);

export default router;
