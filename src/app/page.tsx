"use client";

import { motion } from "framer-motion";
import {
    BarChart3,
    ChevronRight,
    FileText,
    PieChart,
    Target,
    TrendingUp,
    Users,
    Zap,
    ArrowUpRight,
    ShieldCheck,
    BrainCircuit,
    Activity,
    Lock
} from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { calculateWinProbability, optimizeDiscount, DealData } from "@/lib/intelligence/revenue-engine";

interface Deal extends Omit<DealData, 'repExperience' | 'competitorPresence'> {
    id: string;
}

export default function Dashboard() {
    const [activeDealCount, setActiveDealCount] = useState(12);
    const [revenueLift, setRevenueLift] = useState(4.2);

    // Mock data for deals
    const deals: Deal[] = [
        { id: '1', client: 'Acme Corp', sector: 'Technology', size: 125000, discount: 0.12, stage: 'negotiation' },
        { id: '2', client: 'Globex', sector: 'Finance', size: 85000, discount: 0.05, stage: 'proposal' },
        { id: '3', client: 'Soylent Inc', sector: 'Manufacturing', size: 450000, discount: 0.15, stage: 'negotiation' },
    ];

    return (
        <main className="min-h-screen p-8 max-w-[1600px] mx-auto">
            {/* Header */}
            <header className="flex justify-between items-end mb-12">
                <div>
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-2 mb-2"
                    >
                        <BrainCircuit className="text-blue-500 w-6 h-6" />
                        <span className="text-sm font-semibold tracking-widest text-blue-400 uppercase">Revenue Intelligence Engine</span>
                    </motion.div>
                    <h1 className="text-5xl font-bold tracking-tight text-white">
                        Governance <span className="text-blue-500">Dashboard</span>
                    </h1>
                </div>

                <div className="flex gap-4">
                    <Link href="/proposals/new" className="glass-button px-6 py-3 rounded-xl flex items-center gap-2 text-sm font-medium">
                        <Zap className="w-4 h-4 text-emerald-400" />
                        New Deal Analysis
                    </Link>
                </div>
            </header>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                <StatCard
                    title="Active Opportunities"
                    value={activeDealCount.toString()}
                    change="+3 this week"
                    icon={<Target className="text-blue-500" />}
                    delay={0}
                />
                <StatCard
                    title="Avg. Win Probability"
                    value="68%"
                    change="+12% vs last Q"
                    icon={<TrendingUp className="text-emerald-500" />}
                    delay={0.1}
                />
                <StatCard
                    title="Revenue Lift (AI)"
                    value={`+${revenueLift}%`}
                    change="$1.2M incremental"
                    icon={<Zap className="text-amber-500" />}
                    delay={0.2}
                />
                <StatCard
                    title="Margin Health"
                    value="84%"
                    change="Optimal range"
                    icon={<ShieldCheck className="text-purple-500" />}
                    delay={0.3}
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Deal Flow */}
                <div className="lg:col-span-2 space-y-6">
                    <section className="glass-card p-6 border-white/5 bg-slate-900/40">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-semibold flex items-center gap-2">
                                <BarChart3 className="w-5 h-5 text-blue-400" />
                                Live Revenue Predictions
                            </h2>
                            <button className="text-sm text-slate-400 hover:text-white transition-colors">View All Deals</button>
                        </div>

                        <div className="space-y-4">
                            {deals.map((deal, idx) => {
                                const fullDeal = { ...deal, repExperience: 5, competitorPresence: false } as DealData;
                                const winProb = calculateWinProbability(fullDeal);
                                const optimal = optimizeDiscount(fullDeal);

                                return (
                                    <motion.div
                                        key={deal.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.4 + idx * 0.1 }}
                                        className="p-4 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between hover:bg-white/10 transition-colors group cursor-pointer"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500 font-bold">
                                                {deal.client[0]}
                                            </div>
                                            <div>
                                                <h3 className="font-medium text-white">{deal.client}</h3>
                                                <p className="text-xs text-slate-400">{deal.sector} • ${deal.size.toLocaleString()}</p>
                                            </div>
                                        </div>

                                        <div className="flex gap-12 text-right">
                                            <div>
                                                <p className="text-[10px] uppercase tracking-wider text-slate-500 mb-1">Win Probability</p>
                                                <div className="flex items-center gap-2">
                                                    <span className={`text-lg font-bold ${winProb > 0.6 ? 'text-emerald-400' : 'text-amber-400'}`}>
                                                        {(Number(winProb) * 100).toFixed(0)}%
                                                    </span>
                                                    <div className="w-16 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                                                        <motion.div
                                                            initial={{ width: 0 }}
                                                            animate={{ width: `${winProb * 100}%` }}
                                                            className={`h-full ${winProb > 0.6 ? 'bg-emerald-400' : 'bg-amber-400'}`}
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <div>
                                                <p className="text-[10px] uppercase tracking-wider text-slate-500 mb-1">Pricing Health</p>
                                                <p className="text-white font-medium">
                                                    {Math.abs(deal.discount - optimal.discount) < 0.05 ? 'Optimal' : 'Needs Review'}
                                                </p>
                                            </div>

                                            <Link href="/simulator" className="self-center p-2 rounded-lg bg-white/5 hover:bg-blue-600 hover:text-white transition-all">
                                                <ChevronRight className="w-4 h-4" />
                                            </Link>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </section>

                    {/* Revenue Velocity Visualization */}
                    <section className="glass-card p-6 border-white/5 bg-slate-900/20 box-border">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                <Activity className="w-4 h-4 text-blue-400" />
                                Revenue Velocity (MTD)
                            </h2>
                            <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-tighter">
                                <span className="flex items-center gap-1 text-blue-400"><div className="w-2 h-2 rounded-full bg-blue-400" /> Projected</span>
                                <span className="flex items-center gap-1 text-slate-600"><div className="w-2 h-2 rounded-full bg-slate-600" /> Baseline</span>
                            </div>
                        </div>

                        <div className="h-[200px] w-full flex items-end justify-between gap-1 px-2">
                            {[45, 52, 48, 61, 55, 67, 72, 65, 81, 78, 85, 92].map((val, i) => (
                                <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                                    <div className="w-full relative flex items-end justify-center min-h-[150px]">
                                        <motion.div
                                            initial={{ height: 0 }}
                                            animate={{ height: `${val}%` }}
                                            className="w-full bg-blue-600/20 rounded-t-lg border-x border-t border-blue-500/20 group-hover:bg-blue-600/40 transition-colors"
                                        />
                                        <motion.div
                                            initial={{ height: 0 }}
                                            animate={{ height: `${val * 0.7}%` }}
                                            className="absolute bottom-0 w-1/2 bg-slate-800 rounded-t-sm group-hover:bg-slate-700 transition-colors"
                                        />
                                    </div>
                                    <span className="text-[8px] text-slate-600 font-bold uppercase">{['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'][i]}</span>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Negotiation Simulator CTA */}
                    <section className="glass-card p-8 border-blue-500/20 bg-blue-500/5 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Zap className="w-32 h-32 text-blue-500" />
                        </div>

                        <div className="relative z-10 max-w-lg">
                            <span className="px-2 py-1 rounded bg-blue-500/20 text-[10px] text-blue-400 font-bold uppercase tracking-widest mb-4 inline-block">Pro Feature</span>
                            <h2 className="text-2xl font-bold mb-3">AI Negotiation Simulator</h2>
                            <p className="text-slate-400 mb-6 font-medium leading-relaxed">
                                Train your concession strategy using Markov Decision Processes (MDP). Predict buyer counteroffers and protect your margins with reinforcement learning.
                            </p>
                            <Link href="/simulator" className="px-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 transition-all font-bold flex items-center gap-2 w-fit shadow-lg shadow-blue-900/40 active:scale-95">
                                Start Simulation
                                <ArrowUpRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </section>
                </div>

                {/* Intelligence Sidebar */}
                <div className="space-y-6">
                    <section className="glass-card p-6 border-white/5 bg-slate-900/40">
                        <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
                            <PieChart className="w-5 h-5 text-emerald-400" />
                            Margin Insights
                        </h2>

                        <div className="space-y-6">
                            <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/10">
                                <p className="text-sm text-emerald-400 font-medium mb-1 flex items-center gap-1">
                                    <TrendingUp className="w-3 h-3" /> Potential Uplift
                                </p>
                                <h4 className="text-2xl font-bold font-mono">$242,500</h4>
                                <p className="text-[10px] text-slate-500 mt-2 italic">Identified from underpriced SaaS deals in Technology sector</p>
                            </div>

                            <div className="space-y-3">
                                <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Top Margin Risk</p>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-slate-300">Over-discounting</span>
                                    <span className="text-sm font-bold text-red-400">14.2%</span>
                                </div>
                                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                                    <div className="h-full bg-red-400 w-[14%]" />
                                </div>

                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-slate-300">Deal Slippage</span>
                                    <span className="text-sm font-bold text-amber-400">8.5%</span>
                                </div>
                                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                                    <div className="h-full bg-amber-400 w-[8%]" />
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="glass-card p-6 border-white/5 bg-slate-900/40">
                        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                            <Users className="w-5 h-5 text-purple-400" />
                            Team Performance
                        </h2>
                        <p className="text-sm text-slate-400 mb-6 italic">AI-assisted deal coaching is active for 4 reps.</p>

                        <div className="flex -space-x-3 mb-4">
                            {[1, 2, 3, 4, 5].map(i => (
                                <div key={i} className="w-8 h-8 rounded-full border-2 border-[#030711] bg-slate-800" />
                            ))}
                            <div className="w-8 h-8 rounded-full border-2 border-[#030711] bg-blue-600 flex items-center justify-center text-[10px] font-bold">
                                +12
                            </div>
                        </div>

                        <button className="w-full py-2 text-sm font-medium text-slate-300 border border-white/10 rounded-lg hover:bg-white/5 transition-colors">
                            Coach Deal Strategies
                        </button>
                    </section>
                </div>
            </div>
        </main>
    );
}

function StatCard({ title, value, change, icon, delay }: { title: string, value: string, change: string, icon: React.ReactNode, delay: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay }}
            className="glass-card p-6 border-white/5 flex flex-col justify-between hover:border-white/10 transition-colors bg-slate-900/20"
        >
            <div className="flex justify-between items-start mb-4">
                <div className="p-2 rounded-lg bg-white/5">
                    {icon}
                </div>
                <span className="text-[10px] text-slate-400 bg-white/5 px-2 py-1 rounded font-medium">REAL-TIME</span>
            </div>
            <div>
                <h3 className="text-slate-400 text-sm font-medium mb-1">{title}</h3>
                <p className="text-3xl font-bold text-white tracking-tight leading-none mb-2">{value}</p>
                <p className={`text-xs font-semibold ${change.includes('+') ? 'text-emerald-400' : 'text-slate-400'}`}>
                    {change}
                </p>
            </div>
        </motion.div>
    );
}
