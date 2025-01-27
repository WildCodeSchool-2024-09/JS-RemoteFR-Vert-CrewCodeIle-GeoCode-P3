import type { RequestHandler } from "express";
import profilRepository from "./ProfilRepository";
import joi from "joi";

const now = Date.now();
const minLegalAge = new Date(now - 1000 * 60 * 60 * 24 * 365 * 18);
const userRegisterSchema = joi.object({
  firstName: joi
    .string()
    .pattern(/^[A-Za-z\é\è\ê\ï-]+$/)
    .required(),
  lastName: joi
    .string()
    .pattern(/^[A-Za-z\é\è\ê\ï\s-]+$/)
    .required(),
  birthday: joi.date().max(minLegalAge).required(),
  city: joi
    .string()
    .pattern(/^[A-Za-z\é\è\ê\ï\s-]+$/)
    .required(),
  zipCode: joi.number().integer().required(),
});

// Vehicule validation Schema with Joi

//Validation for register submission
const validateUser: RequestHandler = (req, res, next) => {
  const { error } = userRegisterSchema.validate(req.body, {
    abortEarly: false,
  });
  if (error == null) {
    next();
  } else {
    res.status(400).json({ valdationErrors: error.details });
  }
};

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

const deleteBooking: RequestHandler = async (req, res, next) => {
  try {
    const bookId = Number(req.params.id);

    const affectedRows = await profilRepository.DestroyBooking(bookId);

    res.sendStatus(204).json({ message: "La réservation a bien été annulée" });
  } catch (e) {}
};

export default {
  readUserInfo,
  EditProfil,
  EditPhoto,
  readReservation,
  deleteBooking,
  validateUser,
};
