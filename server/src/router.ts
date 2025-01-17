import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Define item-related routes
import contactFormActions from "./modules/item/contact/contactFormActions";
import itemActions from "./modules/item/itemActions";

router.get("/api/items", itemActions.browse);
router.get("/api/items/:id", itemActions.read);
router.post("/api/items", itemActions.add);
router.post(
  "/api/contact",
  contactFormActions.validate,
  contactFormActions.add,
);

/* ************************************************************************* */

export default router;
