import { useState } from "react";
import { getClassifications, uploadImage } from "../api";
import { useAuth } from "../context/AuthContext";
import type { ClassificationLog, ClassificationResult } from "../types";

export default function WasteClassifier() {
  const { token, refreshUser } = useAuth();
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<ClassificationResult | null>(null);
  const [history, setHistory] = useState<ClassificationLog[]>([]);

  const loadHistory = async () => {
    if (!token) return;
    setHistory(await getClassifications(token));
  };

  const classify = async () => {
    if (!token || !file) return;
    const data = await uploadImage(file, token);
    setResult(data);
    await loadHistory();
    await refreshUser();
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h1>AI Waste Classification</h1>
      <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
      <button onClick={() => void classify()}>Classify</button>
      {result && <p>{result.type} ({result.confidence}%)</p>}
      {history.map((item) => <div key={item.id}>{item.type} {item.confidence}%</div>)}
    </div>
  );
}
