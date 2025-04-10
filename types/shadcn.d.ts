import * as React from "react";
import { DialogPortalProps } from "@radix-ui/react-dialog";

declare module "@/components/ui/sheet" {
  interface SheetContentProps extends React.ComponentPropsWithoutRef<"div"> {
    side?: "top" | "right" | "bottom" | "left";
    hideCloseButton?: boolean;
    children?: React.ReactNode;
  }

  export const SheetContent: React.FC<SheetContentProps>;
}
