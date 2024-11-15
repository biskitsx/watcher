import { Inter } from "next/font/google";
import "./globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import SessionProvider from "./components/SessionProvider";
import { ConfigProvider } from "antd";
import { palatte } from "@/constant/palatte";
import { ChakraProvider } from "@chakra-ui/react";
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
