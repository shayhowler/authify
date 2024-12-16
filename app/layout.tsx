import { ThemeSwitcher } from "@/components/theme-switcher";
import { GeistSans } from "geist/font/sans";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import React from "react";
import Image from "next/image";

const defaultUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";

export const metadata = {
    metadataBase: new URL(defaultUrl),
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className={GeistSans.className} suppressHydrationWarning>
        <body className="bg-background text-foreground">
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <main className="min-h-screen flex flex-col justify-between overflow-hidden">
                <div className="flex-1 w-full flex flex-col items-center justify-center px-5 pt-10 pb-8">
                    {/* Logo Section */}
                    <div className="flex justify-center w-full mb-12">
                        <Image
                            src="/applogo.png"
                            alt="Logo"
                            width={100} // Slightly bigger logo size
                            height={100} // Adjusted for better scaling
                            className="object-contain"
                        />
                    </div>
                    <div className="flex flex-col items-center justify-center w-full max-w-lg mx-auto px-5">
                        <div className="w-full">
                            {children}
                        </div>
                    </div>
                </div>

                {/* Footer Section */}
                <footer className="w-full flex items-center justify-center text-center text-xs gap-4 py-8 border-t mt-10">
                    <ThemeSwitcher />
                </footer>
            </main>
        </ThemeProvider>
        </body>
        </html>
    );
}