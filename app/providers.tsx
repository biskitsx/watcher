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
import { font } from "@/util/font";
const inter = Inter({ subsets: ["latin"] });
interface ProvidersProps {
  children: React.ReactNode;
}
export const Providers = ({ children }: ProvidersProps) => {
  return (
    <SessionProvider>
      <AntdRegistry>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: palatte.primary,
            },
          }}
        >
          <ChakraProvider>{children}</ChakraProvider>
        </ConfigProvider>
      </AntdRegistry>
    </SessionProvider>
  );
};
