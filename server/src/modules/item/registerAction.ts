import type { RequestHandler } from "express";

import registerRepository from "./registerRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const brand = await registerRepository.readAll();
    res.json(brand);
  } catch (err) {
    next(err);
  }
};

const read: RequestHandler = async (req, res, next) => {
  try {
    const formItemId = Number(req.params.id);
    const formItem = registerRepository.read(formItemId);
    if (formItem === null) {
      res.sendStatus(404);
    } else {
      res.json(formItem);
    }
  } catch (err) {
    next(err);
  }
};

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

export default { browse, read, add };
