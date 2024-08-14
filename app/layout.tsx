import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Hydrate from "./utils/Hydrate";
import ReactQueryProvider from "./utils/ReactQueryProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Revivar Assessment",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReactQueryProvider>  
      <html lang="en">
     <Hydrate>
      <div className={inter.className}>{children}</div>
      </Hydrate>
      </html>
    
    </ReactQueryProvider>

  );
}
