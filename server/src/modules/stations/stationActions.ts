import type { RequestHandler } from "express";

// Import access to data
import stationRepository from "./stationRepository";

// The B of BREAD - Browse (Read All) operation
const browse: RequestHandler = async (req, res) => {
  try {
    // Fetch all stations
    const rows = await stationRepository.readAll();

    // Respond with the items in JSON format
    res.json(rows);
  } catch (err) {
    res.send(err);
  }
};
export default { browse };
