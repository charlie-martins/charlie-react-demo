import type { Metadata } from "next";
import "./globals.css";
import { ThemeToggle } from "@/components/UI";
import { AppFrame } from "./AppFrame";
import { Inter } from "next/font/google";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Demo",
};

interface RootLayoutProps {
  children: React.ReactNode;
}
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <body>
        <Providers>
          <AppFrame>{children}</AppFrame>
          <div className="fixed bottom-4 right-4 z-50">
            <ThemeToggle />
          </div>
        </Providers>
      </body>
    </html>
  );
}
