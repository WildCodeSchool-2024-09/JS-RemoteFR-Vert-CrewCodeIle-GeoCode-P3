import express from "express";
import multer from "multer";
import profilAction from "../modules/profil/profilAction";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

const router = express.Router();

router.get("/api/profile/:id", profilAction.readUserInfo);
router.put("/api/profile/:id", upload.single("photo"), profilAction.EditProfil);

export default router;
