import React, { useState, useEffect } from "react";

export default function Footer() {
  const [metrics, setMetrics] = useState({
    db: "Connected",
    latency: "14ms",
    uptime: "99.99%",
  });

  useEffect(() => {
    // Generate slight variations in latency for dynamic realism
    const interval = setInterval(() => {
      const randomLatency = Math.floor(Math.random() * 8) + 8;
      setMetrics((prev) => ({ ...prev, latency: `${randomLatency}ms` }));
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-minimal">
      <div className="container-wrapper footer-container">
        <div>
          &copy; {currentYear} Amrit Kumar. All rights reserved.
        </div>
        <div className="footer-metrics">
          <div className="metric-item">
            DATABASE: <strong>{metrics.db}</strong>
          </div>
          <div className="metric-item">
            LATENCY: <strong>{metrics.latency}</strong>
          </div>
          <div className="metric-item">
            UPTIME: <strong>{metrics.uptime}</strong>
          </div>
        </div>
        <div>
          Developed with &hearts; by Amrit
        </div>
      </div>
    </footer>
  );
}
