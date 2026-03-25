import { Search, Filter, Upload, Plus } from 'lucide-react'

export default function ActionBar({ onSearch, onUploadClick, onAddJobClick }) {
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
          />
        </div>
        <button style={styles.filterBtn}>
          <Filter size={18} color="#A0A4B8" />
        </button>
      </div>

      {/* Actions */}
      <div style={styles.rightGroup}>
        <button style={styles.uploadBtn} onClick={onUploadClick}>
          <Upload size={16} />
          <span>upload</span>
        </button>
        <button style={styles.addBtn} onClick={onAddJobClick}>
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
    color: "#333",
    outline: "none",
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
  },
  addBtn: {
    background: "#8EB8E6",
    color: "#FFFFFF",
    border: "none",
    borderRadius: "4px",
    padding: "8px 24px",
    fontSize: "14px",
    cursor: "pointer",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
  },
}
