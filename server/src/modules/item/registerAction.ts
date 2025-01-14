import type { RequestHandler } from "express";
import Joi from "joi";
import registerRepository from "./registerRepository";

// Validation Schema with Joi
const registerSchema = Joi.object({
  firstName: Joi.string()
    .pattern(/^[A-Za-z\é\è\ê\ï-]+$/)
    .required(),
  lastName: Joi.string()
    .pattern(/^[A-Za-z\é\è\ê\ï\s-]+$/)
    .required(),
  email: Joi.string()
    .pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$/)
    .email({ minDomainSegments: 2 })
    .required(),
  birthday: { from: Joi.date() },
  city: Joi.string()
    .pattern(/^[A-Za-z\é\è\ê\ï\s-]+$/)
    .required(),
  zipCode: Joi.number().min(5).max(5).required(),
  brand: Joi.string().required(),
  model: Joi.string().required(),
  socket: Joi.string().required(),
  password: Joi.string()
    .pattern(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    )
    .required(),
  confirm: Joi.ref("password"),
});

//Validation/controls for register submission
const validate: RequestHandler = (req, res, next) => {
  const { error } = registerSchema.validate(req.body);
  if (error == null) {
    next();
  } else {
    res.status(400).json({ valdationErrors: error.details });
  }
};

// Read all brand in DataBase
const browse: RequestHandler = async (req, res, next) => {
  try {
    const brand = await registerRepository.readAll();
    res.json(brand);
  } catch (err) {
    next(err);
  }
};

// Read Model & socket assiciated to brand
const readModel: RequestHandler = async (req, res, next) => {
  try {
    const formItemId = Number(req.params.id);
    const formItem = await registerRepository.readModel(formItemId);

    if (formItem === null) {
      res.sendStatus(404);
    } else {
      res.json(formItem);
    }
  } catch (err) {
    next(err);
  }
};
const readSocket: RequestHandler = async (req, res, next) => {
  try {
    const formItemId = Number(req.params.id);
    const formItemSocket = await registerRepository.readSocket(formItemId);

    console.info(formItemId);
    if (formItemSocket === null) {
      res.sendStatus(404);
    } else {
      res.json(formItemSocket);
    }
  } catch (err) {
    next(err);
  }
};

// Add user information from ModalRegistration
const add: RequestHandler = async (req, res, next) => {
  try {
    const newRegister = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      birthday: req.body.birthday,
      city: req.body.city,
      zipCode: req.body.zipCode,
      vehicle: req.body.vehicle,
      password: req.body.password,
      confirm: req.body.confirm,
      brand: req.body.brand,
      model: req.body.model,
      socket: req.body.socket,
    };
    const insertId = await registerRepository.create(newRegister);
    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

export default { browse, readModel, add, validate, readSocket };
