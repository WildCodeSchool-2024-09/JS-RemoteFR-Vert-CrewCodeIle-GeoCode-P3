import express from "express";

const router = express.Router();

// Admin only allowed to do this
import userAction from "../modules/adminUser/adminUserAction";

router.get("/api/admin/user", userAction.browse);
router.put(
  "/api/admin/user/:id",
  /* userAction.validateUser */ userAction.edit,
);
router.delete("/api/admin/user/:id", userAction.destroy);

export default router;
