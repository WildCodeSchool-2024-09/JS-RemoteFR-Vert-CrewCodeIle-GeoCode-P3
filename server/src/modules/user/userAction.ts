import UserRepository from "./UserRepository";

import type { RequestHandler } from "express";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const messages = await UserRepository.readAll();

    res.status(200).json(messages);
  } catch (err) {
    next(err);
  }
};

export default { browse };
