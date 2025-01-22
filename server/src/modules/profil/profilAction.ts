import type { RequestHandler } from "express";
import profilRepository from "./profilRepository";
import { userInfo } from "node:os";

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

const EditProfil: RequestHandler = async (req, res, next) => {
  try {
    const UserInfo = {
      id: Number(req.params.id),
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      birthday: req.body.birthday,
      photo: req.body.photo,
      city: req.body.city,
      zipCode: Number(req.body.zipCode),
    };

    const affectedRows = await profilRepository.UpdateUserInfo(UserInfo);

    if (affectedRows === 0) {
      res.sendStatus(404);
    } else {
      res.sendStatus(201);
    }
  } catch (err) {
    next(err);
  }
};
export default { readUserInfo, EditProfil };
