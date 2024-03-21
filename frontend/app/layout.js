import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "OWAD",
  description: "Created by Killua",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />

        {children}
      </body>
    </html>
  );
}
