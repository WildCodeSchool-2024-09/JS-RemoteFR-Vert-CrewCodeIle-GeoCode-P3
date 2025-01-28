import type { RequestHandler } from "express";

import type { UserProps } from "../../../../client/src/assets/definition/lib";
import { tokenJWT } from "../../helpers/jwt.helpers";

const login: RequestHandler = async (req, res, next) => {
  const user: UserProps = req.body;

  const token = await tokenJWT(user);

  res
    .status(201)
    .cookie("auth_token", token, {
      secure: false,
      httpOnly: true,
      maxAge: 3600000,
    })
    .json({ message: `Bienvenu sur Geocode ${req.body.firstName}` });
  console.info("ok3");
};

export default { login };
