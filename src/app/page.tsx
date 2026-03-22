"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
    BarChart3,
    ChevronRight,
    Search,
    Target,
    TrendingUp,
    Users,
    Zap,
    ArrowUpRight,
    ShieldCheck,
    BrainCircuit,
    Activity,
    LineChart,
    PieChart,
    ArrowUp,
    ArrowDown,
    Filter
} from "lucide-react";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { calculateWinProbability, optimizeDiscount, DealData } from "@/lib/intelligence/revenue-engine";

interface Deal extends Omit<DealData, 'repExperience' | 'competitorPresence'> {
    id: string;
}

export default function Dashboard() {
    const [activeDealCount, setActiveDealCount] = useState(12);
    const [revenueLift, setRevenueLift] = useState(4.2);
    const [searchQuery, setSearchQuery] = useState("");

    // Mock data for deals
    const deals: Deal[] = [
        { id: '1', client: 'Acme Corp', sector: 'Technology', size: 125000, discount: 0.12, stage: 'negotiation' },
        { id: '2', client: 'Globex', sector: 'Finance', size: 85000, discount: 0.05, stage: 'proposal' },
        { id: '3', client: 'Soylent Inc', sector: 'Manufacturing', size: 450000, discount: 0.15, stage: 'negotiation' },
    ];

    const filteredDeals = deals.filter(deal => 
        deal.client.toLowerCase().includes(searchQuery.toLowerCase()) || 
        deal.sector.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <main className="min-h-screen p-8 max-w-[1700px] mx-auto space-y-10 pb-24">
            {/* Background Decorative Elements */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden -z-20">
                <div className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] bg-blue-600/10 blur-[120px] rounded-full" />
                <div className="absolute bottom-1/4 -right-1/4 w-[500px] h-[500px] bg-emerald-600/5 blur-[100px] rounded-full" />
            </div>

            {/* Header Section */}
            <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-white/5 pb-10">
                <div className="space-y-4">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-3"
                    >
                        <div className="p-2.5 bg-blue-500/10 rounded-xl border border-blue-500/20 shadow-[0_0_20px_rgba(59,130,246,0.2)]">
                            <BrainCircuit className="text-blue-400 w-5 h-5 animate-pulse-soft" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[10px] font-black tracking-[0.3em] text-blue-500 uppercase leading-none">Intelligence Engine</span>
                            <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mt-1">Status: Active & Learning</span>
                        </div>
                    </motion.div>
                    <h1 className="text-6xl font-outfit font-black tracking-tighter text-white">
                        Revenue <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-emerald-400 to-indigo-400">Command Center</span>
                    </h1>
                </div>

                <div className="flex items-center gap-4 w-full md:w-auto">
                    <div className="relative group flex-1 md:flex-initial">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
                        <input 
                            type="text" 
                            placeholder="Search deals, sectors..." 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full md:w-[300px] bg-white/5 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/40 transition-all"
                        />
                    </div>
                    <Link href="/proposals/new" className="glass-button bg-blue-600/20 border-blue-500/30 text-white hover:bg-blue-600/30 whitespace-nowrap group">
                        <Zap className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                        <span>Build Proposal</span>
                    </Link>
                </div>
            </header>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Active Pipeline"
                    value={activeDealCount.toString()}
                    change="+24% YoY"
                    trend="up"
                    icon={<Target className="text-blue-400" />}
                    delay={0.1}
                    color="blue"
                />
                <StatCard
                    title="Win Probability"
                    value="72.4%"
                    change="+5.2% this month"
                    trend="up"
                    icon={<TrendingUp className="text-emerald-400" />}
                    delay={0.2}
                    color="emerald"
                />
                <StatCard
                    title="AI Revenue Lift"
                    value="+$1.8M"
                    change="Top 1% Performance"
                    trend="up"
                    icon={<LineChart className="text-indigo-400" />}
                    delay={0.3}
                    color="indigo"
                />
                <StatCard
                    title="Risk Tolerance"
                    value="Stable"
                    change="Low Volatility"
                    trend="neutral"
                    icon={<ShieldCheck className="text-amber-400" />}
                    delay={0.4}
                    color="amber"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-10">
                {/* Main Content Area */}
                <div className="lg:col-span-8 space-y-8">
                    {/* Deal Predictions Table */}
                    <section className="glass-card bg-slate-900/40 p-1">
                        <div className="p-6 pb-2 flex justify-between items-center">
                            <div>
                                <h2 className="text-xl font-bold flex items-center gap-3">
                                    <BarChart3 className="w-5 h-5 text-blue-500" />
                                    Dynamic Deal Intelligence
                                </h2>
                                <p className="text-xs text-slate-500 mt-1 uppercase tracking-wider font-bold">Real-time win probability analysis</p>
                            </div>
                            <button className="p-2 hover:bg-white/5 rounded-lg transition-colors border border-transparent hover:border-white/10">
                                <Filter className="w-4 h-4 text-slate-400" />
                            </button>
                        </div>

                        <div className="p-4 space-y-3">
                            <AnimatePresence mode="popLayout">
                                {filteredDeals.length > 0 ? filteredDeals.map((deal, idx) => {
                                    const fullDeal = { ...deal, repExperience: 5, competitorPresence: false } as DealData;
                                    const winProb = calculateWinProbability(fullDeal);
                                    const optimal = optimizeDiscount(fullDeal);
                                    const isOptimal = Math.abs(deal.discount - optimal.discount) < 0.05;

                                    return (
                                        <motion.div
                                            key={deal.id}
                                            layout
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            transition={{ delay: idx * 0.05 }}
                                            className="group p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] hover:border-white/10 transition-all cursor-pointer flex flex-col md:flex-row items-center justify-between gap-6"
                                        >
                                            <div className="flex items-center gap-4 min-w-[200px]">
                                                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br transition-all duration-500 flex items-center justify-center font-black text-lg ${
                                                    idx % 3 === 0 ? 'from-blue-600/20 to-blue-600/40 text-blue-400' : 
                                                    idx % 3 === 1 ? 'from-emerald-600/20 to-emerald-600/40 text-emerald-400' : 
                                                    'from-indigo-600/20 to-indigo-600/40 text-indigo-400'
                                                }`}>
                                                    {deal.client[0]}
                                                </div>
                                                <div>
                                                    <h3 className="font-bold text-white group-hover:text-blue-400 transition-colors uppercase tracking-tight">{deal.client}</h3>
                                                    <p className="text-[10px] text-slate-500 font-bold tracking-wider">{deal.sector} • ${deal.size.toLocaleString()}</p>
                                                </div>
                                            </div>

                                            <div className="flex-1 w-full max-w-md">
                                                <div className="flex justify-between items-end mb-2">
                                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Win Probability</span>
                                                    <span className={`text-sm font-black ${winProb > 0.6 ? 'text-emerald-400' : 'text-amber-400'}`}>
                                                        {(Number(winProb) * 100).toFixed(1)}%
                                                    </span>
                                                </div>
                                                <div className="h-2 w-full bg-slate-800/50 rounded-full overflow-hidden p-[1px]">
                                                    <motion.div
                                                        initial={{ width: 0 }}
                                                        animate={{ width: `${winProb * 100}%` }}
                                                        className={`h-full rounded-full ${winProb > 0.6 ? 'bg-gradient-to-r from-emerald-600 to-emerald-400' : 'bg-gradient-to-r from-amber-600 to-amber-400'}`}
                                                    />
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-10">
                                                <div className="text-right">
                                                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-tighter mb-1">Pricing Strategy</p>
                                                    <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full border text-[10px] font-black uppercase ${
                                                        isOptimal ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-red-500/10 border-red-500/20 text-red-400'
                                                    }`}>
                                                        <div className={`w-1.5 h-1.5 rounded-full ${isOptimal ? 'bg-emerald-400 animate-pulse' : 'bg-red-400'}`} />
                                                        {isOptimal ? 'Optimal' : 'Leakage Risk'}
                                                    </div>
                                                </div>
                                                <Link href="/simulator" className="p-3 rounded-xl bg-white/5 hover:bg-blue-600 group/btn transition-all border border-white/5 hover:border-blue-500 shadow-xl">
                                                    <ChevronRight className="w-5 h-5 text-slate-400 group-hover/btn:text-white transition-colors" />
                                                </Link>
                                            </div>
                                        </motion.div>
                                    );
                                }) : (
                                    <div className="py-20 text-center space-y-4">
                                        <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto">
                                            <Search className="text-slate-600 w-6 h-6" />
                                        </div>
                                        <p className="text-slate-400 font-bold">No deals matching "{searchQuery}"</p>
                                    </div>
                                )}
                            </AnimatePresence>
                        </div>
                    </section>

                    {/* Revenue Velocity Chart */}
                    <section className="glass-card bg-slate-900/40 p-8">
                        <div className="flex justify-between items-center mb-10">
                            <div>
                                <h2 className="text-lg font-bold flex items-center gap-2">
                                    <Activity className="w-5 h-5 text-indigo-400" />
                                    Growth Trajectory
                                </h2>
                                <p className="text-xs text-slate-500 mt-1 uppercase tracking-widest font-bold">Projected vs Actual Performance</p>
                            </div>
                            <div className="flex gap-4">
                                <span className="flex items-center gap-1.5 text-[10px] font-black uppercase text-blue-400">
                                    <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]" /> AI Forecast
                                </span>
                                <span className="flex items-center gap-1.5 text-[10px] font-black uppercase text-slate-600">
                                    <div className="w-2 h-2 rounded-full bg-slate-600" /> Ground Truth
                                </span>
                            </div>
                        </div>

                        <div className="h-[250px] flex items-end justify-between gap-3 group/chart">
                            {[32, 45, 41, 58, 52, 63, 68, 61, 75, 71, 84, 95].map((val, i) => (
                                <div key={i} className="flex-1 relative h-full flex items-end group/bar">
                                    <div className="absolute inset-0 opacity-0 group-hover/bar:opacity-100 transition-opacity flex flex-col items-center pointer-events-none -top-8">
                                        <span className="text-[10px] font-black text-blue-400 bg-blue-500/10 px-1.5 py-0.5 rounded border border-blue-500/20 shadow-xl">{val}%</span>
                                    </div>
                                    <motion.div
                                        initial={{ height: 0 }}
                                        animate={{ height: `${val}%` }}
                                        className="w-full bg-gradient-to-t from-blue-600/10 via-blue-500/20 to-blue-400/40 rounded-t-lg border-t border-x border-blue-400/20 group-hover/bar:from-blue-600/30 group-hover/bar:to-blue-400/60 transition-all duration-300 relative"
                                    >
                                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-blue-400 rounded-full blur-[2px] opacity-0 group-hover/bar:opacity-100 transition-opacity" />
                                    </motion.div>
                                    <motion.div
                                        initial={{ height: 0 }}
                                        animate={{ height: `${val * 0.7}%` }}
                                        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 bg-slate-800/40 rounded-t-sm border-t border-white/5"
                                    />
                                    <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[9px] font-black text-slate-600 group-hover/bar:text-slate-300 transition-colors uppercase">
                                        {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i]}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                {/* Sidebar */}
                <aside className="lg:col-span-4 space-y-8">
                    <section className="glass-card bg-emerald-500/[0.02] border-emerald-500/10 p-8 group relative overflow-hidden">
                        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-32 h-32 bg-emerald-500/10 blur-[60px] rounded-full group-hover:bg-emerald-500/20 transition-all duration-700" />
                        
                        <h2 className="text-xl font-bold mb-8 flex items-center gap-3">
                            <PieChart className="w-5 h-5 text-emerald-400" />
                            Margin Forensics
                        </h2>

                        <div className="space-y-8 relative z-10">
                            <div className="p-6 rounded-2xl bg-emerald-500/5 border border-emerald-500/10 shadow-inner group-hover:border-emerald-500/20 transition-all">
                                <p className="text-[10px] text-emerald-400/70 font-black uppercase tracking-[0.2em] mb-2 flex items-center gap-2">
                                    <Sparkles className="w-3 h-3" /> Targeted Recovery
                                </p>
                                <h4 className="text-4xl font-black text-white tracking-tighter">$242,500</h4>
                                <p className="text-[11px] text-slate-500 mt-4 leading-relaxed font-medium">
                                    AI identifies <span className="text-emerald-400 font-bold">14.2% potential uplift</span> across existing tech-sector negotiation patterns.
                                </p>
                            </div>

                            <div className="space-y-5 px-1">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">High Probability Risks</p>
                                
                                <RiskItem label="Aggressive Concessions" value="14.2%" color="red" />
                                <RiskItem label="Deal Lifecycle Slippage" value="8.5%" color="amber" />
                                <RiskItem label="Competitive Undercutting" value="4.1%" color="blue" />
                            </div>

                            <button className="w-full py-4 bg-emerald-600 text-white font-black text-xs uppercase tracking-widest rounded-xl hover:bg-emerald-500 transition-all shadow-lg shadow-emerald-900/20 active:scale-[0.98]">
                                Execute Risk Mitigation
                            </button>
                        </div>
                    </section>

                    <section className="glass-card bg-slate-900/40 p-8 border-white/5 hover:border-blue-500/20 transition-colors group">
                        <h2 className="text-lg font-bold mb-6 flex items-center gap-3 italic">
                            <Users className="w-5 h-5 text-blue-400" />
                            Force Multiplier
                        </h2>
                        
                        <div className="space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="flex -space-x-3">
                                    {[1, 2, 3, 4].map(i => (
                                        <div key={i} className="w-10 h-10 rounded-full border-2 border-[#030711] bg-gradient-to-br from-slate-700 to-slate-800 shadow-xl" />
                                    ))}
                                    <div className="w-10 h-10 rounded-full border-2 border-[#030711] bg-blue-600 flex items-center justify-center text-[10px] font-black text-white shadow-xl">
                                        +12
                                    </div>
                                </div>
                                <div>
                                    <p className="text-xs font-black text-white leading-none">Sales Excellence</p>
                                    <p className="text-[10px] text-slate-500 font-bold mt-1">4 Reps Over-indexing</p>
                                </div>
                            </div>

                            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 space-y-3">
                                <div className="flex justify-between items-center text-[10px] font-black uppercase text-slate-400">
                                    <span>Team Quota Health</span>
                                    <span className="text-blue-400">92%</span>
                                </div>
                                <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                                    <div className="h-full bg-blue-500 w-[92%]" />
                                </div>
                            </div>

                            <button className="w-full py-3 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white hover:bg-white/5 hover:border-white/20 transition-all">
                                View Coaching Insights
                            </button>
                        </div>
                    </section>
                </aside>
            </div>
        </main>
    );
}

function StatCard({ title, value, change, trend, icon, delay, color }: { 
    title: string, value: string, change: string, trend: 'up' | 'down' | 'neutral', icon: React.ReactNode, delay: number, color: string 
}) {
    const colorClasses = {
        blue: "from-blue-600/20 border-blue-500/20 group-hover:border-blue-500/40 text-blue-400 shadow-blue-500/5",
        emerald: "from-emerald-600/20 border-emerald-500/20 group-hover:border-emerald-500/40 text-emerald-400 shadow-emerald-500/5",
        indigo: "from-indigo-600/20 border-indigo-500/20 group-hover:border-indigo-500/40 text-indigo-400 shadow-indigo-500/5",
        amber: "from-amber-600/20 border-amber-500/20 group-hover:border-amber-500/40 text-amber-400 shadow-amber-500/5"
    }[color as 'blue' | 'emerald' | 'indigo' | 'amber'];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.5 }}
            className="group relative"
        >
            <div className={`absolute -inset-0.5 bg-gradient-to-br transition-all duration-500 blur-xl opacity-0 group-hover:opacity-100 ${colorClasses.split(' ')[0]}`} />
            <div className={`glass-card p-7 border bg-slate-950/20 h-full relative z-10 hover:-translate-y-2 transition-transform duration-500 ${colorClasses}`}>
                <div className="flex justify-between items-start mb-6">
                    <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/5 transition-transform group-hover:scale-110 group-hover:rotate-6 duration-500">
                        {icon}
                    </div>
                    {trend === 'up' && (
                        <div className="flex items-center gap-1 text-[10px] font-black text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-lg border border-emerald-500/20">
                            <ArrowUp className="w-3 h-3" /> HIGH
                        </div>
                    )}
                </div>
                
                <div className="space-y-1">
                    <h3 className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">{title}</h3>
                    <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-outfit font-black text-white tracking-tighter">{value}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-3">
                        <span className={`text-[11px] font-bold ${trend === 'up' ? 'text-emerald-400' : 'text-slate-500'}`}>
                            {change}
                        </span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

function RiskItem({ label, value, color }: { label: string, value: string, color: 'red' | 'amber' | 'blue' }) {
    const bg = color === 'red' ? 'bg-red-400' : color === 'amber' ? 'bg-amber-400' : 'bg-blue-400';
    return (
        <div className="space-y-2 group/risk">
            <div className="flex justify-between items-center text-[11px] font-bold">
                <span className="text-slate-300 group-hover/risk:text-white transition-colors">{label}</span>
                <span className={`font-black ${color === 'red' ? 'text-red-400' : color === 'amber' ? 'text-amber-400' : 'text-blue-400'}`}>{value}</span>
            </div>
            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden p-[1px]">
                <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: value }}
                    className={`h-full rounded-full ${bg} shadow-[0_0_10px_rgba(0,0,0,0.5)]`}
                />
            </div>
        </div>
    );
}

function Sparkles({ className }: { className?: string }) {
    return (
        <svg className={className} fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l2.4 7.2 7.6 2.4-7.6 2.4-2.4 7.2-2.4-7.2-7.6-2.4 7.6-2.4z" />
        </svg>
    )
}
