import type { RequestHandler } from "express";

// Import access to data
import stationRepository from "./stationRepository";

// The B of BREAD - Browse (Read All) operation
const browse: RequestHandler = async (req, res) => {
  try {
    const rows = await stationRepository.readAll();

    res.json(rows);
  } catch (err) {
    res.send(err);
  }
};

const addAllStation: RequestHandler = async (req, res, next) => {
  try {
    const rows = await stationRepository.fullUpdate(req.body.stationTable);

    next();
  } catch (err) {
    res.json("La mise à jour de la table station à échoué");
  }
};

export default { browse, addAllStation };
