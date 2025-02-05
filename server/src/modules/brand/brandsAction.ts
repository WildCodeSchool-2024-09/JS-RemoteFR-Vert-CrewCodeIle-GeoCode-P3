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

const edit: RequestHandler = async (req, res, next) => {
  try {
    const brandAndModel = req.body;

    const affectedRows = await BrandsRepository.update(brandAndModel);

    if (affectedRows === 0) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    next(err);
  }
};

export default { browse, edit };
