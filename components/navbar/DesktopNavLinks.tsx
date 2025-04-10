import Link from "next/link";
import { cn } from "@/lib/utils";
import { NavLinksProps } from "@/types/navigation";

export default function DesktopNavLinks({
  navLinks,
  pathname,
  isLoading,
}: NavLinksProps) {
  return (
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
  );
}
