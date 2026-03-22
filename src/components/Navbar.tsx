"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    FileSignature,
    MessageSquareQuote,
    ShieldCheck,
    Menu,
    X,
    Sparkles
} from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
    { name: "Dashboard", href: "/", icon: LayoutDashboard },
    { name: "New Proposal", href: "/proposals/new", icon: FileSignature },
    { name: "Simulator", href: "/simulator", icon: MessageSquareQuote },
];

export function Navbar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav 
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${
                scrolled 
                ? "bg-slate-950/80 backdrop-blur-2xl border-white/10 py-2" 
                : "bg-transparent border-transparent py-4"
            }`}
        >
            <div className="max-w-[1600px] mx-auto px-8 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="relative">
                        <div className="absolute inset-0 bg-blue-500 blur-lg opacity-20 group-hover:opacity-40 transition-opacity" />
                        <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center font-bold text-white shadow-[0_0_20px_rgba(37,99,235,0.3)] group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                            <Sparkles className="w-5 h-5" />
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <span className="font-outfit font-black text-xl tracking-tight text-white leading-none">
                            AURA<span className="text-blue-500">AI</span>
                        </span>
                        <span className="text-[10px] font-bold text-slate-500 tracking-[0.2em] uppercase mt-0.5">Intelligence</span>
                    </div>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-1">
                    <div className="flex items-center bg-white/5 p-1 rounded-2xl border border-white/5 mr-6">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`px-5 py-2 rounded-xl text-sm font-outfit font-semibold transition-all duration-500 flex items-center gap-2 relative group overflow-hidden ${
                                    pathname === item.href
                                    ? "text-white"
                                    : "text-slate-400 hover:text-white"
                                }`}
                            >
                                {pathname === item.href && (
                                    <motion.div 
                                        layoutId="nav-pill-active" 
                                        className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl -z-10 shadow-lg shadow-blue-900/40" 
                                    />
                                )}
                                <item.icon className={`w-4 h-4 transition-transform group-hover:scale-110 ${pathname === item.href ? "text-white" : "text-slate-500"}`} />
                                {item.name}
                            </Link>
                        ))}
                    </div>
                    
                    <div className="h-4 w-px bg-white/10 mx-2" />
                    
                    <button className="ml-4 px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold uppercase tracking-wider text-slate-300 transition-all hover:border-white/20 active:scale-95 flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-emerald-400" />
                        Secure Access
                    </button>
                </div>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden p-2 text-slate-400 hover:text-white transition-colors"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Mobile Nav */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden absolute top-full left-0 right-0 overflow-hidden border-b border-white/10 bg-slate-950/95 backdrop-blur-2xl"
                    >
                        <div className="p-6 flex flex-col gap-3">
                            {navItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setIsOpen(false)}
                                    className={`px-5 py-4 rounded-2xl text-base font-bold transition-all flex items-center gap-4 ${
                                        pathname === item.href
                                        ? "bg-blue-600/20 border border-blue-500/30 text-white"
                                        : "text-slate-400 hover:text-white hover:bg-white/5"
                                    }`}
                                >
                                    <item.icon className="w-6 h-6" />
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
