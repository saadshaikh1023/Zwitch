import type { Metadata } from "next";
import {ClerkProvider} from '@clerk/nextjs'
import { dark } from "@clerk/themes";
import { ThemeProvider } from "@/components/theme-provider";
import { Inter } from "next/font/google";
import {Toaster} from "sonner";
import "./globals.css";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Zwitch",
  description: "Let's Stream",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider appearance={{baseTheme:dark}} afterSignOutUrl="/">
    <html lang="en">
    <head>
          <link rel="icon" type="image/svg+xml" href="/zwitchLogo.svg" />
          <link rel="alternate icon" href="/favicon.ico" />
      </head>
      <body className={inter.className}>
        
        <ThemeProvider
        attribute="class"
        forcedTheme="dark"
        storageKey="zwtich-theme"
        >
          <Toaster theme="light" position="bottom-center"/>
        {children}
        </ThemeProvider>
        </body>
    </html>
    </ClerkProvider>
  );
}
