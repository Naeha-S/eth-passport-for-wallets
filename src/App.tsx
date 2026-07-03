import React, { useState, useEffect } from "react";
import LandingPage from "./components/LandingPage";
import PassportProfile from "./components/PassportProfile";
import TravelStamps from "./components/TravelStamps";
import MilestonesHistory from "./components/MilestonesHistory";
import ExecutionEfficiency from "./components/ExecutionEfficiency";
import BiographyPersonality from "./components/BiographyPersonality";
import SharePassport from "./components/SharePassport";
import EVMProficiency from "./components/EVMProficiency";
import { WalletPassportData } from "./types";
import { AnimatePresence, motion } from "motion/react";
import { Compass, BookOpen, Undo2, Award, Calendar, Layers, Sparkles, Footprints, Info, Cpu, Zap, Activity } from "lucide-react";

export default function App() {
  const [address, setAddress] = useState("");
  const [passportData, setPassportData] = useState<WalletPassportData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [currentTab, setCurrentTab] = useState<"identity" | "proficiency" | "efficiency" | "stamps" | "milestones" | "chronicle" | "export">("identity");

  // Step-by-step loading messaging sequence
  const triggerLoadingMessages = () => {
    const messages = [
      "Accessing Decentralized Ledger Archives...",
      "Reassembling transaction blocks and signatures...",
      "Extrapolating behavioral DNA coefficients...",
      "Consulting Gemini AI to write custom biography..."
    ];

    setStatusMessage(messages[0]);
    
    const timers: NodeJS.Timeout[] = [];
    messages.forEach((msg, idx) => {
      if (idx > 0) {
        const timer = setTimeout(() => {
          setStatusMessage(msg);
        }, idx * 1100);
        timers.push(timer);
      }
    });

    return timers;
  };

  const handleSearch = async (addr: string) => {
    setIsLoading(true);
    setAddress(addr);
    const timers = triggerLoadingMessages();

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ address: addr })
      });

      if (!response.ok) {
        throw new Error("Analysis failed");
      }

      const data = await response.json();
      setPassportData(data);
      setCurrentTab("identity");
    } catch (err) {
      console.error(err);
      // Construct realistic fallback deterministic model immediately on failure
      // so the user experience is bulletproof
      try {
        const fallbackRes = await fetch("/api/analyze", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ address: addr })
        });
        const data = await fallbackRes.json();
        setPassportData(data);
        setCurrentTab("identity");
      } catch (innerErr) {
        alert("Failed to analyze wallet. Please verify connectivity or try another address.");
      }
    } finally {
      timers.forEach(clearTimeout);
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setPassportData(null);
    setAddress("");
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore when focusing on inputs, textareas, etc.
      if (
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA" ||
        document.activeElement?.hasAttribute("contenteditable")
      ) {
        return;
      }

      if (!passportData) return; // Only switch tabs when passport is loaded

      const ids = ["identity", "proficiency", "efficiency", "stamps", "milestones", "chronicle", "export"] as const;
      const currentIndex = ids.indexOf(currentTab);

      if (e.key === "ArrowLeft") {
        if (currentIndex > 0) {
          setCurrentTab(ids[currentIndex - 1]);
        }
      } else if (e.key === "ArrowRight") {
        if (currentIndex < ids.length - 1) {
          setCurrentTab(ids[currentIndex + 1]);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [passportData, currentTab]);

  // Tab configurations
  const tabConfig = [
    { id: "identity" as const, label: "Identity Profile", icon: BookOpen },
    { id: "proficiency" as const, label: "EVM Proficiency", icon: Cpu },
    { id: "efficiency" as const, label: "Gas & MEV Audit", icon: Zap },
    { id: "stamps" as const, label: "Visa Stamps", icon: Footprints },
    { id: "milestones" as const, label: "Milestones & Badges", icon: Award },
    { id: "chronicle" as const, label: "DNA & Biography", icon: Sparkles },
    { id: "export" as const, label: "Stats & Share", icon: Layers }
  ];

  return (
    <div id="main-applet-root" className="min-h-screen bg-editorial-bg text-editorial-paper font-sans selection:bg-editorial-accent selection:text-black flex flex-col justify-between paper-texture">
      
      {/* Interactive UI Wrapper (Hidden during PDF print export) */}
      <div className="print:hidden flex flex-col justify-between min-h-screen w-full relative z-10">
        {/* Decorative subtle background gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_50%_-100px,#1a1a1a,transparent)] pointer-events-none z-0"></div>

        {/* Main Header / Title Bar (Only visible when a passport is loaded) */}
        {passportData && (
          <header id="applet-nav-header" className="w-full border-b border-editorial-border bg-editorial-bg/90 backdrop-blur-md sticky top-0 z-40 px-4 py-4">
            <div className="max-w-6xl mx-auto flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Compass className="w-6 h-6 text-editorial-accent" />
                <div className="space-y-0.5">
                  <span className="font-serif font-light text-xl tracking-tight block uppercase">
                    Wallet <span className="italic text-editorial-accent">Passport</span>
                  </span>
                  <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest block">CHRONICLE ID: {passportData.nickname}</span>
                </div>
              </div>

              <button
                id="reset-search-btn"
                onClick={handleReset}
                className="flex items-center gap-1.5 px-3.5 py-1.5 bg-editorial-card hover:bg-[#252525] border border-editorial-border hover:border-editorial-border-light rounded-sm text-xs font-sans tracking-wider uppercase text-gray-400 hover:text-editorial-paper transition duration-200 cursor-pointer"
              >
                <Undo2 className="w-3.5 h-3.5" />
                <span>Scan Another Wallet</span>
              </button>
            </div>
          </header>
        )}

        {/* Core Body Container */}
        <main className="flex-1 w-full max-w-6xl mx-auto px-4 py-6 md:py-10 z-10 relative flex flex-col justify-center">
          <AnimatePresence mode="wait">
            {!passportData ? (
              <motion.div
                key="search"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="w-full"
              >
                <LandingPage
                  onSearch={handleSearch}
                  isLoading={isLoading}
                  statusMessage={statusMessage}
                />
              </motion.div>
            ) : (
              <motion.div
                key="passport-book"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.4 }}
                className="space-y-8"
              >
                {/* Address indicator header block */}
                <div className="p-4 bg-editorial-card border border-editorial-border rounded-none flex flex-col md:flex-row md:items-center justify-between gap-3 text-sm font-mono">
                  <div className="flex items-center gap-2 text-gray-400">
                    <span className="w-2 h-2 rounded-full bg-editorial-accent animate-pulse"></span>
                    <span className="font-sans font-bold text-xs uppercase tracking-wider">Scanned Address:</span>
                    <span className="text-editorial-paper select-all truncate max-w-xs md:max-w-none">{passportData.address}</span>
                  </div>
                  <div className="text-[10px] text-gray-500 uppercase font-sans tracking-widest flex items-center gap-1.5">
                    <Info className="w-3.5 h-3.5 text-editorial-accent" />
                    <span>Issuing State: EVM Ledger Authority</span>
                  </div>
                </div>

                {/* Physical Booklet Page Tabs */}
                <div id="passport-tabs-rail" className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-thin border-b border-editorial-border scroll-smooth">
                  {tabConfig.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = currentTab === tab.id;
                    return (
                      <button
                        id={`passport-tab-${tab.id}`}
                        key={tab.id}
                        onClick={() => setCurrentTab(tab.id)}
                        className={`flex items-center gap-1.5 px-4 py-3 border-t border-x text-xs font-sans font-bold uppercase tracking-wider whitespace-nowrap transition-all duration-200 cursor-pointer ${
                          isActive 
                            ? "bg-editorial-card border-editorial-border text-editorial-accent shadow-[0_-2px_8px_rgba(242,125,38,0.06)]" 
                            : "bg-black/30 border-transparent text-gray-500 hover:text-gray-300 hover:bg-black/15"
                        }`}
                      >
                        <Icon className={`w-3.5 h-3.5 ${isActive ? "text-editorial-accent" : "text-gray-500"}`} />
                        <span>{tab.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Booklet Core Pages Panel with page-flip animation */}
                <div id="passport-content-panel" className="w-full relative" style={{ perspective: "1200px" }}>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentTab}
                      initial={{ opacity: 0, scale: 0.98, rotateY: -8, transformOrigin: "left center" }}
                      animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                      exit={{ opacity: 0, scale: 0.98, rotateY: 8 }}
                      transition={{ duration: 0.35, ease: "easeInOut" }}
                      style={{ transformStyle: "preserve-3d" }}
                    >
                      {currentTab === "identity" && (
                        <PassportProfile data={passportData} />
                      )}
                      {currentTab === "proficiency" && (
                        <EVMProficiency proficiency={passportData.proficiency} />
                      )}
                      {currentTab === "efficiency" && (
                        <ExecutionEfficiency stats={passportData.stats} nickname={passportData.nickname} address={passportData.address} />
                      )}
                      {currentTab === "stamps" && (
                        <TravelStamps stamps={passportData.stamps} />
                      )}
                      {currentTab === "milestones" && (
                        <MilestonesHistory timeline={passportData.timeline} achievements={passportData.achievements} />
                      )}
                      {currentTab === "chronicle" && (
                        <BiographyPersonality
                          biography={passportData.biography}
                          personality={passportData.personality}
                          nickname={passportData.nickname}
                        />
                      )}
                      {currentTab === "export" && (
                        <SharePassport data={passportData} />
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        {/* Decorative footer credit */}
        <footer className="w-full py-6 text-center text-[10px] text-gray-600 font-mono tracking-widest border-t border-editorial-border bg-black/20">
          WALLET PASSPORT &copy; 2026 &bull; POWERED BY DECENTRALIZED LEDGER ANALYSIS &bull; ALL SEALS VERIFIED
        </footer>
      </div>

      {/* Printable Multi-Page Document Layout (Only visible when printing / export PDF) */}
      {passportData && (
        <div id="printable-passport-document" className="hidden print:block w-full max-w-4xl mx-auto p-12 bg-white text-black font-serif space-y-12">
          
          {/* PAGE 1: COVER PAGE */}
          <div className="border-4 border-double border-black p-10 text-center min-h-[92vh] flex flex-col justify-between" style={{ pageBreakAfter: "always" }}>
            <div className="space-y-4">
              <span className="text-xs uppercase font-sans tracking-[0.3em] font-bold block">OFFICIAL DIGITAL CITIZEN REGISTRY</span>
              <h1 className="text-6xl font-light tracking-tight uppercase leading-none mt-6">
                WALLET <span className="italic font-bold">PASSPORT</span>
              </h1>
              <span className="text-sm font-mono tracking-widest block text-gray-600 mt-2">CHRONICLE ID: {passportData.nickname}</span>
              <div className="w-24 h-[1px] bg-black mx-auto my-6"></div>
            </div>

            <div className="flex flex-col items-center gap-6 py-8">
              {/* Printable abstract DNA geometry */}
              <div className="w-40 h-40 border-2 border-black rotate-45 flex items-center justify-center p-4 relative">
                <div className="w-28 h-28 border border-black opacity-60 flex items-center justify-center">
                  <div className="w-16 h-16 bg-black opacity-20"></div>
                </div>
                <div className="absolute bottom-1 right-2 text-[9px] font-mono tracking-widest text-black/70 rotate-[-45deg]">ID: {passportData.passportNumber}</div>
              </div>
              <p className="text-sm italic max-w-md mt-6 text-center font-serif leading-relaxed text-gray-800">
                A secure cryptographic audit log extracted from transaction block history, consolidated through decentralized consensus validation algorithms.
              </p>
            </div>

            <div className="space-y-2 border-t border-black/20 pt-6 text-[10px] font-sans tracking-widest uppercase">
              <p className="font-bold">METRIC SIGNATURE: {passportData.address}</p>
              <p className="text-gray-500">ISSUING AUTHORITY: EVM MULTI-CHAIN LEDGER &bull; ALL SEALS VERIFIED</p>
            </div>
          </div>

          {/* PAGE 2: IDENTITY PROFILE */}
          <div className="min-h-[92vh] py-8 flex flex-col justify-between" style={{ pageBreakAfter: "always" }}>
            <div className="space-y-8">
              <div className="flex justify-between items-baseline border-b-2 border-black pb-4">
                <h2 className="text-3xl font-bold uppercase tracking-tight">Passport Identity Sheet</h2>
                <span className="text-xs font-mono text-gray-600">DOCUMENT ID: #WP-{passportData.passportNumber}</span>
              </div>

              <div className="grid grid-cols-2 gap-y-6 gap-x-8 text-sm">
                <div>
                  <span className="block text-[10px] uppercase tracking-[0.2em] font-sans font-bold text-gray-500 mb-1">Epithet / Nickname</span>
                  <p className="text-2xl font-bold">{passportData.nickname}</p>
                </div>
                <div>
                  <span className="block text-[10px] uppercase tracking-[0.2em] font-sans font-bold text-gray-500 mb-1">Classification / Occupation</span>
                  <p className="text-xl italic text-gray-800">{passportData.occupation}</p>
                </div>
                <div>
                  <span className="block text-[10px] uppercase tracking-[0.2em] font-sans font-bold text-gray-500 mb-1">Ecosystem Risk Rating</span>
                  <p className="text-lg italic font-bold">{passportData.riskRating}</p>
                </div>
                <div>
                  <span className="block text-[10px] uppercase tracking-[0.2em] font-sans font-bold text-gray-500 mb-1">Ecosystem Activity Score</span>
                  <p className="text-lg italic font-bold">{passportData.activityScore} / 100</p>
                </div>
                <div>
                  <span className="block text-[10px] uppercase tracking-[0.2em] font-sans font-bold text-gray-500 mb-1">Wallet Age Lifespan</span>
                  <p className="text-lg italic">{passportData.stats.walletAgeYears} Years</p>
                </div>
                <div>
                  <span className="block text-[10px] uppercase tracking-[0.2em] font-sans font-bold text-gray-500 mb-1">Ecosystem Activation Date</span>
                  <p className="font-mono text-sm">{passportData.createdDate}</p>
                </div>
              </div>

              {/* Characterization details */}
              <div className="border border-black p-5 bg-gray-50/50">
                <span className="block text-[10px] uppercase tracking-[0.2em] font-sans font-bold text-gray-500 mb-2">Characterization Details</span>
                <p className="text-xs leading-relaxed font-sans text-gray-700">
                  This identity functions primarily as <span className="italic font-bold">“The {passportData.identityType}”</span> in the decentralized universe. Actions, ledger footprint, and smart contract engagement histories represent a structured approach to state changes across multi-chain ecosystems.
                </p>
              </div>

              {/* DNA Traits list */}
              <div className="space-y-4">
                <span className="block text-xs uppercase tracking-[0.2em] font-sans font-bold text-gray-500">Core DNA Trait Analysis</span>
                <div className="space-y-3.5">
                  {passportData.dna.map((trait) => (
                    <div key={trait.subject} className="flex justify-between items-center text-xs font-sans">
                      <span className="uppercase tracking-wider font-semibold w-1/3">{trait.subject}</span>
                      <div className="flex-1 mx-4 h-[3px] bg-gray-100 border border-gray-200">
                        <div className="h-full bg-black" style={{ width: `${trait.value}%` }}></div>
                      </div>
                      <span className="font-mono font-bold w-12 text-right">{trait.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <span className="text-[10px] font-mono text-gray-500 border-t border-black/10 pt-4 text-center block">Page 2 &bull; WEB3 PASSPORT REGISTRY &bull; OFFICIAL STATE DOCUMENT</span>
          </div>

          {/* PAGE 3: ECOSYSTEM VISA SEALS */}
          <div className="min-h-[92vh] py-8 flex flex-col justify-between" style={{ pageBreakAfter: "always" }}>
            <div className="space-y-6">
              <div className="flex justify-between items-baseline border-b-2 border-black pb-4">
                <h2 className="text-3xl font-bold uppercase tracking-tight">Ecosystem Visa Seals</h2>
                <span className="text-xs font-mono text-gray-600">VISITED REALMS: {passportData.stamps.length}</span>
              </div>

              <div className="grid grid-cols-3 gap-6 py-6">
                {passportData.stamps.map((stamp, idx) => (
                  <div key={idx} className="border border-black p-4 text-center flex flex-col items-center justify-between min-h-[160px] bg-gray-50/50">
                    <span className="text-[8px] uppercase font-sans tracking-[0.1em] text-gray-500 font-bold block">GENESIS VALIDATED</span>
                    <span className="text-3xl my-2.5 block">{stamp.flag}</span>
                    <span className="font-serif font-bold text-sm uppercase block leading-none">{stamp.chain}</span>
                    <span className="text-[9px] font-mono text-gray-500 uppercase mt-1 block max-w-[150px] truncate">{stamp.role}</span>
                    <span className="text-[10px] font-bold font-mono mt-2 bg-white border border-black/10 px-2 py-0.5 block">{stamp.visitedYear}</span>
                  </div>
                ))}
              </div>
            </div>

            <span className="text-[10px] font-mono text-gray-500 border-t border-black/10 pt-4 text-center block">Page 3 &bull; WEB3 PASSPORT REGISTRY &bull; OFFICIAL STATE DOCUMENT</span>
          </div>

          {/* PAGE 4: BIOGRAPHY & AFFINITIES */}
          <div className="min-h-[92vh] py-8 flex flex-col justify-between" style={{ pageBreakAfter: "always" }}>
            <div className="space-y-8">
              <div className="flex justify-between items-baseline border-b-2 border-black pb-4">
                <h2 className="text-3xl font-bold uppercase tracking-tight">On-Chain Biography</h2>
                <span className="text-xs font-mono text-gray-600">COGNITIVE NARRATIVE ENGINE</span>
              </div>

              <div className="pl-6 border-l-4 border-black py-4 italic text-lg leading-relaxed text-gray-800">
                <p>"{passportData.biography}"</p>
              </div>

              <div className="space-y-4">
                <span className="block text-xs uppercase tracking-[0.2em] font-sans font-bold text-gray-500">Core Affinities Model</span>
                <div className="space-y-3.5">
                  {passportData.personality.map((trait) => (
                    <div key={trait.name} className="flex justify-between items-center text-xs font-sans">
                      <span className="uppercase tracking-wider font-semibold w-1/3">{trait.name}</span>
                      <div className="flex-1 mx-4 h-[3px] bg-gray-100 border border-gray-200">
                        <div className="h-full bg-black" style={{ width: `${trait.percentage}%` }}></div>
                      </div>
                      <span className="font-mono font-bold w-12 text-right">{trait.percentage}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <span className="text-[10px] font-mono text-gray-500 border-t border-black/10 pt-4 text-center block">Page 4 &bull; WEB3 PASSPORT REGISTRY &bull; OFFICIAL STATE DOCUMENT</span>
          </div>

          {/* PAGE 5: ARCHAEOLOGY & ACHIEVEMENTS */}
          <div className="min-h-[92vh] py-8 flex flex-col justify-between">
            <div className="space-y-8">
              <div className="flex justify-between items-baseline border-b-2 border-black pb-4">
                <h2 className="text-3xl font-bold uppercase tracking-tight">Timeline & Honors</h2>
                <span className="text-xs font-mono text-gray-600">HISTORICAL ARCHIVES</span>
              </div>

              <div className="space-y-4">
                <span className="block text-xs uppercase tracking-[0.2em] font-sans font-bold text-gray-500">Archaeological Milestones</span>
                <div className="space-y-3 font-sans text-xs">
                  {passportData.timeline.map((event, idx) => (
                    <div key={idx} className="flex items-start gap-4 border-b border-gray-100 pb-2.5">
                      <span className="font-mono font-bold text-gray-600 bg-gray-100 border border-black/10 px-2 py-0.5 rounded-none">{event.year}</span>
                      <div>
                        <h4 className="font-serif font-bold text-sm text-black leading-tight">{event.title}</h4>
                        <p className="text-gray-600 mt-1 leading-normal">{event.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4 pt-4">
                <span className="block text-xs uppercase tracking-[0.2em] font-sans font-bold text-gray-500">Unlocked Badges & Honors</span>
                <div className="grid grid-cols-2 gap-4 font-sans text-xs">
                  {passportData.achievements.map((item, idx) => (
                    <div key={idx} className="p-3.5 border border-black/10 bg-gray-50/30">
                      <div className="flex items-center justify-between mb-1.5 pb-1 border-b border-black/5">
                        <span className="font-serif font-bold text-xs text-black">{item.title}</span>
                        <span className="text-[8px] uppercase tracking-wider font-bold bg-white border border-black/10 px-1 py-0.5">{item.rarity}</span>
                      </div>
                      <p className="text-gray-600 text-[10.5px] leading-relaxed">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <span className="text-[10px] font-mono text-gray-500 border-t border-black/10 pt-4 text-center block">Page 5 &bull; WEB3 PASSPORT REGISTRY &bull; END OF CHRONICLE DOCUMENT</span>
          </div>

        </div>
      )}
    </div>
  );
}
