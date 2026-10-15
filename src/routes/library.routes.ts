import { Router } from "express";
import {
  createWithdrawRequestController,
  getLibraryById,
  updateLibraryById,
} from "../controllers/library";
import { upload } from "../middleware/upload";

const router = Router();

router.get("/:id", getLibraryById);
router.patch("/:id", upload.single("image"), updateLibraryById);
router.post("/withdraw-request/:id", createWithdrawRequestController);

export default router;
