import type { Metadata } from "next";
import { Inter, Poppins, Roboto } from "next/font/google";
import "./globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { getServerSession } from "next-auth";
import SessionProvider from "./components/SessionProvider";
import { ConfigProvider } from "antd";
import { palatte } from "@/constant/palatte";
import { ChakraProvider } from "@chakra-ui/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Watcher",
  description: "Recommendation System and Community",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
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
                <Navbar />
                {children}
              </ChakraProvider>
            </body>
          </ConfigProvider>
        </AntdRegistry>
      </SessionProvider>
    </html>
  );
}
