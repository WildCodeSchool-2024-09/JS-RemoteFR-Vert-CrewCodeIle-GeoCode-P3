import express from "express";

const router = express.Router();

// Admin only allowed to do this
import brandsAction from "../modules/brand/brandsAction";

router.get("/api/admin/brands-and-models", brandsAction.browse);
router.put("/api/admin/brands-and-models/:id", brandsAction.edit);

export default router;
