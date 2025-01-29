import joi from "joi";
import contactFormRepository from "./contactFormRepository";

import type { RequestHandler } from "express";

const add: RequestHandler = async (req, res, next) => {
  try {
    const newContactForm = {
      id: Number.parseInt(req.params.id),
      lastname: req.body.lastname,
      firstname: req.body.firstname,
      email: req.body.email,
      subject: req.body.subject,
      message: req.body.message,
    };

    const insertId = await contactFormRepository.create(newContactForm);

    res.sendStatus(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

const browse: RequestHandler = async (req, res, next) => {
  try {
    const messages = await contactFormRepository.readAll();

    res.status(200).json(messages);
  } catch (err) {
    next(err);
  }
};

const editIsTreated: RequestHandler = async (req, res, next) => {
  try {
    const message = {
      id: Number.parseInt(req.params.id),
      is_treated: req.body.newStatus.is_treated,
    };

    const affectedRows = await contactFormRepository.updateIsTreated(message);
    if (affectedRows > 0) {
      res.sendStatus(204);
    } else {
      res.status(404).json("Une erreur est survenue lors de la modification.");
    }
  } catch (err) {
    next(err);
  }
};

const destroyMessage: RequestHandler = async (req, res, next) => {
  try {
    const messageId = Number.parseInt(req.params.id);

    await contactFormRepository.deleteMessage(messageId);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

const formSchema = joi.object({
  lastname: joi.string().min(3).max(20).required(),
  firstname: joi.string().min(3).max(20).required(),
  email: joi.string().email().min(7).max(50).required(),
  subject: joi.string().max(50).required(),
  message: joi.string().min(30).max(1000).required(),
});

const validate: RequestHandler = (req, res, next) => {
  const { error } = formSchema.validate(req.body, { abortEarly: false });

  if (error) {
    const validationErrors = error?.details.map((err) => err.message);
    res.sendStatus(400).json({ validationErrors });
  }
  next();
};

export default { add, browse, editIsTreated, destroyMessage, validate };
