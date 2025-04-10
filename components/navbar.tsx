"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { cn } from "@/lib/utils";
import NavbarLogo from "./navbar/NavbarLogo";
import DesktopNavLinks from "./navbar/DesktopNavLinks";
import DesktopAuthButtons from "./navbar/DesktopAuthButtons";
import MobileMenuButton from "./navbar/MobileMenuButton";
import MobileMenu from "./navbar/MobileMenu";
import { NavLink } from "@/types/navigation";
import { Sheet } from "@/components/ui/sheet";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
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

  const navLinks: NavLink[] = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/courses", label: "Courses" },
    { href: "/facilities", label: "Facilities" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "py-2" : "py-4",
      )}
    >
      <div
        className={cn(
          "mx-6 md:mx-10 rounded-3xl backdrop-blur-md transition-all duration-300 border shadow-lg px-4 md:px-8 py-3",
          isScrolled
            ? "bg-white/80 dark:bg-gray-900/80 shadow-lg border-gray-200 dark:border-gray-800"
            : "bg-white/50 dark:bg-gray-900/50 shadow-md border-gray-200/50 dark:border-gray-800/50",
        )}
      >
        <div className="flex justify-between items-center">
          <NavbarLogo isLoading={isLoading} />

          <nav className="hidden md:flex items-center space-x-6">
            <DesktopNavLinks
              navLinks={navLinks}
              pathname={pathname}
              isLoading={isLoading}
            />

            <DesktopAuthButtons
              session={session}
              status={status}
              isLoading={isLoading}
            />
          </nav>

          <div className="md:hidden">
            {isLoading ? (
              <div className="h-10 w-10 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
            ) : (
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <MobileMenuButton
                  isLoading={isLoading}
                  isMobileMenuOpen={isMobileMenuOpen}
                  setIsMobileMenuOpen={setIsMobileMenuOpen}
                />

                <MobileMenu
                  isOpen={isMobileMenuOpen}
                  setIsOpen={setIsMobileMenuOpen}
                  navLinks={navLinks}
                  pathname={pathname}
                  session={session}
                  status={status}
                  isLoading={isLoading}
                />
              </Sheet>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
