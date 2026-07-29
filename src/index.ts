import dotenv from "dotenv";
import app from "./server.ts";
dotenv.config();

const startServer = async () => {
  app.listen(4000, () =>
    console.log("Server running on http://localhost:4000"),
  );
};

startServer();
