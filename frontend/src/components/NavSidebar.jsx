import { ArrowLeft, LayoutDashboard, BarChart3, Settings } from 'lucide-react'
import { useNavigate } from "react-router-dom"

export default function NavSidebar({ isOpen, onClose }) {
  const navigate = useNavigate()

  return (
    <div style={{
      ...styles.sidebar,
      width: isOpen ? "240px" : "0px",
    }}>
      <div style={styles.innerContainer}>
        {/* Header */}
      <div style={styles.header}>
        <span style={styles.logo}>Trackr</span>
        <button 
          style={styles.backBtn} 
          onClick={onClose}
          onMouseEnter={e => e.currentTarget.style.color = '#6C9BDB'}
          onMouseLeave={e => e.currentTarget.style.color = '#FFFFFF'}
        >
          <ArrowLeft size={18} />
        </button>
      </div>

      {/* Nav Links */}
      <div style={styles.navLinks}>
        <button 
          style={{
            ...styles.navItem, 
            ...(window.location.pathname === '/dashboard' ? styles.navItemActive : {})
          }}
          onClick={() => navigate('/dashboard')}
        >
          Job Tracker
        </button>
        <button 
          style={styles.navItem}
          onMouseEnter={e => {
            e.currentTarget.style.color = '#FFFFFF'
            e.currentTarget.style.background = 'rgba(255,255,255,0.03)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.color = '#A0A4B8'
            e.currentTarget.style.background = 'transparent'
          }}
        >
          Analytics
        </button>
      </div>

      {/* Footer / Account */}
      <div style={styles.footer}>
        <div 
          style={{
            ...styles.accountItem,
            ...(window.location.pathname === '/account' ? styles.accountItemActive : {})
          }}
          onClick={() => navigate('/account')}
          onMouseEnter={e => window.location.pathname !== '/account' && (e.currentTarget.style.opacity = '0.7')}
          onMouseLeave={e => window.location.pathname !== '/account' && (e.currentTarget.style.opacity = '1')}
        >
          <div style={styles.avatar}></div>
          <span style={styles.accountText}>Account</span>
        </div>
      </div>
      </div>
    </div>
  )
}

const styles = {
  sidebar: {
    height: "100vh",
    background: "#181926",
    borderRight: "1px solid #3A3F58",
    color: "#FFFFFF",
    display: "flex",
    flexDirection: "column",
    position: "fixed",
    left: 0,
    top: 0,
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    zIndex: 100,
    overflow: "hidden",
    transition: "width 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  },
  innerContainer: {
    width: "240px", // Maintains layout while outer container shrinks
    height: "100%",
    display: "flex",
    flexDirection: "column",
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
    transition: "color 0.2s ease",
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
    transition: "all 0.2s ease",
    padding: "8px 12px",
    borderRadius: "6px",
    marginLeft: "-12px", // offset padding to align with text above
  },
  accountItemActive: {
    background: "rgba(108, 155, 219, 0.1)",
    borderRight: "3px solid #6C9BDB",
    opacity: 1,
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
