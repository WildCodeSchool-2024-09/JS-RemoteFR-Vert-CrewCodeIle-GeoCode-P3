import argon from "argon2";
import type { RequestHandler } from "express";

export const verifyPassword: RequestHandler = async (req, res, next) => {
  try {
    const { dbpassword, password } = req.body;

    const checkPassword = await argon.verify(dbpassword, password);

    if (checkPassword) {
      res.status(201);
    } else {
      res.status(403).json({ message: "Password ou email incorrect" });
    }

    next();
  } catch (e) {
    next(e);
  }
};
