import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import type { Express } from "express";
import userRoutes from "./routes/user.routes";
import corseConfig from "./config/corsConfig";
// import { checkAuth, checkRole } from "./middleware/auth/index";
import authRoutes from "./routes/auth.routes";
import adminRoutes from "./routes/admin.routes";
import libraryRoutes from "./routes/library.routes";
import activityRoutes from "./routes/activity.routes";
import generalRoutes from "./routes/general.routes";
import { authentication } from "./middleware/auth/authentication";
import { authorize } from "./middleware/auth/authorization";

const app: Express = express();

app.use(cors(corseConfig));

app.use(cookieParser());

app.use(express.json());

const uploadsDir = path.join(process.cwd(), "uploads");
app.use("/uploads", express.static(uploadsDir));

app.get("/health", (req, res) => {
  res.send("I m working fine.!");
});
app.use("/api/users", [authentication, authorize("user", "admin")], userRoutes);
app.use("/api/auth", authRoutes);
app.use(
  "/api/admin",
  [authentication, authorize("admin", "coordinator")],
  adminRoutes,
);
app.use("/api/library", authentication, libraryRoutes);
app.use("/api/activity", activityRoutes);
app.use("/api/general", generalRoutes);

export default app;
