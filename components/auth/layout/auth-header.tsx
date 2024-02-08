import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { LockClosedIcon, LockOpen1Icon } from "@radix-ui/react-icons";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

interface AuthHeaderProps {
  label: string;
}

export const AuthHeader = ({ label }: AuthHeaderProps) => {
  return (
    <div className="w-full flex flex-col gap-y-4 items-center justify-center">
      <h1
        className={cn(
          "text-3xl font-semibold flex gap-2 items-center",
          font.className
        )}
      >
        <LockClosedIcon /> <span>Auth</span> <LockOpen1Icon />
      </h1>
      <p className="text-muted-foreground text-sm">{label}</p>
    </div>
  );
};
