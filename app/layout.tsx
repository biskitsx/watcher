import type { Metadata } from "next";
import { Inter, Poppins, Roboto } from "next/font/google";
import "./globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { getServerSession } from "next-auth";
import SessionProvider from "./components/SessionProvider";
import { ConfigProvider, FloatButton } from "antd";
import { palatte } from "@/constant/palatte";
import { ChakraProvider } from "@chakra-ui/react";
import { FloatForm } from "@/components/FloatForm";
import { authOptions } from "./api/auth/[...nextauth]/authOption";

export const metadata: Metadata = {
  title: "Watcher",
  description: "Recommendation System and Community",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
      </head>

      <link rel="manifest" href="/manifest.json" />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"
      />

      <SessionProvider session={session}>
        <AntdRegistry>
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: palatte.primary,
                // colorBgContainer: palatte.bgColor,
                // colorFillSecondary: palatte.secondary,
              },
            }}
          >
            <body>
              <ChakraProvider>
                <Navbar session={session} />
                {children}
                <FloatForm />
              </ChakraProvider>
            </body>
          </ConfigProvider>
        </AntdRegistry>
      </SessionProvider>
    </html>
  );
}
