import { useState } from "react"
import Modal from "./Modal"
import { apiFetch } from "../api"

export default function AddJobModal({ isOpen, onClose, onSuccess }) {
  const [form, setForm] = useState({
    company: "",
    role: "",
    location: "",
    date_posted: "",
    date_applied: "",
    salary: "",
    status: "Applied",
    notes: ""
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      // Map empty strings to null for optional date fields so backend accepts them
      const payload = { ...form }
      if (!payload.date_posted) payload.date_posted = null
      if (!payload.date_applied) payload.date_applied = null

      await apiFetch("/applications/", {
        method: "POST",
        body: JSON.stringify(payload)
      })
      
      onSuccess()
      setForm({
        company: "", role: "", location: "", date_posted: "", 
        date_applied: "", salary: "", status: "Applied", notes: ""
      })
      onClose()
    } catch (err) {
      setError(err.message || "Failed to add job application")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add New Job">
      <form style={styles.form} onSubmit={handleSubmit}>
        <div style={styles.grid}>
          {/* Company */}
          <div style={styles.field}>
            <label style={styles.label}>Company *</label>
            <input 
              name="company" 
              value={form.company} 
              onChange={handleChange} 
              style={styles.input} 
              required 
            />
          </div>
          {/* Role */}
          <div style={styles.field}>
            <label style={styles.label}>Job Position *</label>
            <input 
              name="role" 
              value={form.role} 
              onChange={handleChange} 
              style={styles.input} 
              required 
            />
          </div>
          {/* Location */}
          <div style={styles.field}>
            <label style={styles.label}>Location</label>
            <input 
              name="location" 
              value={form.location} 
              onChange={handleChange} 
              style={styles.input} 
            />
          </div>
          {/* Salary */}
          <div style={styles.field}>
            <label style={styles.label}>Salary</label>
            <input 
              name="salary" 
              value={form.salary} 
              onChange={handleChange} 
              style={styles.input} 
              placeholder="e.g. $80k - $100k"
            />
          </div>
          {/* Date Posted */}
          <div style={styles.field}>
            <label style={styles.label}>Date Posted</label>
            <input 
              type="date"
              name="date_posted" 
              value={form.date_posted} 
              onChange={handleChange} 
              style={styles.input} 
            />
          </div>
          {/* Date Applied */}
          <div style={styles.field}>
            <label style={styles.label}>Date Applied</label>
            <input 
              type="date"
              name="date_applied" 
              value={form.date_applied} 
              onChange={handleChange} 
              style={styles.input} 
            />
          </div>
          {/* Status */}
          <div style={styles.field}>
            <label style={styles.label}>Status</label>
            <select 
              name="status" 
              value={form.status} 
              onChange={handleChange} 
              style={styles.select}
            >
              <option value="Applied">Applied</option>
              <option value="Interviewing">Interviewing</option>
              <option value="Offer">Offer</option>
              <option value="Accepted">Accepted</option>
              <option value="Rejected">Rejected</option>
              <option value="Ghosted">Ghosted</option>
            </select>
          </div>
          {/* Empty spacer for grid alignment */}
          <div style={styles.field}></div>
        </div>

        {/* Notes (Full width) */}
        <div style={styles.fieldFull}>
          <label style={styles.label}>Notes</label>
          <textarea 
            name="notes" 
            value={form.notes} 
            onChange={handleChange} 
            style={styles.textarea} 
            rows={3}
          />
        </div>

        {error && <p style={styles.error}>{error}</p>}

        <div style={styles.footer}>
          <button type="button" style={styles.cancelBtn} onClick={onClose} disabled={loading}>
            Cancel
          </button>
          <button type="submit" style={styles.submitBtn} disabled={loading}>
            {loading ? "Saving..." : "Save Job"}
          </button>
        </div>
      </form>
    </Modal>
  )
}

const styles = {
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "16px",
  },
  field: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  fieldFull: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
    marginTop: "4px",
  },
  label: {
    fontSize: "13px",
    color: "#A0A4B8",
  },
  input: {
    background: "#181926",
    border: "1px solid #3A3F58",
    color: "#FFFFFF",
    padding: "8px 12px",
    borderRadius: "4px",
    fontSize: "14px",
    outline: "none",
  },
  select: {
    background: "#181926",
    border: "1px solid #3A3F58",
    color: "#FFFFFF",
    padding: "8px 12px",
    borderRadius: "4px",
    fontSize: "14px",
    outline: "none",
    appearance: "none", // simple reset
  },
  textarea: {
    background: "#181926",
    border: "1px solid #3A3F58",
    color: "#FFFFFF",
    padding: "10px 12px",
    borderRadius: "4px",
    fontSize: "14px",
    outline: "none",
    resize: "vertical",
    minHeight: "80px",
  },
  error: {
    color: "#f59696",
    fontSize: "13px",
    margin: "4px 0 0",
  },
  footer: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "12px",
    marginTop: "12px",
    paddingTop: "20px",
    borderTop: "1px solid #3A3F58",
  },
  cancelBtn: {
    background: "transparent",
    border: "1px solid #3A3F58",
    color: "#FFFFFF",
    padding: "8px 16px",
    borderRadius: "4px",
    fontSize: "14px",
    cursor: "pointer",
  },
  submitBtn: {
    background: "#6C9BDB",
    color: "#FFFFFF",
    border: "none",
    padding: "8px 24px",
    borderRadius: "4px",
    fontSize: "14px",
    cursor: "pointer",
  },
}
