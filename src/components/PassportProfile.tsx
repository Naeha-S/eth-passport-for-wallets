import React from "react";
import { ShieldCheck, Compass, Sparkles, Scale, AlertOctagon, HelpCircle } from "lucide-react";
import { WalletPassportData } from "../types";

interface PassportProfileProps {
  data: WalletPassportData;
}

export default function PassportProfile({ data }: PassportProfileProps) {
  // Compute coordinates for SVG Radar Chart (8 traits)
  const cx = 150;
  const cy = 140;
  const r = 90;
  const numTraits = data.dna.length;

  const getCoordinates = (index: number, val: number) => {
    // Offset by -Math.PI / 2 to start at top center
    const angle = (index * 2 * Math.PI) / numTraits - Math.PI / 2;
    const distance = (val / 100) * r;
    const x = cx + distance * Math.cos(angle);
    const y = cy + distance * Math.sin(angle);
    return { x, y };
  };

  // Generate background octagon grid lines
  const gridLevels = [0.25, 0.5, 0.75, 1.0];
  const gridPolygons = gridLevels.map((level) => {
    const points = Array.from({ length: numTraits }).map((_, i) => {
      const angle = (i * 2 * Math.PI) / numTraits - Math.PI / 2;
      const x = cx + r * level * Math.cos(angle);
      const y = cy + r * level * Math.sin(angle);
      return `${x},${y}`;
    }).join(" ");
    return points;
  });

  // Data polygon points
  const dataPoints = data.dna.map((trait, i) => {
    const { x, y } = getCoordinates(i, trait.value);
    return `${x},${y}`;
  }).join(" ");

  // Labels coordinates
  const labelPositions = data.dna.map((trait, i) => {
    const angle = (i * 2 * Math.PI) / numTraits - Math.PI / 2;
    // Push label out slightly beyond max radius
    const labelR = r + 24;
    const x = cx + labelR * Math.cos(angle);
    const y = cy + labelR * Math.sin(angle);
    return { x, y, traitName: trait.subject, value: trait.value };
  });

  // Deterministic Biometric Seal based on Address
  const getBiometricSeal = (address: string) => {
    let sum = 0;
    for (let i = 0; i < address.length; i++) {
      sum += address.charCodeAt(i);
    }
    const colorA = `hsl(${sum % 360}, 65%, 45%)`;
    const colorB = `hsl(( ${sum} + 120) % 360, 75%, 20%)`;
    const numBlades = 5 + (sum % 8);

    return (
      <div className="w-24 h-24 rounded-none bg-black/60 border border-editorial-border-light flex items-center justify-center relative overflow-hidden p-1 shadow-inner group">
        <div 
          className="w-full h-full rounded-full opacity-70 animate-pulse duration-[4000ms]"
          style={{
            background: `radial-gradient(circle, ${colorA} 0%, ${colorB} 100%)`
          }}
        />
        {/* Abstract pattern lines overlay */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
          <svg viewBox="0 0 100 100" className="w-full h-full text-editorial-accent">
            <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
            <circle cx="50" cy="50" r="25" fill="none" stroke="currentColor" strokeWidth="1" />
            {Array.from({ length: numBlades }).map((_, i) => {
              const angle = (i * 360) / numBlades;
              return (
                <line
                  key={i}
                  x1="50"
                  y1="50"
                  x2={50 + 38 * Math.cos((angle * Math.PI) / 180)}
                  y2={50 + 38 * Math.sin((angle * Math.PI) / 180)}
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              );
            })}
          </svg>
        </div>
        <div className="absolute bottom-1 right-1 bg-black/85 px-1 py-0.5 rounded-none text-[8px] font-mono text-gray-400 border border-editorial-border">
          BIO-ID
        </div>
      </div>
    );
  };

  return (
    <div id="passport-profile-page" className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
      {/* LEFT COLUMN: Identity Sheet */}
      <div className="lg:col-span-7 bg-editorial-card border border-editorial-border rounded-none p-6 flex flex-col justify-between shadow-2xl relative">
        <div className="absolute top-0 left-0 w-full h-[2px] bg-editorial-accent"></div>
        
        {/* Passport Header */}
        <div className="flex items-start justify-between border-b border-editorial-border pb-6 mb-6">
          <div className="space-y-1">
            <div className="text-editorial-accent font-sans tracking-[0.2em] text-[10px] uppercase font-bold">
              Web3 Passport Authority
            </div>
            <h2 className="text-xl font-light font-serif text-editorial-paper uppercase tracking-tight">
              Official Identity Document
            </h2>
          </div>
          <div className="text-right">
            <span className="text-[9px] font-sans font-bold uppercase tracking-widest text-gray-500">Passport No.</span>
            <p className="text-sm font-mono font-bold text-editorial-accent">#WP-{data.passportNumber}</p>
          </div>
        </div>

        {/* Identity Details Body */}
        <div className="flex flex-col md:flex-row gap-6 items-start md:items-stretch flex-1">
          {/* Avatar & Biometrics */}
          <div className="flex flex-col items-center gap-4">
            {getBiometricSeal(data.address)}
            
            <div className="text-center">
              <span className="text-[10px] uppercase font-sans font-bold tracking-wider text-gray-500 block">Activity Level</span>
              <div className="mt-2.5 flex items-center justify-center gap-1.5 px-3 py-1 bg-editorial-accent/10 border border-editorial-accent/30 rounded-none text-editorial-accent text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                <span>Score: {data.activityScore}/100</span>
              </div>
            </div>
          </div>

          {/* Details Form Grid */}
          <div className="flex-1 grid grid-cols-2 gap-y-5 gap-x-6 text-sm">
            <div className="col-span-2 border-b border-editorial-border pb-2">
              <label className="block text-[10px] uppercase tracking-[0.2em] opacity-40 mb-1 font-sans font-bold">Identity Epithet</label>
              <h2 className="text-3xl leading-none font-serif text-editorial-paper font-medium">{data.nickname}</h2>
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-[0.2em] opacity-40 mb-1 font-sans font-bold">Occupation</label>
              <p className="text-lg font-serif italic text-editorial-paper leading-tight">{data.occupation}</p>
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-[0.2em] opacity-40 mb-1 font-sans font-bold">Risk Level</label>
              <p className={`inline-flex items-center gap-1 text-lg font-serif italic ${
                data.riskRating === "Low" ? "text-emerald-500" : data.riskRating === "Medium" ? "text-amber-500" : "text-rose-500"
              }`}>
                {data.riskRating === "Low" ? (
                  <ShieldCheck className="w-4 h-4 shrink-0" />
                ) : (
                  <AlertOctagon className="w-4 h-4 shrink-0" />
                )}
                <span>{data.riskRating}</span>
              </p>
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-[0.2em] opacity-40 mb-1 font-sans font-bold">Wallet Age</label>
              <p className="text-lg font-serif italic text-editorial-paper">{data.stats.walletAgeYears} Years</p>
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-[0.2em] opacity-40 mb-1 font-sans font-bold">Activation Date</label>
              <p className="font-mono text-sm text-editorial-paper mt-1">{data.createdDate}</p>
            </div>

            <div className="col-span-2 border-t border-editorial-border pt-3.5 mt-1">
              <label className="block text-[10px] uppercase tracking-[0.2em] opacity-40 mb-1.5 font-sans font-bold">Characterization</label>
              <p className="text-xs leading-relaxed opacity-80 font-sans">
                This entity functions primarily as a <span className="italic font-serif text-editorial-accent text-sm">{data.identityType}</span> within the multi-chain decentralized ecosystem. Observed activity profiles align with structured ledger interactions and strategic capital deployment.
              </p>
            </div>
          </div>
        </div>

        {/* Footer Seal */}
        <div className="border-t border-editorial-border pt-4 mt-6 flex items-center justify-between text-[11px] text-gray-500 font-mono">
          <div className="flex items-center gap-2">
            <Compass className="w-4 h-4 text-editorial-accent" />
            <span className="font-sans font-bold tracking-widest text-[9px]">HEURISTICS COMPLIANT</span>
          </div>
          <span className="font-sans font-bold tracking-widest text-[9px] text-right">ALL SEALS VERIFIED</span>
        </div>
      </div>

      {/* RIGHT COLUMN: Wallet DNA Radar Chart */}
      <div className="lg:col-span-5 bg-editorial-card border border-editorial-border rounded-none p-6 flex flex-col items-center justify-center shadow-2xl relative">
        <div className="absolute top-0 left-0 w-full h-[2px] bg-editorial-accent"></div>
        
        <div className="flex items-center justify-between mb-4 w-full">
          <h3 className="text-xs uppercase font-sans font-bold tracking-[0.2em] text-editorial-paper">Trait Analysis</h3>
          <div className="h-[1px] flex-1 bg-editorial-border mx-3"></div>
        </div>
        
        {/* Radar SVG */}
        <div className="w-full max-w-[320px] h-[300px] relative flex items-center justify-center mt-2">
          <svg viewBox="0 0 300 280" className="w-full h-full">
            {/* Concentric hexagonal/octagonal grid */}
            {gridPolygons.map((points, idx) => (
              <polygon
                key={idx}
                points={points}
                fill="none"
                stroke="#333333"
                strokeWidth="1"
                strokeDasharray="4 2"
              />
            ))}

            {/* Axes from center */}
            {Array.from({ length: numTraits }).map((_, i) => {
              const angle = (i * 2 * Math.PI) / numTraits - Math.PI / 2;
              const x2 = cx + r * Math.cos(angle);
              const y2 = cy + r * Math.sin(angle);
              return (
                <line
                  key={i}
                  x1={cx}
                  y1={cy}
                  x2={x2}
                  y2={y2}
                  stroke="#333333"
                  strokeWidth="1"
                />
              );
            })}

            {/* Filled data polygon */}
            <polygon
              points={dataPoints}
              fill="rgba(98, 146, 158, 0.15)"
              stroke="#62929e"
              strokeWidth="2"
            />

            {/* Circular Markers on Data Points */}
            {data.dna.map((trait, i) => {
              const { x, y } = getCoordinates(i, trait.value);
              return (
                <circle
                  key={i}
                  cx={x}
                  cy={y}
                  r="3.5"
                  fill="#62929e"
                  stroke="#1A1A1A"
                  strokeWidth="1.5"
                />
              );
            })}

            {/* Labels overlay */}
            {labelPositions.map((pos, i) => {
              // Align text anchor depending on position relative to center
              let textAnchor = "middle";
              let dy = "0.33em";
              if (pos.x < cx - 10) {
                textAnchor = "end";
              } else if (pos.x > cx + 10) {
                textAnchor = "start";
              }
              
              if (pos.y < cy - 10) {
                dy = "-0.1em";
              } else if (pos.y > cy + 10) {
                dy = "0.9em";
              }

              return (
                <g key={i} className="select-none pointer-events-none">
                  {/* Trait Label */}
                  <text
                    x={pos.x}
                    y={pos.y}
                    dy={dy}
                    textAnchor={textAnchor}
                    className="font-sans font-bold text-[9px] uppercase fill-gray-400 tracking-wider"
                  >
                    {pos.traitName}
                  </text>
                  {/* Score Label (Subtle) */}
                  <text
                    x={pos.x}
                    y={pos.y + 10}
                    dy={dy}
                    textAnchor={textAnchor}
                    className="font-mono text-[9px] fill-[#62929e] font-bold"
                  >
                    {pos.value}%
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        <p className="text-[11px] text-gray-500 font-sans italic text-center max-w-[280px] mt-2">
          Multi-dimensional mapping showing exact behavioral DNA coefficient percentages.
        </p>
      </div>
    </div>
  );
}
