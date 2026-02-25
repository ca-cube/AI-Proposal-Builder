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
        <main className="min-h-screen p-8 bg-[#030711]">
            <div className="max-w-[1400px] mx-auto">
                <header className="mb-12 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                            <ChevronLeft className="w-5 h-5" />
                        </Link>
                        <div>
                            <h1 className="text-3xl font-bold text-white">AI <span className="text-blue-500">Proposal Composer</span></h1>
                            <p className="text-slate-400 text-sm">Revenue-intelligent narrative generation.</p>
                        </div>
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Input Panel */}
                    <div className="lg:col-span-4 space-y-6">
                        <div className="glass-card p-6 border-white/5 bg-slate-900/40">
                            <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
                                <Settings className="w-5 h-5 text-blue-400" />
                                Deal Parameters
                            </h2>

                            <div className="space-y-4">
                                <div>
                                    <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">Client Name</label>
                                    <input
                                        type="text"
                                        value={clientName}
                                        onChange={(e) => setClientName(e.target.value)}
                                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-blue-500 outline-none transition-all"
                                    />
                                </div>

                                <div>
                                    <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">Industry Sector</label>
                                    <select
                                        value={sector}
                                        onChange={(e) => setSector(e.target.value)}
                                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-blue-500 outline-none transition-all"
                                    >
                                        <option value="Technology">Technology</option>
                                        <option value="Finance">Finance</option>
                                        <option value="Manufacturing">Manufacturing</option>
                                        <option value="Healthcare">Healthcare</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">Expected Deal Size ($)</label>
                                    <input
                                        type="number"
                                        value={dealSize}
                                        onChange={(e) => setDealSize(Number(e.target.value))}
                                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-blue-500 outline-none transition-all"
                                    />
                                </div>

                                <div className="pt-4">
                                    <div className="p-4 rounded-xl bg-blue-500/5 border border-blue-500/10 mb-6">
                                        <div className="flex items-center gap-2 text-blue-400 text-xs font-bold uppercase mb-2">
                                            <ShieldCheck className="w-3 h-3" />
                                            Intelligence Check
                                        </div>
                                        <p className="text-xs text-slate-300">
                                            Based on current market data, a 12.5% discount offers the optimal balance of win probability and margin retention.
                                        </p>
                                    </div>

                                    <button
                                        onClick={handleGenerate}
                                        disabled={isLoading}
                                        className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-900/30 active:scale-95 disabled:opacity-50"
                                    >
                                        <Sparkles className="w-4 h-4" />
                                        {isLoading ? "Analyzing..." : "Generate Proposal"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Canvas */}
                    <div className="lg:col-span-8">
                        <div className="glass-card min-h-[700px] flex flex-col border-white/5 bg-slate-900/20 relative">
                            <div className="p-4 border-b border-white/5 flex justify-between items-center bg-white/5">
                                <div className="flex items-center gap-4">
                                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Document Canvas</span>
                                    {completion && (
                                        <span className="flex items-center gap-1 text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-500/20 animate-pulse-soft">
                                            <CheckCircle2 className="w-3 h-3" />
                                            AI Composition Active
                                        </span>
                                    )}
                                </div>

                                <div className="flex gap-2">
                                    <button className="px-3 py-1 rounded-md text-xs font-semibold bg-white/5 text-slate-300 hover:bg-white/10 transition-all">
                                        Export PDF
                                    </button>
                                    <button className="px-3 py-1 rounded-md text-xs font-semibold bg-blue-600 text-white hover:bg-blue-500 transition-all flex items-center gap-1">
                                        <Send className="w-3 h-3" />
                                        Send to CRM
                                    </button>
                                </div>
                            </div>

                            <div className="p-12 prose prose-invert max-w-none prose-p:text-slate-300 prose-headings:text-white prose-strong:text-blue-400">
                                {!completion && !isLoading ? (
                                    <div className="h-full flex flex-col items-center justify-center text-slate-500 space-y-4 opacity-50 pt-32">
                                        <FileText className="w-16 h-16 stroke-[1]" />
                                        <p className="text-sm">Enter deal parameters and click Generate to compose your proposal.</p>
                                    </div>
                                ) : (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="whitespace-pre-wrap font-sans leading-relaxed"
                                    >
                                        {completion}
                                        {isLoading && (
                                            <span className="inline-block w-1 h-5 bg-blue-500 animate-pulse ml-1 align-middle" />
                                        )}
                                    </motion.div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
