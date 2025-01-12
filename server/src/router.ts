import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Define item-related routes
import itemActions from "./modules/item/itemActions";

router.get("/api/items", itemActions.browse);
router.get("/api/items/:id", itemActions.read);
router.post("/api/items", itemActions.add);

/* ************************************************************************* */

// Define maps-related routes

// Define search bar-related route
import searchActions from "./modules/searchActions";
router.post("/api/search", searchActions.getApiCodesPostaux);

// Define database station-related route
import stationActions from "./modules/stations/stationActions";
router.get("/api/station/", stationActions.browse);

export default router;
