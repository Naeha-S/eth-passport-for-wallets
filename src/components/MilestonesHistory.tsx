import React, { useState } from "react";
import { TimelineEvent, Achievement } from "../types";
import { Award, Calendar, Compass, Lock, CheckCircle2, CircleDashed, Flame, Sparkles, TrendingUp, Image, PlaneTakeoff, Code, Coins, Cpu, Star, Landmark, ShieldAlert, BadgeCheck, FileCheck } from "lucide-react";
import { motion } from "motion/react";

interface MilestonesHistoryProps {
  timeline: TimelineEvent[];
  achievements: Achievement[];
}

export default function MilestonesHistory({ timeline, achievements }: MilestonesHistoryProps) {
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);

  // Dynamic timeline icon rendering
  const renderTimelineIcon = (iconName: string, isVerified: boolean) => {
    if (!isVerified) {
      return <CircleDashed className="w-3.5 h-3.5 text-gray-700 animate-spin-slow" />;
    }
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
      return <Lock className="w-7 h-7 text-gray-700" />;
    }

    const colorClass = 
      rarity === "Legendary" ? "text-editorial-accent animate-pulse" :
      rarity === "Epic" ? "text-purple-400" :
      rarity === "Rare" ? "text-blue-400" : "text-gray-400";

    const props = { className: `w-7 h-7 ${colorClass}` };
    switch (iconName) {
      case "Award":
        return <Award {...props} />;
      case "Calendar":
        return <Calendar {...props} />;
      case "Palette":
        return <Award {...props} />; // Palette is equivalent to Award/badge in typography
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
        bg: "bg-gray-900/40 border-gray-900 text-gray-600",
        glow: "shadow-none",
        label: `${rarity} (Locked)`
      };
    }
    switch (rarity) {
      case "Legendary":
        return {
          bg: "bg-editorial-accent/10 border-editorial-accent/30 text-editorial-accent font-bold",
          glow: "shadow-[0_0_15px_rgba(242,125,38,0.15)]",
          label: "Legendary"
        };
      case "Epic":
        return {
          bg: "bg-purple-950/20 border-purple-800/40 text-purple-400 font-bold",
          glow: "shadow-[0_0_12px_rgba(168,85,247,0.1)]",
          label: "Epic"
        };
      case "Rare":
        return {
          bg: "bg-blue-950/20 border-blue-800/40 text-blue-400 font-bold",
          glow: "shadow-none",
          label: "Rare"
        };
      default:
        return {
          bg: "bg-gray-900 border-gray-800 text-gray-400",
          glow: "shadow-none",
          label: "Standard"
        };
    }
  };

  const unlockedAchievementsCount = achievements.filter(a => a.unlocked).length;
  const verifiedTimelineCount = timeline.filter(t => t.unlocked).length;

  return (
    <div id="combined-milestones-page" className="w-full bg-editorial-card border border-editorial-border rounded-none p-6 md:p-8 shadow-2xl relative space-y-12">
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
            Chronology: <span className="text-editorial-paper font-mono">{verifiedTimelineCount} Epochs Verified</span>
          </span>
          <span className="text-gray-600">|</span>
          <span className="font-sans font-bold uppercase tracking-wider text-[10px] text-gray-400">
            Achievements: <span className="text-editorial-accent font-mono">{unlockedAchievementsCount} / {achievements.length} Unlocked</span>
          </span>
        </div>
      </div>

      {/* SECTION 1: Chronological Ledger History */}
      <div className="space-y-6">
        <div className="border-b border-editorial-border/60 pb-3">
          <span className="text-[10px] font-mono tracking-wider text-gray-400 font-bold uppercase block">Section 01 / Chronicles</span>
          <h3 className="font-serif text-lg text-editorial-paper mt-0.5">Chronological Ledger Timeline</h3>
          <p className="text-xs text-gray-500 font-sans mt-1">
            Verifiable on-chain historical milestones registered by this address during past operational epochs.
          </p>
        </div>

        <div className="relative pl-6 md:pl-10 space-y-6 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-gradient-to-b before:from-editorial-accent/60 before:via-editorial-accent/15 before:to-transparent">
          {timeline.map((event, idx) => {
            const isVerified = event.unlocked !== false;
            return (
              <div key={idx} className="relative group">
                {/* Timeline dot / icon */}
                <div className={`absolute -left-[27px] md:-left-[41px] top-1.5 w-5 h-5 md:w-7 md:h-7 rounded-none border flex items-center justify-center shadow-md transition duration-300 z-10 ${
                  isVerified 
                    ? "bg-[#141517] border-editorial-accent group-hover:scale-105" 
                    : "bg-black/85 border-gray-900"
                }`}>
                  {renderTimelineIcon(event.icon, isVerified)}
                </div>

                {/* Event Card */}
                <div className={`border rounded-none p-4 transition duration-300 shadow-sm ${
                  isVerified 
                    ? "bg-black/30 border-editorial-border hover:border-editorial-border-light" 
                    : "bg-black/10 border-dashed border-gray-900 opacity-50"
                }`}>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-1.5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`font-serif font-medium text-base ${isVerified ? "text-editorial-paper" : "text-gray-500"}`}>
                        {event.title}
                      </span>
                      {!isVerified && (
                        <span className="text-[8px] font-mono tracking-widest uppercase border border-gray-900 text-gray-600 bg-black/40 px-1.5 py-0.5">
                          UNRECORDED
                        </span>
                      )}
                    </div>
                    {isVerified ? (
                      <span className="px-2 py-0.5 rounded-none bg-editorial-accent/5 border border-editorial-accent/20 text-editorial-accent font-mono text-[10px] font-semibold self-start sm:self-auto">
                        Verified Epoch {event.year}
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-none bg-black/40 border border-gray-900 text-gray-600 font-mono text-[10px] font-semibold self-start sm:self-auto">
                        Threshold Unmet
                      </span>
                    )}
                  </div>
                  <p className={`text-xs font-sans leading-relaxed ${isVerified ? "text-gray-400" : "text-gray-600"}`}>
                    {isVerified 
                      ? event.description 
                      : "The cryptographic ledger lists no transaction records satisfying the threshold required to register this epoch. Operational verification remains locked."
                    }
                  </p>
                </div>
              </div>
            );
          })}
        </div>
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
          <div className="bg-black/35 border border-editorial-border rounded-none p-4 sm:p-5 animate-fade-in flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
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

        {/* Grid of Badges */}
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
                  y: -3, 
                  boxShadow: "0 10px 15px -5px rgba(242, 125, 38, 0.12)",
                  borderColor: "rgba(242, 125, 38, 0.4)"
                } : {
                  y: -0.5,
                  borderColor: "rgba(100, 116, 139, 0.2)"
                }}
                whileTap={{ scale: 0.98 }}
                className={`flex flex-col items-center justify-center p-4 rounded-none border text-center transition-all duration-300 relative select-none cursor-pointer group ${
                  isSelected 
                    ? "border-editorial-accent bg-editorial-accent/5 ring-1 ring-editorial-accent" 
                    : isUnlocked 
                      ? "border-editorial-border bg-black/30 hover:bg-[#1a1a1a]"
                      : "border-gray-950 bg-black/60 opacity-40 hover:opacity-60"
                } shadow-lg ${style.glow}`}
              >
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
                <div className={`mb-3 mt-2 p-2.5 bg-black/45 rounded-none border ${isUnlocked ? "border-editorial-border group-hover:scale-105" : "border-gray-900"} transition duration-300`}>
                  {renderAchievementIcon(item.icon, item.rarity, isUnlocked)}
                </div>

                {/* Title */}
                <h4 className={`font-serif font-medium text-xs group-hover:text-editorial-accent transition duration-200 line-clamp-1 mb-1 ${
                  isUnlocked ? "text-editorial-paper" : "text-gray-500"
                }`}>
                  {item.title}
                </h4>

                {/* Subtitle rarity */}
                <span className={`text-[8px] font-mono uppercase tracking-widest ${
                  isUnlocked ? "text-editorial-accent" : "text-gray-600"
                }`}>
                  {style.label}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="mt-8 pt-4 border-t border-editorial-border flex justify-between items-center text-[9px] font-mono text-gray-500 uppercase tracking-[0.15em]">
        <span>Consensus Validation Signed</span>
        <span>Secure On-Chain Record Ledger</span>
      </div>
    </div>
  );
}
