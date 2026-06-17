import { useEffect, useState } from "react";
import { getRewards, redeemReward } from "../api";
import { useAuth } from "../context/AuthContext";
import type { RewardHistoryItem, RewardItem } from "../types";

export default function Rewards() {
  const { token, refreshUser } = useAuth();
  const [points, setPoints] = useState(0);
  const [catalog, setCatalog] = useState<RewardItem[]>([]);
  const [history, setHistory] = useState<RewardHistoryItem[]>([]);

  useEffect(() => {
    if (!token) return;
    void getRewards(token).then((data) => {
      setPoints(data.points);
      setCatalog(data.catalog);
      setHistory(data.history);
    });
  }, [token]);

  const redeem = async (id: string) => {
    if (!token) return;
    const result = await redeemReward(id, token);
    setPoints(result.points);
    await refreshUser();
  };

  return <div style={{ padding: "1rem" }}><h1>Rewards</h1><p>Points: {points}</p>{catalog.map((r) => <div key={r.id}>{r.name} ({r.cost}) <button disabled={points < r.cost} onClick={() => void redeem(r.id)}>Redeem</button></div>)}{history.map((h) => <div key={h.id}>{h.action} {h.points}</div>)}</div>;
}
