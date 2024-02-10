import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { User } from "next-auth";

interface UserInfoProps {
  user?: User;
  label: string;
}

const UserInfoItem = ({
  label,
  value,
}: {
  label: string;
  value: string | boolean;
}) => {
  return (
    <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
      <p className="text-sm font-medium">{label}</p>
      <p className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">
        {value}
      </p>
    </div>
  );
};

export const UserInfo = ({ user, label }: UserInfoProps) => {
  return (
    <Card className="w-full max-w-[600px] shadow-md">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">{label}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <UserInfoItem label="ID" value={user?.id as string} />
        <UserInfoItem label="Name" value={user?.name as string} />
        <UserInfoItem label="Email" value={user?.email as string} />
        <UserInfoItem label="Role" value={user?.role as string} />
        <UserInfoItem
          label="Two Factor Authentication"
          value={user?.isTwoFactorEnabled ? "ON" : "OFF"}
        />
      </CardContent>
    </Card>
  );
};
