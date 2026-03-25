import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "./AuthContext"
import { apiFetch } from "./api"
import NavSidebar from "./components/NavSidebar"

export default function AccountPage() {
  const { token, logout } = useAuth()
  const navigate = useNavigate()
  
  const [sidebarOpen, setSidebarOpen] = useState(true)
  
  // Member Information
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [infoSaving, setInfoSaving] = useState(false)
  const [infoMessage, setInfoMessage] = useState("")

  // Password
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [passSaving, setPassSaving] = useState(false)
  const [passMessage, setPassMessage] = useState("")
  const [passError, setPassError] = useState("")

  useEffect(() => {
    if (!token) {
      navigate("/login")
      return
    }
    
    // Fetch current user details
    apiFetch("/auth/me")
      .then(data => {
        const names = data.name ? data.name.split(" ") : ["", ""]
        setFirstName(names[0] || "")
        setLastName(names.slice(1).join(" ") || "")
        setEmail(data.email || "")
      })
      .catch(err => {
        console.error("Failed to load user info", err)
      })
  }, [token, navigate])

  const handleSaveInfo = async () => {
    setInfoSaving(true)
    setInfoMessage("")
    try {
      const updatedName = [firstName.trim(), lastName.trim()].filter(Boolean).join(" ")
      await apiFetch("/auth/me", {
        method: "PUT",
        body: JSON.stringify({ name: updatedName, email })
      })
      setInfoMessage("Information saved successfully!")
    } catch (err) {
      setInfoMessage(err.message || "Failed to save information")
    } finally {
      setInfoSaving(false)
    }
  }

  const handleSavePassword = async () => {
    setPassError("")
    setPassMessage("")
    
    if (!newPassword || newPassword.length < 6) {
      setPassError("Password must be at least 6 characters")
      return
    }
    if (newPassword !== confirmPassword) {
      setPassError("Passwords do not match")
      return
    }

    setPassSaving(true)
    try {
      await apiFetch("/auth/password", {
        method: "PUT",
        body: JSON.stringify({ new_password: newPassword })
      })
      setPassMessage("Password updated successfully!")
      setNewPassword("")
      setConfirmPassword("")
    } catch (err) {
      setPassError(err.message || "Failed to update password")
    } finally {
      setPassSaving(false)
    }
  }

  const handleDeleteAccount = async () => {
    const isConfirmed = window.confirm("Are you SURE you want to delete your account? This action cannot be undone and all your job tracking data will be permanently erased.")
    if (!isConfirmed) return

    try {
      await apiFetch("/auth/me", { method: "DELETE" })
      logout()
      navigate("/")
    } catch (err) {
      alert(err.message || "Failed to delete account")
    }
  }

  return (
    <div style={styles.layout}>
      <NavSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(!sidebarOpen)} />
      
      <div style={{...styles.mainContent, marginLeft: sidebarOpen ? "240px" : "0"}}>
        <div style={styles.header}>
          {!sidebarOpen && (
            <button style={styles.menuBtn} onClick={() => setSidebarOpen(true)}>
              <span style={styles.hamburger}></span>
              <span style={styles.hamburger}></span>
              <span style={styles.hamburger}></span>
            </button>
          )}
          <h1 style={styles.pageTitle}>Account Settings</h1>
        </div>

        <div style={styles.content}>
          {/* Member Information Section */}
          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>Member Information</h2>
            
            <div style={styles.row}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>First Name</label>
                <input 
                  style={styles.input}
                  value={firstName}
                  onChange={e => setFirstName(e.target.value)}
                />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Last Name</label>
                <input 
                  style={styles.input}
                  value={lastName}
                  onChange={e => setLastName(e.target.value)}
                />
              </div>
            </div>

            <div style={styles.inputGroupFull}>
              <label style={styles.label}>Email</label>
              <input 
                style={styles.input}
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>

            <div style={styles.actions}>
              <button 
                style={styles.primaryBtn} 
                onClick={handleSaveInfo}
                disabled={infoSaving}
              >
                {infoSaving ? "Saving..." : "Save"}
              </button>
              <button 
                style={styles.outlineBtn}
                onClick={() => {
                  logout()
                  navigate("/login")
                }}
              >
                Logout
              </button>
              {infoMessage && <span style={styles.successText}>{infoMessage}</span>}
            </div>
          </section>

          {/* Divider */}
          <div style={styles.divider}></div>

          {/* Change Password Section */}
          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>Change Password</h2>
            
            <div style={styles.row}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>New Password</label>
                <input 
                  style={styles.input}
                  type="password"
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Confirm Password</label>
                <input 
                  style={styles.input}
                  type="password"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                />
              </div>
            </div>

            <div style={styles.actions}>
              <button 
                style={styles.primaryBtn} 
                onClick={handleSavePassword}
                disabled={passSaving}
              >
                {passSaving ? "Saving..." : "Save"}
              </button>
              {passError && <span style={styles.errorText}>{passError}</span>}
              {passMessage && <span style={styles.successText}>{passMessage}</span>}
            </div>
          </section>

          {/* Divider */}
          <div style={styles.divider}></div>

          {/* Delete Account Section */}
          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>Delete Account</h2>
            <p style={styles.subText}>To cancel your Trackr account and delete all your career data just click the button below.</p>
            
            <button style={styles.dangerBtn} onClick={handleDeleteAccount}>
              Delete My Account
            </button>
          </section>
        </div>
      </div>
    </div>
  )
}

const styles = {
  layout: {
    display: "flex",
    width: "100%",
    height: "100vh",
    background: "#12131C",
    color: "#FFFFFF",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
  },
  mainContent: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    transition: "margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    height: "100vh",
    overflowY: "auto",
  },
  header: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    padding: "24px 32px",
    borderBottom: "1px solid #3A3F58",
    background: "#181926",
    position: "sticky",
    top: 0,
    zIndex: 10,
  },
  menuBtn: {
    background: "transparent",
    border: "none",
    padding: "8px 12px 8px 0",
    borderRight: "1px solid #3A3F58",
    marginRight: "8px",
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },
  hamburger: {
    width: "16px",
    height: "2px",
    background: "#A0A4B8",
    borderRadius: "1px",
  },
  pageTitle: {
    margin: 0,
    fontSize: "20px",
    fontWeight: "600",
  },
  content: {
    maxWidth: "800px",
    padding: "40px 32px",
    display: "flex",
    flexDirection: "column",
    gap: "40px",
  },
  section: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  sectionTitle: {
    margin: 0,
    fontSize: "18px",
    fontWeight: "600",
    color: "#e2e8f0",
  },
  row: {
    display: "flex",
    gap: "24px",
    width: "100%",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    flex: 1,
  },
  inputGroupFull: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    width: "100%",
    maxWidth: "400px",
  },
  label: {
    fontSize: "13px",
    color: "#94a3b8",
    fontWeight: "500",
  },
  input: {
    background: "#181926",
    border: "1px solid #3A3F58",
    borderRadius: "6px",
    padding: "10px 14px",
    color: "#FFFFFF",
    fontSize: "14px",
    outline: "none",
    transition: "border-color 0.2s",
  },
  actions: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    marginTop: "8px",
  },
  primaryBtn: {
    background: "#2a625a",
    color: "#FFFFFF",
    border: "none",
    padding: "8px 24px",
    borderRadius: "4px",
    fontSize: "14px",
    fontWeight: "500",
    cursor: "pointer",
    transition: "background 0.2s",
  },
  outlineBtn: {
    background: "transparent",
    color: "#2a625a",
    border: "1px solid #2a625a",
    padding: "8px 24px",
    borderRadius: "4px",
    fontSize: "14px",
    fontWeight: "500",
    cursor: "pointer",
    transition: "background 0.2s",
  },
  dangerBtn: {
    background: "transparent",
    color: "#ef4444",
    border: "1px solid #ef4444",
    padding: "8px 24px",
    borderRadius: "4px",
    fontSize: "14px",
    fontWeight: "500",
    cursor: "pointer",
    width: "fit-content",
    transition: "background 0.2s",
  },
  successText: {
    color: "#4ade80",
    fontSize: "13px",
  },
  errorText: {
    color: "#f87171",
    fontSize: "13px",
  },
  divider: {
    height: "1px",
    background: "#3A3F58",
    width: "100%",
  },
  subText: {
    margin: 0,
    fontSize: "14px",
    color: "#94a3b8",
    marginBottom: "8px",
  }
}
