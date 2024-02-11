"use server";

import { currentUser } from "@/lib/auth";
import { UserRole } from "@prisma/client";

export const admin = async () => {
  const user = await currentUser();

  if (user?.role === UserRole.ADMIN) {
    return { success: "Allowed server action" };
  } else {
    return { error: "Forbidden server action" };
  }
};
