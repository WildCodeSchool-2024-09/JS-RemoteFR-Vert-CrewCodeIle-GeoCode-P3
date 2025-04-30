import parser from "csv-parser";
import type { RequestHandler } from "express";
import multer from "multer";
import cutOutFileIrve from "../helpers/chargingPoints/cutOutFileIrve";
import doParse from "../helpers/chargingPoints/doParse";
import type { fileIrveType } from "../lib/definitions";
import type { stationTableType } from "../lib/definitions";
import type { terminalTableType } from "../lib/definitions";

export const downloadAndParse: RequestHandler = async (req, res, next) => {
  try {
    if (req.file) {
      // parsing file ...
      const returnParse: fileIrveType[][] = await doParse(req);
      const formattedFileIrve = returnParse.flat();

      // formating file : return two arrays with the useful columns
      const [stationTable, terminalTable] = cutOutFileIrve(formattedFileIrve);

      // arrays transfer for the following middlewares
      req.body.stationTable = stationTable;
      req.body.terminalTable = terminalTable;

      next();
    } else {
      res.status(500).json("Erreur dans le traitement du fichier !");
    }
  } catch (err) {
    next(err);
  }
};
