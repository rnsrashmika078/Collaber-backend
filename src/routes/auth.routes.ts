import { Router } from "express";
import { login, refresh, register, signout } from "../controllers/auth";
import { getInstitutionsController } from "../controllers/admin";
const router = Router();

router.post("/signin", login);
router.post("/signup", register);
router.post("/refresh", refresh);
router.post("/signout", signout);
router.get("/institutions", getInstitutionsController);
export default router;
