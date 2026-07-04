import React, { useState, useEffect } from "react";
import { PersonalityTrait } from "../types";
import { Quote, Sparkles, Sliders, Loader2, Lock, ShieldAlert } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface BiographyPersonalityProps {
  biography: string;
  personality: PersonalityTrait[];
  nickname: string;
  address: string;
  onUpdateBiography: (bio: string) => void;
}

export default function BiographyPersonality({
  biography,
  personality,
  nickname,
  address,
  onUpdateBiography,
}: BiographyPersonalityProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationError, setGenerationError] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState("");

  const handleGenerate = async () => {
    setIsGenerating(true);
    setGenerationError(null);

    const stages = [
      "Accessing block-space signature matrices...",
      "Analyzing multi-chain transaction density coefficient...",
      "Invoking Gemini-3.5-Flash analytical model...",
      "Synthesizing cognitive ledger narrative..."
    ];

    let stageIdx = 0;
    setStatusMessage(stages[0]);
    const interval = setInterval(() => {
      stageIdx++;
      if (stageIdx < stages.length) {
        setStatusMessage(stages[stageIdx]);
      }
    }, 1200);

    try {
      const response = await fetch("/api/generate-biography", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ address })
      });

      if (!response.ok) {
        throw new Error("Failed to compile narrative");
      }

      const data = await response.json();
      onUpdateBiography(data.biography);
    } catch (err) {
      console.error(err);
      setGenerationError("Signature decryption timed out. Please try again.");
    } finally {
      clearInterval(interval);
      setIsGenerating(false);
    }
  };

  return (
    <div id="biography-personality-page" className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
      {/* LEFT COLUMN: AI Narrative Biography */}
      <div className="lg:col-span-7 bg-editorial-card border border-editorial-border rounded-none p-6 md:p-8 flex flex-col justify-between shadow-2xl relative">
        <div className="absolute top-0 left-0 w-full h-[2px] bg-editorial-accent"></div>

        <div className="space-y-6">
          <div className="flex items-center gap-2 border-b border-editorial-border pb-3">
            <Sparkles className="w-4 h-4 text-editorial-accent" />
            <h3 className="text-xs uppercase font-sans font-medium tracking-[0.2em] text-editorial-paper">
              Ledger Narrative Dossier
            </h3>
          </div>

          <AnimatePresence mode="wait">
            {biography ? (
              <motion.div
                key="biography-text"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="relative pl-6 py-2 border-l border-editorial-accent"
              >
                <Quote className="absolute left-0 -top-1 w-4 h-4 text-editorial-accent/40 transform rotate-180" />
                <p className="font-serif text-lg md:text-xl text-editorial-paper leading-[1.8] italic select-text">
                  {biography}
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="biography-locked"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="border border-dashed border-editorial-border/60 bg-black/25 p-6 md:p-8 text-center flex flex-col items-center justify-center space-y-5"
              >
                <div className="w-12 h-12 bg-editorial-accent/5 border border-editorial-accent/20 flex items-center justify-center relative">
                  <Lock className="w-5 h-5 text-editorial-accent" />
                </div>
                
                <div className="space-y-1.5 max-w-md">
                  <h4 className="font-serif text-base text-editorial-paper font-light uppercase tracking-wide">
                    Ledger Narrative Sealed
                  </h4>
                  <p className="text-xs text-gray-400 font-sans leading-relaxed">
                    The custom narrative biography is generated on-demand utilizing Gemini cognitive models to evaluate your multi-chain signature footprint.
                  </p>
                </div>

                {generationError && (
                  <div className="flex items-center gap-2 text-[11px] text-rose-400 bg-rose-950/20 border border-rose-900/40 px-3 py-1.5">
                    <ShieldAlert className="w-3.5 h-3.5" />
                    <span>{generationError}</span>
                  </div>
                )}

                <button
                  id="btn-generate-biography"
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  className="relative flex items-center gap-2 px-5 py-2.5 bg-editorial-accent/15 hover:bg-editorial-accent/25 border border-editorial-accent/40 hover:border-editorial-accent/60 text-editorial-accent rounded-none text-xs font-sans tracking-widest uppercase font-semibold transition-all duration-300 disabled:opacity-50 active:translate-y-[0.5px] cursor-pointer"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span className="animate-pulse">{statusMessage}</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Decrypt &amp; Compile AI Biography</span>
                    </>
                  )}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="mt-6 pt-4 border-t border-editorial-border flex items-center justify-between text-[11px] font-mono text-gray-500">
          <span className="font-sans font-medium tracking-widest text-[9px]">COMPILED BY COGNITIVE ANALYSIS SERVICE</span>
          <span className="text-editorial-accent font-sans font-medium tracking-widest text-[9px]">NICKNAME: {nickname}</span>
        </div>
      </div>

      {/* RIGHT COLUMN: Personality sliders */}
      <div className="lg:col-span-5 bg-editorial-card border border-editorial-border rounded-none p-6 md:p-8 flex flex-col shadow-2xl relative">
        <div className="absolute top-0 left-0 w-full h-[2px] bg-editorial-accent"></div>

        <div className="flex items-center gap-2 mb-6 border-b border-editorial-border pb-3">
          <Sliders className="w-4 h-4 text-editorial-accent" />
          <h3 className="text-xs uppercase font-sans font-medium tracking-[0.2em] text-editorial-paper">
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
                
                <span className="text-[10px] font-mono text-editorial-accent font-semibold shrink-0">
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
