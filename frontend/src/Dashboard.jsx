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

const EditableCell = ({ value, type = "text", onSave }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [val, setVal] = useState(value || "")

  useEffect(() => setVal(value || ""), [value])

  const handleBlur = () => {
    setIsEditing(false)
    if (val !== (value || "")) {
      onSave(val)
    }
  }

  if (isEditing) {
    return (
      <input 
        autoFocus
        type={type}
        value={val}
        onChange={e => setVal(e.target.value)}
        onBlur={handleBlur}
        onKeyDown={e => e.key === 'Enter' && handleBlur()}
        style={styles.inlineInput}
      />
    )
  }

  return (
    <div 
      onClick={() => setIsEditing(true)} 
      style={styles.editableText}
    >
      {value || <span style={{color: '#555'}}>-</span>}
    </div>
  )
}

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
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [sortConfig, setSortConfig] = useState(null)
  const [selectedJobs, setSelectedJobs] = useState([])

  const ALL_COLUMNS = [
    { label: "Job Position", key: "role" },
    { label: "Company", key: "company" },
    { label: "Location", key: "location" },
    { label: "Date Posted", key: "date_posted" },
    { label: "Date Applied", key: "date_applied" },
    { label: "Salary", key: "salary" },
    { label: "Status", key: "status" },
    { label: "Notes", key: "notes" },
  ]
  const [visibleColumns, setVisibleColumns] = useState(ALL_COLUMNS.map(c => c.key))

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

  const handleInlineEdit = async (appId, field, newValue) => {
    try {
      const updateLocal = prev => prev.map(a => a.id === appId ? { ...a, [field]: newValue } : a)
      setApplications(updateLocal)
      setFilteredApps(updateLocal)
      
      await apiFetch(`/applications/${appId}`, {
        method: "PUT",
        body: JSON.stringify({ [field]: newValue })
      })
    } catch (err) {
      console.error(`Failed to update ${field}`, err)
      refreshApplications()
    }
  }

  const handleSort = (key) => {
    let direction = 'asc'
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc'
    } else if (sortConfig && sortConfig.key === key && sortConfig.direction === 'desc') {
      setSortConfig(null)
      return
    }
    setSortConfig({ key, direction })
  }

  const sortedApps = [...filteredApps].sort((a, b) => {
    if (!sortConfig) return 0
    let aVal = a[sortConfig.key] || ""
    let bVal = b[sortConfig.key] || ""
    
    // Simple parsing for numeric salary if needed, but string compare is ok for now out of box
    // since "100k" vs "80k" sorts alphanumerically correctly in most naive cases.
    if (typeof aVal === 'string') aVal = aVal.toLowerCase()
    if (typeof bVal === 'string') bVal = bVal.toLowerCase()

    if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1
    if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1
    return 0
  })

  if (!token) return null

  // Ensure minimum 8 rows for the grid look, fill with empties
  const displayApps = [...sortedApps]
  while (displayApps.length < 8) {
    displayApps.push({ _empty: true, id: `empty-${displayApps.length}` })
  }

  const handleSelectJob = (id) => {
    setSelectedJobs(prev => 
      prev.includes(id) ? prev.filter(jobId => jobId !== id) : [...prev, id]
    )
  }

  const allJobIds = sortedApps.filter(a => !a._empty).map(a => a.id)

  const SortIcon = ({ col }) => {
    if (!sortConfig || sortConfig.key !== col) return null
    return <span style={{ marginLeft: '4px', fontSize: '12px' }}>{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>
  }

  return (
    <div style={styles.page}>
      <NavSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      {/* Main Content Area (offset by sidebar width) */}
      <div style={{ ...styles.mainContent, marginLeft: isSidebarOpen ? "240px" : "0" }}>
        <div style={styles.topSection}>
          <MetricsBar 
            applications={applications} 
            isSidebarOpen={isSidebarOpen} 
            onOpenSidebar={() => setIsSidebarOpen(true)} 
          />
          <ActionBar 
            onSearch={setSearchQuery} 
            onUploadClick={() => setIsUploadOpen(true)}
            onAddJobClick={() => setIsAddJobOpen(true)}
            columns={ALL_COLUMNS}
            visibleColumns={visibleColumns}
            setVisibleColumns={setVisibleColumns}
            selectedJobs={selectedJobs}
            setSelectedJobs={setSelectedJobs}
            allJobIds={allJobIds}
            refreshApplications={refreshApplications}
          />
        </div>

        {/* Table Area (Scrollable) */}
        <div style={styles.tableContainer}>
          {loading && <p style={styles.stateMsg}>Loading…</p>}
          {error && <p style={{ ...styles.stateMsg, color: "#e07a7a" }}>{error}</p>}

          {!loading && !error && (
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={{ ...styles.th, width: '40px', textAlign: 'center' }}>
                    {/* Header checkbox removed as requested; keeping empty cell for alignment */}
                  </th>
                  {ALL_COLUMNS.filter(c => visibleColumns.includes(c.key)).map(h => (
                    <th 
                      key={h.key} 
                      style={{...styles.th, cursor: "pointer"}}
                      onClick={() => handleSort(h.key)}
                      onMouseEnter={e => e.currentTarget.style.background = '#2B2F42'}
                      onMouseLeave={e => e.currentTarget.style.background = '#181926'}
                    >
                      {h.label} <SortIcon col={h.key} />
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {displayApps.map((app, index) => (
                  <tr 
                    key={app.id} 
                    style={{
                      ...styles.tr,
                      animationDelay: `${index * 0.03}s` // Staggered fade in
                    }}
                    onMouseEnter={(e) => {
                      if (!app._empty) e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)'
                    }}
                    onMouseLeave={(e) => {
                      if (!app._empty) e.currentTarget.style.background = 'transparent'
                    }}
                  >
                    <td style={{ ...styles.td, textAlign: 'center' }}>
                      {!app._empty && (
                        <input 
                          type="checkbox" 
                          checked={selectedJobs.includes(app.id)}
                          onChange={() => handleSelectJob(app.id)}
                        />
                      )}
                    </td>
                    {visibleColumns.includes("role") && <td style={styles.td}>{!app._empty && <EditableCell value={app.role} onSave={val => handleInlineEdit(app.id, 'role', val)} />}</td>}
                    {visibleColumns.includes("company") && <td style={styles.td}>{!app._empty && <EditableCell value={app.company} onSave={val => handleInlineEdit(app.id, 'company', val)} />}</td>}
                    {visibleColumns.includes("location") && <td style={styles.td}>{!app._empty && <EditableCell value={app.location} onSave={val => handleInlineEdit(app.id, 'location', val)} />}</td>}
                    {visibleColumns.includes("date_posted") && <td style={styles.td}>{!app._empty && <EditableCell value={app.date_posted} type="date" onSave={val => handleInlineEdit(app.id, 'date_posted', val)} />}</td>}
                    {visibleColumns.includes("date_applied") && <td style={styles.td}>{!app._empty && <EditableCell value={app.date_applied} type="date" onSave={val => handleInlineEdit(app.id, 'date_applied', val)} />}</td>}
                    {visibleColumns.includes("salary") && <td style={styles.td}>{!app._empty && <EditableCell value={app.salary} onSave={val => handleInlineEdit(app.id, 'salary', val)} />}</td>}
                    
                    {visibleColumns.includes("status") && (
                      <td style={styles.td}>
                        {!app._empty && (
                          <div style={styles.statusDropdownContainer}>
                            <select 
                              value={app.status || "Applied"}
                              onChange={(e) => handleInlineEdit(app.id, 'status', e.target.value)}
                              style={styles.statusSelect}
                            >
                              <option value="Applied">Applied</option>
                              <option value="Interviewing">Interviewing</option>
                              <option value="Offer">Offer</option>
                              <option value="Accepted">Accepted</option>
                              <option value="Rejected">Rejected</option>
                              <option value="Ghosted">Ghosted</option>
                            </select>
                            <ChevronDown size={14} style={styles.statusChevron} />
                          </div>
                        )}
                      </td>
                    )}
                    {visibleColumns.includes("notes") && <td style={styles.td}>{!app._empty && <EditableCell value={app.notes} onSave={val => handleInlineEdit(app.id, 'notes', val)} />}</td>}
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
    height: "100vh",
    overflow: "hidden", // Prevent full page scroll
    color: "#FFFFFF",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
  },
  mainContent: {
    marginLeft: "240px", // width of sidebar
    display: "flex",
    flexDirection: "column",
    height: "100vh",
  },
  topSection: {
    flexShrink: 0,
    zIndex: 10,
    backgroundColor: "#181926",
  },
  tableContainer: {
    padding: "0",
    flex: 1,
    overflowY: "auto", // Allow only the table area to scroll
    animation: "fadeIn 0.4s ease",
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
    borderRight: "1px solid #3A3F58",
    position: "sticky",
    top: 0,
    background: "#181926", // Keep header background solid when scrolling
    boxShadow: "inset 0 -1px 0 #3A3F58", // Keeps bottom border attached during scroll
    zIndex: 1,
  },
  tr: {
    borderBottom: "1px solid #3A3F58",
    height: "64px", // Fixed height for matching vertical grid
    animation: "slideUp 0.3s ease backwards", // backwards applies the 0 opacity before delay starts
    transition: "background 0.2s ease",
  },
  td: {
    padding: "12px 16px",
    color: "#FFFFFF",
    borderRight: "1px solid #3A3F58",
    verticalAlign: "middle",
  },
  editableText: {
    cursor: "text",
    minHeight: "20px",
    display: "flex",
    alignItems: "center",
  },
  inlineInput: {
    width: "100%",
    background: "rgba(255, 255, 255, 0.1)",
    border: "1px solid #6C9BDB",
    borderRadius: "2px",
    color: "#FFFFFF",
    padding: "4px 8px",
    fontSize: "13px",
    outline: "none",
  },
  statusDropdownContainer: {
    position: "relative",
    display: "inline-flex",
    alignItems: "center",
  },
  statusSelect: {
    appearance: "none",
    width: "110px",
    padding: "6px 24px 6px 10px",
    border: "1px solid #FFFFFF",
    borderRadius: "4px",
    background: "transparent",
    color: "#FFFFFF",
    fontSize: "13px",
    cursor: "pointer",
    outline: "none",
  },
  statusChevron: {
    position: "absolute",
    right: "8px",
    pointerEvents: "none",
  }
}
