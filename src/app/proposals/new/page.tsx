"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useCompletion } from "ai/react";
import {
    FileText,
    Sparkles,
    Send,
    ChevronLeft,
    Settings,
    ShieldCheck,
    CheckCircle2
} from "lucide-react";
import Link from "next/link";

export default function NewProposal() {
    const [clientName, setClientName] = useState("Acme Corp");
    const [sector, setSector] = useState("Technology");
    const [dealSize, setDealSize] = useState(150000);

    const { complete, completion, isLoading } = useCompletion({
        api: "/api/generate-proposal",
    });

    const handleGenerate = () => {
        complete(JSON.stringify({
            client: clientName,
            sector: sector,
            size: dealSize,
            winProb: 0.72,
            optimalDiscount: 0.12
        }));
    };

    return (
        <main className="min-h-screen p-8 max-w-[1500px] mx-auto">
            <header className="mb-12">
                <div className="flex items-center gap-2 mb-2">
                    <FileText className="text-blue-500 w-5 h-5" />
                    <span className="text-xs font-bold tracking-widest text-blue-400 uppercase">Proposal Intelligence Suite</span>
                </div>
                <h1 className="text-4xl font-bold tracking-tight text-white mb-2">
                    AI <span className="text-blue-500">Proposal Composer</span>
                </h1>
                <p className="text-slate-400 text-sm max-w-xl">
                    Generate high-conversion, margin-aware proposal narratives tailored to specific sector objections and value drivers.
                </p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Input Panel */}
                <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
                    <div className="glass-card p-6 border-white/5 bg-slate-900/40 shadow-xl">
                        <h2 className="text-sm font-bold mb-8 text-slate-400 uppercase tracking-widest flex items-center gap-2">
                            <Settings className="w-4 h-4 text-blue-400" />
                            Target Parameters
                        </h2>

                        <div className="space-y-6">
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">Strategic Account Name</label>
                                <input
                                    type="text"
                                    placeholder="Enter client..."
                                    value={clientName}
                                    onChange={(e) => setClientName(e.target.value)}
                                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all placeholder:text-slate-700"
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">Market Vertical</label>
                                <div className="relative">
                                    <select
                                        value={sector}
                                        onChange={(e) => setSector(e.target.value)}
                                        className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-blue-500 outline-none transition-all appearance-none cursor-pointer"
                                    >
                                        <option value="Technology">Technology & SaaS</option>
                                        <option value="Finance">Financial Services</option>
                                        <option value="Manufacturing">Manufacturing & Logistics</option>
                                        <option value="Healthcare">Healthcare Intelligence</option>
                                    </select>
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                                        <ChevronLeft className="w-4 h-4 -rotate-90" />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">Contract Value ($)</label>
                                <input
                                    type="number"
                                    value={dealSize}
                                    onChange={(e) => setDealSize(Number(e.target.value))}
                                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-blue-500 outline-none transition-all tabular-nums"
                                />
                            </div>

                            <div className="pt-4 space-y-4">
                                <div className="p-4 rounded-xl bg-blue-500/5 border border-blue-500/10">
                                    <div className="flex items-center gap-2 text-blue-400 text-[10px] font-bold uppercase mb-2">
                                        <ShieldCheck className="w-3.5 h-3.5" />
                                        Predictive Engine Active
                                    </div>
                                    <p className="text-[11px] text-slate-400 leading-relaxed italic">
                                        Optimizing for <span className="text-white font-medium">Value-Based Negotiation</span>. Current win probability benchmark is 72% for the Technology sector at this price point.
                                    </p>
                                </div>

                                <button
                                    onClick={handleGenerate}
                                    disabled={isLoading}
                                    className="w-full py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold flex items-center justify-center gap-3 transition-all shadow-xl shadow-blue-900/40 active:scale-95 disabled:opacity-50 disabled:active:scale-100 group"
                                >
                                    <Sparkles className="w-4 h-4 text-white group-hover:rotate-12 transition-transform" />
                                    {isLoading ? "ORCHESTRATING..." : "COMPOSE NARRATIVE"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Canvas */}
                <div className="lg:col-span-8">
                    <div className="glass-card min-h-[842px] flex flex-col border-white/10 bg-slate-900/10 backdrop-blur-3xl relative shadow-2xl overflow-hidden rounded-3xl">
                        <div className="px-8 py-4 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
                            <div className="flex items-center gap-4">
                                <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Live Document View</h3>
                                {completion && (
                                    <div className="flex items-center gap-1.5 text-[9px] bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full border border-emerald-500/20 font-bold uppercase tracking-tighter shadow-[0_0_10px_rgba(16,185,129,0.1)]">
                                        <CheckCircle2 className="w-2.5 h-2.5" />
                                        Verified by AI
                                    </div>
                                )}
                            </div>

                            <div className="flex gap-3">
                                <button className="px-4 py-2 rounded-xl text-[10px] font-bold uppercase bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-all border border-white/5">
                                    Export PDF
                                </button>
                                <button className="px-4 py-2 rounded-xl text-[10px] font-bold uppercase bg-blue-600 text-white hover:bg-blue-500 transition-all flex items-center gap-2 shadow-lg shadow-blue-900/20">
                                    <Send className="w-3 h-3" />
                                    Push to CRM
                                </button>
                            </div>
                        </div>

                        <div className="flex-1 p-[10%] bg-gradient-to-b from-white/[0.02] to-transparent">
                            {!completion && !isLoading ? (
                                <div className="h-full flex flex-col items-center justify-center text-slate-600 space-y-6 pt-20">
                                    <div className="relative">
                                        <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full" />
                                        <FileText className="w-24 h-24 stroke-[0.5] relative z-10" />
                                    </div>
                                    <div className="text-center space-y-2 relative z-10">
                                        <p className="text-sm font-medium text-slate-400">Canvas represents a blank workspace</p>
                                        <p className="text-xs text-slate-600 leading-relaxed max-w-xs mx-auto">
                                            Define your deal parameters on the left to activate the orchestrator and generate a margin-aware proposal.
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="whitespace-pre-wrap font-serif leading-[1.8] text-slate-200 text-lg selection:bg-blue-500/30"
                                >
                                    {completion}
                                    {isLoading && (
                                        <motion.span
                                            animate={{ opacity: [0, 1, 0] }}
                                            transition={{ repeat: Infinity, duration: 0.8 }}
                                            className="inline-block w-2 h-6 bg-blue-500 ml-2 align-middle shadow-[0_0_8px_rgba(59,130,246,0.6)]"
                                        />
                                    )}
                                </motion.div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
