import type { RequestHandler } from "express";
import { hashPasswordHelpers } from "../helpers/hashPassword.helpers";

export const hashedPaswword: RequestHandler = async (req, res, next) => {
  try {
    const { password } = req.body;
    const newPassword = await hashPasswordHelpers(password);

    if (newPassword) {
      req.body.password = newPassword;
    }
    next();
  } catch (e) {
    next(e);
  }
};
