import { string } from "joi";
import BrandsRepository from "./BrandsRepository";

import type { RequestHandler } from "express";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const usersList = await BrandsRepository.readAll();

    res.status(200).json(usersList);
  } catch (err) {
    next(err);
  }
};

const add: RequestHandler = async (req, res, next) => {
  try {
    const newVehicle = req.body;

    const insertId = await BrandsRepository.create(newVehicle);

    res.send(201);
  } catch (err) {
    next(err);
  }
};

export default { browse, add };
