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

// Defin register-related routes
import registerAction from "./modules/item/registerAction";
router.get("/api/register", registerAction.browse);
router.get("/api/register/:id", registerAction.read);
router.post("/api/register", registerAction.validate, registerAction.add);

/* ************************************************************************* */

export default router;
