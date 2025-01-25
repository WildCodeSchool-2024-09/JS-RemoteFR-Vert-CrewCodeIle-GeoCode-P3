import type { RequestHandler } from "express";
import profilRepository from "./ProfilRepository";

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

const readReservation: RequestHandler = async (req, res, next) => {
  try {
    const userId = Number(req.params.id);

    const bookInfo = await profilRepository.ReadBooking(userId);

    if (bookInfo === null) {
      res.status(404).json({ message: "Aucune réservation" });
    } else {
      res.json(bookInfo);
    }
  } catch (e) {
    next(e);
  }
};

const EditProfil: RequestHandler = async (req, res, next) => {
  try {
    const UserInfo = {
      id: Number(req.params.id),
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      birthday: req.body.birthday,
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

const EditPhoto: RequestHandler = async (req, res, next) => {
  try {
    const userPhoto = {
      photo: req.file?.filename,
      id: Number(req.params.id),
    };
    const affectedRows = await profilRepository.UpdatePhoto(userPhoto);
    if (affectedRows === 0) {
      res.sendStatus(404);
    } else {
      res.sendStatus(201);
    }
  } catch (err) {
    next(err);
  }
};
export default { readUserInfo, EditProfil, EditPhoto, readReservation };
