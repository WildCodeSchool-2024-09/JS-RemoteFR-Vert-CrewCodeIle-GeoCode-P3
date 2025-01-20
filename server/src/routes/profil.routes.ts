import express from "express";
import profilAction from "../modules/profil/profilAction";

const router = express.Router();

router.get("/api/profil/:id", profilAction.readUserInfo);

export default router;
