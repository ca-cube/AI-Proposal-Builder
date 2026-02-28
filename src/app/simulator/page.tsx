"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    ArrowLeft,
    Send,
    MessageSquare,
    User,
    Bot,
    TrendingDown,
    ChevronRight,
    RefreshCcw,
    Zap,
    Activity,
    ArrowUpRight,
    BrainCircuit,
    Lock
} from "lucide-react";
import Link from "next/link";
import { simulateNegotiationStep } from "@/lib/intelligence/revenue-engine";

export default function SimulatorPage() {
    const [discount, setDiscount] = useState(0.05);
    const [messages, setMessages] = useState<{ role: 'buyer' | 'seller', content: string, sentiment?: string }[]>([
        { role: 'buyer', content: "The current proposal is interesting, but the price is still a bit high for our Q2 budget. Can you do better?", sentiment: 'Neutral' }
    ]);
    const [isSimulating, setIsSimulating] = useState(false);
    const [persona, setPersona] = useState<'rational' | 'aggressive' | 'conservative'>('rational');

    const handleOffer = () => {
        setIsSimulating(true);

        // Simulate buyer response
        setTimeout(() => {
            const response = simulateNegotiationStep(discount, persona);

            const newMessages = [...messages];
            newMessages.push({ role: 'seller' as const, content: `We can adjust the discount to ${(Number(discount) * 100).toFixed(1)}% to meet your budget requirements.`, sentiment: 'Professional' });

            if (response.action === 'accept') {
                newMessages.push({ role: 'buyer' as const, content: "Great! This aligns with our budget. Let's move to contracting.", sentiment: 'Happy' });
            } else {
                newMessages.push({ role: 'buyer' as const, content: `We appreciate the movement, but we were looking for something closer to ${(Number(response.value!) * 100).toFixed(1)}%.`, sentiment: 'Demanding' });
            }

            setMessages(newMessages);
            setIsSimulating(false);
        }, 1500);
    };

    return (
        <main className="min-h-screen p-8 max-w-[1400px] mx-auto">
            <header className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <MessageSquare className="text-blue-500 w-5 h-5" />
                        <span className="text-xs font-bold tracking-widest text-blue-400 uppercase">Live Training Environment</span>
                    </div>
                    <h1 className="text-4xl font-outfit font-bold tracking-tight text-white">
                        Negotiation <span className="text-blue-500">Simulator</span>
                    </h1>
                </div>

                <div className="flex bg-slate-900/50 p-1.5 rounded-xl border border-white/5 backdrop-blur-xl shadow-inner self-start md:self-center">
                    {(['rational', 'aggressive', 'conservative'] as const).map((p) => (
                        <button
                            key={p}
                            onClick={() => setPersona(p)}
                            className={`px-5 py-2.5 rounded-lg text-xs font-outfit font-bold uppercase tracking-wider transition-all duration-300 ${persona === p ? 'bg-blue-600/90 text-white shadow-[0_0_20px_rgba(37,99,235,0.4)] scale-105' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                        >
                            {p}
                        </button>
                    ))}
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Chat Interface */}
                <div className="lg:col-span-2 flex flex-col h-[700px] glass-card border-white/5 overflow-hidden bg-slate-900/20 shadow-2xl">
                    <div className="px-6 py-4 border-b border-white/5 bg-white/[0.02] flex justify-between items-center">
                        <div className="flex items-center gap-3 font-mono">
                            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap">Session: #TR-X902</span>
                        </div>
                        <button
                            onClick={() => setMessages([{ role: 'buyer', content: "The current proposal is interesting, but the price is still a bit high for our Q2 budget. Can you do better?", sentiment: 'Neutral' }])}
                            className="text-[10px] font-bold text-slate-500 hover:text-white flex items-center gap-1.5 uppercase tracking-widest transition-colors bg-white/5 px-2.5 py-1.5 rounded-lg border border-white/5 hover:bg-white/10"
                        >
                            <RefreshCcw className="w-3 h-3" /> Reset Engine
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-8 space-y-8 scroll-smooth custom-scrollbar">
                        <AnimatePresence mode="popLayout" initial={false}>
                            {messages.map((m: { role: string, content: string, sentiment?: string }, idx: number) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 20, scale: 0.98 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    className={`flex gap-4 ${m.role === 'seller' ? 'flex-row-reverse' : ''}`}
                                >
                                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 shadow-lg ${m.role === 'seller'
                                        ? 'bg-blue-600 shadow-blue-900/40'
                                        : 'bg-slate-800 border border-white/10 shadow-black/40'
                                        }`}>
                                        {m.role === 'seller' ? <User className="w-5 h-5 text-white" /> : <Bot className="w-5 h-5 text-white" />}
                                    </div>
                                    <div className="max-w-[75%] space-y-2">
                                        <div className={`p-5 rounded-2xl text-sm leading-relaxed shadow-sm ${m.role === 'seller'
                                            ? 'bg-blue-600 text-white rounded-tr-none'
                                            : 'bg-slate-800/80 backdrop-blur-sm border border-white/5 text-slate-100 rounded-tl-none'
                                            }`}>
                                            {m.content}
                                        </div>
                                        {m.sentiment && (
                                            <div className={`flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-tight opacity-50 ${m.role === 'seller' ? 'justify-end' : ''}`}>
                                                <Activity className="w-3 h-3" />
                                                Persona State: {m.sentiment}
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                        {isSimulating && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="flex gap-4"
                            >
                                <div className="w-10 h-10 rounded-2xl bg-slate-800 border border-white/10 flex items-center justify-center shrink-0">
                                    <Bot className="w-5 h-5 text-white" />
                                </div>
                                <div className="bg-slate-800/40 border border-white/5 px-5 py-4 rounded-2xl rounded-tl-none flex gap-1.5 mt-1 items-center">
                                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
                                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
                                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce" />
                                </div>
                            </motion.div>
                        )}
                    </div>

                    <div className="p-6 bg-slate-900/40 border-t border-white/5 backdrop-blur-xl">
                        <div className="flex flex-col md:flex-row items-center gap-6">
                            <div className="flex-1 w-full space-y-3">
                                <div className="flex justify-between text-[11px] font-bold uppercase tracking-widest">
                                    <span className="text-slate-500">Proposed Discount Offset</span>
                                    <span className="text-blue-400 tabular-nums">{(discount * 100).toFixed(1)}%</span>
                                </div>
                                <div className="relative group flex items-center">
                                    <div className="absolute inset-0 bg-blue-500/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                                    <input
                                        type="range"
                                        min="0"
                                        max="0.4"
                                        step="0.01"
                                        value={discount}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDiscount(Number(e.target.value))}
                                        className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-600 transition-all active:scale-[0.99]"
                                    />
                                </div>
                            </div>
                            <button
                                onClick={handleOffer}
                                disabled={isSimulating}
                                className="w-full md:w-auto px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 transition-all shadow-xl shadow-blue-900/30 flex items-center justify-center gap-3 font-bold group"
                            >
                                <span className="text-sm">SUBMIT OFFER</span>
                                <Send className="w-4 h-4 text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Analysis Sidebar */}
                <div className="space-y-6">
                    <section className="glass-card p-6 border-white/5 bg-slate-900/40 shadow-xl">
                        <h2 className="text-sm font-bold mb-6 text-slate-400 uppercase tracking-widest flex items-center gap-2">
                            <Activity className="w-4 h-4 text-amber-500" />
                            Bayesian Probability Delta
                        </h2>

                        <div className="space-y-6">
                            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5">
                                <p className="text-[10px] text-slate-500 uppercase font-bold mb-2 tracking-tight">Closing Probability</p>
                                <div className="flex items-end gap-2">
                                    <span className="text-4xl font-bold text-white tabular-nums tracking-tighter">{(65 - (discount * 20)).toFixed(0)}%</span>
                                    <div className="flex flex-col mb-1 text-emerald-400 font-bold leading-none">
                                        <ArrowUpRight className="w-4 h-4" />
                                        <span className="text-[10px]">+5.2%</span>
                                    </div>
                                </div>
                                <div className="mt-4 h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${65 - (discount * 20)}%` }}
                                        className="h-full bg-gradient-to-r from-blue-600 to-emerald-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5">
                                    <p className="text-[10px] text-slate-500 uppercase font-bold mb-1">Margin Risk</p>
                                    <span className="text-lg font-bold text-amber-400">High</span>
                                </div>
                                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5">
                                    <p className="text-[10px] text-slate-500 uppercase font-bold mb-1">Leverage</p>
                                    <span className="text-lg font-bold text-blue-400">Stable</span>
                                </div>
                            </div>

                            <div className="pt-4 border-t border-white/5">
                                <div className="flex gap-3 items-start">
                                    <div className="mt-1 p-1 bg-blue-500/20 rounded">
                                        <BrainCircuit className="w-3 h-3 text-blue-400" />
                                    </div>
                                    <p className="text-xs text-slate-300 leading-relaxed font-medium">
                                        The <span className="text-white font-bold">{persona}</span> persona responds positively to <span className="text-white">marginal concessions</span>. Do not bridge the gap fully yet. Maintain price integrity for another turn.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="glass-card p-6 border-blue-500/20 bg-blue-500/5 shadow-inner">
                        <div className="flex items-center gap-2 mb-4">
                            <Lock className="w-3.5 h-3.5 text-blue-500" />
                            <h3 className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">Strategic Playbook</h3>
                        </div>
                        <ul className="space-y-4">
                            {[
                                { tip: "Protect Gross Margin at all costs", active: true },
                                { tip: "Bundle features over price drops", active: false },
                                { tip: "Signal 'Final Offer' in Turn 3", active: false }
                            ].map((item, i) => (
                                <li key={i} className={`flex items-start gap-3 text-xs ${item.active ? 'text-slate-200' : 'text-slate-500 italic'}`}>
                                    <div className={`mt-1 h-3 w-0.5 rounded-full ${item.active ? 'bg-blue-500 shadow-[0_0_5px_rgba(59,130,246,0.8)]' : 'bg-slate-700'}`} />
                                    {item.tip}
                                </li>
                            ))}
                        </ul>
                    </section>
                </div>
            </div>
        </main>
    );
}
