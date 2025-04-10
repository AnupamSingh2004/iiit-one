import Link from "next/link";
import { signOut } from "next-auth/react";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AuthProps } from "@/types/navigation";

export default function DesktopAuthButtons({
  session,
  status,
  isLoading,
}: AuthProps) {
  const handleSignOut = () => {
    signOut({ callbackUrl: "/" });
  };

  if (isLoading) {
    return (
      <div className="flex space-x-2">
        <div className="h-10 w-24 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
        <div className="h-10 w-24 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
      </div>
    );
  }

  if (status === "authenticated" && session?.user) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex items-center gap-2 rounded-xl bg-white/20 dark:bg-gray-800/20 hover:bg-white/50 dark:hover:bg-gray-800/50 border border-gray-200/50 dark:border-gray-700/50 h-10 px-4"
          >
            <Avatar className="h-8 w-8 border-2 border-primary/20">
              <AvatarImage
                src={session.user.image || ""}
                alt={session.user.name || ""}
              />
              <AvatarFallback className="bg-primary text-white">
                {session.user.name?.charAt(0) || "U"}
              </AvatarFallback>
            </Avatar>
            <span className="hidden sm:inline-block font-medium">
              {session.user.name}
            </span>
            <ChevronDown className="h-4 w-4 opacity-70" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-56 rounded-xl p-2 border-gray-200/70 dark:border-gray-700/70"
        >
          <DropdownMenuLabel className="px-2 py-1.5 text-sm font-medium text-gray-500 dark:text-gray-400">
            My Account
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="my-1" />
          <DropdownMenuItem asChild className="rounded-lg cursor-pointer">
            <Link href="/dashboard" className="flex items-center py-1.5">
              Dashboard
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild className="rounded-lg cursor-pointer">
            <Link href="/profile" className="flex items-center py-1.5">
              Profile
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator className="my-1" />
          <DropdownMenuItem
            onClick={handleSignOut}
            className="rounded-lg text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 cursor-pointer focus:bg-red-50 dark:focus:bg-red-900/20"
          >
            Sign Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <>
      <Button
        variant="ghost"
        asChild
        className="rounded-xl border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600 bg-white/40 dark:bg-gray-800/40 hover:bg-white/70 dark:hover:bg-gray-800/70 h-10"
      >
        <Link href="/auth/signin">Sign In</Link>
      </Button>
      <Button
        asChild
        className="rounded-xl bg-primary hover:bg-primary/90 text-white border-0 h-10"
      >
        <Link href="/auth/register">Register</Link>
      </Button>
    </>
  );
}
