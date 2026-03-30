import type { Session } from "next-auth";
import type { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email?: string;
      name?: string;
      image?: string;
      points?: number;
      level?: number;
      isAdmin?: boolean;
    };
  }

  interface User {
    id: string;
    email?: string;
    name?: string;
    image?: string;
    points?: number;
    level?: number;
    isAdmin?: boolean;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    email?: string;
    isAdmin?: boolean;
    points?: number;
    level?: number;
  }
}
