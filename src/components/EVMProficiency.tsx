import React from "react";
import { EVMProficiencyData } from "../types";
import { Cpu, ShieldCheck, Zap, Activity, Info, BarChart3, CheckCircle2 } from "lucide-react";
import { motion } from "motion/react";

interface EVMProficiencyProps {
  proficiency: EVMProficiencyData;
}

export default function EVMProficiency({ proficiency }: EVMProficiencyProps) {
  return (
    <div id="evm-proficiency-page" className="w-full bg-editorial-card border border-editorial-border rounded-none p-6 md:p-8 shadow-2xl relative">
      <div className="absolute top-0 left-0 w-full h-[2px] bg-editorial-accent"></div>
      
      {/* Header section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-editorial-border pb-6 mb-6">
        <div>
          <div className="text-editorial-accent font-sans tracking-[0.2em] text-[10px] uppercase font-bold flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5" />
            <span>Consensus Audit Engine</span>
          </div>
          <h2 className="text-2xl font-light font-serif text-editorial-paper uppercase tracking-tight mt-1">
            EVM Execution Proficiency
          </h2>
        </div>
        <div className="mt-4 md:mt-0 bg-editorial-accent/5 border border-editorial-accent/20 px-4 py-2.5 rounded-none text-right">
          <span className="text-[9px] font-sans font-bold uppercase tracking-widest text-gray-500 block">Dossier Classification</span>
          <span className="font-serif text-base text-editorial-accent italic font-semibold">{proficiency.rank}</span>
        </div>
      </div>

      {/* Main Grid: Score Radial & Parameters */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-8">
        {/* Composite Score Panel */}
        <div className="lg:col-span-5 bg-black/35 border border-editorial-border p-6 flex flex-col justify-between items-center text-center relative">
          <div className="w-full text-left border-b border-editorial-border/45 pb-3 mb-4">
            <span className="text-[10px] font-mono tracking-wider text-gray-400 font-bold uppercase">Weighted Index</span>
            <h3 className="font-serif text-sm text-editorial-paper mt-0.5">EVM Capability Score</h3>
          </div>

          <div className="relative w-44 h-44 flex items-center justify-center my-4">
            {/* Background Circle */}
            <svg className="absolute inset-0 w-full h-full -rotate-90">
              <circle
                cx="88"
                cy="88"
                r="74"
                fill="none"
                stroke="rgba(255,255,255,0.03)"
                strokeWidth="10"
              />
              <circle
                cx="88"
                cy="88"
                r="74"
                fill="none"
                stroke="#62929e"
                strokeWidth="10"
                strokeDasharray={2 * Math.PI * 74}
                strokeDashoffset={2 * Math.PI * 74 * (1 - proficiency.compositeScore / 100)}
                strokeLinecap="square"
                className="transition-all duration-1000 ease-out"
              />
            </svg>

            <div className="flex flex-col items-center justify-center">
              <span className="font-serif text-4xl font-light text-editorial-paper">
                {proficiency.compositeScore}
              </span>
              <span className="text-[9px] font-mono uppercase tracking-widest text-gray-500 mt-1">
                Percentile
              </span>
            </div>
          </div>

          <div className="w-full bg-black/40 border border-editorial-border/30 p-3 mt-4 text-[11px] font-sans text-gray-400 text-left leading-relaxed">
            <span className="font-bold text-editorial-accent block mb-1">Audit Assessment:</span>
            This wallet ranks in the <span className="text-white font-bold">{proficiency.compositeScore}%</span> tier of active network participants, characterized by disciplined contract invocations and structured protocol gas efficiency.
          </div>
        </div>

        {/* Specialized Capability Vectors */}
        <div className="lg:col-span-7 space-y-4">
          <div className="border-b border-editorial-border pb-2">
            <span className="text-[10px] font-mono tracking-wider text-gray-400 font-bold uppercase">Specialization Classifications</span>
            <h3 className="font-serif text-sm text-editorial-paper">Capability Matrix Breakdown</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Parameter 1 */}
            <div className="bg-[#141517] border border-editorial-border p-4 flex flex-col justify-between">
              <div>
                <span className="text-[9px] font-sans font-bold text-gray-500 uppercase tracking-widest">Gas Optimization</span>
                <p className="text-base font-serif italic text-editorial-paper font-medium mt-1">
                  {proficiency.gasOptimizationLevel} Standard
                </p>
              </div>
              <p className="text-[11px] text-gray-400 font-sans mt-2.5 leading-relaxed">
                Reflects efficient bytecode compilation matching or standard contract call gas structures.
              </p>
            </div>

            {/* Parameter 2 */}
            <div className="bg-[#141517] border border-editorial-border p-4 flex flex-col justify-between">
              <div>
                <span className="text-[9px] font-sans font-bold text-gray-500 uppercase tracking-widest">Contract Complexity</span>
                <p className="text-base font-serif italic text-editorial-paper font-medium mt-1">
                  {proficiency.smartContractComplexity}
                </p>
              </div>
              <p className="text-[11px] text-gray-400 font-sans mt-2.5 leading-relaxed">
                Determines interaction level with advanced multi-signature protocols and factory deployments.
              </p>
            </div>

            {/* Parameter 3 */}
            <div className="bg-[#141517] border border-editorial-border p-4 flex flex-col justify-between">
              <div>
                <span className="text-[9px] font-sans font-bold text-gray-500 uppercase tracking-widest">Staking Profile</span>
                <p className="text-base font-serif italic text-editorial-paper font-medium mt-1">
                  {proficiency.stakingAdoption}
                </p>
              </div>
              <p className="text-[11px] text-gray-400 font-sans mt-2.5 leading-relaxed">
                Heuristics associated with Lido, RocketPool, or node staking smart contract transactions.
              </p>
            </div>

            {/* Parameter 4 */}
            <div className="bg-[#141517] border border-editorial-border p-4 flex flex-col justify-between">
              <div>
                <span className="text-[9px] font-sans font-bold text-gray-500 uppercase tracking-widest">Scaling Adoption</span>
                <p className="text-base font-serif italic text-editorial-paper font-medium mt-1">
                  {proficiency.layer2Adoption}
                </p>
              </div>
              <p className="text-[11px] text-gray-400 font-sans mt-2.5 leading-relaxed">
                Measures migration intensity towards high-throughput L2 scaling rollups (Base, Arbitrum, etc.).
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Heuristic Execution Records Section */}
      <div className="space-y-4">
        <div className="border-b border-editorial-border pb-2 flex justify-between items-center">
          <div>
            <span className="text-[10px] font-mono tracking-wider text-gray-400 font-bold uppercase">Quantitative Audits</span>
            <h3 className="font-serif text-sm text-editorial-paper">Heuristic Verification Metrics</h3>
          </div>
          <div className="text-[10px] font-mono text-gray-500 flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-editorial-accent" />
            <span>LEDGER COMPLIANT</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {proficiency.metrics.map((metric, idx) => {
            const isExpert = metric.status === "expert";
            const isProficient = metric.status === "proficient";
            return (
              <div key={idx} className="bg-black/20 border border-editorial-border p-5 flex flex-col justify-between">
                <div className="flex justify-between items-start mb-2">
                  <div className="space-y-0.5">
                    <span className="font-serif text-sm font-medium text-editorial-paper block">{metric.name}</span>
                    <span className="text-[10px] font-sans font-bold text-gray-400 uppercase tracking-wider block">Heuristic Factor</span>
                  </div>
                  <div className="text-right">
                    <span className="font-mono text-sm font-bold text-editorial-paper block">{metric.value}</span>
                    <span className={`text-[8px] font-sans font-black uppercase tracking-widest border px-1.5 py-0.5 block mt-1 ${
                      isExpert 
                        ? "border-editorial-accent bg-editorial-accent/5 text-editorial-accent" 
                        : isProficient
                          ? "border-[#62929e]/30 bg-[#62929e]/5 text-[#62929e]"
                          : "border-gray-800 bg-gray-900/10 text-gray-500"
                    }`}>
                      {metric.status}
                    </span>
                  </div>
                </div>
                <p className="text-[11px] text-gray-400 leading-relaxed pt-2 border-t border-dashed border-editorial-border/35">
                  {metric.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-8 pt-4 border-t border-editorial-border flex justify-between items-center text-[9px] font-mono text-gray-500 uppercase tracking-[0.15em]">
        <span>Consensus Data Layer verified</span>
        <span>Secure cryptographic sign-off</span>
      </div>
    </div>
  );
}
