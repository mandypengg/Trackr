import { Search, Filter, Upload, Plus, Menu } from 'lucide-react'

export default function ActionBar({ onSearch, onUploadClick, onAddJobClick, isSidebarOpen, onOpenSidebar }) {
  return (
    <div style={styles.container}>
      {/* Search and Filter */}
      <div style={styles.leftGroup}>
        {!isSidebarOpen && (
          <button 
            style={styles.menuBtn} 
            onClick={onOpenSidebar}
          >
            <Menu size={20} color="#FFFFFF" />
          </button>
        )}
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
        <button 
          style={styles.filterBtn}
          onMouseEnter={e => e.currentTarget.style.background = '#CDCDCD'}
          onMouseLeave={e => e.currentTarget.style.background = '#D9D9D9'}
        >
          <Filter size={18} color="#A0A4B8" />
        </button>
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
  menuBtn: {
    background: "transparent",
    border: "none",
    padding: "6px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginRight: "8px",
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
}
