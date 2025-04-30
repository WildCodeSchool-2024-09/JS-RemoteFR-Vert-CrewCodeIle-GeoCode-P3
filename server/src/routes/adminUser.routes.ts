import express from "express";

const router = express.Router();

// Admin only allowed to do this
import userAdminAction from "../modules/adminUser/adminUserAction";

router.get("/api/admin/user", userAdminAction.browse);
router.put(
  "/api/admin/user/:id",
  userAdminAction.validateUser,
  userAdminAction.edit,
);
router.delete("/api/admin/user/:id", userAdminAction.destroy);

export default router;
