import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import type { Express } from "express";
import userRoutes from "./routes/user.routes";
import corseConfig from "./config/corsConfig";
import { checkAuth, checkRole } from "./middleware/auth/index";
import authRoutes from "./routes/auth.routes";

const app: Express = express();

app.use(cors(corseConfig));

app.use(cookieParser());

app.use(express.json());

app.use("/users", [checkAuth, checkRole], userRoutes);
app.use("/auth", authRoutes);

export default app;
