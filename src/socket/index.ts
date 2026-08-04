/* eslint-disable @typescript-eslint/no-explicit-any */
import { parseCookie } from "cookie";
import { Server, Socket } from "socket.io";
import { verifyAccessToken } from "../utils/jwt";
export function socketConnection(io: Server) {
  io.use((socket, next) => {
    const cookieHeader = socket.handshake.headers.cookie;

    if (!cookieHeader) {
      return next(new Error("unauthorized"));
    }
    const cookies = parseCookie(cookieHeader);
    if (!cookies.access_token) return next(new Error("unauthorized"));

    const user = verifyAccessToken(cookies.access_token);
    (socket as any).user = user;
    next();
  });
  io.on("connection", (socket: Socket) => {
    console.log("Socket connected:", socket.id);
    console.log("Socket connected:", socket.user);

    socket.emit("connected", {
      message: "Socket connected successfully",
      socketId: socket.id,
    });

    socket.on("send_message", (data) => {
      console.log("Message received: ", data);

      socket.emit("receive_message", {
        message: "Server received your message",
        data,
      });
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected:", socket.id);
    });
  });
}
export function privateConnection(io: Server) {
  io.on("connection", (socket) => {
    console.log("Socket connected:", socket.id);

    socket.on("join-private-chat", (chatId) => {
      socket.join(chatId);
      console.log("");
    });

    return socket._cleanup();

    //
  });
}
export function presenceConnection(io: Server) {}
