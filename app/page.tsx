import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LoginButton } from "@/components/auth/login-button";
import { LockClosedIcon, LockOpen1Icon } from "@radix-ui/react-icons";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

export default function HomePage() {
  return (
    <main className="flex h-full flex-col items-center justify-center">
      <div className="space-y-6 text-center">
        <h1
          className={cn(
            "text-6xl font-semibold drop-shadow-md flex items-center gap-2 justify-center",
            font.className
          )}
        >
          <LockClosedIcon /> <span>Auth</span> <LockOpen1Icon />
        </h1>
        <p className="text-lg">A simple authentication service</p>
        <div>
          <LoginButton>
            <Button variant="outline" size="lg">
              Sign in
            </Button>
          </LoginButton>
        </div>
      </div>
    </main>
  );
}
