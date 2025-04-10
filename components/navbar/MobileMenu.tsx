import { Dispatch, SetStateAction } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { Session } from "next-auth";

import { Button } from "@/components/ui/button";
import { SheetContent, SheetClose } from "@/components/ui/sheet";
import { NavLink } from "@/types/navigation";

interface MobileMenuProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  navLinks: NavLink[];
  pathname: string;
  session: Session | null;
  status: "loading" | "authenticated" | "unauthenticated";
  isLoading: boolean;
}

export default function MobileMenu({
  navLinks,
  pathname,
  session,
  status,
}: MobileMenuProps) {
  const handleSignOut = () => {
    signOut({ callbackUrl: "/" });
  };

  return (
    <SheetContent
      side="right"
      className="w-full sm:w-[350px] border-l-0 rounded-l-3xl p-0 overflow-hidden"
    >
      <div className="flex flex-col h-full bg-white dark:bg-gray-900">
        <div className="flex justify-between items-center p-6 border-b dark:border-gray-800">
          <div className="flex items-center space-x-2">
            <div className="bg-primary text-white rounded-lg p-1 w-8 h-8 flex items-center justify-center font-bold">
              II
            </div>
            <span className="text-xl font-bold text-primary">IIITDMJ ONE</span>
          </div>
        </div>

        {status === "authenticated" && session?.user && (
          <div className="p-6 border-b dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/50">
            <div className="flex items-center space-x-4">
              <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="text-primary font-semibold">
                  {session.user.name?.charAt(0) || "U"}
                </span>
              </div>
              <div>
                <p className="font-medium text-lg">{session.user.name}</p>
                <p className="text-sm text-muted-foreground">
                  {session.user.email}
                </p>
              </div>
            </div>
          </div>
        )}

        <nav className="flex flex-col p-4 space-y-1 flex-1 overflow-y-auto">
          {navLinks.map((link) => (
            <SheetClose asChild key={link.href}>
              <Link
                href={link.href}
                className={`px-4 py-3 text-base font-medium rounded-xl transition-colors flex items-center ${
                  pathname === link.href
                    ? "bg-white dark:bg-gray-800 text-primary shadow-sm border border-gray-100 dark:border-gray-700"
                    : "hover:bg-white dark:hover:bg-gray-800 border border-transparent"
                }`}
              >
                {link.label}
              </Link>
            </SheetClose>
          ))}
        </nav>

        <div className="p-4 border-t dark:border-gray-800 bg-gray-50/80 dark:bg-gray-800/80">
          {status === "authenticated" ? (
            <>
              <SheetClose asChild>
                <Button
                  className="w-full mb-3 rounded-xl bg-primary hover:bg-primary/90"
                  asChild
                >
                  <Link href="/dashboard">Dashboard</Link>
                </Button>
              </SheetClose>
              <SheetClose asChild>
                <Button
                  variant="outline"
                  className="w-full rounded-xl border-gray-200 dark:border-gray-700 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                  onClick={handleSignOut}
                >
                  Sign Out
                </Button>
              </SheetClose>
            </>
          ) : (
            <>
              <SheetClose asChild>
                <Button
                  variant="outline"
                  className="w-full mb-3 rounded-xl border-gray-200 dark:border-gray-700"
                  asChild
                >
                  <Link href="/auth/signin">Sign In</Link>
                </Button>
              </SheetClose>
              <SheetClose asChild>
                <Button
                  className="w-full rounded-xl bg-primary hover:bg-primary/90 text-white border-0"
                  asChild
                >
                  <Link href="/auth/register">Register</Link>
                </Button>
              </SheetClose>
            </>
          )}
        </div>
      </div>
    </SheetContent>
  );
}
