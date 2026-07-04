import express, { Request, Response } from "express";
import path from "path";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini SDK with telemetry header
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

// Helper: Simple deterministic hash function for strings (DJB2)
function getDeterministicHash(str: string): number {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 33) ^ str.charCodeAt(i);
  }
  return Math.abs(hash);
}

// Generate deterministic data based on wallet address
function analyzeWallet(address: string) {
  const cleanAddr = address.trim().toLowerCase();
  const hash = getDeterministicHash(cleanAddr);

  // Lists for deterministic naming - Mature, rigorous terms
  const adjectives = [
    "Active", "Strategic", "Systematic", "Sophisticated", "Prudent", 
    "Focused", "Diversified", "Algorithmic", "Pioneering", "High-Volume", 
    "Yield-Focused", "Long-Term", "Sovereign", "Secured", "Governance-Led"
  ];
  const nouns = [
    "Explorer", "Developer", "Asset Manager", "Liquidity Provider", "Governor", 
    "Arbitrageur", "Staker", "Strategist", "Validator", "Protocol Architect", 
    "Collector", "Analyst", "Vault Guardian", "Ecosystem Specialist"
  ];

  const adjIdx = hash % adjectives.length;
  // Shift index slightly for nouns to avoid matching pairs
  const nounIdx = (hash + 7) % nouns.length;
  const nickname = `${adjectives[adjIdx]} ${nouns[nounIdx]}`;

  const passportNumber = String((hash % 900000) + 100000);

  // Core Stats
  const walletAgeYears = (hash % 6) + 2; // 2 to 7 years
  const transactionsCount = (hash % 1180) + 32; // 32 to 1211 txs
  const chainsCount = (hash % 5) + 3; // 3 to 7 chains
  const protocolsCount = (hash % 18) + 4; // 4 to 21 protocols
  const contractsCount = (hash % 45) + 8; // 8 to 52 contracts
  
  // Deterministic high-water marks
  const largestTxEth = parseFloat(((hash % 640) / 10 + 0.15).toFixed(2)); // 0.15 to 64.15 ETH
  const avgTxEth = parseFloat((largestTxEth * (0.04 + (hash % 8) * 0.01) + 0.01).toFixed(3));

  // Activity Score (1 to 100)
  const activityScore = Math.min(
    100,
    Math.max(
      15,
      Math.floor((transactionsCount * 0.04) + (chainsCount * 6) + (protocolsCount * 1.5))
    )
  );

  // Occupations & Identities
  const occupations = ["EVM Network Analyst", "Sovereign Asset Allocator", "Liquidity Provider Strategist", "Distributed Systems Developer", "Layer-2 Network Engineer", "DAO Governance Delegate"];
  const identities = ["EVM Infrastructure Specialist", "Capital Allocator", "Protocol Architect", "Sovereign Custodian", "Liquidity Provider"];
  const riskRatings: ('Low' | 'Medium' | 'High')[] = ["Low", "Medium", "High"];

  const occupation = occupations[hash % occupations.length];
  const identityType = identities[(hash + 3) % identities.length];
  const riskRating = riskRatings[(hash + 1) % riskRatings.length];

  // Starting Year
  const creationYear = 2026 - walletAgeYears;

  // Stamps Setup - NO EMOJIS, clean text codes
  const chainOptions = [
    { name: "Ethereum", flag: "ETH", role: "Mainnet Settlement" },
    { name: "Polygon", flag: "POL", role: "Scaling Outpost" },
    { name: "Arbitrum", flag: "ARB", role: "Rollup Stronghold" },
    { name: "Base", flag: "BASE", role: "Consumer Gateway" },
    { name: "Optimism", flag: "OP", role: "Superchain Core" },
    { name: "Solana", flag: "SOL", role: "High-Speed Frontier" },
    { name: "Avalanche", flag: "AVAX", role: "Subnet Wilderness" },
  ];

  // Pick deterministic subset of chains
  const stamps: any[] = [];
  const selectedChains: typeof chainOptions = [];
  for (let i = 0; i < chainsCount; i++) {
    const chainIdx = (hash + i * 11) % chainOptions.length;
    const candidate = chainOptions[chainIdx];
    if (!selectedChains.some(c => c.name === candidate.name)) {
      selectedChains.push(candidate);
    }
  }

  // Ensure Ethereum is visited if age is older, or base chain exists
  if (selectedChains.length === 0) {
    selectedChains.push(chainOptions[0]);
  }

  // Assign visit years and build stamps
  selectedChains.forEach((c, idx) => {
    const step = Math.floor((walletAgeYears - 1) / Math.max(1, selectedChains.length - 1));
    const visitedYear = creationYear + Math.min(walletAgeYears - 1, idx * Math.max(1, step));
    const activityCount = Math.floor((transactionsCount / selectedChains.length) * (1 + (idx % 3) * 0.2));
    stamps.push({
      chain: c.name,
      visitedYear,
      flag: c.flag,
      activityCount,
      role: c.role
    });
  });

  // Sort stamps by visit year
  stamps.sort((a, b) => a.visitedYear - b.visitedYear);

  // Timeline Event Generation - Show all milestones with locked/unlocked state
  const possibleTimelineEvents = [
    {
      year: creationYear,
      title: "Genesis Settlement",
      description: "First cryptographic transaction broadcasted and signed on an EVM network.",
      type: "creation",
      icon: "Sparkles",
      condition: () => true
    },
    {
      year: creationYear + Math.min(1, walletAgeYears - 1),
      title: "DeFi Asset Allocation",
      description: "Interacted with automated market maker (AMM) pools to facilitate liquidity swaps.",
      type: "defi",
      icon: "TrendingUp",
      condition: () => protocolsCount >= 5 || transactionsCount >= 100
    },
    {
      year: creationYear + Math.min(2, walletAgeYears - 1),
      title: "Curator Status",
      description: "Acquired or minted registered non-fungible ERC-721 token assets.",
      type: "nft",
      icon: "Image",
      condition: () => hash % 2 === 0
    },
    {
      year: creationYear + Math.min(3, walletAgeYears - 1),
      title: "Rollup Scale Integration",
      description: "Executed cross-chain bridge transaction to deploy assets to scaling layer-2 rollups.",
      type: "bridge",
      icon: "PlaneTakeoff",
      condition: () => chainsCount >= 4
    },
    {
      year: creationYear + Math.min(4, walletAgeYears - 1),
      title: "$100k Capital Club Allocation",
      description: "Exceeded $100,000 in aggregate capital allocation across active EVM smart contracts.",
      type: "milestone",
      icon: "FileCheck",
      condition: () => transactionsCount > 200 || largestTxEth >= 12
    },
    {
      year: creationYear + Math.min(4, walletAgeYears - 1),
      title: "High-Density Transaction Sequence",
      description: "Registered systematic transaction density over multiple contiguous on-chain epochs (active ledger usage).",
      type: "milestone",
      icon: "FileCheck",
      condition: () => transactionsCount >= 150
    },
    {
      year: creationYear + Math.min(5, walletAgeYears - 1),
      title: "Advanced Multicall Execution",
      description: "Successfully orchestrated advanced batch multicall transactions or direct contract factory compilations.",
      type: "contract",
      icon: "Code",
      condition: () => contractsCount >= 20
    },
    {
      year: creationYear + Math.min(5, walletAgeYears - 1),
      title: "Sovereign Governance Participation",
      description: "Interacted with cryptographic DAO governance frameworks and signed protocol enhancement proposals.",
      type: "contract",
      icon: "Code",
      condition: () => protocolsCount >= 6
    },
    {
      year: 2026,
      title: "Official Passport Issued",
      description: "Credentials issued and verified by EVM multi-chain ledger heuristics.",
      type: "milestone",
      icon: "FileCheck",
      condition: () => true
    }
  ];

  const timeline = possibleTimelineEvents.map(event => ({
    year: event.year,
    title: event.title,
    description: event.description,
    type: event.type as any,
    icon: event.icon,
    unlocked: event.condition()
  }));

  // Sort and dedup years
  timeline.sort((a, b) => a.year - b.year);

  // Achievements - Return all achievements with locked / unlocked status
  const achievementsList = [
    {
      id: "first_tx",
      title: "First Transaction",
      description: "Genesis broadcast signed on a blockchain.",
      whyUnlocked: "Unlocked on day one of wallet lifecycle.",
      icon: "Award",
      rarity: "Common",
      condition: () => true
    },
    {
      id: "early_adopter",
      title: "Early Adopter",
      description: "Belongs to the senior class of web3 citizens.",
      whyUnlocked: `This wallet has been active for over ${walletAgeYears} years.`,
      icon: "Calendar",
      rarity: "Rare",
      condition: () => walletAgeYears >= 5
    },
    {
      id: "nft_collector",
      title: "Curator of Pixels",
      description: "Acquired NFT art on decentralized exchanges.",
      whyUnlocked: "Uncovered digital collectibles on ERC-721 protocols.",
      icon: "Palette",
      rarity: "Common",
      condition: () => hash % 2 === 0
    },
    {
      id: "bridge_explorer",
      title: "Stargate Voyager",
      description: "Bridged crypto across distinct L1 and L2 chains.",
      whyUnlocked: `Transited assets safely across ${chainsCount} separate networks.`,
      icon: "Compass",
      rarity: "Rare",
      condition: () => chainsCount >= 4
    },
    {
      id: "defi_giga",
      title: "Liquidity Alchemist",
      description: "Deep DeFi interaction and yield harvesting.",
      whyUnlocked: `Interacted with ${protocolsCount} distinct smart contract protocols.`,
      icon: "Layers",
      rarity: "Epic",
      condition: () => protocolsCount >= 12
    },
    {
      id: "power_user",
      title: "Gas Burner Elite",
      description: "Extremely high density of blockchain submissions.",
      whyUnlocked: `Logged a massive tally of ${transactionsCount} verified transactions.`,
      icon: "Flame",
      rarity: "Legendary",
      condition: () => transactionsCount > 600
    },
    {
      id: "whale_signer",
      title: "Sovereign Whale",
      description: "Broadcasted a transaction of notable network weight.",
      whyUnlocked: `Successfully transferred or routed a single tx of ${largestTxEth} ETH.`,
      icon: "Coins",
      rarity: "Epic",
      condition: () => largestTxEth > 30
    },
    {
      id: "contract_wizard",
      title: "EVM Wizard",
      description: "Direct smart contract interactions and execution.",
      whyUnlocked: `Invoked or interacted with over ${contractsCount} contracts directly.`,
      icon: "Cpu",
      rarity: "Legendary",
      condition: () => contractsCount >= 28
    }
  ];

  const achievements = achievementsList.map(({ id, title, description, whyUnlocked, icon, rarity, condition }) => ({
    id,
    title,
    description,
    unlocked: condition(),
    whyUnlocked,
    icon,
    rarity: rarity as any
  }));

  // DNA (Radar Chart Traits) - Rigorous, mature titles for professional tone
  const baseCollector = (hash % 35) + (hash % 2 === 0 ? 55 : 10);
  const baseTrader = Math.min(98, Math.floor((transactionsCount / 1211) * 40 + 40 + (hash % 15)));
  const baseBuilder = Math.min(95, Math.floor((contractsCount / 52) * 50 + 30 + (hash % 15)));
  const baseExplorer = Math.min(98, Math.floor((chainsCount / 7) * 40 + 45 + (hash % 12)));
  const baseHolder = Math.min(99, Math.floor((walletAgeYears / 7) * 40 + 50 + (hash % 9)));
  const baseDeFi = Math.min(98, Math.floor((protocolsCount / 21) * 50 + 35 + (hash % 12)));

  const dna = [
    { subject: "Network Explorer", value: baseExplorer },
    { subject: "Asset Curator", value: baseCollector },
    { subject: "Capital Allocator", value: baseTrader },
    { subject: "Protocol Architect", value: baseBuilder },
    { subject: "Sovereign Custodian", value: baseHolder },
    { subject: "Liquidity Provider", value: baseDeFi },
    { subject: "Treasury Curator", value: Math.min(95, Math.floor(baseCollector * 0.8 + (hash % 20))) },
    { subject: "Rollup Integrator", value: Math.min(98, Math.floor(baseExplorer * 0.9 + (hash % 15))) }
  ];

  // Personality Sliders - Updated to mature names
  const totalVal = baseExplorer + baseCollector + baseBuilder + baseTrader + baseHolder;
  const personality = [
    { name: "Network Explorer", percentage: Math.floor((baseExplorer / totalVal) * 100) },
    { name: "Asset Curator", percentage: Math.floor((baseCollector / totalVal) * 100) },
    { name: "Protocol Architect", percentage: Math.floor((baseBuilder / totalVal) * 100) },
    { name: "Capital Allocator", percentage: Math.floor((baseTrader / totalVal) * 100) },
    { name: "Sovereign Custodian", percentage: Math.floor((baseHolder / totalVal) * 100) }
  ];

  // Normalize percentages to sum close to 100
  const sumPercent = personality.reduce((acc, p) => acc + p.percentage, 0);
  if (sumPercent !== 100) {
    personality[0].percentage += (100 - sumPercent);
  }

  // EVM Proficiency Calculations
  const gasOptimizationLevel = baseBuilder > 75 ? "Expert" : baseBuilder > 45 ? "Proficient" : "Standard";
  const smartContractComplexity = contractsCount >= 25 ? "Developer Grade" : contractsCount >= 10 ? "Advanced Execution" : "Standard User";
  const stakingAdoption = baseHolder > 80 ? "Sovereign Validator" : baseHolder > 50 ? "Yield Strategist" : "Standard Allocator";
  const layer2Adoption = chainsCount >= 5 ? "Multi-Rollup Specialist" : chainsCount >= 3 ? "Layer-2 Explorer" : "L1 Purist";
  
  // Composite score (1 - 100)
  const compositeScore = Math.floor(
    (baseBuilder * 0.25) + 
    (baseExplorer * 0.25) + 
    (baseDeFi * 0.25) + 
    (baseTrader * 0.25)
  );

  let rank = "Senior Ledger Operator";
  if (compositeScore >= 85) {
    rank = "Lead Protocol Architect";
  } else if (compositeScore >= 70) {
    rank = "Sovereign Capital Allocator";
  } else if (compositeScore >= 50) {
    rank = "Strategic EVM Specialist";
  } else {
    rank = "Network Explorer";
  }

  const metrics = [
    {
      name: "Gas Efficiency Quotient",
      value: `${Math.min(99, Math.floor(80 + (hash % 18)))}%`,
      status: (baseBuilder > 70 ? "expert" : baseBuilder > 40 ? "proficient" : "standard") as any,
      description: "Measures contract interactions processed using optimal gas pathways and batched multicalls."
    },
    {
      name: "Protocol Diversity Index",
      value: `${protocolsCount} Protocols`,
      status: (protocolsCount >= 12 ? "expert" : protocolsCount >= 6 ? "proficient" : "standard") as any,
      description: "Measures integration breadth across decentralized finance, lending, and custom oracle systems."
    },
    {
      name: "EVM Contract Integration",
      value: `${contractsCount} Contracts`,
      status: (contractsCount >= 25 ? "expert" : contractsCount >= 10 ? "proficient" : "standard") as any,
      description: "Indicates experience in direct smart contract invocations and state-writing executions."
    },
    {
      name: "Multi-Chain Rollup Velocity",
      value: `${chainsCount} Networks`,
      status: (chainsCount >= 5 ? "expert" : chainsCount >= 3 ? "proficient" : "standard") as any,
      description: "Quantifies execution scaling proficiency across Optimistic and Zero-Knowledge rollups."
    }
  ];

  const proficiency = {
    compositeScore,
    rank,
    gasOptimizationLevel,
    smartContractComplexity,
    stakingAdoption,
    layer2Adoption,
    metrics
  };

  const createdDate = `${creationYear}-03-12`;

  const stats = {
    walletAgeYears,
    transactionsCount,
    chainsCount,
    protocolsCount,
    contractsCount,
    largestTxEth,
    avgTxEth
  };

  return {
    address,
    nickname,
    passportNumber,
    occupation,
    identityType,
    riskRating,
    activityScore,
    createdDate,
    stamps,
    timeline,
    achievements,
    dna,
    personality,
    stats,
    proficiency
  };
}

// Full API router
app.post("/api/analyze", async (req: Request, res: Response): Promise<any> => {
  try {
    const { address } = req.body;
    if (!address) {
      return res.status(400).json({ error: "Wallet address is required" });
    }

    // Generate core stats using heuristic engine
    const passportData = analyzeWallet(address);

    // Initial load returns empty biography to save tokens
    const biography = "";

    res.json({
      ...passportData,
      biography
    });
  } catch (err: any) {
    console.error("Server error:", err);
    res.status(500).json({ error: "Internal server error analyzing passport" });
  }
});

// New On-Demand Biography Generation Endpoint
app.post("/api/generate-biography", async (req: Request, res: Response): Promise<any> => {
  try {
    const { address } = req.body;
    if (!address) {
      return res.status(400).json({ error: "Wallet address is required" });
    }

    // Generate core stats using heuristic engine to build the prompt context
    const passportData = analyzeWallet(address);

    let biography = "";
    try {
      const prompt = `Write a highly sophisticated, in-depth analytical dossier and narrative synthesis for a blockchain address with the on-chain moniker "${passportData.nickname}".
Based on these verified ledger statistics:
- Operating duration: ${passportData.stats.walletAgeYears} years (active since ${2026 - passportData.stats.walletAgeYears})
- Cumulative transaction signatures: ${passportData.stats.transactionsCount}
- Explored chains: ${passportData.stats.chainsCount} (specifically ${passportData.stamps.map(s => s.chain).join(', ')})
- Completed protocol milestones: ${passportData.achievements.filter(a => a.unlocked).map(a => a.title).join(', ')}
- Peak single transaction payload: ${passportData.stats.largestTxEth} ETH
- Risk profile classification: ${passportData.riskRating}
- Primary functional specialization: ${passportData.occupation} / ${passportData.identityType}

Write exactly one elegant, highly objective, analytical paragraph of 4-5 sentences. Speak in a serious, mature, authoritative, and respectful tone fitting for a premium ledger profile. Translate raw transaction logs into a cohesive narrative detailing capital allocation, protocol interaction, and network maturity. Do not use markdown formatting, lists, or emojis; return only the plain paragraph of text. Avoid cliches, marketing buzzwords, or mythical/fantasy jargon; focus on cryptographic maturity and sophisticated interaction history.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          temperature: 0.7,
        }
      });

      biography = response.text?.trim() || "";
    } catch (apiError) {
      console.error("Gemini API call failed:", apiError);
      // Premium deterministic fallback biography
      biography = `Representing an active participant in decentralized ledger ecosystems, ${passportData.nickname} established its initial on-chain presence in ${2026 - passportData.stats.walletAgeYears}. Operating primarily as a ${passportData.occupation}, this address has demonstrated structured interaction patterns across ${passportData.stats.chainsCount} independent cryptographic networks, committing a cumulative total of ${passportData.stats.transactionsCount} signed ledger entries. By systematically engaging with ${passportData.stats.contractsCount} distinct smart contract deployments, they have achieved core milestones, including ${passportData.achievements.filter(a => a.unlocked)[0]?.title || "Initial Ledger Access"}. Exhibiting the behavioral characteristics of a ${passportData.identityType}, the address prioritizes long-term capital efficiency and systematic governance participation over transient asset rotations.`;
    }

    res.json({ biography });
  } catch (err: any) {
    console.error("Biography generation error:", err);
    res.status(500).json({ error: "Internal server error generating biography" });
  }
});

// Setup Vite Dev Server / Static files handler
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
