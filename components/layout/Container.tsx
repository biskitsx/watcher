import React from "react";

interface ContainerProps {
  children: React.ReactNode;
}
export const Container = ({ children }: ContainerProps) => {
  return <div className="container flex flex-col gap-6 w-full">{children}</div>;
};
