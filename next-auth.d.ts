import "next-auth";
import { UserRole } from "@prisma/client";

declare module "next-auth" {
  interface User {
    role?: UserRole;
    isTwoFactorEnabled?: boolean;
    isOAuth?: boolean;
  }
}
