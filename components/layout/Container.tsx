import { cn } from "@/util/cn";
import React from "react";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}
export const Container = ({ children, className }: ContainerProps) => {
  return (
    <div className={cn("container flex flex-col gap-6 w-full", className)}>
      {children}
    </div>
  );
};
