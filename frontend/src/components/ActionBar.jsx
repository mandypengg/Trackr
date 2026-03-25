import { useState } from 'react'
import { Search, Filter, Upload, Plus, Columns, CheckSquare, Trash2 } from 'lucide-react'
import { apiFetch } from '../api'

export default function ActionBar({ 
  onSearch, onUploadClick, onAddJobClick, 
  columns, visibleColumns, setVisibleColumns,
  selectedJobs, setSelectedJobs, allJobIds, refreshApplications
}) {
  const [isColumnsOpen, setIsColumnsOpen] = useState(false)

  const toggleColumn = (key) => {
    if (visibleColumns.includes(key)) {
      setVisibleColumns(visibleColumns.filter(c => c !== key))
    } else {
      setVisibleColumns([...visibleColumns, key])
    }
  }

  const handleSelectAll = () => {
    if (selectedJobs.length === allJobIds.length && allJobIds.length > 0) {
      setSelectedJobs([])
    } else {
      setSelectedJobs(allJobIds)
    }
  }

  const handleDeleteSelected = async () => {
    if (!confirm(`Are you sure you want to delete ${selectedJobs.length} job(s)?`)) return
    try {
      await Promise.all(selectedJobs.map(id => apiFetch(`/applications/${id}`, { method: 'DELETE' })))
      setSelectedJobs([])
      refreshApplications()
    } catch (err) {
      console.error("Failed to delete jobs", err)
      alert("There was an error deleting some jobs.")
    }
  }

  return (
    <div style={styles.container}>
      {/* Search and Filter */}
      <div style={styles.leftGroup}>
        <div style={styles.searchContainer}>
          <Search size={16} color="#A0A4B8" style={styles.searchIcon} />
          <input 
            type="text" 
            placeholder="Search..." 
            style={styles.searchInput}
            onChange={(e) => onSearch && onSearch(e.target.value)}
            onFocus={e => e.currentTarget.style.background = '#E5E5E5'}
            onBlur={e => e.currentTarget.style.background = '#D9D9D9'}
          />
        </div>
        <div style={styles.columnsWrapper}>
          <button 
            style={styles.filterBtn}
            onClick={() => setIsColumnsOpen(!isColumnsOpen)}
            onMouseEnter={e => e.currentTarget.style.background = '#CDCDCD'}
            onMouseLeave={e => e.currentTarget.style.background = '#D9D9D9'}
          >
            <Columns size={18} color="#1a1a2e" />
          </button>
          
          {isColumnsOpen && (
            <div style={styles.columnsMenu}>
              <div style={styles.columnsHeader}>View Options</div>
              {columns && columns.map(col => (
                <label key={col.key} style={styles.columnOption}>
                  <input 
                    type="checkbox" 
                    checked={visibleColumns.includes(col.key)}
                    onChange={() => toggleColumn(col.key)}
                    style={styles.checkbox}
                  />
                  {col.label}
                </label>
              ))}
            </div>
          )}
        </div>
        
        <button 
          style={styles.filterBtn}
          onClick={handleSelectAll}
          onMouseEnter={e => e.currentTarget.style.background = '#CDCDCD'}
          onMouseLeave={e => e.currentTarget.style.background = '#D9D9D9'}
          title="Select All"
        >
          <CheckSquare size={18} color="#1a1a2e" />
        </button>

        {selectedJobs && selectedJobs.length > 0 && (
          <button 
            style={styles.deleteBtn}
            onClick={handleDeleteSelected}
            onMouseEnter={e => e.currentTarget.style.background = '#e07a7a'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            <Trash2 size={16} />
            <span>Manage ({selectedJobs.length})</span>
          </button>
        )}
      </div>

      {/* Actions */}
      <div style={styles.rightGroup}>
        <button 
          style={styles.uploadBtn} 
          onClick={onUploadClick}
          onMouseEnter={e => e.currentTarget.style.background = '#5A8BCC'}
          onMouseLeave={e => e.currentTarget.style.background = '#6C9BDB'}
        >
          <Upload size={16} />
          <span>upload</span>
        </button>
        <button 
          style={styles.addBtn} 
          onClick={onAddJobClick}
          onMouseEnter={e => e.currentTarget.style.background = '#5A8BCC'}
          onMouseLeave={e => e.currentTarget.style.background = '#6C9BDB'}
        >
          <span>+ add job</span>
        </button>
      </div>
    </div>
  )
}

const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "16px 24px",
    borderBottom: "1px solid #3A3F58",
    background: "#181926",
  },
  leftGroup: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  searchContainer: {
    position: "relative",
    width: "300px",
  },
  searchIcon: {
    position: "absolute",
    left: "12px",
    top: "50%",
    transform: "translateY(-50%)",
  },
  searchInput: {
    width: "100%",
    background: "#D9D9D9",
    border: "none",
    borderRadius: "4px",
    padding: "8px 12px 8px 36px",
    fontSize: "14px",
    color: "#1a1a2e",
    outline: "none",
    transition: "background 0.2s ease",
  },
  filterBtn: {
    background: "#D9D9D9",
    border: "none",
    borderRadius: "4px",
    width: "36px",
    height: "36px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    transition: "background 0.2s ease",
  },
  rightGroup: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
  },
  uploadBtn: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    background: "#6C9BDB",
    color: "#FFFFFF",
    border: "none",
    borderRadius: "4px",
    padding: "8px 20px",
    fontSize: "14px",
    cursor: "pointer",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    transition: "background 0.2s ease",
  },
  addBtn: {
    background: "#6C9BDB",
    color: "#FFFFFF",
    border: "none",
    borderRadius: "4px",
    padding: "8px 24px",
    fontSize: "14px",
    cursor: "pointer",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    transition: "background 0.2s ease",
  },
  columnsWrapper: {
    position: "relative",
  },
  columnsMenu: {
    position: "absolute",
    top: "44px",
    left: 0,
    background: "#2B2F42",
    border: "1px solid #3A3F58",
    borderRadius: "4px",
    padding: "8px 0",
    minWidth: "180px",
    zIndex: 100,
    boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
    display: "flex",
    flexDirection: "column",
  },
  columnsHeader: {
    padding: "8px 16px",
    fontSize: "12px",
    textTransform: "uppercase",
    color: "#A0A4B8",
    fontWeight: "600",
    borderBottom: "1px solid #3A3F58",
    marginBottom: "4px",
  },
  columnOption: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "8px 16px",
    color: "#FFFFFF",
    fontSize: "13px",
    cursor: "pointer",
  },
  checkbox: {
    cursor: "pointer",
  },
  deleteBtn: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    background: "transparent",
    color: "#e07a7a",
    border: "1px solid #e07a7a",
    borderRadius: "4px",
    padding: "6px 12px",
    fontSize: "13px",
    cursor: "pointer",
    transition: "all 0.2s ease",
  }
}
