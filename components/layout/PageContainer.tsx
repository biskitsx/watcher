import { cn } from "@/util/cn";
import React from "react";

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
}
export const PageContainer = ({ children, className }: PageContainerProps) => {
  return (
    <div className={cn("flex flex-col gap-12 w-full", className)}>
      {children}
    </div>
  );
};
