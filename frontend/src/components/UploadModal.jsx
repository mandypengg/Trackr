import { useState, useRef } from "react"
import Modal from "./Modal"
import { UploadCloud, FileSpreadsheet, AlertCircle, Loader2 } from "lucide-react"
import { apiFetch } from "../api"
import { useAuth } from "../AuthContext"

export default function UploadModal({ isOpen, onClose, onSuccess }) {
  const [isDragging, setIsDragging] = useState(false)
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [successMsg, setSuccessMsg] = useState("")
  
  const fileInputRef = useRef(null)
  const { token } = useAuth()

  // Reset state when modal closes
  const handleClose = () => {
    setFile(null)
    setError("")
    setSuccessMsg("")
    onClose()
  }

  const validateFile = (f) => {
    if (!f) return false
    const validTypes = [
      "text/csv", 
      "application/vnd.ms-excel", 
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ]
    const validExtensions = [".csv", ".xlsx"]
    
    if (validTypes.includes(f.type) || validExtensions.some(ext => f.name.toLowerCase().endsWith(ext))) {
      return true
    }
    setError("Please upload a .csv or .xlsx file")
    return false
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    setError("")
    
    const droppedFile = e.dataTransfer.files[0]
    if (validateFile(droppedFile)) {
      setFile(droppedFile)
    }
  }

  const handleFileSelect = (e) => {
    setError("")
    const selectedFile = e.target.files[0]
    if (validateFile(selectedFile)) {
      setFile(selectedFile)
    }
  }

  const handleUpload = async () => {
    if (!file) return
    setLoading(true)
    setError("")
    
    const formData = new FormData()
    formData.append("file", file)

    try {
      // Direct fetch to handle FormData (apiFetch assumes JSON)
      const res = await fetch("http://localhost:8000/applications/upload", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`
        },
        body: formData
      })
      
      const data = await res.json()
      
      if (!res.ok) {
        throw new Error(data.detail || "Upload failed")
      }
      
      setSuccessMsg(data.message)
      setTimeout(() => {
        onSuccess()
        handleClose()
      }, 1500)
      
    } catch (err) {
      setError(err.message || "An error occurred during upload")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Upload Spreadsheet">
      <div style={styles.container}>
        {!successMsg ? (
          <>
            <div 
              style={{
                ...styles.dropZone,
                borderColor: isDragging ? "#6C9BDB" : "#3A3F58",
                background: isDragging ? "rgba(108,155,219,0.05)" : "transparent"
              }}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <input 
                type="file" 
                ref={fileInputRef}
                onChange={handleFileSelect}
                accept=".csv, .xlsx"
                style={{ display: "none" }}
              />
              
              {file ? (
                <div style={styles.fileInfo}>
                  <FileSpreadsheet size={32} color="#6C9BDB" />
                  <span style={styles.fileName}>{file.name}</span>
                  <span style={styles.fileSize}>{(file.size / 1024).toFixed(1)} KB</span>
                </div>
              ) : (
                <div style={styles.prompt}>
                  <UploadCloud size={32} color="#A0A4B8" style={{ marginBottom: "12px" }} />
                  <p style={styles.promptText}>Drag & drop your file here</p>
                  <p style={styles.promptSub}>or click to browse</p>
                  <p style={styles.promptHint}>Supports .csv and .xlsx</p>
                </div>
              )}
            </div>

            {error && (
              <div style={styles.error}>
                <AlertCircle size={14} />
                <span>{error}</span>
              </div>
            )}

            <div style={styles.footer}>
              <button 
                style={styles.cancelBtn} 
                onClick={handleClose}
                disabled={loading}
              >
                Cancel
              </button>
              <button 
                style={{
                  ...styles.submitBtn,
                  opacity: (!file || loading) ? 0.5 : 1,
                  cursor: (!file || loading) ? "not-allowed" : "pointer"
                }} 
                onClick={handleUpload}
                disabled={!file || loading}
              >
                {loading ? <Loader2 size={16} className="lucide-spin" style={styles.spin} /> : "Upload"}
              </button>
            </div>
          </>
        ) : (
          <div style={styles.successState}>
            <div style={styles.successIcon}>✓</div>
            <p style={styles.successText}>{successMsg}</p>
          </div>
        )}
      </div>
    </Modal>
  )
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  dropZone: {
    border: "2px dashed #3A3F58",
    borderRadius: "8px",
    padding: "40px 20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    transition: "all 0.2s ease",
  },
  prompt: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  promptText: {
    margin: "0 0 4px",
    color: "#FFFFFF",
    fontSize: "15px",
    fontWeight: "500",
  },
  promptSub: {
    margin: "0 0 12px",
    color: "#A0A4B8",
    fontSize: "14px",
  },
  promptHint: {
    margin: 0,
    color: "rgba(160, 164, 184, 0.6)",
    fontSize: "12px",
  },
  fileInfo: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "8px",
  },
  fileName: {
    color: "#FFFFFF",
    fontSize: "14px",
    fontWeight: "500",
    textAlign: "center",
    wordBreak: "break-all",
  },
  fileSize: {
    color: "#A0A4B8",
    fontSize: "12px",
  },
  error: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    color: "#f59696",
    fontSize: "13px",
  },
  footer: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "12px",
    marginTop: "8px",
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
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  spin: {
    animation: "spin 1s linear infinite",
  },
  successState: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px 0",
    gap: "16px",
  },
  successIcon: {
    width: "48px",
    height: "48px",
    borderRadius: "50%",
    background: "rgba(74,180,80,0.15)",
    color: "#5dd67a",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "24px",
  },
  successText: {
    color: "#FFFFFF",
    fontSize: "16px",
  }
}

// Add a simple spin keyframe block in JS for the loader (since index.css is loaded globally anyway, we could also use that, but doing it inline is safer here)
const styleSheet = document.createElement("style")
styleSheet.innerText = `
  @keyframes spin { 100% { transform: rotate(360deg); } }
`
document.head.appendChild(styleSheet)
