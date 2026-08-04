import dotenv from "dotenv";
import app from "./server.ts";
import http from "http";
import { initSocket } from "./socket/socketServer.ts";

// socket connection
const server = http.createServer(app);
initSocket(server);

dotenv.config();

const startServer = async () => {
  server.listen(process.env.PORT!, () => {
    console.log(`Server running on http://localhost:${process.env.PORT!}`);
  });
};

startServer();
