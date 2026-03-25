import { X } from "lucide-react"

export default function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div 
        style={styles.modal} 
        onClick={e => e.stopPropagation()} // Prevent clicking inside modal from closing it
      >
        <div style={styles.header}>
          <h2 style={styles.title}>{title}</h2>
          <button style={styles.closeBtn} onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        <div style={styles.content}>
          {children}
        </div>
      </div>
    </div>
  )
}

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(0, 0, 0, 0.6)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
    animation: "fadeIn 0.2s ease",
  },
  modal: {
    background: "#1c1b2e",
    border: "1px solid #3A3F58",
    borderRadius: "12px",
    width: "100%",
    maxWidth: "500px",
    boxShadow: "0 10px 40px rgba(0,0,0,0.5)",
    display: "flex",
    flexDirection: "column",
    animation: "slideUp 0.2s ease",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "20px 24px",
    borderBottom: "1px solid #3A3F58",
  },
  title: {
    margin: 0,
    color: "#FFFFFF",
    fontSize: "18px",
    fontWeight: "500",
  },
  closeBtn: {
    background: "none",
    border: "none",
    color: "#A0A4B8",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "4px",
    transition: "color 0.2s ease",
  },
  content: {
    padding: "24px",
  }
}
