import express from "express";

import contactFormActions from "../modules/contact/contactFormActions";

const router = express.Router();

router.post(
  "/api/contact",
  contactFormActions.validate,
  contactFormActions.add,
);

export default router;