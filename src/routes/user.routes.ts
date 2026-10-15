import { Router } from "express";
import { getMe } from "../controllers/user";
const router = Router();

// authenticated user
router.get("/me", getMe);

export default router;
