import express from "express";
import cors from "cors";
import type { Express } from "express";

import userRoutes from "./routes/user.routes.ts";
import corseConfig from "./config/corsConfig.ts";
import { checkAuth, checkRole } from "./middleware/auth/index.ts";
import authRoutes from "./routes/auth.routes.ts";

const app: Express = express();

app.use(cors(corseConfig));

app.use(express.json());

app.use("/users", [checkAuth, checkRole], userRoutes);
app.use("/auth", authRoutes);

export default app;
