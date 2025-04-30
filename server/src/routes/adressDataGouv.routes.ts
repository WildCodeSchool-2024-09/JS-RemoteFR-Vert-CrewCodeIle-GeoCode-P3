import express from "express";

const router = express.Router();

// Define search bar-related route
import searchActions from "../modules/searchActions";
router.post("/api/search", searchActions.getApiAdressDataGouv);

export default router;
