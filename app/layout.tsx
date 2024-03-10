import type { Metadata } from "next";
import { Inter, Poppins, Roboto } from "next/font/google";
import "./globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Watcher",
  description: "Recommendation System and Community",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        {/* <script
          src="https://kit.fontawesome.com/1c3b4fe1a8.js"
          crossOrigin="anonymous"
        ></script> */}
      </head>
      <AntdRegistry>
        <body>
          <Navbar />
          {children}
          <Footer />
        </body>
      </AntdRegistry>
    </html>
  );
}
