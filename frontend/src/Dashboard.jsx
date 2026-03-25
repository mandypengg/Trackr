import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "./AuthContext"
import { apiFetch } from "./api"
import NavSidebar from "./components/NavSidebar"
import MetricsBar from "./components/MetricsBar"
import ActionBar from "./components/ActionBar"
import UploadModal from "./components/UploadModal"
import AddJobModal from "./components/AddJobModal"
import { ChevronDown } from "lucide-react"

export default function Dashboard() {
  const navigate = useNavigate()
  const { token } = useAuth()
  const [applications, setApplications] = useState([])
  const [filteredApps, setFilteredApps] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  
  const [isUploadOpen, setIsUploadOpen] = useState(false)
  const [isAddJobOpen, setIsAddJobOpen] = useState(false)

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!token) navigate("/login")
  }, [token, navigate])

  useEffect(() => {
    if (!token) return
    apiFetch("/applications/")
      .then(data => { 
        setApplications(data)
        setFilteredApps(data)
        setLoading(false) 
      })
      .catch(err => { 
        setError(err.message)
        setLoading(false) 
      })
  }, [token])

  const refreshApplications = () => {
    if (!token) return
    apiFetch("/applications/")
      .then(data => { 
        setApplications(data)
        // re-apply search if it exists
        if (searchQuery) {
          const lowerQ = searchQuery.toLowerCase()
          setFilteredApps(data.filter(app => 
            (app.company && app.company.toLowerCase().includes(lowerQ)) ||
            (app.role && app.role.toLowerCase().includes(lowerQ))
          ))
        } else {
          setFilteredApps(data)
        }
      })
      .catch(err => console.error("Failed to refresh applications", err))
  }

  // Simple search filter
  useEffect(() => {
    if (!searchQuery) {
      setFilteredApps(applications)
      return
    }
    const lowerQ = searchQuery.toLowerCase()
    const filtered = applications.filter(app => 
      (app.company && app.company.toLowerCase().includes(lowerQ)) ||
      (app.role && app.role.toLowerCase().includes(lowerQ))
    )
    setFilteredApps(filtered)
  }, [searchQuery, applications])

  if (!token) return null

  // Ensure minimum 8 rows for the grid look, fill with empties
  const displayApps = [...filteredApps]
  while (displayApps.length < 8) {
    displayApps.push({ _empty: true, id: `empty-${displayApps.length}` })
  }

  return (
    <div style={styles.page}>
      <NavSidebar />
      
      {/* Main Content Area (offset by sidebar width) */}
      <div style={styles.mainContent}>
        <MetricsBar applications={applications} />
        <ActionBar 
          onSearch={setSearchQuery} 
          onUploadClick={() => setIsUploadOpen(true)}
          onAddJobClick={() => setIsAddJobOpen(true)}
        />

        {/* Table Area */}
        <div style={styles.tableContainer}>
          {loading && <p style={styles.stateMsg}>Loading…</p>}
          {error && <p style={{ ...styles.stateMsg, color: "#e07a7a" }}>{error}</p>}

          {!loading && !error && (
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Job Position</th>
                  <th style={styles.th}>Company</th>
                  <th style={styles.th}>Location</th>
                  <th style={styles.th}>Date Posted</th>
                  <th style={styles.th}>Date Applied</th>
                  <th style={styles.th}>Salary</th>
                  <th style={styles.th}>Status</th>
                  <th style={styles.th}>Notes</th>
                </tr>
              </thead>
              <tbody>
                {displayApps.map((app) => (
                  <tr key={app.id} style={styles.tr}>
                    <td style={styles.td}>{app._empty ? "" : app.role}</td>
                    <td style={styles.td}>{app._empty ? "" : app.company}</td>
                    <td style={styles.td}>{app._empty ? "" : (app.location || "")}</td>
                    <td style={styles.td}>{app._empty ? "" : (app.date_posted || "")}</td>
                    <td style={styles.td}>{app._empty ? "" : (app.date_applied || "")}</td>
                    <td style={styles.td}>{app._empty ? "" : (app.salary || "")}</td>
                    
                    <td style={styles.td}>
                      {!app._empty && (
                        <div style={styles.statusDropdown}>
                          <span>{app.status || "Value"}</span>
                          <ChevronDown size={14} />
                        </div>
                      )}
                    </td>
                    
                    <td style={styles.td}>{app._empty ? "" : (app.notes || "")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Modals */}
      <UploadModal 
        isOpen={isUploadOpen} 
        onClose={() => setIsUploadOpen(false)} 
        onSuccess={refreshApplications} 
      />
      <AddJobModal 
        isOpen={isAddJobOpen} 
        onClose={() => setIsAddJobOpen(false)} 
        onSuccess={refreshApplications} 
      />
    </div>
  )
}

const styles = {
  page: {
    background: "#181926",
    minHeight: "100vh",
    color: "#FFFFFF",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
  },
  mainContent: {
    marginLeft: "240px", // width of sidebar
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  },
  tableContainer: {
    padding: "0",
    flex: 1,
  },
  stateMsg: {
    padding: "24px",
    color: "#A0A4B8",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: "14px",
  },
  th: {
    padding: "16px",
    textAlign: "left",
    fontWeight: "normal",
    color: "#FFFFFF",
    borderBottom: "1px solid #3A3F58",
    borderRight: "1px solid #3A3F58",
  },
  tr: {
    borderBottom: "1px solid #3A3F58",
    height: "64px", // Fixed height for matching vertical grid
  },
  td: {
    padding: "12px 16px",
    color: "#FFFFFF",
    borderRight: "1px solid #3A3F58",
    verticalAlign: "middle",
  },
  statusDropdown: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100px",
    padding: "6px 10px",
    border: "1px solid #FFFFFF",
    borderRadius: "4px",
    background: "transparent",
    color: "#FFFFFF",
    fontSize: "13px",
    cursor: "pointer",
  }
}
