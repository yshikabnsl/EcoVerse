import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Layout() {
  const { user, signOut } = useAuth();
  const navItems = [
    { to: "/", label: "Dashboard", icon: "◈" },
    { to: "/classify", label: "Classify Waste", icon: "◇" },
    { to: "/pickup", label: "Schedule Pickup", icon: "▷" },
    { to: "/rewards", label: "Rewards", icon: "★" },
    { to: "/routes", label: "Route Map", icon: "◐" },
  ];

  return (
    <div style={styles.wrapper}>
      <header style={styles.header}>
        <div style={styles.headerLeft}>
          <div style={styles.logo}>
            <span style={styles.logoIcon}>🌿</span>
            <span style={styles.logoText}>EcoVerse</span>
          </div>
          <span style={styles.welcomeMsg}>Welcome back, {user?.name ?? "Citizen"}! 👋</span>
        </div>
        <nav className="ecoverse-nav" style={styles.nav}>
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              style={({ isActive }) =>
                isActive ? { ...styles.navLink, ...styles.navLinkActive } : styles.navLink
              }
            >
              <span style={styles.navIcon}>{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
          <button onClick={signOut} style={styles.logoutBtn}>
            Logout
          </button>
        </nav>
      </header>

      <main style={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  wrapper: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    background: 'linear-gradient(135deg, var(--color-leaf-dark) 0%, var(--color-leaf) 100%)',
    color: 'white',
    padding: '1rem 2rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    boxShadow: 'var(--shadow-soft)',
  },
  headerLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '1.5rem',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  welcomeMsg: {
    fontSize: '1.1rem',
    fontWeight: 500,
    opacity: 0.95,
  },
  logoIcon: {
    fontSize: '1.75rem',
  },
  logoText: {
    fontFamily: "'Space Grotesk', sans-serif",
    fontWeight: 700,
    fontSize: '1.5rem',
    letterSpacing: '-0.02em',
  },
  nav: {
    display: 'flex',
    gap: '0.25rem',
  },
  navLink: {
    color: 'rgba(255,255,255,0.85)',
    padding: '0.5rem 1rem',
    borderRadius: 'var(--radius-sm)',
    display: 'flex',
    alignItems: 'center',
    gap: '0.4rem',
    fontSize: '0.9rem',
    transition: 'all 0.2s',
    textDecoration: 'none',
  },
  navLinkActive: {
    background: 'rgba(255,255,255,0.2)',
    color: 'white',
  },
  navIcon: {
    fontSize: "0.75rem",
    opacity: 0.9,
  },
  logoutBtn: {
    border: "1px solid rgba(255,255,255,0.35)",
    background: "transparent",
    color: "white",
    borderRadius: "var(--radius-sm)",
    padding: "0.4rem 0.8rem",
  },
  main: {
    flex: 1,
    padding: '2rem',
    maxWidth: '1400px',
    margin: '0 auto',
    width: '100%',
  },
}
