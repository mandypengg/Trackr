export default function MetricsBar({ applications = [] }) {
  const total = applications.length
  const applied = applications.filter(a => a.status === "Applied").length
  const interviews = applications.filter(a => a.status === "Interviewing").length
  const offers = applications.filter(a => a.status === "Offer").length
  const accepted = applications.filter(a => a.status === "Accepted").length

  const metrics = [
    { label: "Total", value: total },
    { label: "Applied", value: applied },
    { label: "Interviews", value: interviews },
    { label: "Offers", value: offers },
    { label: "Accepted", value: accepted },
  ]

  return (
    <div style={styles.container}>
      {metrics.map((m, i) => (
        <div 
          key={m.label} 
          style={{
            ...styles.metricBlock,
            zIndex: metrics.length - i // Ensures overlapping works correctly
          }}
        >
          <span style={styles.metricText}>
            {m.label}: {m.value}
          </span>
          {/* We use standard CSS border triangles to create the chevron arrow effect */}
          {i < metrics.length - 1 && (
            <div style={styles.chevron}></div>
          )}
        </div>
      ))}
    </div>
  )
}

const styles = {
  container: {
    display: "flex",
    height: "64px",
    width: "100%",
    borderBottom: "1px solid #3A3F58",
    background: "#181926",
    boxSizing: "border-box",
  },
  metricBlock: {
    flex: 1,
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRight: "1px solid #3A3F58",
    background: "#181926",
  },
  metricText: {
    color: "#FFFFFF",
    fontSize: "14px",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
  },
  chevron: {
    position: "absolute",
    right: "-16px",
    top: "50%",
    transform: "translateY(-50%)",
    width: 0,
    height: 0,
    borderTop: "32px solid transparent",
    borderBottom: "32px solid transparent",
    borderLeft: "16px solid #181926",
    zIndex: 2,
    filter: "drop-shadow(1px 0px 0px #3A3F58)", // Creates the right border of the arrow
  }
}
