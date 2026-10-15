import "dotenv/config";
import type { CorsOptions } from "cors";

const corseConfig: CorsOptions = {
  origin: process.env.ALLOW_ORIGIN!,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-XSRF-TOKEN"],
  credentials: true,
};

export default corseConfig;
