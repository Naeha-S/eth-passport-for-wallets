import React from "react";
import { PersonalityTrait } from "../types";
import { Quote, Sparkles, Sliders } from "lucide-react";

interface BiographyPersonalityProps {
  biography: string;
  personality: PersonalityTrait[];
  nickname: string;
}

export default function BiographyPersonality({ biography, personality, nickname }: BiographyPersonalityProps) {
  return (
    <div id="biography-personality-page" className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
      {/* LEFT COLUMN: AI Narrative Biography */}
      <div className="lg:col-span-7 bg-editorial-card border border-editorial-border rounded-none p-6 md:p-8 flex flex-col justify-between shadow-2xl relative">
        <div className="absolute top-0 left-0 w-full h-[2px] bg-editorial-accent"></div>

        <div className="space-y-4">
          <div className="flex items-center gap-2 border-b border-editorial-border pb-3">
            <Sparkles className="w-4 h-4 text-editorial-accent" />
            <h3 className="text-xs uppercase font-sans font-bold tracking-[0.2em] text-editorial-paper">
              Ledger Narrative Dossier
            </h3>
          </div>

          <div className="relative pl-6 py-2 border-l border-editorial-accent">
            <Quote className="absolute left-0 -top-1 w-4 h-4 text-editorial-accent/40 transform rotate-180" />
            <p className="font-serif text-lg md:text-xl text-editorial-paper leading-relaxed italic select-text">
              {biography}
            </p>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-editorial-border flex items-center justify-between text-[11px] font-mono text-gray-500">
          <span className="font-sans font-bold tracking-widest text-[9px]">COMPILED BY COGNITIVE ANALYSIS SERVICE</span>
          <span className="text-editorial-accent font-sans font-bold tracking-widest text-[9px]">NICKNAME: {nickname}</span>
        </div>
      </div>

      {/* RIGHT COLUMN: Personality sliders */}
      <div className="lg:col-span-5 bg-editorial-card border border-editorial-border rounded-none p-6 md:p-8 flex flex-col shadow-2xl relative">
        <div className="absolute top-0 left-0 w-full h-[2px] bg-editorial-accent"></div>

        <div className="flex items-center gap-2 mb-6 border-b border-editorial-border pb-3">
          <Sliders className="w-4 h-4 text-editorial-accent" />
          <h3 className="text-xs uppercase font-sans font-bold tracking-[0.2em] text-editorial-paper">
            Identity Affinities
          </h3>
        </div>

        {/* Sliders Grid using exact style of the mockup */}
        <div className="space-y-6 flex-1 flex flex-col justify-center">
          {personality.map((trait) => {
            return (
              <div key={trait.name} className="flex items-end justify-between font-sans">
                <span className="text-xs uppercase tracking-widest opacity-60 text-gray-300 shrink-0">
                  {trait.name}
                </span>
                
                {/* Thin line track exactly like editorial design */}
                <div className="flex-1 mx-4 mb-1 h-[2px] bg-[#222]">
                  <div
                    className="h-full bg-editorial-accent transition-all duration-[1200ms] ease-out"
                    style={{ width: `${trait.percentage}%` }}
                  />
                </div>
                
                <span className="text-[10px] font-mono text-editorial-accent font-bold shrink-0">
                  {trait.percentage}%
                </span>
              </div>
            );
          })}
        </div>

        <p className="text-[10px] text-gray-500 font-sans italic text-center mt-6">
          Affinities model represents the relative composition of this wallet's core behavioral signatures.
        </p>
      </div>
    </div>
  );
}
