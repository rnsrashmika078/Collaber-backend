import { Router } from "express";
import { create, retrieve } from "../controllers/user.ts";
const router = Router();

// routes
router.get("/", retrieve);
router.post("/", create);

export default router;
