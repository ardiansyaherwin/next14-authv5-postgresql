"use client";

import { AuthHeader } from "@/components/auth/layout/auth-header";
import { AuthSocial } from "@/components/auth/layout/auth-social";
import { BackButton } from "@/components/auth/layout/back-button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { HomeIcon } from "@radix-ui/react-icons";
import Link from "next/link";

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  backButtonHref: string;
  backButtonLabel: string;
  showSocial?: boolean;
  fullWidth?: boolean;
}

export const CardWrapper = ({
  children,
  headerLabel,
  backButtonHref,
  backButtonLabel,
  showSocial,
  fullWidth,
}: CardWrapperProps) => {
  return (
    <Card className={`w-full ${!fullWidth ? "max-w-[400px]" : ""}  shadow-md`}>
      <CardHeader>
        <AuthHeader label={headerLabel} />
      </CardHeader>
      <CardContent>{children}</CardContent>
      {showSocial && (
        <CardFooter>
          <AuthSocial />
        </CardFooter>
      )}
      <CardFooter className="flex flex-col">
        <BackButton label={backButtonLabel} href={backButtonHref} />
        <Link href="/">
          <HomeIcon />
        </Link>
      </CardFooter>
    </Card>
  );
};
