import type { RequestHandler } from "express";
import profilRepository from "./profilRepository";

const readUserInfo: RequestHandler = async (req, res, next) => {
  try {
    const userId = Number(req.params.id);
    const userInfo = await profilRepository.ReadUserData(userId);
    if (userInfo === null) {
      res.sendStatus(404);
    } else {
      res.json(userInfo);
    }
  } catch (err) {
    next(err);
  }
};

export default { readUserInfo };
