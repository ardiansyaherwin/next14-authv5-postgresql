"use client";

import { admin } from "@/actions/admin";
import { RoleGate } from "@/components/auth/role-gate";
import { Alert } from "@/components/form/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { UserRole } from "@prisma/client";
import { toast } from "sonner";

const AdminPage = async () => {
  const handleApiRouteClick = () => {
    fetch("/api/admin").then((response) => {
      if (response.ok) toast.success("Allowed API Route.");
      else toast.error("Forbidden API Route.");
    });
  };

  const handleServerActionClick = () => {
    admin().then((data) => {
      if (data.error) toast.error(data.error);
      if (data.success) toast.success(data.success);
    });
  };
  return (
    <Card className="w-full max-w-[600px]">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">Admin Only</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <RoleGate allowedRole={UserRole.ADMIN}>
          <Alert title="You are allowed to see this content." />
        </RoleGate>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
          <p className="text-sm font-medium">Admin-only API Route</p>
          <Button onClick={handleApiRouteClick}>Click to test</Button>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
          <p className="text-sm font-medium">Admin-only Server Action</p>
          <Button onClick={handleServerActionClick}>Click to test</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminPage;
