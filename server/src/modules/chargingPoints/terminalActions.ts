import type { RequestHandler } from "express";

// Import access to data
import terminalRepository from "./terminalRepository";

// The B of BREAD - Browse (Read All) operation
const browse: RequestHandler = async (req, res) => {
  try {
    const rows = await terminalRepository.readAll();
    res.json(rows);
  } catch (err) {
    res.send(err);
  }
};

const addAllTerminal: RequestHandler = async (req, res) => {
  try {
    const rows = await terminalRepository.fullUpdate(req.body.terminalTable);

    res.json({
      message: " ✅ Mise à jour des points de charges terminée avec succès.",
    });
  } catch (err) {}
};

export default { browse, addAllTerminal };
