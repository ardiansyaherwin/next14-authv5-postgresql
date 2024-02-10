"use client";

import { RoleGate } from "@/components/auth/role-gate";
import { Alert } from "@/components/form/alert";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { UserRole } from "@prisma/client";

const AdminPage = async () => {
  const user = useCurrentUser();
  return (
    <Card>
      <CardHeader>
        <p className="text-2xl font-semibold text-center">Admin Only</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <RoleGate allowedRole={UserRole.ADMIN}>
          <Alert title="Admin only content" />
        </RoleGate>
      </CardContent>
    </Card>
  );
};

export default AdminPage;
