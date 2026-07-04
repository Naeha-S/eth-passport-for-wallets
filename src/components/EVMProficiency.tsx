import React, { useState } from "react";
import { EVMProficiencyData } from "../types";
import { Cpu, ShieldCheck, Zap, Activity, Info, BarChart3, CheckCircle2 } from "lucide-react";
import { motion } from "motion/react";

interface EVMProficiencyProps {
  proficiency: EVMProficiencyData;
}

export default function EVMProficiency({ proficiency }: EVMProficiencyProps) {
  const [activeAxis, setActiveAxis] = useState<number>(0);

  // Dynamic values derived from the user's score profile
  const defiVal = Math.min(0.95, 0.45 + (proficiency.compositeScore / 200));
  const nftVal = Math.min(0.90, 0.25 + ((100 - proficiency.compositeScore) / 180));
  const daoVal = Math.min(0.90, 0.35 + (proficiency.compositeScore / 250));
  const govVal = Math.min(0.95, 0.20 + (proficiency.compositeScore / 220));

  const radarData = [
    { name: "DeFi", value: defiVal, count: Math.round(defiVal * 160), protocol: "Uniswap V3 Hub & Curve Finance", desc: "Decentralized automated liquidity provisioning, AMM routing, and yield compounding cycles." },
    { name: "NFT", value: nftVal, count: Math.round(nftVal * 80), protocol: "OpenSea Standard / Blur Market", desc: "Non-fungible ERC-721/1155 asset acquisitions, minting execution, and digital artifact collection history." },
    { name: "DAO", value: daoVal, count: Math.round(daoVal * 110), protocol: "Snapshot Governance Voting", desc: "Decentralized autonomous organization voting engagement, multi-signature confirmations, and proposal weight." },
    { name: "Governance", value: govVal, count: Math.round(govVal * 90), protocol: "Aave Governor v2 / Uniswap Gov", desc: "Active on-chain governance interactions, protocol parameter updates, and token delegation broadcasts." }
  ];

  const gridLevels = [0.25, 0.5, 0.75, 1.0];

  const getPointsString = (dataList: typeof radarData) => {
    const p0 = `50,${50 - 38 * dataList[0].value}`;
    const p1 = `${50 + 38 * dataList[1].value},50`;
    const p2 = `50,${50 + 38 * dataList[2].value}`;
    const p3 = `${50 - 38 * dataList[3].value},50`;
    return `${p0} ${p1} ${p2} ${p3}`;
  };

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

      {/* INTERACTIVE CONTRACT INTERACTION RADAR */}
      <div id="contract-radar-container" className="grid grid-cols-1 md:grid-cols-12 gap-6 bg-black/45 border border-editorial-border p-5 md:p-6 mb-8 items-center">
        <div className="md:col-span-5 flex flex-col items-center justify-center relative">
          <div className="text-center w-full mb-3">
            <span className="text-[8px] font-mono tracking-widest text-gray-500 uppercase block">INTERACTIVE VISUALIZER</span>
            <h4 className="font-serif text-sm text-editorial-paper font-medium">Contract Interaction Radar</h4>
          </div>
          
          <div className="relative w-full max-w-[240px] aspect-square flex items-center justify-center bg-black/10 border border-editorial-border/30 p-2">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              {/* Background circular/diamond level rings */}
              {gridLevels.map((lvl, idx) => {
                const r = 38 * lvl;
                return (
                  <g key={idx}>
                    <polygon
                      points={`50,${50 - r} ${50 + r},50 50,${50 + r} ${50 - r},50`}
                      fill="none"
                      stroke="rgba(98, 146, 158, 0.15)"
                      strokeWidth="0.4"
                    />
                    <text x={50} y={49 - r} className="text-[2.5px] fill-gray-600 font-mono text-center select-none" textAnchor="middle">
                      {Math.round(lvl * 100)}%
                    </text>
                  </g>
                );
              })}

              {/* Axis lines */}
              <line x1="50" y1="12" x2="50" y2="88" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="0.4" />
              <line x1="12" y1="50" x2="88" y2="50" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="0.4" />

              {/* Label positions */}
              <text 
                x="50" y="8" 
                onClick={() => setActiveAxis(0)}
                onMouseEnter={() => setActiveAxis(0)}
                className={`text-[3.5px] font-mono font-bold cursor-pointer transition-colors duration-200 ${activeAxis === 0 ? "fill-editorial-accent" : "fill-gray-400 hover:fill-white"}`} 
                textAnchor="middle"
              >
                ▲ DEFI
              </text>
              <text 
                x="93" y="51" 
                onClick={() => setActiveAxis(1)}
                onMouseEnter={() => setActiveAxis(1)}
                className={`text-[3.5px] font-mono font-bold cursor-pointer transition-colors duration-200 ${activeAxis === 1 ? "fill-editorial-accent" : "fill-gray-400 hover:fill-white"}`} 
                textAnchor="start"
              >
                NFT ▶
              </text>
              <text 
                x="50" y="94" 
                onClick={() => setActiveAxis(2)}
                onMouseEnter={() => setActiveAxis(2)}
                className={`text-[3.5px] font-mono font-bold cursor-pointer transition-colors duration-200 ${activeAxis === 2 ? "fill-editorial-accent" : "fill-gray-400 hover:fill-white"}`} 
                textAnchor="middle"
              >
                ▼ DAO
              </text>
              <text 
                x="7" y="51" 
                onClick={() => setActiveAxis(3)}
                onMouseEnter={() => setActiveAxis(3)}
                className={`text-[3.5px] font-mono font-bold cursor-pointer transition-colors duration-200 ${activeAxis === 3 ? "fill-editorial-accent" : "fill-gray-400 hover:fill-white"}`} 
                textAnchor="end"
              >
                ◀ GOV
              </text>

              {/* The data polygon filled with gold/accent */}
              <polygon
                points={getPointsString(radarData)}
                fill="rgba(98, 146, 158, 0.22)"
                stroke="#62929e"
                strokeWidth="0.85"
                className="transition-all duration-500 ease-out"
              />

              {/* Data points/vertices */}
              {radarData.map((data, idx) => {
                let cx = 50;
                let cy = 50;
                if (idx === 0) cy = 50 - 38 * data.value;
                else if (idx === 1) cx = 50 + 38 * data.value;
                else if (idx === 2) cy = 50 + 38 * data.value;
                else if (idx === 3) cx = 50 - 38 * data.value;

                const isHovered = activeAxis === idx;

                return (
                  <circle
                    key={idx}
                    cx={cx}
                    cy={cy}
                    r={isHovered ? 2.5 : 1.5}
                    fill={isHovered ? "#ffffff" : "#62929e"}
                    stroke={isHovered ? "#62929e" : "rgba(0,0,0,0.8)"}
                    strokeWidth="0.4"
                    className="cursor-pointer transition-all duration-200"
                    onMouseEnter={() => setActiveAxis(idx)}
                    onClick={() => setActiveAxis(idx)}
                  />
                );
              })}
            </svg>
          </div>
        </div>

        {/* Active Detail Panel */}
        <div className="md:col-span-7 space-y-3 p-4 bg-black/30 border border-editorial-border/60 self-stretch flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between border-b border-editorial-border/40 pb-1.5">
              <span className="text-[8px] font-mono uppercase tracking-widest text-editorial-accent font-bold">RADAR SECTOR AUDIT</span>
              <span className="text-[10px] font-mono text-gray-400">Sector {activeAxis !== null ? activeAxis + 1 : "1-4"} of 4</span>
            </div>

            <div className="py-1">
              <h4 className="font-serif text-lg text-editorial-paper font-light flex items-center gap-2">
                {radarData[activeAxis ?? 0].name} Contract Profiling
              </h4>
              <div className="text-[10px] font-mono text-gray-400 mt-1 flex gap-4">
                <span>Interaction Index: <strong className="text-white">{Math.round(radarData[activeAxis ?? 0].value * 100)}%</strong></span>
                <span>Verified Events: <strong className="text-editorial-accent">{radarData[activeAxis ?? 0].count}</strong></span>
              </div>
            </div>

            <p className="text-xs text-gray-400 font-sans leading-relaxed pt-1">
              {radarData[activeAxis ?? 0].desc}
            </p>
          </div>

          <div className="bg-[#141517] p-2.5 border border-editorial-border/40 rounded-none space-y-0.5 mt-2">
            <span className="text-[8px] font-mono uppercase tracking-widest text-gray-500 block">Peak Protocol Anchor</span>
            <span className="font-serif text-xs text-editorial-paper italic block">{radarData[activeAxis ?? 0].protocol}</span>
          </div>
          
          <div className="text-[9px] font-mono text-gray-500 pt-1.5 flex justify-between">
            <span>* Click/Hover vertices to inspect sectors</span>
            <span>Live Heuristics Alignment</span>
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
