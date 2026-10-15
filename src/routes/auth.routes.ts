import { Router } from "express";
import {
  forgotPassword,
  login,
  refresh,
  register,
  resetPassword,
  signout,
} from "../controllers/auth";
import { getInstitutionsController } from "../controllers/admin";
const router = Router();

router.post("/signin", login);
router.post("/signup", register);
router.post("/refresh", refresh);
router.post("/signout", signout);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.get("/institutions", getInstitutionsController);
export default router;
