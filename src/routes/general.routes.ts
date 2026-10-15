import { Router } from "express";
import { getMembersController } from "../controllers/general";

const router = Router();

router.get("/", getMembersController);

export default router;
