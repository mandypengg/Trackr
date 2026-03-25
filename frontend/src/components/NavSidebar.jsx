import { ArrowLeft, LayoutDashboard, BarChart3, Settings } from 'lucide-react'
import { useNavigate } from "react-router-dom"

export default function NavSidebar() {
  const navigate = useNavigate()

  return (
    <div style={styles.sidebar}>
      {/* Header */}
      <div style={styles.header}>
        <span style={styles.logo}>Trackr</span>
        <button style={styles.backBtn} onClick={() => navigate("/")}>
          <ArrowLeft size={18} />
        </button>
      </div>

      {/* Nav Links */}
      <div style={styles.navLinks}>
        <button style={{...styles.navItem, ...styles.navItemActive}}>
          Job Tracker
        </button>
        <button style={styles.navItem}>
          Analytics
        </button>
      </div>

      {/* Footer / Account */}
      <div style={styles.footer}>
        <div style={styles.accountItem}>
          <div style={styles.avatar}></div>
          <span style={styles.accountText}>Account</span>
        </div>
      </div>
    </div>
  )
}

const styles = {
  sidebar: {
    width: "240px",
    background: "#1E1F2E",
    borderRight: "1px solid #3A3F58",
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    position: "fixed",
    left: 0,
    top: 0,
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "20px 24px",
    borderBottom: "1px solid #3A3F58",
  },
  logo: {
    color: "#FFFFFF",
    fontSize: "16px",
    fontWeight: "500",
  },
  backBtn: {
    background: "none",
    border: "none",
    color: "#FFFFFF",
    cursor: "pointer",
    padding: "4px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  navLinks: {
    padding: "24px 0",
    display: "flex",
    flexDirection: "column",
    flex: 1,
  },
  navItem: {
    background: "none",
    border: "none",
    color: "#A0A4B8",
    padding: "12px 24px",
    textAlign: "left",
    fontSize: "14px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    transition: "all 0.2s ease",
  },
  navItemActive: {
    color: "#FFFFFF",
    borderLeft: "3px solid #6C9BDB",
    background: "rgba(108, 155, 219, 0.1)",
    paddingLeft: "21px", // Adjust for border
  },
  footer: {
    padding: "24px",
    borderTop: "1px solid #3A3F58",
  },
  accountItem: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    cursor: "pointer",
  },
  avatar: {
    width: "24px",
    height: "24px",
    borderRadius: "50%",
    background: "#FFFFFF",
  },
  accountText: {
    color: "#FFFFFF",
    fontSize: "14px",
  },
}
