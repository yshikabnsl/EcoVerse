import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { user, signIn, signUp } = useAuth();
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (user) {
    return <Navigate to="/" replace />;
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (isRegister) {
        await signUp(name, email, password);
      } else {
        await signIn(email, password);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.wrapper}>
      <form onSubmit={submit} style={styles.card}>
        <h1 style={styles.title}>EcoVerse</h1>
        <p style={styles.subtitle}>{isRegister ? "Create account" : "Login to your account"}</p>
        {isRegister && (
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full name"
            style={styles.input}
            required
          />
        )}
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          type="email"
          style={styles.input}
          required
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          type="password"
          style={styles.input}
          required
        />
        {error && <p style={styles.error}>{error}</p>}
        <button style={styles.button} disabled={loading}>
          {loading ? "Please wait..." : isRegister ? "Register" : "Login"}
        </button>
        <button
          type="button"
          style={styles.switchButton}
          onClick={() => setIsRegister((value) => !value)}
        >
          {isRegister ? "Have an account? Login" : "New user? Register"}
        </button>
      </form>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  wrapper: {
    minHeight: "100vh",
    display: "grid",
    placeItems: "center",
    padding: "1rem",
    background: "var(--color-cream)",
  },
  card: {
    width: "100%",
    maxWidth: 440,
    background: "white",
    borderRadius: "var(--radius-lg)",
    boxShadow: "var(--shadow-card)",
    padding: "2rem",
    display: "flex",
    flexDirection: "column",
    gap: "0.8rem",
  },
  title: { fontSize: "2rem", color: "var(--color-leaf)" },
  subtitle: { marginBottom: "0.3rem", color: "var(--color-text-muted)" },
  input: {
    width: "100%",
    padding: "0.8rem",
    border: "1px solid #ddd",
    borderRadius: "var(--radius-sm)",
  },
  error: { color: "var(--color-hazard)", fontSize: "0.9rem" },
  button: {
    marginTop: "0.3rem",
    padding: "0.8rem",
    borderRadius: "var(--radius-sm)",
    border: "none",
    color: "white",
    background: "var(--color-leaf)",
    fontWeight: 600,
  },
  switchButton: {
    border: "none",
    background: "transparent",
    color: "var(--color-recyclable)",
    padding: "0.3rem",
  },
};
