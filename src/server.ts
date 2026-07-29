import express from "express";
import type { Express } from "express";
import userRoutes from "./routes/user.routes.ts";
const app: Express = express();
app.use(express.json());

app.use("/users", userRoutes);

export default app;
