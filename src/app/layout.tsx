import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/lib/AuthContext";
import { ThemeProvider } from "@/lib/ThemeContext";
import { ThemeToggle } from "@/components/UI";
import { AppFrame } from "./AppFrame"; // new client component

export const metadata: Metadata = {
  title: "Demo",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <AuthProvider>
            <AppFrame>{children}</AppFrame>

            {/* Optional floating theme toggle */}
            <div className="fixed bottom-4 right-4 z-50">
              <ThemeToggle />
            </div>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
