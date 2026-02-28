import React from "react";
import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
    title: "Aura Intelligence | Revenue Intelligence Engine",
    description: "Optimize deal outcomes using AI-driven revenue intelligence. Predict win probability, automate proposals, and maximize margins.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={`dark scroll-smooth ${inter.variable} ${outfit.variable}`}>
            <body className={`${inter.className} font-sans antialiased`}>
                <div className="fixed inset-0 -z-10 bg-[#030711]">
                    <div className="absolute inset-0 tech-grid opacity-50"></div>
                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/20 via-[#030711]/50 to-[#030711]"></div>
                    <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-emerald-900/10 via-transparent to-transparent"></div>
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-soft-light" style={{ pointerEvents: 'none' }}></div>
                </div>
                <Navbar />
                <div className="pt-16">
                    {children}
                </div>
            </body>
        </html>
    );
}
