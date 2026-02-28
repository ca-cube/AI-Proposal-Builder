"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    FileSignature,
    MessageSquareQuote,
    ShieldCheck,
    Menu,
    X
} from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
    { name: "Dashboard", href: "/", icon: LayoutDashboard },
    { name: "New Proposal", href: "/proposals/new", icon: FileSignature },
    { name: "Simulator", href: "/simulator", icon: MessageSquareQuote },
];

export function Navbar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-slate-950/50 backdrop-blur-xl">
            <div className="max-w-[1600px] mx-auto px-8 h-16 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-white shadow-[0_0_15px_rgba(37,99,235,0.5)] group-hover:scale-105 transition-transform duration-300">
                        <span className="font-outfit text-xl">A</span>
                    </div>
                    <span className="font-outfit font-bold text-xl tracking-tight text-white">
                        Aura<span className="text-blue-500 font-light">Intelligence</span>
                    </span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-2">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`px-4 py-2 rounded-lg text-sm font-outfit font-medium transition-all duration-300 flex items-center gap-2 relative group overflow-hidden ${pathname === item.href
                                ? "text-blue-400"
                                : "text-slate-400 hover:text-white"
                                }`}
                        >
                            {pathname === item.href && (
                                <motion.div layoutId="nav-pill" className="absolute inset-0 bg-blue-500/10 rounded-lg -z-10" />
                            )}
                            <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg -z-10" />
                            <item.icon className="w-4 h-4" />
                            {item.name}
                        </Link>
                    ))}
                    <div className="h-4 w-px bg-white/10 mx-3" />
                    <div className="flex items-center gap-2 text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/20 text-[10px] font-bold uppercase tracking-wider cursor-default hover:bg-emerald-500/20 transition-colors shadow-[0_0_15px_rgba(16,185,129,0.1)]">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        Secure Engine
                    </div>
                </div>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden p-2 text-slate-400"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Mobile Nav */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="md:hidden absolute top-16 left-0 right-0 p-4 border-b border-white/5 bg-[#030711] flex flex-col gap-2"
                    >
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setIsOpen(false)}
                                className={`px-4 py-3 rounded-xl text-sm font-medium transition-all flex items-center gap-3 ${pathname === item.href
                                    ? "bg-blue-600 text-white"
                                    : "text-slate-400 hover:text-white hover:bg-white/5"
                                    }`}
                            >
                                <item.icon className="w-5 h-5" />
                                {item.name}
                            </Link>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
