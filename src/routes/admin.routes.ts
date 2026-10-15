import { Router } from "express";
import {
  approveWithdrawRequestController,
  createInstitutionController,
  deleteInstitutionController,
  getInstitutionsController,
  getLibrariesController,
  getStatsController,
  getWithdrawRequestsController,
  rejectWithdrawRequestController,
  removeUserController,
  updateInstitutionController,
  updateUserStatusController,
} from "../controllers/admin";

const router = Router();

router.get("/stats", getStatsController);
router.get("/libraries", getLibrariesController);
router.get("/institutions", getInstitutionsController);
router.post("/institutions", createInstitutionController);
router.put("/institutions/:id", updateInstitutionController);
router.delete("/institutions/:id", deleteInstitutionController);
router.get("/withdraw-requests", getWithdrawRequestsController);
router.put(
  "/withdraw-requests/:id/approve",
  approveWithdrawRequestController,
);
router.put("/withdraw-requests/:id/reject", rejectWithdrawRequestController);
router.put("/users/:id/status", updateUserStatusController);
router.delete("/users/:id", removeUserController);

export default router;
