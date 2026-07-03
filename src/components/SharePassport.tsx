import React, { useRef, useState } from "react";
import { WalletPassportData } from "../types";
import { ShieldCheck, Compass, Download, Check, RefreshCw, BarChart2, Share2, Printer, FileSpreadsheet } from "lucide-react";

interface SharePassportProps {
  data: WalletPassportData;
}

export default function SharePassport({ data }: SharePassportProps) {
  const [exporting, setExporting] = useState(false);
  const [success, setSuccess] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Stats display items
  const statsItems = [
    { label: "Wallet Active Lifespan", value: `${data.stats.walletAgeYears} Years`, sub: `Since ${data.createdDate}` },
    { label: "On-Chain Transactions", value: data.stats.transactionsCount.toLocaleString(), sub: "Verified broadcasts" },
    { label: "Realms Visited", value: `${data.stats.chainsCount} Networks`, sub: "Distinct protocols mapped" },
    { label: "Smart Contracts Engaged", value: data.stats.contractsCount.toLocaleString(), sub: "EVM direct invocation" },
    { label: "Largest Single Transfer", value: `${data.stats.largestTxEth} ETH`, sub: "Peak transaction weight" },
    { label: "Average Transfer Size", value: `${data.stats.avgTxEth} ETH`, sub: "Mean transaction magnitude" }
  ];

  // Draw the Share Card onto HTML5 Canvas and download (Using Editorial Aesthetic specs)
  const handleExportPNG = () => {
    setExporting(true);
    setSuccess(false);

    setTimeout(() => {
      try {
        const canvas = canvasRef.current;
        if (!canvas) throw new Error("Canvas element not loaded");

        const ctx = canvas.getContext("2d");
        if (!ctx) throw new Error("Canvas context could not be acquired");

        // Clear and size
        canvas.width = 800;
        canvas.height = 450;

        // 1. Background (Editorial canvas tone)
        ctx.fillStyle = "#120707";
        ctx.fillRect(0, 0, 800, 450);

        // Solid dark card fill for contrast
        ctx.fillStyle = "#1C0C0C";
        ctx.fillRect(20, 20, 760, 410);

        // 2. Editorial Thin Border (Gold accent)
        ctx.strokeStyle = "#D4AF37";
        ctx.lineWidth = 2;
        ctx.strokeRect(20, 20, 760, 410);
        
        ctx.strokeStyle = "#2D1818";
        ctx.lineWidth = 1;
        ctx.strokeRect(28, 28, 744, 394);

        // 3. Compass Watermark in center-right
        ctx.save();
        ctx.translate(620, 225);
        ctx.strokeStyle = "rgba(212, 175, 55, 0.04)";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(0, 0, 120, 0, Math.PI * 2);
        ctx.stroke();
        // Inner compass lines
        for (let i = 0; i < 8; i++) {
          ctx.rotate(Math.PI / 4);
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(100, 0);
          ctx.stroke();
        }
        ctx.restore();

        // 4. Header Section
        ctx.fillStyle = "#D4AF37";
        ctx.font = "bold 10px sans-serif";
        ctx.fillText("WEB3 PASSPORT AUTHORITY", 60, 65);

        ctx.fillStyle = "rgba(245, 242, 237, 0.4)";
        ctx.font = "bold 8px sans-serif";
        ctx.fillText("DOCUMENT TYPE: DIGITAL CHRONICLE ID", 60, 83);

        // Passport Number on Right
        ctx.fillStyle = "rgba(245, 242, 237, 0.3)";
        ctx.font = "bold 9px sans-serif";
        ctx.textAlign = "right";
        ctx.fillText("PASSPORT NUMBER", 740, 65);
        
        ctx.fillStyle = "#D4AF37";
        ctx.font = "bold 15px monospace";
        ctx.fillText(`#WP-${data.passportNumber}`, 740, 85);
        ctx.textAlign = "left"; // Reset alignment

        // 5. Epithet / Nickname (Main title)
        ctx.fillStyle = "#F5F2ED";
        ctx.font = "bold 32px Georgia, serif";
        ctx.fillText(data.nickname, 60, 140);

        // Small divider line
        ctx.fillStyle = "#D4AF37";
        ctx.fillRect(60, 160, 220, 1);

        // 6. Identity & Summary Badges
        ctx.fillStyle = "rgba(245, 242, 237, 0.4)";
        ctx.font = "bold 10px sans-serif";
        ctx.fillText("IDENTITY CLASSIFICATION", 60, 198);
        
        ctx.fillStyle = "#D4AF37";
        ctx.font = "italic 18px Georgia, serif";
        ctx.fillText(data.occupation, 60, 222);

        ctx.fillStyle = "rgba(245, 242, 237, 0.5)";
        ctx.font = "italic 11px Georgia, serif";
        ctx.fillText(`“The ${data.identityType}”`, 60, 242);

        // 7. Core Stats Block
        const statsY = 300;
        const statsHeaders = ["WALLET AGE", "UNLOCKED SEALS", "VISITED ECOSYSTEMS"];
        const statsVals = [
          `${data.stats.walletAgeYears} Years`,
          `${data.achievements.length} Medals`,
          `${data.stats.chainsCount} Realms`
        ];

        for (let i = 0; i < 3; i++) {
          const startX = 60 + i * 165;
          ctx.fillStyle = "rgba(245, 242, 237, 0.4)";
          ctx.font = "bold 9px sans-serif";
          ctx.fillText(statsHeaders[i], startX, statsY);

          ctx.fillStyle = "#F5F2ED";
          ctx.font = "italic 16px Georgia, serif";
          ctx.fillText(statsVals[i], startX, statsY + 22);
        }

        // 8. Dynamic DNA Trait pill markers
        ctx.fillStyle = "rgba(245, 242, 237, 0.35)";
        ctx.font = "bold 9px sans-serif";
        ctx.fillText("CORE DNA TRAITS MAPPED", 60, 375);

        // Draw top 3 DNA traits
        const topTraits = [...data.dna]
          .sort((a, b) => b.value - a.value)
          .slice(0, 3);

        let pillX = 60;
        topTraits.forEach((trait) => {
          const txt = `${trait.subject} (${trait.value}%)`;
          ctx.font = "bold 9px monospace";
          const textW = ctx.measureText(txt).width;
          
          // Pill background (Sharp editorial rectangle)
          ctx.fillStyle = "rgba(212, 175, 55, 0.08)";
          ctx.strokeStyle = "rgba(212, 175, 55, 0.3)";
          ctx.lineWidth = 1;
          
          const pWidth = textW + 16;
          const pHeight = 18;
          const pY = 388;
          ctx.fillRect(pillX, pY, pWidth, pHeight);
          ctx.strokeRect(pillX, pY, pWidth, pHeight);

          // Pill text
          ctx.fillStyle = "#D4AF37";
          ctx.fillText(txt, pillX + 8, pY + 12);

          pillX += pWidth + 10;
        });

        // 9. Right side Abstract biometric seal
        ctx.save();
        ctx.translate(620, 240);
        ctx.strokeStyle = "rgba(212, 175, 55, 0.2)";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(0, 0, 48, 0, Math.PI * 2);
        ctx.stroke();

        ctx.strokeStyle = "#D4AF37";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(0, 0, 40, 0, Math.PI * 2);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(0, 0, 20, 0, Math.PI * 2);
        ctx.stroke();

        for (let rAngle = 0; rAngle < 360; rAngle += 45) {
          const rad = (rAngle * Math.PI) / 180;
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(38 * Math.cos(rad), 38 * Math.sin(rad));
          ctx.stroke();
        }
        ctx.restore();

        // 10. Address watermark on bottom right
        ctx.fillStyle = "rgba(245, 242, 237, 0.25)";
        ctx.font = "bold 10px monospace";
        ctx.textAlign = "right";
        const truncatedAddr = `${data.address.slice(0, 8)}...${data.address.slice(-8)}`;
        ctx.fillText(`METRIC ID: ${truncatedAddr}`, 740, 405);
        ctx.textAlign = "left";

        // Generate data URL and download
        const url = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.download = `WalletPassport_${data.passportNumber}.png`;
        link.href = url;
        link.click();

        setSuccess(true);
      } catch (err) {
        console.error("Export to Canvas failed:", err);
      } finally {
        setExporting(false);
      }
    }, 400);
  };

  const handleExportCSV = () => {
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Section,Key,Value,SubValue\n";
    
    // Passport Profile info
    csvContent += `Profile,Passport Number,#WP-${data.passportNumber},\n`;
    csvContent += `Profile,Nickname,${data.nickname.replace(/,/g, " ")},\n`;
    csvContent += `Profile,Address,${data.address},\n`;
    csvContent += `Profile,Classification,${data.occupation.replace(/,/g, " ")},\n`;
    csvContent += `Profile,Risk Rating,${data.riskRating},\n`;
    csvContent += `Profile,Activity Score,${data.activityScore}/100,\n`;
    csvContent += `Profile,Created Date,${data.createdDate},\n`;

    // Stats
    statsItems.forEach(item => {
      csvContent += `Stat,${item.label.replace(/,/g, " ")},${item.value.replace(/,/g, " ")},${item.sub.replace(/,/g, " ")}\n`;
    });

    // DNA
    data.dna.forEach(trait => {
      csvContent += `DNA,${trait.subject.replace(/,/g, " ")},${trait.value}%,\n`;
    });

    // Stamps
    data.stamps.forEach(stamp => {
      csvContent += `Visa Stamp,${stamp.chain.replace(/,/g, " ")},${stamp.role.replace(/,/g, " ")},${stamp.visitedYear}\n`;
    });

    // Timeline
    data.timeline.forEach(event => {
      csvContent += `Archaeology Timeline,${event.year},${event.title.replace(/,/g, " ")},${event.description.replace(/,/g, " ")}\n`;
    });

    // Download action
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `wallet_passport_${data.nickname.toLowerCase().replace(/\s+/g, "_")}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div id="stats-share-page" className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
      {/* LEFT COLUMN: Detailed stats breakdown */}
      <div className="lg:col-span-6 bg-editorial-card border border-editorial-border rounded-none p-6 md:p-8 flex flex-col justify-between shadow-2xl relative">
        <div className="absolute top-0 left-0 w-full h-[2px] bg-editorial-accent"></div>

        <div className="space-y-6">
          <div className="flex items-center gap-2 border-b border-editorial-border pb-3">
            <BarChart2 className="w-4 h-4 text-editorial-accent" />
            <h3 className="text-xs uppercase font-sans font-bold tracking-[0.2em] text-editorial-paper">
              Ledger Telemetry
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {statsItems.map((stat, idx) => (
              <div key={idx} className="p-4 bg-black/35 border border-editorial-border rounded-none space-y-1">
                <span className="text-[9px] font-sans font-bold text-gray-500 block uppercase tracking-widest">
                  {stat.label}
                </span>
                <p className="font-serif text-2xl italic text-editorial-paper leading-tight">{stat.value}</p>
                <span className="text-[10px] text-gray-600 font-sans block">{stat.sub}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-editorial-border pt-4 mt-6 text-[10px] text-gray-500 font-mono flex items-center justify-between">
          <span>COMPILED VIA HEURISTICS ALGORITHM</span>
          <span>STABLE SIGNATURE ISSUANCE</span>
        </div>
      </div>

      {/* RIGHT COLUMN: Physical Share Card with Canvas exporter */}
      <div className="lg:col-span-6 bg-editorial-card border border-editorial-border rounded-none p-6 md:p-8 flex flex-col items-center justify-between shadow-2xl relative">
        <div className="absolute top-0 left-0 w-full h-[2px] bg-editorial-accent"></div>

        <div className="w-full flex items-center gap-2 mb-4 self-start border-b border-editorial-border pb-3">
          <Share2 className="w-4 h-4 text-editorial-accent" />
          <h3 className="text-xs uppercase font-sans font-bold tracking-[0.2em] text-editorial-paper">
            Export Identity Card
          </h3>
        </div>

        {/* Miniature Physical Mock Card Representation with sharp editorial corners */}
        <div className="w-full aspect-[16/9] max-w-[400px] bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border border-editorial-border rounded-none p-4 flex flex-col justify-between shadow-xl relative overflow-hidden select-none mb-6">
          <div className="absolute top-0 left-0 w-full h-[2px] bg-editorial-accent"></div>
          
          {/* Subtle circles watermark background */}
          <div className="absolute -right-10 -bottom-10 w-44 h-44 rounded-full border border-dashed border-editorial-accent/5 pointer-events-none" />

          {/* Card Top Row */}
          <div className="flex justify-between items-start text-[8px] font-sans font-bold tracking-widest">
            <div className="space-y-0.5">
              <span className="text-editorial-accent block uppercase">WALLET PASSPORT</span>
              <span className="text-gray-500 block uppercase">DIGITAL CHRONICLE</span>
            </div>
            <div className="text-right">
              <span className="text-gray-500 block uppercase">ID CODE</span>
              <span className="text-editorial-accent block font-mono font-bold">#WP-{data.passportNumber}</span>
            </div>
          </div>

          {/* Card Name */}
          <div className="space-y-1">
            <h4 className="font-serif font-medium text-xl text-editorial-paper truncate tracking-tight">
              {data.nickname}
            </h4>
            <div className="flex gap-4 text-[9px] text-gray-400 font-sans">
              <div>
                <span className="text-gray-600 block text-[7px] uppercase font-bold tracking-wider">Classification</span>
                <span className="text-editorial-accent font-serif italic">{data.occupation}</span>
              </div>
              <div>
                <span className="text-gray-600 block text-[7px] uppercase font-bold tracking-wider">Active Lifespan</span>
                <span className="font-serif italic">{data.stats.walletAgeYears} Years</span>
              </div>
              <div>
                <span className="text-gray-600 block text-[7px] uppercase font-bold tracking-wider">Score Rating</span>
                <span>{data.activityScore}/100</span>
              </div>
            </div>
          </div>

          {/* DNA Pill indicators (mini sharp rects) */}
          <div className="flex gap-1.5 overflow-hidden flex-wrap max-h-5 items-center">
            {data.dna.slice(0, 3).map((trait) => (
              <span key={trait.subject} className="text-[7px] font-mono border border-editorial-accent/20 text-editorial-accent px-1.5 py-0.5 rounded-none bg-editorial-accent/5 uppercase">
                {trait.subject}
              </span>
            ))}
          </div>

          {/* Address metric footprint */}
          <div className="flex justify-between items-center text-[7px] text-gray-500 font-mono border-t border-editorial-border pt-1.5 mt-1">
            <span>METRIC ID: {data.address.slice(0, 6)}...{data.address.slice(-6)}</span>
            <span className="text-editorial-accent uppercase tracking-widest font-sans font-bold text-[6px]">ISSUED AUTHENTIC</span>
          </div>
        </div>

        {/* Hidden Export Canvas */}
        <canvas ref={canvasRef} className="hidden" />

        <div className="w-full space-y-3">
          <button
            id="export-png-btn"
            onClick={handleExportPNG}
            disabled={exporting}
            className="w-full py-3.5 bg-editorial-accent hover:bg-[#d46618] text-white font-sans font-bold uppercase tracking-[0.2em] text-xs rounded-none transition-all duration-300 shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {exporting ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Generating Digital Stamp...</span>
              </>
            ) : success ? (
              <>
                <Check className="w-4 h-4 text-emerald-300 stroke-[3]" />
                <span>Passport Saved to Device</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>Download Passport Image</span>
              </>
            )}
          </button>

          <button
            id="export-pdf-btn"
            onClick={() => window.print()}
            className="w-full py-3.5 bg-transparent hover:bg-editorial-accent/10 border border-editorial-accent text-editorial-accent font-sans font-bold uppercase tracking-[0.2em] text-xs rounded-none transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Download Full Passport (PDF)</span>
          </button>

          <button
            id="export-csv-btn"
            onClick={handleExportCSV}
            className="w-full py-3.5 bg-transparent hover:bg-editorial-accent/10 border border-editorial-accent text-editorial-accent font-sans font-bold uppercase tracking-[0.2em] text-xs rounded-none transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>Download Ledger Data (CSV)</span>
          </button>
          
          <p className="text-[10px] text-gray-500 font-sans italic text-center">
            Renders a premium physical identity card at high resolution (PNG), triggers print dialog to save the entire Multi-Page booklet as an ink-friendly PDF, or exports transaction data to high-fidelity spreadsheet format (CSV).
          </p>
        </div>
      </div>
    </div>
  );
}
