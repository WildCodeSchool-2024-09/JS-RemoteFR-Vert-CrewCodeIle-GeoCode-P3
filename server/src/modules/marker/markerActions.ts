import type { RequestHandler } from "express";
import markerRepository from "./markerRepository";

const read: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const marker = await markerRepository.read(id);

    if (marker == null) {
      res.sendStatus(404);
    } else {
      res.json(marker);
    }
  } catch (err) {}
};

const readBook: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const markerBook = await markerRepository.readBook(id);

    if (markerBook == null) {
      res.sendStatus(404);
    } else {
      res.json(markerBook);
    }
  } catch (err) {}
};

const addBook: RequestHandler = async (req, res) => {
  try {
    const rows = await markerRepository.create(req.body);
    if (rows !== null) {
      res.status(201).json("Mise à jour bien terminé");
    } else {
      res.status(500).json("La mise à jour de la table station à échoué");
    }
  } catch (err) {
    res.json("La mise à jour de la table station à échoué");
  }
};

export default { read, readBook, addBook };
