import type { RequestHandler } from "express";

import jwt, { type JwtPayload } from "jsonwebtoken";
import type { UserProps } from "../../../../client/src/assets/definition/lib";
import { tokenJWT } from "../../helpers/jwt.helpers";
import registerRepository from "../register/registerRepository";

export const login: RequestHandler = async (req, res, next) => {
  try {
    const user: UserProps = req.body;

    const token = await tokenJWT(user);
    const decodeJwt = jwt.decode(token) as JwtPayload;
    res
      .status(201)
      .cookie("authToken", token, {
        secure: false,
        httpOnly: true,
        maxAge: 3600000,
      })
      .json({
        message: "Bienvenu sur Geocode",
        email: decodeJwt.email,
        role: decodeJwt.role,
      });
  } catch (e) {
    next(e);
  }
};

export const checkAuth: RequestHandler = async (req, res, next) => {
  try {
    const token = req.cookies.authToken;

    if (!token) {
      res.status(403).json({ authentification: false });
    }

    const verify = jwt.verify(token, process.env.APP_SECRET as string);

    if (!verify) {
      res.status(403).json({ authentification: false });
    }

    const decodeJwt = jwt.decode(token) as JwtPayload;

    if (decodeJwt.email) {
      const email = decodeJwt.email;

      const checkRole = await registerRepository.checkRoleUser(email);

      if (checkRole) {
        res.status(200).json({ email, checkRole, authentification: true });
      }
    } else {
      res.sendStatus(403).json({ authentification: false });
    }
  } catch (e) {
    next(e);
  }
};

export const logout: RequestHandler = (req, res) => {
  res.clearCookie("authToken");

  res.json({ message: "Logout", authentification: false });
};
