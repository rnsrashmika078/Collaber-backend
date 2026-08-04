import { Server } from "socket.io";
import { Server as HttpServer } from "http";
import { socketConnection } from ".";

export const initSocket = (server: HttpServer) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      credentials: true,
    },
  });

  socketConnection(io);
};
