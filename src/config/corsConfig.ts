import "dotenv/config";
import type { CorsOptions } from "cors";

const corseConfig: CorsOptions = {
  origin: process.env.ALLOW_ORIGIN!,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

export default corseConfig;
