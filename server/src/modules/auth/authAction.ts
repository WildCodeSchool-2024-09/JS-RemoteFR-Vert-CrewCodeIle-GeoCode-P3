import type { RequestHandler } from "express";

import type { UserProps } from "../../../../client/src/assets/definition/lib";
import { tokenJWT } from "../../helpers/jwt.helpers";
import { hashedPaswword } from "../../middleware/hashpassword";

const login: RequestHandler = async (req, res, next) => {
  try {
    const user: UserProps = req.body;

    const token = await tokenJWT(user);

    res
      .status(201)
      .cookie("authToken", token, {
        secure: false,
        httpOnly: true,
        maxAge: 3600000,
      })
      .json({
        message: `Bienvenu sur Geocode ${user.firstName}`,
        token: token,
      });
  } catch (e) {
    next(e);
  }
};

export default { login };
