"use client";

import { LoginForm } from "@/components/auth/form/login-form";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { DEFAULT_LOGIN_URL } from "@/routes";
import { useRouter } from "next/navigation";

interface LoginButtonProps {
  children: React.ReactNode;
  mode?: "modal" | "redirect";
  asChild?: boolean;
}

export const LoginButton = ({
  children,
  mode = "redirect",
  asChild,
}: LoginButtonProps) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(DEFAULT_LOGIN_URL);
  };

  if (mode === "modal") {
    return (
      <Dialog>
        <DialogTrigger asChild={asChild}>{children}</DialogTrigger>
        <DialogContent className="p-0 bg-transparent border-none">
          <LoginForm fullWidth />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <span className="cursor-pointer" onClick={handleClick}>
      {children}
    </span>
  );
};
