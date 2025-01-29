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
      <meta name="application-name" content="Watcher" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="Watcher" />
      <meta
        name="description"
        content="Entertainment Media Tracking and Recommendation System"
      />
      <meta name="format-detection" content="telephone=no" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="msapplication-TileColor" content="#2B5797" />
      <meta name="msapplication-tap-highlight" content="no" />
      <meta name="theme-color" content="#000000" />

      <link rel="apple-touch-icon" href="/ios/144.png" />
      <link rel="apple-touch-icon" sizes="152x152" href="/ios/152.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/ios/180.png" />
      <link rel="apple-touch-icon" sizes="167x167" href="/ios/167.png" />

      <link rel="icon" type="image/png" sizes="32x32" href="/ios/32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/ios/16.png" />

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
