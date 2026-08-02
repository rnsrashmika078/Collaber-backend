import type { CorsOptions } from "cors";
const corseConfig: CorsOptions = {
  origin: process.env.ALLOW_ORIGIN!,
  methods: "*",
  allowedHeaders: "*",
};
export default corseConfig;
