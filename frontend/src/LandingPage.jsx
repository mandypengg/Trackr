import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export default function LandingPage() {
    const [visible, setVisible] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        setTimeout(() => setVisible(true), 100)
    }, [])

    return (
        <div className="min-h-screen flex flex-col" style={styles.page}>

            {/* Navbar */}
            <nav style={styles.nav}>
                <span style={styles.logo}>Trackr</span>
                <button
                    onClick={() => navigate("/login")}
                    style={styles.loginBtn}
                    onMouseEnter={e => e.target.style.background = "rgba(255,255,255,0.15)"}
                    onMouseLeave={e => e.target.style.background = "rgba(255,255,255,0.08)"}
                >
                    Log in
                </button>
            </nav>

            {/* Hero */}
            <main style={styles.main}>
                <div
                    style={{
                        ...styles.card,
                        opacity: visible ? 1 : 0,
                        transform: visible ? "translateY(0)" : "translateY(24px)",
                        transition: "opacity 0.7s ease, transform 0.7s ease",
                    }}
                >
                    {/* Left side */}
                    <div style={styles.heroLeft}>
                        <h1 style={styles.heading}>
                            Manage your job<br />search all in one place
                        </h1>
                        <p style={styles.subheading}>
                            A fast and intuitive job tracker for you to keep track of all job
                            applications in one page. Upload your pre-existing sheets from
                            Google Sheets, or Microsoft Excel. Track your success rates with
                            our analytics dashboard.
                        </p>
                        <button
                            onClick={() => navigate("/signup")}
                            style={styles.cta}
                            onMouseEnter={e => e.target.style.background = "#5b52d4"}
                            onMouseLeave={e => e.target.style.background = "#6c63e0"}
                        >
                            Start tracking now
                        </button>
                    </div>

                    {/* Right side - Demo image placeholder */}
                    <div style={styles.demoBox}>
                        <span style={styles.demoText}>Demo image</span>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer style={styles.footer}>
                <span style={styles.footerBrand}>Trackr</span>
                <span style={styles.footerCenter}>Made by Mandy Peng</span>
                <div style={styles.footerIcons}>
                    <a href="https://github.com/mandypengg" target="_blank" style={styles.iconBox} aria-label="GitHub">
                        <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                        </svg>
                    </a>
                    <a href="www.linkedin.com/in/mandypengg" target="_blank" style={styles.iconBox} aria-label="LinkedIn">
                        <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                    </a>
                    {/* <a href="#" target="_blank" rel="noopener noreferrer" style={styles.iconBox} aria-label="Twitter">
                        <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                        </svg>
                    </a> */}
                </div>
            </footer>
        </div>
    )
}

const styles = {
    page: {
        background: "#13121f",
        color: "#f0eff8",
        fontFamily: "'Georgia', serif",
        minHeight: "100vh",
    },
    nav: {
        display: "flex",
        alignItems: "center",
        padding: "1.25rem 2.5rem",
        borderBottom: "0.5px solid rgba(255,255,255,0.1)",
    },
    logo: {
        fontSize: "18px",
        fontWeight: "500",
        letterSpacing: "0.02em",
        color: "#f0eff8",
    },
    main: {
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "3rem 2rem",
    },
    card: {
        background: "#1c1b2e",
        borderRadius: "20px",
        padding: "4rem",
        display: "flex",
        alignItems: "center",
        gap: "3rem",
        maxWidth: "960px",
        width: "100%",
    },
    heroLeft: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem",
    },
    heading: {
        fontSize: "clamp(28px, 4vw, 42px)",
        fontWeight: "400",
        lineHeight: "1.2",
        color: "#f0eff8",
        margin: 0,
    },
    subheading: {
        fontSize: "15px",
        lineHeight: "1.7",
        color: "rgba(240,239,248,0.65)",
        margin: 0,
        maxWidth: "420px",
    },
    cta: {
        background: "#6c63e0",
        color: "#fff",
        border: "none",
        borderRadius: "12px",
        padding: "1rem 2rem",
        fontSize: "17px",
        fontFamily: "'Georgia', serif",
        cursor: "pointer",
        width: "fit-content",
        transition: "background 0.2s ease",
    },
    demoBox: {
        width: "300px",
        height: "280px",
        background: "#e8e6e0",
        borderRadius: "12px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
    },
    demoText: {
        fontSize: "20px",
        color: "#555",
    },
    footer: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "1.25rem 2.5rem",
        borderTop: "0.5px solid rgba(255,255,255,0.1)",
        fontSize: "13px",
        color: "rgba(240,239,248,0.5)",
    },
    footerBrand: {
        color: "rgba(240,239,248,0.5)",
    },
    footerCenter: {
        position: "absolute",
        left: "50%",
        transform: "translateX(-50%)",
    },
    footerIcons: {
        display: "flex",
        gap: "8px",
    },
    iconBox: {
        width: "32px",
        height: "32px",
        background: "rgba(255,255,255,0.1)",
        borderRadius: "6px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "rgba(240,239,248,0.6)",
        textDecoration: "none",
    },

    loginBtn: {
        background: "rgba(255,255,255,0.08)",
        color: "#f0eff8",
        border: "0.5px solid rgba(255,255,255,0.2)",
        borderRadius: "8px",
        padding: "0.5rem 1.25rem",
        fontSize: "14px",
        fontFamily: "Georgia, serif",
        cursor: "pointer",
        marginLeft: "auto",
        transition: "background 0.2s ease",
    },
}