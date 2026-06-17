export type WasteType = "organic" | "recyclable" | "hazardous";

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  points: number;
  wasteClassified: number;
  pickupsCompleted: number;
  co2SavedKg: number;
}

export interface ClassificationResult {
  type: WasteType;
  confidence: number;
  tip: string;
  pointsEarned: number;
}

export interface ClassificationLog {
  id: string;
  type: WasteType;
  confidence: number;
  createdAt: string;
}

export interface Pickup {
  id: string;
  date: string;
  time: string;
  type: string;
  address: string;
  status: "scheduled" | "in-progress" | "completed";
}

export interface RewardItem {
  id: string;
  name: string;
  cost: number;
  icon: string;
}

export interface RewardHistoryItem {
  id: string;
  action: string;
  points: number;
  date: string;
}
