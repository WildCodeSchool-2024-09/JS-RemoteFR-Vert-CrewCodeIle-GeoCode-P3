import express from "express";
import profilAction from "../modules/profil/profilAction";

const router = express.Router();

router.get("/api/profil/:id", profilAction.readUserInfo);
router.put("/api/profil/:id", profilAction.EditProfil);

export default router;
