import React from "react";
import { TimelineEvent } from "../types";
import { Sparkles, TrendingUp, Image, PlaneTakeoff, Code, FileCheck, Landmark, Compass, CircleDashed } from "lucide-react";

interface ArchaeologyTimelineProps {
  timeline: TimelineEvent[];
}

export default function ArchaeologyTimeline({ timeline }: ArchaeologyTimelineProps) {
  // Map icons dynamically
  const renderIcon = (iconName: string, isVerified: boolean) => {
    if (!isVerified) {
      return <CircleDashed className="w-4 h-4 text-gray-700 animate-spin-slow" />;
    }
    const props = { className: "w-5 h-5 text-editorial-accent" };
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

  const verifiedCount = timeline.filter(t => t.unlocked).length;

  return (
    <div id="archaeology-timeline-page" className="w-full bg-editorial-card border border-editorial-border rounded-none p-6 md:p-8 shadow-2xl relative">
      <div className="absolute top-0 left-0 w-full h-[2px] bg-editorial-accent"></div>

      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-editorial-border pb-6 mb-8">
        <div className="space-y-1">
          <div className="text-editorial-accent font-sans tracking-[0.2em] text-[10px] uppercase font-bold">
            Consolidated Ledger Chronology
          </div>
          <h2 className="text-xl font-light font-serif text-editorial-paper uppercase tracking-tight">
            On-Chain Historical Archive
          </h2>
        </div>
        <div className="text-xs font-mono text-gray-400 mt-2 md:mt-0 flex items-center gap-3">
          <div className="flex items-center gap-1">
            <Compass className="w-4 h-4 text-editorial-accent" />
            <span className="font-sans font-bold uppercase tracking-wider text-[10px] opacity-75">Verified Milestones: {verifiedCount} / {timeline.length}</span>
          </div>
        </div>
      </div>

      {/* Timeline core */}
      <div className="relative pl-6 md:pl-10 space-y-8 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-gradient-to-b before:from-editorial-accent/80 before:via-editorial-accent/20 before:to-transparent">
        {timeline.map((event, idx) => {
          const isVerified = event.unlocked !== false; // default true if missing
          return (
            <div key={idx} className="relative group">
              {/* Timeline dot / icon */}
              <div className={`absolute -left-[27px] md:-left-[41px] top-1 w-6 h-6 md:w-8 md:h-8 rounded-none border flex items-center justify-center shadow-lg transition duration-300 z-10 ${
                isVerified 
                  ? "bg-[#141517] border-editorial-accent group-hover:scale-110" 
                  : "bg-black/80 border-gray-800"
              }`}>
                {renderIcon(event.icon, isVerified)}
              </div>

              {/* Event details card */}
              <div className={`border rounded-none p-5 transition duration-300 shadow-md ${
                isVerified 
                  ? "bg-black/35 border-editorial-border hover:border-editorial-border-light" 
                  : "bg-black/10 border-dashed border-gray-900 opacity-55"
              }`}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 mb-2">
                  <div className="flex items-center gap-2">
                    <span className={`font-serif font-medium text-lg ${isVerified ? "text-editorial-paper" : "text-gray-500"}`}>
                      {event.title}
                    </span>
                    {!isVerified && (
                      <span className="text-[8px] font-mono tracking-widest uppercase border border-gray-800 text-gray-500 px-1.5 py-0.5">
                        UNRECORDED
                      </span>
                    )}
                  </div>
                  {isVerified ? (
                    <span className="px-3 py-0.5 rounded-none bg-editorial-accent/10 border border-editorial-accent/30 text-editorial-accent font-mono text-xs font-semibold self-start sm:self-auto">
                      Verified Epoch {event.year}
                    </span>
                  ) : (
                    <span className="px-3 py-0.5 rounded-none bg-black/40 border border-gray-900 text-gray-600 font-mono text-xs font-semibold self-start sm:self-auto">
                      Criteria Not Met
                    </span>
                  )}
                </div>
                <p className={`text-sm font-sans leading-relaxed ${isVerified ? "text-gray-400" : "text-gray-600"}`}>
                  {isVerified 
                    ? event.description 
                    : "No matching transactions found in the historical chain register. This address has not triggered the required on-chain activity parameters for this specific epoch."
                  }
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 pt-4 border-t border-editorial-border text-center">
        <p className="text-xs text-gray-500 font-sans max-w-lg mx-auto">
          This historical ledger traces verifiable multi-chain network activity, highlighting key chronological milestones registered by the address.
        </p>
      </div>
    </div>
  );
}
