import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "./AuthContext"
import { apiFetch } from "./api"

export default function LoginPage() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [form, setForm] = useState({ email: "", password: "" })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async e => {
    e.preventDefault()
    setError("")
    setLoading(true)
    try {
      const data = await apiFetch("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email: form.email, password: form.password }),
      })
      login(data.access_token)
      navigate("/dashboard")
    } catch (err) {
      setError(err.message || "Invalid email or password")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={styles.page}>
      <div 
        style={{
          ...styles.card,
          opacity: mounted ? 1 : 0,
          transform: mounted ? "translateY(0)" : "translateY(20px)",
        }}
      >

        {/* Header */}
        <div style={styles.header}>
          <button onClick={() => navigate("/")} style={styles.backBtn}>←</button>
          <span style={styles.logo}>Trackr</span>
        </div>

        {/* Form */}
        <form style={styles.form} onSubmit={handleSubmit}>
          <div style={styles.field}>
            <label style={styles.label}>Email:</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              style={styles.input}
              onFocus={e => e.target.style.outline = "1.5px solid #6c63e0"}
              onBlur={e => e.target.style.outline = "none"}
              required
            />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Password:</label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              style={styles.input}
              onFocus={e => e.target.style.outline = "1.5px solid #6c63e0"}
              onBlur={e => e.target.style.outline = "none"}
              required
            />
          </div>

          {error && <p style={styles.errorText}>{error}</p>}

          <button
            type="submit"
            style={{ ...styles.submitBtn, opacity: loading ? 0.7 : 1 }}
            disabled={loading}
            onMouseEnter={e => { if (!loading) e.target.style.background = "#3a5a96" }}
            onMouseLeave={e => { if (!loading) e.target.style.background = "#4a6fa5" }}
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>

        {/* Footer */}
        <p style={styles.switchText}>
          Don't have an account?{" "}
          <span onClick={() => navigate("/signup")} style={styles.link}>
            Create account
          </span>
        </p>

      </div>
    </div>
  )
}

const styles = {
  page: {
    background: "#13121f",
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'Georgia', serif",
  },
  card: {
    background: "#1c1b2e",
    borderRadius: "24px",
    padding: "2.5rem",
    width: "100%",
    maxWidth: "440px",
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",
    boxShadow: "0 10px 40px rgba(0,0,0,0.2)",
    transition: "opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    marginBottom: "0.5rem",
  },
  backBtn: {
    position: "absolute",
    left: 0,
    background: "none",
    border: "none",
    color: "#f0eff8",
    fontSize: "20px",
    cursor: "pointer",
    padding: "0",
    lineHeight: 1,
  },
  logo: {
    fontSize: "24px",
    fontWeight: "400",
    color: "#f0eff8",
    letterSpacing: "0.02em",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  field: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  label: {
    fontSize: "14px",
    color: "rgba(240,239,248,0.75)",
  },
  input: {
    background: "#e2e0da",
    border: "none",
    borderRadius: "8px",
    padding: "0.75rem 1rem",
    fontSize: "14px",
    color: "#1a1a2e",
    outline: "none",
    transition: "all 0.2s ease",
    boxShadow: "0 0 0 0px rgba(108, 99, 224, 0)",
  },
  errorText: {
    color: "#e07a7a",
    fontSize: "13px",
    margin: 0,
    textAlign: "center",
  },
  submitBtn: {
    background: "#4a6fa5",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    padding: "0.85rem",
    fontSize: "15px",
    fontFamily: "'Georgia', serif",
    cursor: "pointer",
    marginTop: "0.5rem",
    transition: "all 0.2s ease",
    boxShadow: "0 4px 12px rgba(74, 111, 165, 0.2)",
  },
  switchText: {
    textAlign: "center",
    fontSize: "13px",
    color: "rgba(240,239,248,0.5)",
    margin: 0,
    marginTop: "1rem",
  },
  link: {
    color: "#7aa3d4",
    cursor: "pointer",
    textDecoration: "underline",
  },
}