/* eslint-disable @typescript-eslint/no-explicit-any */
import { Router } from "express";
import { login, refresh, register } from "../controllers/auth";
import { authentication } from "../middleware/auth/auth";
const router = Router();

router.post("/login", login);
router.post("/register", register);
router.post("/refresh", refresh);
router.get("/user", authentication, (req, res) => {
  res.json({
    user: (req as any).user,
  });
});
export default router;
