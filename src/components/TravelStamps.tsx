import React from "react";
import { Stamp as StampType } from "../types";
import { Compass, Footprints } from "lucide-react";

interface TravelStampsProps {
  stamps: StampType[];
}

export default function TravelStamps({ stamps }: TravelStampsProps) {
  // Deterministic organic-looking tilt angles
  const tilts = [
    "-rotate-12",
    "rotate-6",
    "-rotate-3",
    "rotate-2",
    "-rotate-6",
    "rotate-8",
    "-rotate-2"
  ];

  const renderStampFlag = (flagText: string, darkTheme: boolean = true) => {
    return (
      <span className={`text-[10px] font-mono tracking-wider font-bold px-2 py-0.5 mb-1 border uppercase ${
        darkTheme 
          ? "border-editorial-accent/30 bg-editorial-accent/5 text-editorial-accent" 
          : "border-[#0F0F0F]/30 bg-[#0F0F0F]/5 text-[#0F0F0F]"
      }`}>
        {flagText}
      </span>
    );
  };

  return (
    <div id="travel-stamps-page" className="w-full bg-editorial-card border border-editorial-border rounded-none p-6 md:p-8 shadow-2xl relative">
      <div className="absolute top-0 left-0 w-full h-[2px] bg-editorial-accent"></div>

      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-editorial-border pb-6 mb-6">
        <div className="space-y-1">
          <div className="text-editorial-accent font-sans tracking-[0.2em] text-[10px] uppercase font-bold">
            Travel Records & Visa Archives
          </div>
          <h2 className="text-xl font-light font-serif text-editorial-paper uppercase tracking-tight">
            Ecosystem Visa Stamps
          </h2>
        </div>
        <div className="text-xs font-mono text-gray-400 mt-2 md:mt-0 flex items-center gap-1.5">
          <Footprints className="w-4 h-4 text-editorial-accent" />
          <span className="font-sans font-bold uppercase tracking-wider text-[10px] opacity-75">Chains Explored: {stamps.length}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 relative py-4">
        {/* Background watermark texture */}
        <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
          <Compass className="w-72 h-72 text-white" />
        </div>

        {stamps.map((stamp, idx) => {
          const tiltClass = tilts[idx % tilts.length];
          const stampStyleType = idx % 3;

          if (stampStyleType === 0) {
            // Style 1: Vintage dashed black/gray circular stamp
            return (
              <div
                key={stamp.chain}
                className={`w-36 h-36 border border-gray-600 border-dashed rounded-full flex flex-col items-center justify-center text-center p-3 transform ${tiltClass} transition duration-300 hover:scale-105 select-none mx-auto`}
              >
                <div className="text-[7px] text-gray-500 tracking-wider uppercase mb-1 font-mono">GENESIS VERIFIED</div>
                {renderStampFlag(stamp.flag, true)}
                <span className="font-serif font-bold uppercase text-xs text-gray-300 tracking-wider">
                  {stamp.chain}
                </span>
                <span className="text-[8px] font-mono opacity-50 uppercase mt-0.5 max-w-[110px] truncate">
                  {stamp.role}
                </span>
                <div className="border-t border-gray-700 w-12 my-1"></div>
                <span className="text-[9px] font-bold text-editorial-accent font-mono">
                  {stamp.visitedYear}
                </span>
              </div>
            );
          } else if (stampStyleType === 1) {
            // Style 2: Elegant nested circular orange ink stamp
            return (
              <div
                key={stamp.chain}
                className={`w-36 h-36 border-2 border-editorial-accent rounded-full p-1.5 transform ${tiltClass} transition duration-300 hover:scale-105 select-none mx-auto`}
              >
                <div className="border border-editorial-accent w-full h-full rounded-full flex flex-col items-center justify-center text-center p-2 text-editorial-accent">
                  <span className="text-[7px] font-sans font-bold uppercase tracking-widest block mb-0.5">L2 RESIDENT</span>
                  {renderStampFlag(stamp.flag, true)}
                  <span className="font-serif italic font-bold text-sm leading-none block">
                    {stamp.chain}
                  </span>
                  <span className="text-[8px] uppercase tracking-tighter opacity-80 mt-1 block max-w-[100px] truncate">
                    {stamp.role}
                  </span>
                  <span className="text-[9px] font-mono font-bold mt-1 bg-editorial-accent/10 px-1.5 py-0.5">
                    {stamp.visitedYear}
                  </span>
                </div>
              </div>
            );
          } else {
            // Style 3: Clean ticket-like solid cream stamp (Black ink)
            return (
              <div
                key={stamp.chain}
                className={`w-36 h-36 bg-editorial-paper text-[#0F0F0F] rounded-none flex flex-col items-center justify-center text-center p-4 transform ${tiltClass} transition duration-300 hover:scale-105 select-none mx-auto shadow-lg`}
              >
                <span className="text-[7px] uppercase font-sans font-black tracking-widest text-[#0f0f0f]/40 mb-1">OFFICIAL VISA</span>
                {renderStampFlag(stamp.flag, false)}
                <span className="font-sans font-black uppercase text-xs tracking-wider leading-none">
                  {stamp.chain}
                </span>
                <span className="text-[8px] font-mono uppercase opacity-75 mt-1 max-w-[110px] truncate font-semibold">
                  {stamp.role}
                </span>
                <div className="border-y border-dashed border-[#0F0F0F]/30 w-full my-1 py-0.5 text-[8px] font-mono font-bold">
                  STAMP #{100 + idx * 7}
                </div>
                <span className="text-[9px] font-sans font-black">
                  YEAR {stamp.visitedYear}
                </span>
              </div>
            );
          }
        })}

        {/* Minimal placeholder stamp for editorial expansion */}
        <div className="w-36 h-36 border border-editorial-border rounded-full flex flex-col items-center justify-center border-dashed text-gray-600 mx-auto opacity-40">
          <span className="text-xl font-light font-serif">+</span>
          <span className="text-[8px] font-mono uppercase tracking-wider">Unexplored</span>
        </div>
      </div>

      <div className="mt-8 pt-4 border-t border-editorial-border text-center">
        <p className="text-xs text-gray-500 font-sans max-w-lg mx-auto">
          Each passport stamp represents a unique blockchain territory where state records have been validated.
        </p>
      </div>
    </div>
  );
}
