// types/navigation.ts
import { Session } from "next-auth";
import { Dispatch, SetStateAction } from "react";

export interface NavLink {
  href: string;
  label: string;
}

export interface NavLinksProps {
  navLinks: NavLink[];
  pathname: string;
  isLoading: boolean;
}

export interface AuthProps {
  session: Session | null;
  status: "authenticated" | "loading" | "unauthenticated";
  isLoading: boolean;
}

export interface MobileMenuProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  navLinks: NavLink[];
  pathname: string;
  session: Session | null;
  status: "loading" | "authenticated" | "unauthenticated";
  isLoading: boolean;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
export interface MobileMenuButtonProps {
  isLoading: boolean;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (isOpen: boolean) => void;
}
