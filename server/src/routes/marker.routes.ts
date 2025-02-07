import express from "express";
import marker from "../modules/marker/markerActions";

import { verifyUserBook } from "../middlewares/verifyUserBook.middleware";

const router = express.Router();

router.get("/api/admin/marker/:id", marker.read);
router.get("/api/admin/marker/book/:id", marker.readBook);
router.post("/api/admin/marker/book", verifyUserBook, marker.addBook);
router.get("/api/admin/marker/cost", marker.readCost);

export default router;
