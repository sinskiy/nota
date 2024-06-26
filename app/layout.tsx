import type { Metadata } from "next";
import { Ubuntu } from "next/font/google";
import "./globals.css";

const sansSerif = Ubuntu({ weight: ["400", "500"], subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={sansSerif.className}>{children}</body>
    </html>
  );
}
