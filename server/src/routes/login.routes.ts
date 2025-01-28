import express from "express";
import { checkUserMail } from "../middleware/user.middleware";
import { verify } from "argon2";
import { verifyPassword } from "../middleware/verifyPassword.middleware";
import authAction from "../modules/auth/authAction";

const router = express.Router();

router.post("/api/login", checkUserMail, verifyPassword, authAction.login);

export default router;
