import express from "express";
import { fetchRecentlyViewed } from "../../controllers/userController.js";
import authMiddleware from "../../middleware/auth.js";

const router = express.Router();

// Define routes for user-related actions
router.get("/:userId/recentlyViewed", authMiddleware, fetchRecentlyViewed);

export default router;
