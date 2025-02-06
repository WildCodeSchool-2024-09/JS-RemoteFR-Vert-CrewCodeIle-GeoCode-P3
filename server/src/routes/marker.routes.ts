import express from "express";
import marker from "../modules/marker/markerActions";

const router = express.Router();

router.get("/api/admin/marker/:id", marker.read);
router.get("/api/admin/marker/book/:id", marker.readBook);
router.post("/api/admin/marker/book", marker.addBook);

export default router;
