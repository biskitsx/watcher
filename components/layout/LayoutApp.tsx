import React from "react";
import { Container } from "./Container";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { FloatButton } from "antd";

interface LayoutProps {
  children: React.ReactNode;
}
export const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Navbar />
      <Container>{children}</Container>
      <Footer />
    </>
  );
};
