import { Button } from "@/components/ui/button";
import { SheetTrigger } from "@/components/ui/sheet";
import { MobileMenuButtonProps } from "@/types/navigation";
import { Menu } from "lucide-react";

export default function MobileMenuButton({ isLoading }: MobileMenuButtonProps) {
  if (isLoading) {
    return (
      <div className="h-10 w-10 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
    );
  }

  return (
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
  );
}
