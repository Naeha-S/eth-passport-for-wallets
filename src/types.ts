export interface Stamp {
  chain: string;
  visitedYear: number;
  flag: string;
  activityCount: number;
  role: string;
}

export interface TimelineEvent {
  year: number;
  title: string;
  description: string;
  type: 'creation' | 'nft' | 'defi' | 'bridge' | 'dao' | 'contract' | 'milestone';
  icon: string;
  unlocked: boolean;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  unlocked: boolean;
  whyUnlocked: string;
  icon: string;
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary';
}

export interface WalletDNATrait {
  subject: string;
  value: number; // 0 to 100
}

export interface PersonalityTrait {
  name: string;
  percentage: number;
}

export interface WalletStats {
  walletAgeYears: number;
  transactionsCount: number;
  chainsCount: number;
  protocolsCount: number;
  contractsCount: number;
  largestTxEth: number;
  avgTxEth: number;
}

export interface HeuristicMetric {
  name: string;
  value: string | number;
  status: 'expert' | 'proficient' | 'standard';
  description: string;
}

export interface EVMProficiencyData {
  compositeScore: number;
  rank: string;
  gasOptimizationLevel: string;
  smartContractComplexity: string;
  stakingAdoption: string;
  layer2Adoption: string;
  metrics: HeuristicMetric[];
}

export interface WalletPassportData {
  address: string;
  nickname: string;
  passportNumber: string;
  occupation: string;
  identityType: string;
  riskRating: 'Low' | 'Medium' | 'High';
  activityScore: number; // 1-100
  createdDate: string;
  
  stamps: Stamp[];
  timeline: TimelineEvent[];
  achievements: Achievement[];
  dna: WalletDNATrait[];
  personality: PersonalityTrait[];
  stats: WalletStats;
  biography: string;
  proficiency: EVMProficiencyData;
}
