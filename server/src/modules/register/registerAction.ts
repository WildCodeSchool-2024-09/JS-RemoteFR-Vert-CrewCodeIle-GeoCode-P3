import type { RequestHandler } from "express";
import joi, { number } from "joi";
import registerRepository from "./registerRepository";

// User validation Schema with Joi
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
  email: joi
    .string()
    .pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$/)
    .required(),
  city: joi
    .string()
    .pattern(/^[A-Za-z\é\è\ê\ï\s-]+$/)
    .required(),
  zipCode: joi.number().integer().required(),
  password: joi
    .string()
    .pattern(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    )
    .required(),
  confirm: joi.ref("password"),
});

// Vehicule validation Schema with Joi
const userVehiculeSchema = joi.object({
  brand: joi.number().required(),
  model: joi.number().required(),
  socket: joi.number().required(),
  userId: joi.number(),
});

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

//Validation for register submission
const validateVehicule: RequestHandler = (req, res, next) => {
  const { error } = userVehiculeSchema.validate(req.body, {
    abortEarly: false,
  });
  if (error == null) {
    next();
  } else {
    res.status(400).json({ valdationErrors: error.details });
  }
};

// browse all brand in DataBase from table brand
const browseBrand: RequestHandler = async (req, res, next) => {
  try {
    const brand = await registerRepository.readAll();
    res.json(brand);
  } catch (err) {
    next(err);
  }
};

//browse all mail registed from table user
const browseMail: RequestHandler = async (req, res, next) => {
  try {
    const mail = await registerRepository.readAllMail();
    res.json(mail);
  } catch (err) {
    next(err);
  }
};

// Read Model assiciated to brand from table model
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

// Read socket assiciated to model from table socket
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

// Add user information from ModalRegistration in DB, table user
const addUserInfo: RequestHandler = async (req, res, next) => {
  try {
    const newRegister = req.body;

    const insertId = await registerRepository.createUserInfo(newRegister);

    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

// Add vehicule user information from ModalVehiculeRegistration in DB, table car
const addVehicleInfo: RequestHandler = async (req, res, next) => {
  try {
    const newRegister = {
      brand: Number(req.body.brand),
      model: Number(req.body.model),
      socket: Number(req.body.socket),
    };
    const userId = Number(req.body.userId);
    const insertId = await registerRepository.createVehicleInfo(newRegister);

    const userCarId = await registerRepository.createUserCar(userId, insertId);

    res.status(201).json({ userCarId });
  } catch (err) {
    next(err);
  }
};

export default {
  browseBrand,
  browseMail,
  readModel,
  addUserInfo,
  validateUser,
  readSocket,
  addVehicleInfo,
  validateVehicule,
};
