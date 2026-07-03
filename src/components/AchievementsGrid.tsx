import React, { useState } from "react";
import { Achievement } from "../types";
import { Award, Calendar, Palette, Compass, Layers, Flame, Coins, Cpu, CheckCircle2, Star, Lock } from "lucide-react";
import { motion } from "motion/react";

interface AchievementsGridProps {
  achievements: Achievement[];
}

export default function AchievementsGrid({ achievements }: AchievementsGridProps) {
  const [selected, setSelected] = useState<Achievement | null>(null);

  // Dynamic icon rendering
  const renderIcon = (iconName: string, rarity: string, isUnlocked: boolean) => {
    if (!isUnlocked) {
      return <Lock className="w-8 h-8 text-gray-600" />;
    }

    const colorClass = 
      rarity === "Legendary" ? "text-editorial-accent animate-pulse" :
      rarity === "Epic" ? "text-purple-400" :
      rarity === "Rare" ? "text-blue-400" : "text-gray-400";

    const props = { className: `w-8 h-8 ${colorClass}` };
    switch (iconName) {
      case "Award":
        return <Award {...props} />;
      case "Calendar":
        return <Calendar {...props} />;
      case "Palette":
        return <Palette {...props} />;
      case "Compass":
        return <Compass {...props} />;
      case "Layers":
        return <Layers {...props} />;
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
        bg: "bg-gray-800/20 border-gray-800 text-gray-500",
        glow: "shadow-none",
        label: `${rarity} (Locked)`
      };
    }
    switch (rarity) {
      case "Legendary":
        return {
          bg: "bg-editorial-accent/10 border-editorial-accent/30 text-editorial-accent",
          glow: "shadow-editorial-accent/5",
          label: "Legendary"
        };
      case "Epic":
        return {
          bg: "bg-purple-500/10 border-purple-500/30 text-purple-400",
          glow: "shadow-purple-500/5",
          label: "Epic"
        };
      case "Rare":
        return {
          bg: "bg-blue-500/10 border-blue-500/30 text-blue-400",
          glow: "shadow-blue-500/5",
          label: "Rare"
        };
      default:
        return {
          bg: "bg-gray-500/10 border-editorial-border text-gray-400",
          glow: "shadow-black",
          label: "Common"
        };
    }
  };

  const unlockedCount = achievements.filter(a => a.unlocked).length;

  return (
    <div id="achievements-page" className="w-full bg-editorial-card border border-editorial-border rounded-none p-6 md:p-8 shadow-2xl relative">
      <div className="absolute top-0 left-0 w-full h-[2px] bg-editorial-accent"></div>

      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-editorial-border pb-6 mb-6">
        <div className="space-y-1">
          <div className="text-editorial-accent font-sans tracking-[0.2em] text-[10px] uppercase font-bold">
            Honors & Medals
          </div>
          <h2 className="text-xl font-light font-serif text-editorial-paper uppercase tracking-tight">
            Unlocked Milestones
          </h2>
        </div>
        <div className="text-xs font-sans uppercase tracking-wider text-gray-400 mt-2 md:mt-0 font-bold">
          Total Badges Unlocked: <span className="text-editorial-accent font-serif text-sm">{unlockedCount} / {achievements.length}</span>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-6">
        {achievements.map((item) => {
          const isUnlocked = item.unlocked !== false; // default true if missing
          const style = getRarityStyle(item.rarity, isUnlocked);
          const isSelected = selected?.id === item.id;

          return (
            <motion.button
              id={`achievement-badge-${item.id}`}
              key={item.id}
              onClick={() => setSelected(isSelected ? null : item)}
              whileHover={isUnlocked ? { 
                y: -5, 
                boxShadow: "0 12px 20px -8px rgba(212, 175, 55, 0.3)",
                borderColor: "rgba(212, 175, 55, 0.6)"
              } : {
                y: -1,
                borderColor: "rgba(100, 116, 139, 0.3)"
              }}
              whileTap={{ scale: 0.97 }}
              className={`flex flex-col items-center justify-center p-4 rounded-none border text-center transition-all duration-300 relative select-none cursor-pointer group ${
                isSelected 
                  ? "border-editorial-accent bg-editorial-accent/5 ring-1 ring-editorial-accent" 
                  : isUnlocked 
                    ? "border-editorial-border bg-black/30 hover:bg-[#1a1a1a]"
                    : "border-gray-900 bg-black/50 opacity-45 hover:opacity-70"
              } shadow-lg ${style.glow}`}
            >
              {/* Unlocked / Locked status badge */}
              {isUnlocked ? (
                <div className="absolute top-2 right-2 text-[8px] font-sans font-bold text-emerald-500 bg-emerald-500/10 px-1.5 py-0.5 rounded-none border border-emerald-500/20 uppercase flex items-center gap-0.5">
                  <CheckCircle2 className="w-2.5 h-2.5" />
                  <span>UNLOCKED</span>
                </div>
              ) : (
                <div className="absolute top-2 right-2 text-[8px] font-sans font-bold text-gray-500 bg-gray-900/30 px-1.5 py-0.5 rounded-none border border-gray-800 uppercase flex items-center gap-0.5">
                  <Lock className="w-2.5 h-2.5 text-gray-600" />
                  <span>LOCKED</span>
                </div>
              )}

              {/* Icon Container (Flat square instead of rounded-full) */}
              <div className={`mb-3 mt-3 p-3 bg-black/45 rounded-none border ${isUnlocked ? "border-editorial-border group-hover:scale-105" : "border-gray-900"} transition duration-300`}>
                {renderIcon(item.icon, item.rarity, isUnlocked)}
              </div>

              {/* Title */}
              <h4 className={`font-serif font-medium text-xs group-hover:text-editorial-accent transition duration-200 line-clamp-1 mb-1 ${
                isUnlocked ? "text-editorial-paper" : "text-gray-500"
              }`}>
                {item.title}
              </h4>

              {/* Rarity Tag */}
              <span className={`text-[8px] font-mono uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-none ${style.bg}`}>
                {style.label}
              </span>
            </motion.button>
          );
        })}
      </div>

      {/* Detailed view of selected achievement */}
      <div className="relative min-h-[90px]">
        {selected ? (
          <div className="bg-black/35 border border-editorial-border rounded-none p-5 animate-fade-in flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className={`text-[9px] font-mono uppercase font-bold tracking-wider px-2 py-0.5 rounded-none ${getRarityStyle(selected.rarity, selected.unlocked !== false).bg}`}>
                  {selected.unlocked !== false ? `${selected.rarity} Badge` : "Locked Badge"}
                </span>
                <span className={`font-serif font-medium text-base ${selected.unlocked !== false ? "text-editorial-paper" : "text-gray-500"}`}>{selected.title}</span>
              </div>
              <p className="text-xs text-gray-400 font-sans leading-relaxed">{selected.description}</p>
            </div>
            
            {selected.unlocked !== false ? (
              <div className="bg-editorial-accent/5 border border-editorial-accent/20 rounded-none p-3 sm:max-w-xs text-xs">
                <span className="text-[9px] text-editorial-accent font-sans font-bold block uppercase tracking-widest mb-1">Verification Criteria</span>
                <span className="text-gray-300 font-sans leading-tight block">{selected.whyUnlocked}</span>
              </div>
            ) : (
              <div className="bg-black/40 border border-gray-800 rounded-none p-3 sm:max-w-xs text-xs">
                <span className="text-[9px] text-gray-500 font-sans font-bold block uppercase tracking-widest mb-1">How to Unlock</span>
                <span className="text-gray-500 font-sans leading-tight block">{selected.whyUnlocked || "Unlock this achievement by meeting required transactional activity metrics."}</span>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-black/20 border border-dashed border-editorial-border rounded-none p-5 text-center text-xs text-gray-500 italic font-sans">
            Click on any locked or unlocked passport stamp medal to audit its ledger verification criteria.
          </div>
        )}
      </div>
    </div>
  );
}
