import React from "react";

interface PageContainerProps {
  children: React.ReactNode;
}
export const PageContainer = ({ children }: PageContainerProps) => {
  return <div className="flex flex-col gap-12 w-full">{children}</div>;
};
