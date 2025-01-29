import express from "express";

import contactFormActions from "../modules/contact/contactFormActions";

const router = express.Router();

router.post(
  "/api/contact",
  contactFormActions.validate,
  contactFormActions.add,
);

router.get("/api/contact", contactFormActions.browse);
router.put("/api/contact/:id", contactFormActions.editIsTreated);

export default router;
