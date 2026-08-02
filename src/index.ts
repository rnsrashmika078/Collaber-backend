import dotenv from "dotenv";
import app from "./server.ts";

dotenv.config();

const startServer = async () => {
  app.listen(process.env.PORT!, () =>
    console.log(`Server running on http://localhost:${process.env.PORT!}`),
  );
};

startServer();
