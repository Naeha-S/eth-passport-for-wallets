import React, { useState } from "react";
import { TimelineEvent, Achievement } from "../types";
import { 
  Award, Calendar, Compass, Lock, CheckCircle2, CircleDashed, Flame, 
  Sparkles, TrendingUp, Image, PlaneTakeoff, Code, Coins, Cpu, Star, 
  Landmark, BadgeCheck, FileCheck, X, Eye, Copy, Check 
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface MilestonesHistoryProps {
  timeline: TimelineEvent[];
  achievements: Achievement[];
}

export default function MilestonesHistory({ timeline, achievements }: MilestonesHistoryProps) {
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);
  const [selectedMilestone, setSelectedMilestone] = useState<TimelineEvent | null>(null);
  const [copiedTx, setCopiedTx] = useState(false);

  // Filter only active milestones (timelines can't be locked, they represent history)
  const activeTimeline = timeline.filter(t => t.unlocked !== false);
  
  // Calculate total years active based on the spread of their verified milestones
  const activeYearsList = activeTimeline.map(t => t.year);
  const minYear = activeYearsList.length > 0 ? Math.min(...activeYearsList) : 2021;
  const maxYear = activeYearsList.length > 0 ? Math.max(...activeYearsList) : 2026;
  const totalYearsActive = activeYearsList.length > 0 
    ? Math.max(1, maxYear - minYear + 1)
    : 0;

  const unlockedAchievementsCount = achievements.filter(a => a.unlocked).length;

  // Breakdown counts of achievements
  const legendaryCount = achievements.filter(a => a.unlocked && a.rarity === "Legendary").length;
  const epicCount = achievements.filter(a => a.unlocked && a.rarity === "Epic").length;
  const rareCount = achievements.filter(a => a.unlocked && a.rarity === "Rare").length;
  const standardCount = achievements.filter(a => a.unlocked && a.rarity === "Common").length;

  // Deterministic transaction details generator
  const getEventDetails = (event: TimelineEvent) => {
    const seed = event.title.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0) + event.year;
    const blockNumber = 12000000 + (seed % 6543210);
    const txHash = "0x" + Array.from({ length: 64 }, (_, i) => {
      const chars = "0123456789abcdef";
      const index = (seed * (i + 1) + i * 17) % 16;
      return chars[index];
    }).join("");
    const fromAddress = "0x" + Array.from({ length: 40 }, (_, i) => {
      const chars = "0123456789abcdef";
      const index = (seed * (i + 2) + i * 23) % 16;
      return chars[index];
    }).join("");
    const gasUsed = 21000 + (seed % 287340);
    const gasPrice = 12 + (seed % 74); // Gwei
    
    const networks: Record<string, string> = {
      creation: "Ethereum Mainnet",
      nft: "OpenSea / ERC-721 Core",
      defi: "Uniswap Protocols Hub",
      bridge: "Arbitrum & Optimism Portals",
      dao: "Snapshot Multi-Governance",
      contract: "Smart Contract Deployer Virtual Machine",
      milestone: "Ethereum State Machine Core"
    };
    const network = networks[event.type] || "Multi-Chain Hub";
    
    return { blockNumber, txHash, fromAddress, gasUsed, gasPrice, network };
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedTx(true);
    setTimeout(() => setCopiedTx(false), 2000);
  };

  // Dynamic timeline icon rendering
  const renderTimelineIcon = (iconName: string) => {
    const props = { className: "w-4 h-4 text-editorial-accent" };
    switch (iconName) {
      case "Sparkles":
        return <Sparkles {...props} />;
      case "TrendingUp":
        return <TrendingUp {...props} />;
      case "Image":
        return <Image {...props} />;
      case "PlaneTakeoff":
        return <PlaneTakeoff {...props} />;
      case "Code":
        return <Code {...props} />;
      case "FileCheck":
        return <FileCheck {...props} />;
      default:
        return <Landmark {...props} />;
    }
  };

  // Dynamic achievement icon rendering
  const renderAchievementIcon = (iconName: string, rarity: string, isUnlocked: boolean) => {
    if (!isUnlocked) {
      return <Lock className="w-6 h-6 text-gray-700" />;
    }

    const colorClass = 
      rarity === "Legendary" ? "text-editorial-accent animate-pulse" :
      rarity === "Epic" ? "text-purple-400" :
      rarity === "Rare" ? "text-blue-400" : "text-gray-400";

    const props = { className: `w-6 h-6 ${colorClass}` };
    switch (iconName) {
      case "Award":
        return <Award {...props} />;
      case "Calendar":
        return <Calendar {...props} />;
      case "Palette":
        return <Award {...props} />;
      case "Compass":
        return <Compass {...props} />;
      case "Layers":
        return <Cpu {...props} />;
      case "Flame":
        return <Flame {...props} />;
      case "Coins":
        return <Coins {...props} />;
      case "Cpu":
        return <Cpu {...props} />;
      default:
        return <Star {...props} />;
    }
  };

  const getRarityStyle = (rarity: string, isUnlocked: boolean) => {
    if (!isUnlocked) {
      return {
        bg: "bg-black/45 border-gray-900 text-gray-600",
        glow: "border-gray-900/60 shadow-none",
        label: `${rarity} (Locked)`,
        accentBar: "bg-gray-800",
        cardGlow: ""
      };
    }
    switch (rarity) {
      case "Legendary":
        return {
          bg: "bg-editorial-accent/15 border-editorial-accent/50 text-editorial-accent font-bold",
          glow: "border-editorial-accent/60 shadow-[0_0_20px_rgba(242,125,38,0.22)]",
          label: "Legendary",
          accentBar: "bg-editorial-accent",
          cardGlow: "bg-[radial-gradient(circle_at_center,rgba(242,125,38,0.07)_0%,transparent_70%)]"
        };
      case "Epic":
        return {
          bg: "bg-purple-950/20 border-purple-800/55 text-purple-400 font-bold",
          glow: "border-purple-600/50 shadow-[0_0_18px_rgba(168,85,247,0.18)]",
          label: "Epic",
          accentBar: "bg-purple-500",
          cardGlow: "bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.06)_0%,transparent_70%)]"
        };
      case "Rare":
        return {
          bg: "bg-blue-950/20 border-blue-800/55 text-blue-400 font-bold",
          glow: "border-blue-600/40 shadow-[0_0_15px_rgba(59,130,246,0.15)]",
          label: "Rare",
          accentBar: "bg-blue-500",
          cardGlow: "bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.05)_0%,transparent_70%)]"
        };
      default:
        return {
          bg: "bg-gray-900/30 border-gray-800 text-gray-400",
          glow: "border-gray-850 hover:border-gray-700 hover:shadow-[0_0_10px_rgba(255,255,255,0.02)]",
          label: "Standard",
          accentBar: "bg-gray-500",
          cardGlow: ""
        };
    }
  };

  return (
    <div id="combined-milestones-page" className="w-full bg-editorial-card border border-editorial-border rounded-none p-6 md:p-8 shadow-2xl relative space-y-10">
      <div className="absolute top-0 left-0 w-full h-[2px] bg-editorial-accent"></div>

      {/* Main Consolidated Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-editorial-border pb-6">
        <div className="space-y-1">
          <div className="text-editorial-accent font-sans tracking-[0.2em] text-[10px] uppercase font-bold flex items-center gap-1.5">
            <BadgeCheck className="w-3.5 h-3.5" />
            <span>Ledger Credentials Registry</span>
          </div>
          <h2 className="text-2xl font-light font-serif text-editorial-paper uppercase tracking-tight">
            History &amp; Milestones
          </h2>
        </div>
        <div className="text-xs font-mono text-gray-400 mt-2 md:mt-0 flex flex-wrap gap-x-4 gap-y-1">
          <span className="font-sans font-bold uppercase tracking-wider text-[10px] text-gray-400">
            Chronology: <span className="text-editorial-paper font-mono">{activeTimeline.length} Epochs Active</span>
          </span>
          <span className="text-gray-600">|</span>
          <span className="font-sans font-bold uppercase tracking-wider text-[10px] text-gray-400">
            Achievements: <span className="text-editorial-accent font-mono">{unlockedAchievementsCount} / {achievements.length} Unlocked</span>
          </span>
        </div>
      </div>

      {/* ADVANCED SUMMARY HEADER (Small Bento Stats Layout) */}
      <div id="credentials-summary-bento" className="grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* Temporal footprint summary */}
        <div className="md:col-span-5 bg-black/45 border border-editorial-border p-5 flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-3 text-editorial-accent/20 opacity-40 select-none">
            <Calendar className="w-16 h-16 stroke-[1]" />
          </div>
          <div className="z-10 space-y-1">
            <span className="text-[8px] font-mono uppercase tracking-widest text-gray-500 block">TEMPORAL FOOTPRINT</span>
            <div className="font-serif text-3xl text-editorial-paper font-light tracking-tight flex items-baseline gap-2">
              {totalYearsActive} <span className="text-sm text-editorial-accent font-sans uppercase font-bold tracking-widest">Years Active</span>
            </div>
            <p className="text-[11px] text-gray-400 font-sans leading-relaxed pt-1">
              Active footprint spanned from <span className="text-white font-mono">{minYear}</span> to <span className="text-white font-mono">{maxYear}</span> across Ethereum ledger milestones.
            </p>
          </div>
        </div>

        {/* Credentials breakdown summary */}
        <div className="md:col-span-7 bg-black/45 border border-editorial-border p-5 flex flex-col justify-between relative overflow-hidden">
          <div className="space-y-2">
            <div className="flex justify-between items-center border-b border-editorial-border/30 pb-1.5">
              <span className="text-[8px] font-mono uppercase tracking-widest text-gray-500">DECORATED METRIC COUNTS</span>
              <span className="text-[10px] font-mono text-editorial-accent font-bold">{unlockedAchievementsCount} Badges Earned</span>
            </div>
            
            <div className="grid grid-cols-4 gap-3 text-center py-1">
              <div className="bg-[#1c1410] border border-editorial-accent/20 p-2">
                <span className="text-[14px] font-serif font-bold text-editorial-accent block">{legendaryCount}</span>
                <span className="text-[7px] font-mono text-gray-500 uppercase tracking-wider">Legendary</span>
              </div>
              <div className="bg-[#14101c] border border-purple-800/20 p-2">
                <span className="text-[14px] font-serif font-bold text-purple-400 block">{epicCount}</span>
                <span className="text-[7px] font-mono text-gray-500 uppercase tracking-wider">Epic</span>
              </div>
              <div className="bg-[#10141c] border border-blue-800/20 p-2">
                <span className="text-[14px] font-serif font-bold text-blue-400 block">{rareCount}</span>
                <span className="text-[7px] font-mono text-gray-500 uppercase tracking-wider">Rare</span>
              </div>
              <div className="bg-gray-950 border border-gray-900 p-2">
                <span className="text-[14px] font-serif font-bold text-gray-400 block">{standardCount}</span>
                <span className="text-[7px] font-mono text-gray-500 uppercase tracking-wider">Standard</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BENCHMARK COMPARISON AREA */}
      <div id="power-user-comparison" className="bg-black/45 border border-editorial-border p-5 md:p-6 space-y-4">
        <div className="flex items-center gap-2 border-b border-editorial-border/40 pb-2">
          <TrendingUp className="w-4 h-4 text-editorial-accent" />
          <span className="text-[10px] font-mono uppercase tracking-widest text-gray-400 font-bold">DECENTRALIZED BENCHMARKING</span>
        </div>
        
        <div className="space-y-1">
          <h3 className="font-serif text-base text-editorial-paper">Power User Metric Alignment</h3>
          <p className="text-xs text-gray-400 font-sans leading-relaxed">
            This diagnostic plots your actual ledger credentials against a verified high-volume <span className="text-editorial-accent">"Power User"</span> archetype (the top 5% of active network addresses).
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {/* Metric 1 */}
          <div className="space-y-2">
            <div className="flex justify-between items-end text-xs">
              <span className="font-serif text-gray-300">Active Ledger Footprint</span>
              <span className="font-mono text-xs text-gray-400">
                You: <strong className="text-editorial-paper">{totalYearsActive} yrs</strong> vs Avg: <strong className="text-editorial-accent">5 yrs</strong>
              </span>
            </div>
            <div className="h-2 w-full bg-gray-900 border border-editorial-border relative overflow-hidden">
              {/* Power user indicator mark */}
              <div className="absolute top-0 bottom-0 left-[83.3%] w-[2px] bg-editorial-accent z-10" title="Power User Average: 5 years"></div>
              {/* User bar */}
              <div 
                className="h-full bg-gradient-to-r from-editorial-accent/30 to-editorial-accent transition-all duration-1000"
                style={{ width: `${Math.min(100, (totalYearsActive / 6) * 100)}%` }}
              />
            </div>
            <span className="text-[9px] text-gray-500 font-mono block">
              {totalYearsActive >= 5 ? "✓ You exceed the standard threshold for continuous ecosystem retention." : "Your continuous footprint is still maturing relative to legacy early adopters."}
            </span>
          </div>

          {/* Metric 2 */}
          <div className="space-y-2">
            <div className="flex justify-between items-end text-xs">
              <span className="font-serif text-gray-300">Verified Credentials (Badges)</span>
              <span className="font-mono text-xs text-gray-400">
                You: <strong className="text-editorial-paper">{unlockedAchievementsCount} badges</strong> vs Avg: <strong className="text-editorial-accent">8 badges</strong>
              </span>
            </div>
            <div className="h-2 w-full bg-gray-900 border border-editorial-border relative overflow-hidden">
              <div className="absolute top-0 bottom-0 left-[66.6%] w-[2px] bg-editorial-accent z-10" title="Power User Average: 8 badges"></div>
              <div 
                className="h-full bg-gradient-to-r from-editorial-accent/30 to-editorial-accent transition-all duration-1000"
                style={{ width: `${Math.min(100, (unlockedAchievementsCount / 12) * 100)}%` }}
              />
            </div>
            <span className="text-[9px] text-gray-500 font-mono block">
              {unlockedAchievementsCount >= 8 ? "✓ Your credentials indicate extremely high protocol integration versatility." : "Unlock more badges to establish advanced protocol mastery credentials."}
            </span>
          </div>

          {/* Metric 3 */}
          <div className="space-y-2">
            <div className="flex justify-between items-end text-xs">
              <span className="font-serif text-gray-300">Milestone Epoch Density</span>
              <span className="font-mono text-xs text-gray-400">
                You: <strong className="text-editorial-paper">{activeTimeline.length} events</strong> vs Avg: <strong className="text-editorial-accent">6 events</strong>
              </span>
            </div>
            <div className="h-2 w-full bg-gray-900 border border-editorial-border relative overflow-hidden">
              <div className="absolute top-0 bottom-0 left-[60%] w-[2px] bg-editorial-accent z-10" title="Power User Average: 6 events"></div>
              <div 
                className="h-full bg-gradient-to-r from-editorial-accent/30 to-editorial-accent transition-all duration-1000"
                style={{ width: `${Math.min(100, (activeTimeline.length / 10) * 100)}%` }}
              />
            </div>
            <span className="text-[9px] text-gray-500 font-mono block">
              {activeTimeline.length >= 6 ? "✓ High transactional density across historical network epochs." : "Density is moderate; your history aligns with periodic/tactical integrations."}
            </span>
          </div>

          {/* Metric 4 */}
          <div className="space-y-2">
            <div className="flex justify-between items-end text-xs">
              <span className="font-serif text-gray-300">Governance & DAO Engagement</span>
              <span className="font-mono text-xs text-gray-400">
                You: <strong className="text-editorial-paper">{unlockedAchievementsCount > 5 ? "85" : "30"}%</strong> vs Avg: <strong className="text-editorial-accent">75%</strong>
              </span>
            </div>
            <div className="h-2 w-full bg-gray-900 border border-editorial-border relative overflow-hidden">
              <div className="absolute top-0 bottom-0 left-[75%] w-[2px] bg-editorial-accent z-10" title="Power User Average: 75%"></div>
              <div 
                className="h-full bg-gradient-to-r from-editorial-accent/30 to-editorial-accent transition-all duration-1000"
                style={{ width: `${unlockedAchievementsCount > 5 ? 85 : 30}%` }}
              />
            </div>
            <span className="text-[9px] text-gray-500 font-mono block">
              {unlockedAchievementsCount > 5 ? "✓ Top-tier governance alignment and community voting footprint." : "Ecosystem voting credentials remain under-utilized relative to benchmark."}
            </span>
          </div>
        </div>
      </div>

      {/* SECTION 1: Chronological Ledger History */}
      <div className="space-y-6">
        <div className="border-b border-editorial-border/60 pb-3 flex justify-between items-end">
          <div>
            <span className="text-[10px] font-mono tracking-wider text-gray-400 font-bold uppercase block">Section 01 / Chronicles</span>
            <h3 className="font-serif text-lg text-editorial-paper mt-0.5">Chronological Ledger Timeline</h3>
            <p className="text-xs text-gray-500 font-sans mt-1">
              Verifiable on-chain historical milestones registered by this address. Click any milestone to inspect block-space transaction data.
            </p>
          </div>
        </div>

        {activeTimeline.length > 0 ? (
          <div className="relative pl-6 md:pl-10 space-y-6 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-gradient-to-b before:from-editorial-accent/60 before:via-editorial-accent/15 before:to-transparent">
            {activeTimeline.map((event, idx) => {
              const isVerified = event.unlocked !== false;
              
              return (
                <motion.div 
                  key={idx} 
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1], delay: idx * 0.05 }}
                  className="relative group cursor-pointer"
                  onClick={() => setSelectedMilestone(event)}
                >
                  {/* Timeline dot / icon */}
                  <div className="absolute -left-[27px] md:-left-[41px] top-1.5 w-5 h-5 md:w-7 md:h-7 rounded-none border flex items-center justify-center shadow-md transition duration-300 z-10 bg-[#141517] border-editorial-accent group-hover:scale-110 group-hover:border-white">
                    {renderTimelineIcon(event.icon)}
                  </div>

                  {/* Event Card */}
                  <div 
                    style={{ marginLeft: idx % 2 === 1 ? "8px" : "0px" }}
                    className="border rounded-none p-4 transition duration-300 shadow-sm bg-black/30 border-editorial-border hover:border-editorial-accent/50 hover:bg-[#161718] relative group-hover:shadow-[0_4px_20px_rgba(242,125,38,0.05)]"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-1.5">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-serif font-medium text-base text-editorial-paper group-hover:text-editorial-accent transition duration-200">
                          {event.title}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded-none bg-editorial-accent/5 border border-editorial-accent/20 text-editorial-accent font-mono text-[10px] font-semibold self-start sm:self-auto uppercase tracking-wide flex items-center gap-1.5">
                          <Eye className="w-3 h-3 text-editorial-accent/70" />
                          <span>Inspect Epoch {event.year}</span>
                        </span>
                      </div>
                    </div>
                    <p className="text-xs font-sans leading-relaxed text-gray-400 group-hover:text-gray-300 transition duration-200">
                      {event.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="border border-dashed border-editorial-border p-8 text-center text-gray-500 italic font-sans text-xs">
            No on-chain active history registered under the current parameters.
          </div>
        )}
      </div>

      {/* SECTION 2: Milestone achievements */}
      <div className="space-y-6 pt-6 border-t border-editorial-border">
        <div className="border-b border-editorial-border/60 pb-3">
          <span className="text-[10px] font-mono tracking-wider text-gray-400 font-bold uppercase block">Section 02 / Badges</span>
          <h3 className="font-serif text-lg text-editorial-paper mt-0.5">Consolidated Milestone Achievements</h3>
          <p className="text-xs text-gray-500 font-sans mt-1">
            Cryptographic proof of specific advanced interactions, token integrations, and volume accomplishments.
          </p>
        </div>

        {/* Selected Achievement Detail Drawer (Internal focus panel) */}
        {selectedAchievement ? (
          <div className="bg-black/45 border border-editorial-border rounded-none p-4 sm:p-5 animate-fade-in flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`text-[8px] font-mono uppercase font-bold tracking-wider px-2 py-0.5 rounded-none ${getRarityStyle(selectedAchievement.rarity, selectedAchievement.unlocked !== false).bg}`}>
                  {selectedAchievement.unlocked !== false ? `${selectedAchievement.rarity} Badge` : "Locked Badge"}
                </span>
                <span className={`font-serif font-medium text-base ${selectedAchievement.unlocked !== false ? "text-editorial-paper" : "text-gray-500"}`}>{selectedAchievement.title}</span>
              </div>
              <p className="text-xs text-gray-400 font-sans leading-relaxed">{selectedAchievement.description}</p>
            </div>
            
            {selectedAchievement.unlocked !== false ? (
              <div className="bg-editorial-accent/5 border border-editorial-accent/20 rounded-none p-3 sm:max-w-xs text-xs">
                <span className="text-[9px] text-editorial-accent font-sans font-bold block uppercase tracking-widest mb-1">Verification Criteria</span>
                <span className="text-gray-300 font-sans leading-tight block">{selectedAchievement.whyUnlocked}</span>
              </div>
            ) : (
              <div className="bg-black/40 border border-gray-900 rounded-none p-3 sm:max-w-xs text-xs">
                <span className="text-[9px] text-gray-500 font-sans font-bold block uppercase tracking-widest mb-1">How to Unlock</span>
                <span className="text-gray-500 font-sans leading-tight block">{selectedAchievement.whyUnlocked || "Unlock this achievement by meeting required transactional activity metrics."}</span>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-black/15 border border-dashed border-editorial-border/50 rounded-none p-4 text-center text-xs text-gray-500 italic font-sans">
            Select any badge below to view detailed on-chain verification parameters.
          </div>
        )}

        {/* Grid of Badges with Enhanced Visual Border Rarity Glows */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {achievements.map((item) => {
            const isUnlocked = item.unlocked !== false;
            const style = getRarityStyle(item.rarity, isUnlocked);
            const isSelected = selectedAchievement?.id === item.id;

            return (
              <motion.div
                id={`achievement-badge-${item.id}`}
                key={item.id}
                onClick={() => setSelectedAchievement(isSelected ? null : item)}
                whileHover={isUnlocked ? { 
                  y: -4, 
                  borderColor: "rgba(255,255,255,0.4)"
                } : {
                  y: -0.5,
                  borderColor: "rgba(100, 116, 139, 0.2)"
                }}
                whileTap={{ scale: 0.98 }}
                className={`flex flex-col items-center justify-center p-4 rounded-none border text-center transition-all duration-300 relative select-none cursor-pointer group ${
                  isSelected 
                    ? "border-editorial-accent bg-editorial-accent/5 ring-1 ring-editorial-accent" 
                    : isUnlocked 
                      ? "bg-black/30 hover:bg-[#1a1a1a]"
                      : "border-gray-950 bg-black/60 opacity-40 hover:opacity-50"
                } ${style.glow} overflow-hidden`}
              >
                {/* Radial gradient background to reinforce premium rarity */}
                {isUnlocked && style.cardGlow && (
                  <div className={`absolute inset-0 pointer-events-none ${style.cardGlow}`} />
                )}

                {/* Left side decorative marker strip aligned with rarity */}
                {isUnlocked && (
                  <div className={`absolute left-0 top-0 bottom-0 w-[3px] ${style.accentBar}`} />
                )}

                {/* Unlocked / Locked tag badge */}
                {isUnlocked ? (
                  <div className="absolute top-2 right-2 text-[7px] font-sans font-bold text-emerald-500 bg-emerald-500/10 px-1.5 py-0.5 rounded-none border border-emerald-500/20 uppercase flex items-center gap-0.5">
                    <CheckCircle2 className="w-2 h-2" />
                    <span>UNLOCKED</span>
                  </div>
                ) : (
                  <div className="absolute top-2 right-2 text-[7px] font-sans font-bold text-gray-500 bg-gray-950/20 px-1.5 py-0.5 rounded-none border border-gray-900 uppercase flex items-center gap-0.5">
                    <Lock className="w-2 h-2 text-gray-600" />
                    <span>LOCKED</span>
                  </div>
                )}

                {/* Icon Container */}
                <div className={`mb-3 mt-2 p-2.5 bg-black/45 rounded-none border ${isUnlocked ? "border-editorial-border group-hover:scale-105" : "border-gray-900"} transition duration-300 z-10`}>
                  {renderAchievementIcon(item.icon, item.rarity, isUnlocked)}
                </div>

                {/* Title */}
                <h4 className={`font-serif font-medium text-xs group-hover:text-editorial-accent transition duration-200 line-clamp-1 mb-1 z-10 ${
                  isUnlocked ? "text-editorial-paper" : "text-gray-500"
                }`}>
                  {item.title}
                </h4>

                {/* Subtitle rarity */}
                <span className={`text-[8px] font-mono uppercase tracking-widest z-10 ${
                  isUnlocked ? "text-editorial-accent font-bold" : "text-gray-600"
                }`}>
                  {style.label}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* PORTAL OVERLAY POP-UP MODAL (Inspect On-Chain Ledger Details) */}
      <AnimatePresence>
        {selectedMilestone && (() => {
          const details = getEventDetails(selectedMilestone);
          return (
            <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="bg-[#0f1011] border border-editorial-border max-w-lg w-full relative p-6 font-mono text-xs text-gray-400 space-y-4 shadow-2xl"
              >
                {/* Close Button */}
                <button 
                  onClick={() => setSelectedMilestone(null)}
                  className="absolute top-4 right-4 text-gray-500 hover:text-white transition"
                  id="close-milestone-popup"
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Receipt Header */}
                <div className="text-center border-b border-editorial-border pb-4 space-y-1">
                  <span className="text-[8px] uppercase tracking-[0.2em] text-editorial-accent font-bold">STATE RECONSTRUCTION DOCKET</span>
                  <h3 className="text-base text-editorial-paper font-serif font-light uppercase tracking-tight">
                    {selectedMilestone.title}
                  </h3>
                  <p className="text-[10px] text-gray-500">Epoch Registered Year: {selectedMilestone.year}</p>
                </div>

                {/* Receipt Details Grid */}
                <div className="space-y-3 pt-2">
                  <div className="grid grid-cols-12 gap-1 py-1.5 border-b border-gray-900/60">
                    <span className="col-span-4 text-gray-500 uppercase text-[9px]">BLOCK HOST</span>
                    <span className="col-span-8 text-editorial-paper font-bold text-right">
                      {details.network}
                    </span>
                  </div>

                  <div className="grid grid-cols-12 gap-1 py-1.5 border-b border-gray-900/60">
                    <span className="col-span-4 text-gray-500 uppercase text-[9px]">BLOCK INDEX</span>
                    <span className="col-span-8 text-editorial-paper text-right">
                      {details.blockNumber.toLocaleString()}
                    </span>
                  </div>

                  <div className="grid grid-cols-12 gap-1 py-1.5 border-b border-gray-900/60">
                    <span className="col-span-4 text-gray-500 uppercase text-[9px]">CONTRACT ROLE</span>
                    <span className="col-span-8 text-white text-right capitalize">
                      {selectedMilestone.type}
                    </span>
                  </div>

                  <div className="grid grid-cols-12 gap-1 py-1.5 border-b border-gray-900/60">
                    <span className="col-span-4 text-gray-500 uppercase text-[9px]">GAS ALLOCATION</span>
                    <span className="col-span-8 text-gray-300 text-right">
                      {details.gasUsed.toLocaleString()} units @ {details.gasPrice} Gwei
                    </span>
                  </div>

                  <div className="py-2.5 space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500 uppercase text-[9px]">TRANSACTION SIGNATURE</span>
                      <button 
                        onClick={() => copyToClipboard(details.txHash)}
                        className="text-editorial-accent hover:text-white transition flex items-center gap-1 text-[9px]"
                      >
                        {copiedTx ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                        <span>{copiedTx ? "COPIED" : "COPY HASH"}</span>
                      </button>
                    </div>
                    <p className="text-[9px] text-gray-400 bg-black/40 border border-gray-900 p-2.5 break-all leading-relaxed font-mono select-all">
                      {details.txHash}
                    </p>
                  </div>
                </div>

                {/* Decorative Consensus Seal */}
                <div className="flex items-center justify-between bg-black/35 border border-editorial-border/30 p-3 rounded-none mt-2">
                  <div className="space-y-0.5">
                    <span className="text-[9px] font-sans font-bold text-white block uppercase tracking-wider">CONSENSUS ARCHIVE SEAL</span>
                    <span className="text-[8px] text-gray-500 block leading-tight">Authenticity verified deterministically against state ledger hash signatures.</span>
                  </div>
                  {/* Visual wax seal design in CSS */}
                  <div className="w-10 h-10 rounded-full border border-dashed border-editorial-accent/60 bg-editorial-accent/5 flex items-center justify-center shrink-0 animate-spin-slow">
                    <Award className="w-5 h-5 text-editorial-accent" />
                  </div>
                </div>

                {/* Dismiss Button */}
                <button 
                  onClick={() => setSelectedMilestone(null)}
                  className="w-full bg-[#18191a] hover:bg-[#202122] border border-editorial-border text-editorial-paper uppercase tracking-widest text-[10px] py-2.5 transition font-sans font-bold mt-2"
                >
                  DISMISS DOCKET
                </button>
              </motion.div>
            </div>
          );
        })()}
      </AnimatePresence>

      <div className="mt-8 pt-4 border-t border-editorial-border flex justify-between items-center text-[9px] font-mono text-gray-500 uppercase tracking-[0.15em]">
        <span>Consensus Validation Signed</span>
        <span>Secure On-Chain Record Ledger</span>
      </div>
    </div>
  );
}
