"use client";
import { UserButton } from "@/components/auth/user-button";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  {
    slug: "server",
    label: "Server",
  },
  {
    slug: "client",
    label: "Client",
  },
  {
    slug: "admin",
    label: "Admin",
  },
  {
    slug: "settings",
    label: "Settings",
  },
];

export const Navbar = () => {
  const pathname = usePathname();

  const isCurrentRoute = (path: string) => {
    return pathname === path;
  };
  return (
    <nav className="bg-white border border-black flex justify-between items-center p-4 rounded-xl max-w-lg w-full shadow-sm">
      <div className="flex gap-x-2">
        {NAV_ITEMS?.map((item) => (
          <Button
            asChild
            key={item.slug}
            variant={isCurrentRoute(`/${item.slug}`) ? "default" : "outline"}
          >
            <Link href={`/${item.slug}`}>{item.label}</Link>
          </Button>
        ))}
      </div>
      <UserButton />
    </nav>
  );
};
