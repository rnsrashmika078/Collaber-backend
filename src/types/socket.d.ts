import { User } from ".";

declare module "socket.io" {
  interface Socket {
    user: User;
  }
}
