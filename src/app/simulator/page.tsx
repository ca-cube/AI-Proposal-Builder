"use client";

import { useState } from "react";
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
    Zap
} from "lucide-react";
import Link from "next/link";
import { simulateNegotiationStep } from "@/lib/intelligence/revenue-engine";

export default function SimulatorPage() {
    const [discount, setDiscount] = useState(0.05);
    const [messages, setMessages] = useState([
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
            newMessages.push({ role: 'seller', content: `We can adjust the discount to ${(discount * 100).toFixed(1)}% to meet your budget requirements.`, sentiment: 'Professional' } as any);

            if (response.action === 'accept') {
                newMessages.push({ role: 'buyer', content: "Great! This aligns with our budget. Let's move to contracting.", sentiment: 'Happy' } as any);
            } else {
                newMessages.push({ role: 'buyer', content: `We appreciate the movement, but we were looking for something closer to ${(response.value! * 100).toFixed(1)}%.`, sentiment: 'Demanding' } as any);
            }

            setMessages(newMessages);
            setIsSimulating(false);
        }, 1500);
    };

    return (
        <main className="min-h-screen p-8 bg-[#030711]">
            <div className="max-w-5xl mx-auto">
                <header className="mb-12 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                            <ArrowLeft className="w-5 h-5" />
                        </Link>
                        <div>
                            <h1 className="text-3xl font-bold text-white">Negotiation <span className="text-blue-500">Simulator</span></h1>
                            <p className="text-slate-400 text-sm">Train your concession strategy against AI buyer personas.</p>
                        </div>
                    </div>

                    <div className="flex rounded-lg bg-white/5 p-1 border border-white/10">
                        {['rational', 'aggressive', 'conservative'].map((p) => (
                            <button
                                key={p}
                                onClick={() => setPersona(p as any)}
                                className={`px-4 py-1.5 rounded-md text-xs font-semibold capitalize transition-all ${persona === p ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
                            >
                                {p}
                            </button>
                        ))}
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-[600px]">
                    {/* Chat Interface */}
                    <div className="lg:col-span-2 glass-card flex flex-col border-white/5 overflow-hidden bg-slate-900/40">
                        <div className="p-4 border-b border-white/5 bg-white/5 flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                <span className="text-xs font-medium text-slate-300">Live Simulation Active</span>
                            </div>
                            <button
                                onClick={() => setMessages([{ role: 'buyer', content: "The current proposal is interesting, but the price is still a bit high for our Q2 budget. Can you do better?", sentiment: 'Neutral' }])}
                                className="text-xs text-slate-400 hover:text-white flex items-center gap-1"
                            >
                                <RefreshCcw className="w-3 h-3" /> Reset
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6 space-y-6">
                            <AnimatePresence mode="popLayout">
                                {messages.map((m, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        className={`flex gap-4 ${m.role === 'seller' ? 'flex-row-reverse' : ''}`}
                                    >
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${m.role === 'seller' ? 'bg-blue-600' : 'bg-slate-700'}`}>
                                            {m.role === 'seller' ? <User className="w-4 h-4 text-white" /> : <Bot className="w-4 h-4 text-white" />}
                                        </div>
                                        <div className={`max-w-[80%] p-4 rounded-2xl text-sm ${m.role === 'seller' ? 'bg-blue-600/20 border border-blue-500/20 text-blue-50' : 'bg-white/5 border border-white/10 text-slate-200'}`}>
                                            <p>{m.content}</p>
                                            {m.sentiment && <span className="text-[10px] opacity-50 mt-2 block italic">Sentiment: {m.sentiment}</span>}
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                            {isSimulating && (
                                <div className="flex gap-4">
                                    <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center shrink-0">
                                        <Bot className="w-4 h-4 text-white" />
                                    </div>
                                    <div className="bg-white/5 border border-white/10 p-4 rounded-2xl flex gap-1">
                                        <div className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
                                        <div className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
                                        <div className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce" />
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="p-4 bg-white/5 border-t border-white/5">
                            <div className="flex items-center gap-4">
                                <div className="flex-1">
                                    <div className="flex justify-between text-[10px] text-slate-400 mb-2 uppercase tracking-widest font-bold">
                                        <span>Current Discount Offer</span>
                                        <span className="text-blue-400">{(discount * 100).toFixed(1)}%</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="0"
                                        max="0.4"
                                        step="0.01"
                                        value={discount}
                                        onChange={(e) => setDiscount(parseFloat(e.target.value))}
                                        className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-600"
                                    />
                                </div>
                                <button
                                    onClick={handleOffer}
                                    disabled={isSimulating}
                                    className="p-3 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 transition-all shadow-lg shadow-blue-900/20"
                                >
                                    <Send className="w-5 h-5 text-white" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Analysis Sidebar */}
                    <div className="space-y-6">
                        <div className="glass-card p-6 border-white/5 bg-slate-900/40">
                            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                                <Zap className="w-5 h-5 text-amber-500" />
                                Real-time Analysis
                            </h2>

                            <div className="space-y-4">
                                <div className="p-3 rounded-lg bg-white/5 border border-white/5">
                                    <p className="text-[10px] text-slate-500 uppercase font-bold mb-1">Win Probability</p>
                                    <div className="flex items-end gap-2">
                                        <span className="text-2xl font-bold text-white">{(65 - (discount * 20)).toFixed(0)}%</span>
                                        <span className="text-xs text-emerald-400 mb-1 flex items-center font-bold">
                                            <TrendingDown className="w-3 h-3 rotate-180" /> +5%
                                        </span>
                                    </div>
                                </div>

                                <div className="p-3 rounded-lg bg-white/5 border border-white/5">
                                    <p className="text-[10px] text-slate-500 uppercase font-bold mb-1">Margin Impact</p>
                                    <div className="text-2xl font-bold text-white">-${(50000 * discount).toLocaleString()}</div>
                                </div>

                                <div className="pt-4 border-t border-white/5">
                                    <p className="text-xs text-slate-400 leading-relaxed">
                                        <span className="text-blue-400 font-bold">AI Suggestion:</span> This persona is <span className="text-white">{persona}</span>. Avoid jumping to a 20% discount too early. Try bundling "Premium Support" to maintain margin.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="glass-card p-6 border-blue-500/20 bg-blue-500/5">
                            <h3 className="text-sm font-bold text-blue-400 uppercase tracking-widest mb-3">Strategy Coach</h3>
                            <ul className="space-y-3">
                                {[
                                    "Anchor high in the first turn",
                                    "Use conditional concessions",
                                    "Monitor sentiment drift"
                                ].map((tip, i) => (
                                    <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
                                        <ChevronRight className="w-3 h-3 text-blue-500 mt-0.5 shrink-0" />
                                        {tip}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
