import express from "express";

import contactFormActions from "../modules/contact/contactFormActions";

const router = express.Router();

router.post(
  "/api/contact",
  contactFormActions.validate,
  contactFormActions.add,
);

// Only admin allowed to do this
router.get("/api/contact", contactFormActions.browse);
router.put("/api/contact/:id", contactFormActions.editIsTreated);
router.delete("/api/contact/:id", contactFormActions.destroyMessage);

export default router;
