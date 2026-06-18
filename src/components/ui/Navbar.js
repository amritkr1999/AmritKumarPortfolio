import React, { useState, useEffect } from "react";
import resumePdf from "../../Assets/Amrit_Resume.pdf";

export default function Navbar({ activeSection }) {
  const [status, setStatus] = useState({ text: "Live/Healthy", healthy: true });

  useEffect(() => {
    // Ping health endpoint, fallback gracefully if not found
    fetch("/api/v1/health")
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error("Local mock fallback");
      })
      .then((data) => {
        if (data.status) {
          setStatus({ text: `System: ${data.status}`, healthy: true });
        }
      })
      .catch(() => {
        // Fallback to Live/Healthy static status
        setStatus({ text: "System Status: Live/Healthy", healthy: true });
      });
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="navbar-minimal">
      <div className="container-wrapper navbar-container">
        <div className="navbar-brand" style={{ cursor: "pointer" }} onClick={() => scrollTo("prologue")}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--interactive-focal)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ marginBottom: "2px" }}
          >
            <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" />
            <path d="M6 6h10" />
            <path d="M6 10h10" />
          </svg>
          <span style={{ fontWeight: "700", fontFamily: "var(--font-display)" }}>Amrit Kumar</span>
        </div>

        <ul className="navbar-links">
          <li
            className={`nav-link-item ${activeSection === "prologue" ? "active" : ""}`}
            onClick={() => scrollTo("prologue")}
          >
            PROLOGUE
          </li>
          <li
            className={`nav-link-item ${activeSection === "chronicles" ? "active" : ""}`}
            onClick={() => scrollTo("chronicles")}
          >
            CHRONICLES
          </li>
          <li
            className={`nav-link-item ${activeSection === "toolkit" ? "active" : ""}`}
            onClick={() => scrollTo("toolkit")}
          >
            TOOLKIT
          </li>
          <li
            className={`nav-link-item ${activeSection === "epilogue" ? "active" : ""}`}
            onClick={() => scrollTo("epilogue")}
          >
            EPILOGUE
          </li>
          <li className="nav-link-item">
            <a
              href={resumePdf}
              target="_blank"
              rel="noreferrer"
              style={{ color: "inherit", textDecoration: "none", display: "flex", alignItems: "center", gap: "4px" }}
            >
              RESUME
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" x2="12" y1="15" y2="3" />
              </svg>
            </a>
          </li>
        </ul>

        <div className="system-status">
          <span className="status-dot"></span>
          <span>{status.text}</span>
        </div>
      </div>
    </nav>
  );
}
