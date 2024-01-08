import { Inter } from "next/font/google";
import Navbar from "@/components/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "OWAD",
  description: "Created by Killua",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="text-primaryText bg-primaryBackground">
        <Navbar />

        {children}
      </body>
    </html>
  );
}
