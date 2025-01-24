import React from "react";
import { Container } from "./Container";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { FloatButton } from "antd";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOption";

interface LayoutProps {
  children: React.ReactNode;
}
export const Layout = async ({ children }: LayoutProps) => {
  const session = await getServerSession(authOptions);
  return (
    <>
      <Navbar session={session} />
      <Container>{children}</Container>
      <Footer />
    </>
  );
};
