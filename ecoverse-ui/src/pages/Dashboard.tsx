import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();
  if (!user) {
    return null;
  }
  const stats = [
    { label: "Waste Classified", value: String(user.wasteClassified), unit: "total", color: "var(--color-organic)" },
    { label: "Reward Points", value: user.points.toLocaleString(), unit: "points", color: "var(--color-recyclable)" },
    { label: "Pickups Completed", value: String(user.pickupsCompleted), unit: "total", color: "var(--color-leaf)" },
    { label: "CO2 Saved", value: Number(user.co2SavedKg ?? 0).toFixed(1), unit: "kg", color: "var(--color-earth)" },
  ];

  const quickActions = [
    { to: "/classify", label: "Classify Waste", desc: "Upload image and get AI classification", icon: "◇" },
    { to: "/pickup", label: "Schedule Pickup", desc: "Book a waste collection", icon: "▷" },
    { to: "/rewards", label: "View Rewards", desc: "Check your eco-points", icon: "★" },
  ];

  return (
    <div>
      <section style={styles.hero}>
        <div style={styles.welcomeCard}>
          <h1 style={styles.title}>Welcome back, {user.name}! 👋</h1>
          <p style={styles.subtitle}>
            EcoVerse helps you segregate waste correctly and make cities cleaner.
          </p>
        </div>
      </section>

      <section style={styles.statsGrid}>
        {stats.map((stat) => (
          <div key={stat.label} style={styles.statCard}>
            <span style={{ ...styles.statValue, color: stat.color }}>{stat.value}</span>
            <span style={styles.statUnit}>{stat.unit}</span>
            <span style={styles.statLabel}>{stat.label}</span>
          </div>
        ))}
      </section>

      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Quick Actions</h2>
        <div style={styles.actionsGrid}>
          {quickActions.map((action) => (
            <Link key={action.to} to={action.to} style={styles.actionCard}>
              <span style={styles.actionIcon}>{action.icon}</span>
              <h3 style={styles.actionLabel}>{action.label}</h3>
              <p style={styles.actionDesc}>{action.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      <section style={styles.infoCard}>
        <h3 style={styles.infoTitle}>How EcoVerse Works</h3>
        <ul style={styles.infoList}>
          <li>
            <strong>AI Classification</strong> — Upload a photo of waste to classify as Organic, Recyclable, or Hazardous.
          </li>
          <li>
            <strong>Smart Pickups</strong> — Schedule collection and track status in real time.
          </li>
          <li>
            <strong>Earn Rewards</strong> — Get points for proper segregation and redeem for benefits.
          </li>
          <li>
            <strong>Optimized Routes</strong> — Municipal trucks use efficient routes to save fuel and time.
          </li>
        </ul>
      </section>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  hero: {
    marginBottom: '2rem',
  },
  welcomeCard: {
    background: 'white',
    padding: '2rem',
    borderRadius: 'var(--radius-md)',
    boxShadow: 'var(--shadow-soft)',
    borderLeft: '4px solid var(--color-leaf)',
  },
  title: {
    fontSize: '2rem',
    marginBottom: '0.5rem',
    color: 'var(--color-text)',
  },
  subtitle: {
    color: 'var(--color-text-muted)',
    fontSize: '1.1rem',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
    gap: '1rem',
    marginBottom: '2rem',
  },
  statCard: {
    background: 'white',
    padding: '1.5rem',
    borderRadius: 'var(--radius-md)',
    boxShadow: 'var(--shadow-soft)',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.25rem',
  },
  statValue: {
    fontSize: '1.75rem',
    fontWeight: 700,
  },
  statUnit: {
    fontSize: '0.85rem',
    color: 'var(--color-text-muted)',
  },
  statLabel: {
    fontSize: '0.9rem',
    color: 'var(--color-text-muted)',
    marginTop: '0.25rem',
  },
  section: {
    marginBottom: '2rem',
  },
  sectionTitle: {
    marginBottom: '1rem',
    fontSize: '1.25rem',
  },
  actionsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: '1rem',
  },
  actionCard: {
    background: 'white',
    padding: '1.5rem',
    borderRadius: 'var(--radius-md)',
    boxShadow: 'var(--shadow-soft)',
    border: '2px solid transparent',
    transition: 'all 0.2s',
    textDecoration: 'none',
    color: 'inherit',
    display: 'block',
  },
  actionIcon: {
    fontSize: '1.5rem',
    color: 'var(--color-leaf)',
    display: 'block',
    marginBottom: '0.5rem',
  },
  actionLabel: {
    fontSize: '1.1rem',
    marginBottom: '0.25rem',
  },
  actionDesc: {
    fontSize: '0.9rem',
    color: 'var(--color-text-muted)',
  },
  infoCard: {
    background: 'linear-gradient(135deg, var(--color-leaf) 0%, var(--color-leaf-dark) 100%)',
    color: 'white',
    padding: '2rem',
    borderRadius: 'var(--radius-lg)',
  },
  infoTitle: {
    marginBottom: '1rem',
  },
  infoList: {
    listStyle: 'none',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
  },
}
