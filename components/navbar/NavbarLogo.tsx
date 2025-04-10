import Link from "next/link";

interface NavbarLogoProps {
  isLoading: boolean;
}

export default function NavbarLogo({ isLoading }: NavbarLogoProps) {
  if (isLoading) {
    return (
      <div className="h-8 w-36 bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse"></div>
    );
  }

  return (
    <Link href="/" className="flex items-center space-x-2 py-1">
      <div className="bg-primary text-white rounded-lg p-1 w-9 h-9 flex items-center justify-center font-bold">
        II
      </div>
      <span className="text-xl font-bold text-primary">IIITDMJ ONE</span>
    </Link>
  );
}
