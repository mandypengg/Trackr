import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function SignupPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" })

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  return (
    <div style={styles.page}>
      <div style={styles.card}>

        {/* Header */}
        <div style={styles.header}>
          <button onClick={() => navigate("/")} style={styles.backBtn}>←</button>
          <span style={styles.logo}>Trackr</span>
        </div>

        {/* Form */}
        <div style={styles.form}>
          <div style={styles.field}>
            <label style={styles.label}>Name:</label>
            <input
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              style={styles.input}
              onFocus={e => e.target.style.outline = "1.5px solid #6c63e0"}
              onBlur={e => e.target.style.outline = "none"}
            />
          </div>

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
            />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Confirm Password:</label>
            <input
              name="confirmPassword"
              type="password"
              value={form.confirmPassword}
              onChange={handleChange}
              style={styles.input}
              onFocus={e => e.target.style.outline = "1.5px solid #6c63e0"}
              onBlur={e => e.target.style.outline = "none"}
            />
          </div>

          <button
            style={styles.submitBtn}
            onMouseEnter={e => e.target.style.background = "#3a5a96"}
            onMouseLeave={e => e.target.style.background = "#4a6fa5"}
          >
            Sign up
          </button>
        </div>

        {/* Footer */}
        <p style={styles.switchText}>
          Already have an account?{" "}
          <span onClick={() => navigate("/login")} style={styles.link}>
            Sign in
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
    transition: "outline 0.15s ease",
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
    transition: "background 0.2s ease",
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