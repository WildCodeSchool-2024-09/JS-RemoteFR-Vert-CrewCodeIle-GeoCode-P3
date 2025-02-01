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

const MAX_SIZE = 10000000;
const upload = multer({
  storage: storage,
  limits: { fileSize: MAX_SIZE },
  fileFilter: (req, file, cb) => {
    const MIME_TYPE = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
    const fileType = MIME_TYPE.includes(file.mimetype);
    if (fileType) {
      cb(null, true); // Accepte le fichier
    } else {
      cb(new Error("Format non accepté")); // Rejette le fichier
    }
  },
});

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
