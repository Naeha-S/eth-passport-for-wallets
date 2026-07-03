import React, { useState } from "react";
import { Search, Compass, Globe, Check, ChevronRight } from "lucide-react";
import Aurora from "./Aurora";
import CrowdCanvas from "./CrowdCanvas";

interface LandingPageProps {
  onSearch: (address: string) => void;
  isLoading: boolean;
  statusMessage: string;
}

export default function LandingPage({ onSearch, isLoading, statusMessage }: LandingPageProps) {
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");

  const demoWallets = [
    {
      name: "Vitalik Buterin (Creator)",
      address: "0xd8da6bf26964af9d7eed9e03e53415d37aa96045",
      badge: "OG Founder",
      color: "bg-[#546a7b]"
    },
    {
      name: "Cozy Curator (NFT Collector)",
      address: "0xb1Ad6Fbc0EdC54C34a5dC65A15206F7De0378051",
      badge: "Pixel Baron",
      color: "bg-[#62929e]"
    },
    {
      name: "Uniswap Whiz (DeFi Degen)",
      address: "0x91Fdfb489d2D5e8E9C7E6C9c0c1b0D7AdFF6Bf14",
      badge: "Yield Giga",
      color: "bg-neutral-600"
    },
    {
      name: "EVM Architect (Builder)",
      address: "0x192D2E49c3aE27926941ad8E131d2D6A531cfdBF",
      badge: "Contract Overlord",
      color: "bg-[#393d3f]"
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!address.trim()) {
      setError("Please specify a wallet address or EVM identifier.");
      return;
    }

    // Basic Ethereum address or ENS check
    if (!address.endsWith(".eth") && !/^0x[a-fA-F0-9]{40}$/.test(address)) {
      setError("Please input a valid EVM address (starting with 0x) or ENS domain.");
      return;
    }

    onSearch(address);
  };

  return (
    <div 
      id="wallet-search-view" 
      className="w-full max-w-5xl mx-auto px-4 py-12 md:py-20 flex flex-col items-center relative overflow-hidden min-h-[92vh] justify-center pb-24 paper-texture"
    >
      {/* CrowdCanvas Integrated as a Subtle, Low-Opacity Background Element */}
      <div className="absolute inset-0 w-full h-full pointer-events-none -z-10 select-none">
        <Aurora
          colorStops={["#393d3f", "#546a7b", "#1e2122"]}
          amplitude={1.1}
          blend={0.5}
        />
        <div className="absolute inset-0 opacity-[0.22] mix-blend-screen">
          <CrowdCanvas rows={12} cols={6} />
        </div>
        {/* Soft elegant gradient overlays to blend into the main layout background seamlessly */}
        <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-editorial-bg to-transparent"></div>
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-editorial-bg to-transparent"></div>
      </div>

      {/* Auth Passport Cover Hero Display */}
      <div className="w-full max-w-sm md:max-w-md bg-[#25282a] border-4 border-[#393d3f] rounded-none p-8 md:p-12 mb-10 text-center relative overflow-hidden shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] transition duration-500 group select-none z-10 paper-texture">
        {/* Inner high-fidelity silver/gold foil style border line */}
        <div className="absolute inset-2 border border-[#c6c5b9]/20 pointer-events-none"></div>
        <div className="absolute inset-3 border border-[#62929e]/15 pointer-events-none"></div>

        {/* Top Authority Header */}
        <div className="space-y-1">
          <p className="text-[10px] font-sans font-bold uppercase tracking-[0.28em] text-[#c6c5b9]">
            Cryptographic Union of Blockchains
          </p>
          <p className="text-[8px] font-mono text-gray-400 uppercase tracking-[0.2em]">
            Official Sovereign Registry Document
          </p>
        </div>

        {/* Large Centered Stylized Globe Icon with Metallic Highlights */}
        <div className="my-10 flex justify-center relative">
          <div className="absolute inset-0 bg-[#62929e]/8 rounded-full blur-3xl scale-95 pointer-events-none"></div>
          
          {/* Inner concentric background ring */}
          <div className="p-8 border-2 border-dashed border-[#c6c5b9]/25 rounded-full relative transition-all duration-700 group-hover:border-[#62929e]/40">
            <div className="absolute inset-1.5 border border-dotted border-[#62929e]/30 rounded-full"></div>
            <Globe className="w-24 h-24 md:w-28 md:h-28 text-[#c6c5b9] stroke-[1.1] transition-transform duration-1000 group-hover:rotate-[15deg]" />
          </div>
        </div>

        {/* Big Bold Elegant Title pair */}
        <div className="space-y-1">
          <h1 className="text-3xl md:text-4xl font-serif font-light tracking-[0.2em] text-[#fdfdff] uppercase leading-none">
            WALLET
          </h1>
          <h2 className="text-4xl md:text-5xl font-bold tracking-[0.16em] text-[#62929e] uppercase font-sans">
            PASSPORT
          </h2>
        </div>

        {/* Biometric Passport Smart-Chip Symbol in Metallic Gold/Silver */}
        <div className="flex justify-center mt-10">
          <div className="w-8 h-6 border-2 border-[#c6c5b9]/40 rounded-sm flex items-center justify-center gap-0.5 px-0.5 relative bg-black/20">
            <div className="w-1.5 h-2.5 rounded-sm bg-[#c6c5b9]/60"></div>
            <div className="w-2.5 h-1.5 rounded-sm bg-[#c6c5b9]/40"></div>
            <div className="w-1.5 h-2.5 rounded-sm bg-[#c6c5b9]/60"></div>
          </div>
        </div>
      </div>

      {/* Authoritative and Editorial Title block */}
      <div className="text-center space-y-4 mb-10 max-w-2xl relative z-10 px-4">
        <p className="text-xl md:text-3xl font-serif italic text-editorial-paper leading-relaxed drop-shadow-md">
          Every wallet has a story. <span className="text-[#62929e] font-semibold not-italic">Discover yours.</span>
        </p>
        <p className="text-xs md:text-sm font-sans text-gray-300 leading-relaxed max-w-xl mx-auto drop-shadow-sm">
          We transform raw decentralized ledger blocks into an interactive, beautifully custom-printed Web3 travel book. Start scanning below to generate your official registry passport.
        </p>
      </div>

      {/* Main Search Interaction Kiosk Card */}
      <div className="w-full bg-editorial-card/90 backdrop-blur-xl border border-editorial-border rounded-none p-6 md:p-8 shadow-2xl relative overflow-hidden max-w-2xl mb-12 z-10 paper-texture">
        <div className="absolute top-0 left-0 w-full h-[3px] bg-editorial-accent"></div>

        {!isLoading ? (
          <form id="wallet-search-form" onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="wallet-address" className="block text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-gray-300">
                EVM Wallet Address or Web3 Identifier
              </label>
              <div className="relative">
                <input
                  id="wallet-address"
                  type="text"
                  placeholder="0xA4...9F or vitalik.eth"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-4 py-4 pl-12 bg-black/60 border border-editorial-border rounded-none text-editorial-paper placeholder-gray-500 focus:outline-none focus:border-editorial-accent focus:ring-1 focus:ring-editorial-accent transition duration-200 font-mono text-sm"
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              </div>
              {error && <p className="text-red-400 text-xs mt-1 font-sans font-semibold">{error}</p>}
            </div>

            <button
              id="generate-passport-btn"
              type="submit"
              className="w-full py-4 bg-editorial-accent hover:bg-[#546a7b] text-white font-sans font-bold uppercase tracking-[0.2em] text-xs rounded-none transition-all duration-300 shadow-lg shadow-editorial-accent/20 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Compass className="w-5 h-5" />
              Generate Wallet Passport
            </button>
          </form>
        ) : (
          <div className="py-12 flex flex-col items-center justify-center text-center space-y-6">
            {/* Spinning seal */}
            <div className="relative">
              <div className="w-20 h-20 rounded-full border-4 border-editorial-border border-t-editorial-accent animate-spin flex items-center justify-center"></div>
              <Compass className="w-8 h-8 text-editorial-accent absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            </div>

            <div className="space-y-2 max-w-md">
              <h3 className="text-xl font-serif italic font-medium text-editorial-paper animate-pulse">
                Issuing Passport Booklet...
              </h3>
              <p className="text-xs text-gray-400 font-mono tracking-wide">
                {statusMessage}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Demo Wallets Grid */}
      <div className="w-full max-w-3xl space-y-4 relative z-10">
        <div className="flex items-center gap-2 justify-center text-gray-300 text-xs uppercase tracking-[0.2em] font-bold font-sans drop-shadow-md">
          <Globe className="w-4 h-4 text-editorial-accent" />
          <span>Scan a public prototype registry:</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {demoWallets.map((wallet) => (
            <button
              id={`demo-wallet-${wallet.name.replace(/\s+/g, '-').toLowerCase()}`}
              key={wallet.name}
              onClick={() => {
                setAddress(wallet.address);
                onSearch(wallet.address);
              }}
              className="flex items-start p-4 bg-editorial-card/80 hover:bg-[#25282a] border border-editorial-border hover:border-editorial-accent rounded-none text-left transition duration-300 cursor-pointer group shadow-md"
            >
              <div className="flex-1 space-y-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-serif text-sm text-editorial-paper group-hover:text-editorial-accent transition duration-200 truncate font-semibold">
                    {wallet.name}
                  </span>
                  <span className={`px-2 py-0.5 rounded-none text-[8px] font-sans font-bold uppercase tracking-[0.15em] text-white ${wallet.color}`}>
                    {wallet.badge}
                  </span>
                </div>
                <p className="text-xs text-gray-400 font-mono truncate">{wallet.address}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
