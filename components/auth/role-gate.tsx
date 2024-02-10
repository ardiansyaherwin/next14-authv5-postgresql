"use client";

import { Alert } from "@/components/form/alert";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { UserRole } from "@prisma/client";

interface RoleGateProps {
  children: React.ReactNode;
  allowedRole: UserRole;
}

export const RoleGate = ({ children, allowedRole }: RoleGateProps) => {
  const user = useCurrentUser();

  if (user?.role !== allowedRole) {
    return (
      <Alert
        variant="destructive"
        title="You do not have permission to view this content"
      />
    );
  }

  return <>{children}</>;
};
