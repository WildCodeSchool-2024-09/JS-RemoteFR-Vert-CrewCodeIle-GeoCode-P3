import getAge from "../../helpers/getAge.helpers";
import getBirthdate from "../../helpers/getBirthdate.helpers";
import UserRepository from "./AdminUserRepository";

import type { RequestHandler } from "express";
import joi from "joi";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const usersList = await UserRepository.readAll();

    if (usersList) {
      usersList.map((e) => {
        e.age = getAge(e?.birthday);
        e.birthday = getBirthdate(e?.birthday);
      });

      res.status(200).json(usersList);
    }
  } catch (err) {
    next(err);
  }
};

const edit: RequestHandler = async (req, res, next) => {
  try {
    const user = req.body;

    const affectedRows = await UserRepository.update(user);

    if (affectedRows === 0) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    next(err);
  }
};

const destroy: RequestHandler = async (req, res, next) => {
  try {
    const userId = Number.parseInt(req.params.id);
    await UserRepository.delete(userId);

    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

// User validation Schema with Joi
const now = Date.now();
const minLegalAge = new Date(now - 1000 * 60 * 60 * 24 * 365 * 18);
const userRegisterSchema = joi.object({
  firstname: joi
    .string()
    .pattern(/^[A-Za-z\é\è\ê\ï-]+$/)
    .required(),
  lastname: joi
    .string()
    .pattern(/^[A-Za-z\é\è\ê\ï\s-]+$/)
    .required(),
  birthday: joi.date().max(minLegalAge).required(),
  email: joi
    .string()
    .pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$/)
    .required(),
  city: joi
    .string()
    .pattern(/^[A-Za-z\é\è\ê\ï\s-]+$/)
    .required(),
  zipcode: joi.number().integer().required(),
  id: joi.number().integer().required(),
});

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

export default { browse, edit, destroy, validateUser };
