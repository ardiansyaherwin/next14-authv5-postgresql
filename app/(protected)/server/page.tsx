import { UserInfo } from "@/components/user-info";
import { currentUser } from "@/lib/auth";

const ServerPage = async () => {
  const user = await currentUser();

  return (
    <div className="flex flex-col gap-4 p-4 w-full max-w-lg mx-auto">
      <UserInfo user={user} label="Server Component" />
    </div>
  );
};

export default ServerPage;
