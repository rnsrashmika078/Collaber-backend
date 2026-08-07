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
  io.on("connection", (socket) => {
    console.log("Socket connected:", socket.id);

    socket.on("switch-private-chat", (chatId) => {
      // for (const room of socket.rooms) {
      //   if (room.startsWith("chat_") && room !== socket.id) {
      //     socket.leave(room);
      //   }
      // }
      const chat = `chat_${chatId}`;
      socket.join(chat);
    });

    socket.on("typing", (data) => {
      socket.to(`chat_${data.activeChat}`).emit(`typing-${data.activeChat}`, {
        message: `${data?.name} is editing`,
        data,
      });
    });

    socket.on("stop-typing", (data) => {
      socket
        .to(`chat_${data.activeChat}`)
        .emit(`stop-typing-${data.activeChat}`, {
          message: `${data.name} is stop typing `,
          data,
        });
    });
    // socket
    //   .to(`chat_${data.activeChat}`)
    //   .emit(`start-typing-${data.activeChat}`, {
    //     message: `${data?.name} is editing`,
    //     data,
    //   });
    // socket
    //   .to(`chat_${data.activeChat}`)
    //   .emit(`stop-typing-${data.activeChat}`, {
    //     message: `${data.name} is stop typing `,
    //     data,
    //   });
    socket.on(
      "send-message",
      async (data: { chatId: number; username: string; message: string }) => {
        const chat = `chat_${data.chatId}`;
        io.to(chat).emit(`chat_${data.chatId}`, {
          message: data.message,
          username: data.username,
        });
      },
    );
    socket.on("disconnect", () => {
      console.log("Socket disconnected:", socket.id);
    });
  });
}
export function presenceConnection(io: Server) {}
