import express from "express";

const router = express.Router();

// Admin only allowed to do this
import brandsAction from "../modules/brand/brandsAction";

router.get("/api/admin/brands-and-models", brandsAction.browse);
router.post(
  "/api/admin/brands-and-models",
  brandsAction.validate,
  brandsAction.add,
);
router.delete("/api/admin/brands-and-models/:id", brandsAction.destroy);

export default router;
