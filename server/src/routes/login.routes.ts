import { verify } from "argon2";
import express from "express";
import { checkUserMail } from "../middleware/user.middleware";
import { verifyPassword } from "../middleware/verifyPassword.middleware";
import { checkAuth, login, logout } from "../modules/auth/authAction";

const router = express.Router();

router.post("/api/login", checkUserMail, verifyPassword, login);
router.get("/api/logout", logout);
router.get("/api/checkauth", checkAuth);

export default router;
