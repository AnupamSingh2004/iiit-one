"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Menu, X, ChevronDown } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();
  const { data: session, status } = useSession();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
    };
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/courses", label: "Courses" },
    { href: "/facilities", label: "Facilities" },
    { href: "/contact", label: "Contact" },
  ];

  const handleSignOut = () => {
    signOut({ callbackUrl: "/" });
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "py-2" : "py-4",
      )}
    >
      <div
        className={cn(
          "mx-6 md:mx-10 rounded-4xl backdrop-blur-md transition-all duration-300 border shadow-lg px-4 md:px-8 py-3",
          isScrolled
            ? "bg-white/80 dark:bg-gray-900/80 shadow-lg border-gray-200 dark:border-gray-800"
            : "bg-white/50 dark:bg-gray-900/50 shadow-md border-gray-200/50 dark:border-gray-800/50",
        )}
      >
        <div className="flex justify-between items-center">
          {isLoading ? (
            <div className="h-8 w-36 bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse"></div>
          ) : (
            <Link href="/" className="flex items-center space-x-2 py-1">
              <div className="bg-primary text-white rounded-lg p-1 w-9 h-9 flex items-center justify-center font-bold">
                II
              </div>
              <span className="text-xl font-bold text-primary">
                IIITDMJ ONE
              </span>
            </Link>
          )}

          <nav className="hidden md:flex items-center space-x-6">
            <div className="bg-gray-100/70 dark:bg-gray-800/70 rounded-2xl p-1.5 flex items-center">
              {navLinks.map((link) => (
                <div key={link.href} className="relative">
                  {isLoading ? (
                    <div className="h-8 w-16 mx-1 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
                  ) : (
                    <Link
                      href={link.href}
                      className={cn(
                        "px-5 py-2 text-sm font-medium rounded-xl transition-all duration-200 inline-block",
                        pathname === link.href
                          ? "bg-white dark:bg-gray-700 text-primary shadow-sm"
                          : "text-gray-600 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-gray-700/50",
                      )}
                    >
                      {link.label}
                    </Link>
                  )}
                </div>
              ))}
            </div>

            <div className="flex items-center space-x-3 ml-2">
              {isLoading ? (
                <div className="flex space-x-2">
                  <div className="h-10 w-24 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
                  <div className="h-10 w-24 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
                </div>
              ) : (
                <>
                  {status === "authenticated" && session?.user ? (
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
                        <DropdownMenuItem
                          asChild
                          className="rounded-lg cursor-pointer"
                        >
                          <Link
                            href="/dashboard"
                            className="flex items-center py-1.5"
                          >
                            Dashboard
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          asChild
                          className="rounded-lg cursor-pointer"
                        >
                          <Link
                            href="/profile"
                            className="flex items-center py-1.5"
                          >
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
                  ) : (
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
                  )}
                </>
              )}
            </div>
          </nav>

          <div className="md:hidden">
            {isLoading ? (
              <div className="h-10 w-10 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
            ) : (
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild className="md:hidden">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-xl bg-gray-100/80 dark:bg-gray-800/80 hover:bg-white/80 dark:hover:bg-gray-700/80"
                  >
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </SheetTrigger>
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
                        <span className="text-xl font-bold text-primary">
                          IIITDMJ ONE
                        </span>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                      >
                        <X className="h-5 w-5" />
                        <span className="sr-only">Close</span>
                      </Button>
                    </div>

                    {status === "authenticated" && session?.user && (
                      <div className="p-6 border-b dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/50">
                        <div className="flex items-center space-x-4">
                          <Avatar className="h-12 w-12 border-2 border-primary/20">
                            <AvatarImage
                              src={session.user.image || ""}
                              alt={session.user.name || ""}
                            />
                            <AvatarFallback className="bg-primary text-white">
                              {session.user.name?.charAt(0) || "U"}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-lg">
                              {session.user.name}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {session.user.email}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    <nav className="flex flex-col p-4 space-y-1 flex-1 overflow-y-auto">
                      {navLinks.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={cn(
                            "px-4 py-3 text-base font-medium rounded-xl transition-colors flex items-center",
                            pathname === link.href
                              ? "bg-white dark:bg-gray-800 text-primary shadow-sm border border-gray-100 dark:border-gray-700"
                              : "hover:bg-white dark:hover:bg-gray-800 border border-transparent",
                          )}
                        >
                          {link.label}
                        </Link>
                      ))}
                    </nav>

                    <div className="p-4 border-t dark:border-gray-800 bg-gray-50/80 dark:bg-gray-800/80">
                      {status === "authenticated" ? (
                        <>
                          <Button
                            className="w-full mb-3 rounded-xl bg-primary hover:bg-primary/90"
                            asChild
                          >
                            <Link
                              href="/dashboard"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              Dashboard
                            </Link>
                          </Button>
                          <Button
                            variant="outline"
                            className="w-full rounded-xl border-gray-200 dark:border-gray-700 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                            onClick={() => {
                              handleSignOut();
                              setIsMobileMenuOpen(false);
                            }}
                          >
                            Sign Out
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button
                            variant="outline"
                            className="w-full mb-3 rounded-xl border-gray-200 dark:border-gray-700"
                            asChild
                          >
                            <Link
                              href="/auth/signin"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              Sign In
                            </Link>
                          </Button>
                          <Button
                            className="w-full rounded-xl bg-primary hover:bg-primary/90 text-white border-0"
                            asChild
                          >
                            <Link
                              href="/auth/register"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              Register
                            </Link>
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
