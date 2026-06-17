import { useState } from "react";
import { getRoute } from "../api";
import { useAuth } from "../context/AuthContext";

export default function RouteOptimization() {
  const { token } = useAuth();
  const [path, setPath] = useState<string[]>([]);

  const run = async () => {
    if (!token) return;
    const data = await getRoute("DEPOT", "C", token);
    setPath(data.path);
  };

  return <div style={{ padding: "1rem" }}><h1>Route Optimization</h1><button onClick={() => void run()}>Run Dijkstra</button><p>{path.join(" -> ")}</p></div>;
}
