import { verify } from "argon2";
import express from "express";
import { checkUserMail } from "../middlewares/user.middleware";
import { verifyPassword } from "../middlewares/verifyPassword.middleware";
import authAction from "../modules/auth/authAction";

const router = express.Router();

router.post("/api/login", checkUserMail, verifyPassword, authAction.login);

export default router;
