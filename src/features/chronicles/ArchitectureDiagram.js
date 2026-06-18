import React from "react";

export default function ArchitectureDiagram({ activeStep, onNodeClick }) {
  // Determine highlights based on the active step (0: Spark, 1: Blueprint, 2: Plot Twist, 3: Finale)
  const isFrontendActive = activeStep === 0;
  const isApiActive = activeStep === 1;
  const isPathActive = activeStep === 2;
  const isDbActive = activeStep === 3;

  return (
    <div className="card-custom svg-diagram-card">
      <h3 style={{ fontFamily: "var(--font-mono)", fontSize: "14px", color: "var(--secondary-text)", marginBottom: "var(--space-md)", textTransform: "uppercase" }}>
        Interactive Topology Visualizer
      </h3>
      <svg className="svg-canvas" viewBox="0 0 480 320">
        <defs>
          {/* Glowing filter for active elements */}
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Data Paths */}
        <path
          id="frontend-to-api"
          d="M 120 160 H 200"
          className={`svg-data-path ${isPathActive || isFrontendActive || isApiActive ? "active" : ""}`}
        />
        <path
          id="api-to-db"
          d="M 280 160 H 360"
          className={`svg-data-path ${isPathActive || isApiActive || isDbActive ? "active" : ""}`}
        />

        {/* Animated Data Packets (Pulsing circles) */}
        {(isPathActive || isFrontendActive || isApiActive) && (
          <circle r="5" className="pulse-packet">
            <animateMotion dur="2s" repeatCount="indefinite" path="M 120 160 H 200" />
          </circle>
        )}
        {(isPathActive || isApiActive || isDbActive) && (
          <circle r="5" className="pulse-packet">
            <animateMotion dur="2.5s" repeatCount="indefinite" path="M 200 160 H 120" />
          </circle>
        )}
        {(isPathActive || isApiActive || isDbActive) && (
          <circle r="5" className="pulse-packet">
            <animateMotion dur="2s" repeatCount="indefinite" path="M 280 160 H 360" />
          </circle>
        )}

        {/* Node 1: Frontend App */}
        <g className="node-group" onClick={() => onNodeClick("frontend")}>
          <circle
            cx="80"
            cy="160"
            r="40"
            className={`node-circle ${isFrontendActive ? "active" : ""}`}
            filter={isFrontendActive ? "url(#glow)" : ""}
          />
          {/* React Logo outline in SVG inside Frontend Circle */}
          <ellipse cx="80" cy="160" rx="18" ry="6" stroke={isFrontendActive ? "#2C2523" : "var(--interactive-focal)"} fill="none" strokeWidth="1" transform="rotate(30 80 160)" />
          <ellipse cx="80" cy="160" rx="18" ry="6" stroke={isFrontendActive ? "#2C2523" : "var(--interactive-focal)"} fill="none" strokeWidth="1" transform="rotate(90 80 160)" />
          <ellipse cx="80" cy="160" rx="18" ry="6" stroke={isFrontendActive ? "#2C2523" : "var(--interactive-focal)"} fill="none" strokeWidth="1" transform="rotate(150 80 160)" />
          <circle cx="80" cy="160" r="3" fill="var(--primary-text)" />
          
          <text x="80" y="225" className="node-text">
            FRONTEND UI
          </text>
        </g>

        {/* Node 2: API Gateway */}
        <g className="node-group" onClick={() => onNodeClick("api")}>
          <circle
            cx="240"
            cy="160"
            r="40"
            className={`node-circle ${isApiActive ? "active" : ""}`}
            filter={isApiActive ? "url(#glow)" : ""}
          />
          {/* Routing lines inside API Gateway Circle */}
          <path
            d="M 225 150 H 255 M 225 160 H 255 M 225 170 H 255"
            stroke={isApiActive ? "#2C2523" : "var(--interactive-focal)"}
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <circle cx="230" cy="160" r="2" fill="var(--canvas-bg)" />
          <circle cx="250" cy="160" r="2" fill="var(--canvas-bg)" />
          
          <text x="240" y="225" className="node-text">
            SPRING BOOT
          </text>
        </g>

        {/* Node 3: NoSQL Database */}
        <g className="node-group" onClick={() => onNodeClick("database")}>
          <circle
            cx="400"
            cy="160"
            r="40"
            className={`node-circle ${isDbActive ? "active" : ""}`}
            filter={isDbActive ? "url(#glow)" : ""}
          />
          {/* Cylinder database outline inside Database Circle */}
          <path
            d="M 385 148 C 385 142, 415 142, 415 148 M 385 148 V 172 C 385 178, 415 178, 415 172 V 148 M 385 156 C 385 162, 415 162, 415 156 M 385 164 C 385 170, 415 170, 415 164"
            fill="none"
            stroke={isDbActive ? "#2C2523" : "var(--interactive-focal)"}
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          
          <text x="400" y="225" className="node-text">
            POSTGRESQL
          </text>
        </g>
      </svg>
      <span style={{ fontSize: "11px", fontFamily: "var(--font-mono)", color: "var(--secondary-text)", marginTop: "var(--space-sm)" }}>
        * Click nodes to view architectural details
      </span>
    </div>
  );
}
