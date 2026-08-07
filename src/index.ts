import "dotenv/config";
import app from "./server";
import http from "http";
import { initSocket } from "./socket/socketServer";

// socket connection
const server = http.createServer(app);
initSocket(server);


const startServer = async () => {
  server.listen(process.env.PORT!, () => {
    console.log(`Server running on http://localhost:${process.env.PORT!}`);
  });
};

startServer();
