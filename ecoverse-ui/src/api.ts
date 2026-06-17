import type {
  ClassificationLog,
  ClassificationResult,
  Pickup,
  RewardHistoryItem,
  RewardItem,
  UserProfile,
} from "./types";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:4000";

async function request<T>(path: string, options: RequestInit = {}, token?: string): Promise<T> {
  const headers = new Headers(options.headers || {});
  if (!headers.has("Content-Type") && !(options.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }
  const response = await fetch(`${API_BASE}${path}`, { ...options, headers });
  if (!response.ok) {
    const data = (await response.json().catch(() => ({}))) as { message?: string };
    throw new Error(data.message || "Request failed");
  }
  return (await response.json()) as T;
}

export async function register(name: string, email: string, password: string) {
  return request<{ token: string; user: UserProfile }>("/auth/register", {
    method: "POST",
    body: JSON.stringify({ name, email, password }),
  });
}

export async function login(email: string, password: string) {
  return request<{ token: string; user: UserProfile }>("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export async function me(token: string) {
  return request<UserProfile>("/me", {}, token);
}

export async function uploadImage(file: File, token: string) {
  const body = new FormData();
  body.append("image", file);
  return request<ClassificationResult>("/upload-image", { method: "POST", body }, token);
}

export async function getClassifications(token: string) {
  return request<ClassificationLog[]>("/classifications", {}, token);
}

export async function getPickups(token: string) {
  return request<Pickup[]>("/pickup", {}, token);
}

export async function createPickup(data: Omit<Pickup, "id" | "status">, token: string) {
  return request<Pickup>("/pickup", { method: "POST", body: JSON.stringify(data) }, token);
}

export async function completePickup(id: string, token: string) {
  return request<Pickup>(`/pickup/${id}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status: "completed" }),
  }, token);
}

export async function getRewards(token: string) {
  return request<{ points: number; catalog: RewardItem[]; history: RewardHistoryItem[] }>("/rewards", {}, token);
}

export async function redeemReward(rewardId: string, token: string) {
  return request<{ points: number; reward: RewardItem; ok: true }>("/rewards/redeem", {
    method: "POST",
    body: JSON.stringify({ rewardId }),
  }, token);
}

export async function getRoute(source: string, target: string, token: string) {
  return request<{
    source: string;
    target: string;
    path: string[];
    distance: number;
    fuelSavedPercent: number;
  }>(`/get-route?source=${encodeURIComponent(source)}&target=${encodeURIComponent(target)}`, {}, token);
}
