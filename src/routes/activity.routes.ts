import { Router } from "express";
import {
  createActivityController,
  deleteActivityController,
  getActivities,
  getActivitiesByUser,
  getActivityById,
  getPublishedActivities,
  updateActivityController,
} from "../controllers/activity";
import { authentication } from "../middleware/auth/authentication";
import { upload } from "../middleware/upload";

const router = Router();

router.get("/", getActivities);
router.get("/publish", getPublishedActivities);
router.get("/user/:id", getActivitiesByUser);
router.get("/:id", getActivityById);

router.post("/", authentication, upload.single("image"), createActivityController);
router.put("/:id", authentication, upload.single("image"), updateActivityController);
router.delete("/:id", authentication, deleteActivityController);

export default router;
