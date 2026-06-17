import { useEffect, useState } from "react";
import { completePickup, createPickup, getPickups } from "../api";
import { useAuth } from "../context/AuthContext";
import type { Pickup } from "../types";

export default function PickupSchedule() {
  const { token, refreshUser } = useAuth();
  const [pickups, setPickups] = useState<Pickup[]>([]);

  useEffect(() => {
    if (!token) return;
    void getPickups(token).then(setPickups);
  }, [token]);

  const add = async () => {
    if (!token) return;
    await createPickup({ date: new Date().toISOString().slice(0, 10), time: "9:00 AM", type: "Organic", address: "Sample address" }, token);
    setPickups(await getPickups(token));
  };

  const mark = async (id: string) => {
    if (!token) return;
    await completePickup(id, token);
    setPickups(await getPickups(token));
    await refreshUser();
  };

  return <div style={{ padding: "1rem" }}><h1>Pickup Schedule</h1><button onClick={() => void add()}>Add Sample Pickup</button>{pickups.map((p) => <div key={p.id}>{p.date} {p.type} {p.status} <button onClick={() => void mark(p.id)}>Complete</button></div>)}</div>;
}
