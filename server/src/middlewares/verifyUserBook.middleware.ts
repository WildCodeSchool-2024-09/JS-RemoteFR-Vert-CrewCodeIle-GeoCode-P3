import type { RequestHandler } from "express";
import type { UserProps } from "../../../client/src/assets/definition/lib";
import registerRepository from "../modules/register/registerRepository";

export const verifyUserBook: RequestHandler = async (req, res, next) => {
  try {
    const { user_id } = req.body;
    if (user_id) {
      const verifMail: UserProps =
        await registerRepository.readUserEmail(user_id);
      req.body.user_id = verifMail.id;
      next();
    } else {
      res.status(500).json("Erreur dans le traitement du fichier !");
    }
  } catch (err) {
    next(err);
  }
};
