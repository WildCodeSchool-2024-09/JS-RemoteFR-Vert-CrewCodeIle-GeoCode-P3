import type { RequestHandler } from "express";
import registerRepository from "../modules/register/registerRepository";
import type { UserProps } from "../../../client/src/assets/definition/lib";

export const checkUserMail: RequestHandler = async (req, res, next) => {
  try {
    const { email } = req.body;

    const verifMail: UserProps = await registerRepository.readUserEmail(email);

    if (verifMail) {
      res.status(201);
      console.info("ok");
    } else {
      res.status(404);
    }
    req.body.dbpassword = verifMail.password;
  } catch (e) {
    next(e);
  }
};
