"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

interface BackButtonInterface {
  label: string;
  href: string;
}

export const BackButton = ({ label, href }: BackButtonInterface) => {
  return (
    <Button className="font-normal w-full" size="sm" variant="link" asChild>
      <Link href={href}>{label}</Link>
    </Button>
  );
};
