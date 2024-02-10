"use client";
import { UserInfo } from "@/components/user-info";
import { useCurrentUser } from "@/hooks/useCurrentUser";

const ClientPage = async () => {
  const user = useCurrentUser();

  return (
    <div className="flex flex-col gap-4 p-4 w-full max-w-lg mx-auto">
      <UserInfo user={user} label="Client Component" />
    </div>
  );
};

export default ClientPage;
