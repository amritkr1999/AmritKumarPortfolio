import React, { useState, useEffect, useRef } from "react";
import ArchitectureDiagram from "./ArchitectureDiagram";
import BlueprintModal from "../../components/ui/BlueprintModal";
import { useScrollProgress } from "../../hooks/useScrollProgress";

const NODE_INFO = {
  frontend: {
    title: "Frontend Client Architecture",
    summary: "React 18 & Material UI (MUI) structure optimized for high-performance responsive clinical workflows.",
    role: "Delivers highly responsive viewports, handles patient-doctor telemedicine states, renders ABDM-compliant EHR dashboards, and coordinates user flows.",
    tech: "React 18, Vite, TypeScript, Material UI, Bootstrap.",
    patterns: "Container/Presenter components, state hooks for side effects, fluid responsive grids.",
  },
  api: {
    title: "Spring Boot Microservices Layer",
    summary: "Java & Spring Boot API gateway proxy handling authentication, routing, and data integration.",
    role: "Manages business-tier transaction pipelines, enforces security filters, resolves target routes, and formats upstream payloads to relational databases.",
    tech: "Java, Spring Boot, Hibernate/JPA, Spring Security, JWT, REST APIs, Kafka.",
    patterns: "Repository pattern, security filters pipeline, DAO mappings.",
  },
  database: {
    title: "PostgreSQL Database Layer",
    summary: "Relational database server optimized for high-throughput public medical records.",
    role: "Stores patient EHR details, credentials, and construction vendor procurements. Supports advanced indexing and partitioned scaling for query speed.",
    tech: "PostgreSQL, MongoDB, AWS RDS storage layer.",
    patterns: "Database indexing, schema normalization, connection pooling.",
  },
};

const techToStepMap = {
  "Java": [0, 1, 2, 3],
  "Spring Boot": [0, 1, 2, 3],
  "PostgreSQL": [0, 1, 2],
  "React 18": [0],
  "TypeScript": [0, 1],
  "JavaScript": [0, 1],
  "Material UI": [0],
  "Hibernate/JPA": [1, 2],
  "Microservices": [1],
  "AWS S3/RDS": [1, 3],
  "Docker": [1, 3],
  "Git": [0, 1, 2, 3],
  "Angular": [0],
  "Vite": [0],
  "Python": [1],
  "C++": [0],
  "SQL": [1, 2],
  "Spring Security": [1],
  "RESTful APIs": [0, 1]
};

export default function Chronicles({ timelineTechHighlight }) {
  const [activeStep, setActiveStep] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedNode, setSelectedNode] = useState(null);

  const scrollProgress = useScrollProgress();

  const stepRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  // Detect which step is active based on intersection tracking
  useEffect(() => {
    const handleScrollTracking = () => {
      const viewportCenter = window.innerHeight / 2;
      let closestStep = 0;
      let minDistance = Infinity;

      stepRefs.forEach((ref, index) => {
        if (ref.current) {
          const rect = ref.current.getBoundingClientRect();
          const elementCenter = rect.top + rect.height / 2;
          const distance = Math.abs(elementCenter - viewportCenter);

          if (distance < minDistance) {
            minDistance = distance;
            closestStep = index;
          }
        }
      });

      setActiveStep(closestStep);
    };

    window.addEventListener("scroll", handleScrollTracking);
    // Initial call
    handleScrollTracking();

    return () => window.removeEventListener("scroll", handleScrollTracking);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openModal = (nodeId) => {
    setSelectedNode(NODE_INFO[nodeId]);
    setModalOpen(true);
  };

  const shouldDim = (index) => {
    if (!timelineTechHighlight) return false;
    const activeSteps = techToStepMap[timelineTechHighlight];
    return activeSteps ? !activeSteps.includes(index) : true;
  };

  return (
    <section id="chronicles" className="chronicles-section">
      <div className="container-wrapper">
        <div className="chronicles-grid">
          {/* Left Pane (Sticky Diagram) */}
          <div className="chronicles-left">
            <ArchitectureDiagram activeStep={activeStep} onNodeClick={openModal} />
          </div>

          {/* Right Pane (Timeline) */}
          <div className="chronicles-right">
            {/* The Narrative Thread Line */}
            <div className="narrative-thread-container">
              <div className="narrative-thread-line">
                <div
                  className="narrative-thread-fill"
                  style={{ height: `${Math.min(scrollProgress * 1.15, 100)}%` }}
                ></div>
              </div>
            </div>

            {/* Section Header indicating Chapter 2 */}
            <div className="chronicles-header" style={{ marginBottom: "var(--space-md)" }}>
              <span className="timeline-step-badge" style={{ color: "var(--interactive-focal)", fontSize: "var(--sz-code-caption)", textTransform: "uppercase", letterSpacing: "0.15em" }}>
                Chapter 2: The Chronicles
              </span>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "var(--sz-display-1)", margin: 0 }}>
                Systems Architecture Timeline
              </h2>
            </div>

            {/* Chapter 2: Card 1 - Spark */}
            <div
              className={`timeline-card-wrapper`}
              ref={stepRefs[0]}
            >
              <div className={`card-custom timeline-card ${activeStep === 0 ? "active" : ""} ${shouldDim(0) ? "dimmed" : ""}`}>
                <span className="timeline-step-badge">[Spark] Inception Narrative</span>
                <h2 className="timeline-title">AROG Health Management System</h2>
                <p className="timeline-desc">
                  Spearheaded the front-end layout and core ABDM-compliant telemedicine workflows of a regional Health Management System (HMS) used by clinics across Gujarat. The objective was to design a clean, responsive client interface capable of organizing clinical document structures and hospital operations seamlessly.
                </p>
                <div className="timeline-techs">
                  <span className="timeline-tech-badge">React 18</span>
                  <span className="timeline-tech-badge">Material UI</span>
                  <span className="timeline-tech-badge">TypeScript</span>
                  <span className="timeline-tech-badge">ABDM</span>
                </div>
              </div>
            </div>

            {/* Chapter 2: Card 2 - Blueprint */}
            <div
              className={`timeline-card-wrapper`}
              ref={stepRefs[1]}
            >
              <div className={`card-custom timeline-card ${activeStep === 1 ? "active" : ""} ${shouldDim(1) ? "dimmed" : ""}`}>
                <span className="timeline-step-badge">[Blueprint] Systems Layer</span>
                <h2 className="timeline-title">Medplat & B2B VendorInfra</h2>
                <p className="timeline-desc">
                  Architected modular backend system blueprints for Medplat (public medical records storage) and VendorInfra (B2B construction procurement platform). Built microservice connectors using Spring Boot and Hibernate/JPA to manage relational structures on PostgreSQL and deployment on AWS (S3, RDS).
                </p>
                <div className="timeline-techs">
                  <span className="timeline-tech-badge">Spring Boot</span>
                  <span className="timeline-tech-badge">Hibernate/JPA</span>
                  <span className="timeline-tech-badge">PostgreSQL</span>
                  <span className="timeline-tech-badge">AWS S3/RDS</span>
                </div>
              </div>
            </div>

            {/* Chapter 2: Card 3 - Plot Twist */}
            <div
              className={`timeline-card-wrapper`}
              ref={stepRefs[2]}
            >
              <div className={`card-custom timeline-card ${activeStep === 2 ? "active" : ""} ${shouldDim(2) ? "dimmed" : ""}`}>
                <span className="timeline-step-badge">[Plot Twist] Challenges Faced</span>
                <h2 className="timeline-title">High-Throughput Caching & Query Latency</h2>
                <p className="timeline-desc">
                  During regional clinical rollouts, managing millions of public medical records resulted in database bottlenecks and query lags. The breakthrough was achieved by optimizing PostgreSQL index queries, restructuring schemas, and applying AI-Assisted Development with Antigravity to achieve robust data integrity.
                </p>
                <div className="timeline-techs">
                  <span className="timeline-tech-badge">PostgreSQL Opt</span>
                  <span className="timeline-tech-badge">Antigravity AI</span>
                  <span className="timeline-tech-badge">Query Speed</span>
                </div>
              </div>
            </div>

            {/* Chapter 2: Card 4 - Finale */}
            <div
              className={`timeline-card-wrapper`}
              ref={stepRefs[3]}
            >
              <div className={`card-custom timeline-card ${activeStep === 3 ? "active" : ""} ${shouldDim(3) ? "dimmed" : ""}`}>
                <span className="timeline-step-badge">[Finale] Metrics & Output</span>
                <h2 className="timeline-title">30% Performance Boost & 35% Latency Drops</h2>
                <p className="timeline-desc">
                  Successful project deliveries yielded significant performance wins. Restructuring schemas and optimizing database query executions led to a 35% reduction in server response times, a 40% query speedup, and an overall 30% increase in full-stack runtime performance.
                </p>
                <div className="timeline-techs">
                  <span className="timeline-tech-badge">Uptime 99.9%</span>
                  <span className="timeline-tech-badge">Response -35%</span>
                  <span className="timeline-tech-badge">Queries +40%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <BlueprintModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        nodeData={selectedNode}
      />
    </section>
  );
}
