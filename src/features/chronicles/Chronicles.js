import React, { useState, useEffect, useRef } from "react";
import ArchitectureDiagram from "./ArchitectureDiagram";
import BlueprintModal from "../../components/ui/BlueprintModal";
import { useScrollProgress } from "../../hooks/useScrollProgress";

const NODE_INFO = {
  frontend: {
    title: "Frontend Client Architecture",
    summary: "ReactJS & Single-Page Application (SPA) structure optimized for sub-1.8s LCP.",
    role: "Delivers highly responsive UI viewports, handles client-side state machine (Redux), manages dynamic routing paths, and coordinates layout scroll triggers.",
    tech: "React v17, Javascript ES6+, Bootstrap, custom CSS variables.",
    patterns: "Container/Presenter components, state hooks for side effects, fluid responsive grids.",
  },
  api: {
    title: "API Routing & Logic Gateway",
    summary: "Middleware proxy layer handling security, telemetry, and rate limiting.",
    role: "Intercepts requests, handles authentication tokens, resolves target routes, and formats upstream payloads to downstream databases.",
    tech: "NodeJS, KoaJS, Axios interceptors, REST API configurations.",
    patterns: "Middleware pipelines, interceptor patterns, route parameters matching.",
  },
  database: {
    title: "Azure Cosmos DB (Storage Layer)",
    summary: "Globally distributed multi-model NoSQL storage layer for planet-scale low-latency transactions.",
    role: "Stores core application profiles, caches, and telemetry data. Scales throughput dynamically with single-digit millisecond read/write guarantees.",
    tech: "Azure Cosmos DB SDK, NoSQL Document Databases, Redux caching.",
    patterns: "Data partitioning, flat schemas, optimistic concurrency control.",
  },
};

const techToStepMap = {
  "ReactJs": [0],
  "JavaScript": [0],
  "Redux": [0],
  "TypeScript": [1],
  "GraphQL": [1],
  "Nodejs": [1],
  "Koajs": [1],
  "Spring Boot": [1],
  "Java": [1],
  "PostgreSQL": [1],
  "Shopify Polaris": [1],
  "Apollo": [1],
  "Html": [0, 1],
  "CSS": [0, 1],
  "Git": [0, 1, 2, 3]
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

            {/* Chapter 2: Card 1 - Spark */}
            <div
              className={`timeline-card-wrapper`}
              ref={stepRefs[0]}
            >
              <div className={`card-custom timeline-card ${activeStep === 0 ? "active" : ""} ${shouldDim(0) ? "dimmed" : ""}`}>
                <span className="timeline-step-badge">[Spark] Inception Narrative</span>
                <h2 className="timeline-title">Microsoft Azure Cosmos DB Portal</h2>
                <p className="timeline-desc">
                  Tasked with developing the modern administration interface for Azure Cosmos DB—a planet-scale database service. The core challenge was building an extremely responsive UI that could render complex partitioned document trees, database metrics, and schema parameters without layout shift (CLS) or bottlenecking under massive concurrency.
                </p>
                <div className="timeline-techs">
                  <span className="timeline-tech-badge">ReactJs</span>
                  <span className="timeline-tech-badge">Javascript</span>
                  <span className="timeline-tech-badge">Redux</span>
                  <span className="timeline-tech-badge">Jest</span>
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
                <h2 className="timeline-title">Robotic Process Automation Platform</h2>
                <p className="timeline-desc">
                  Architected the systems layers of a next-generation Robotic Process Automation (RPA) tool, 3automation. The blueprint involved constructing modular middleware connectors using KoaJS and Nodejs, interfacing with Shopify's GraphQL API. Client state caching strategies were built to fetch, queue, and dispatch bulk task configurations seamlessly.
                </p>
                <div className="timeline-techs">
                  <span className="timeline-tech-badge">TypeScript</span>
                  <span className="timeline-tech-badge">GraphQL</span>
                  <span className="timeline-tech-badge">KoaJS</span>
                  <span className="timeline-tech-badge">NodeJS</span>
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
                <h2 className="timeline-title">The Real-Time Splicing Bottleneck</h2>
                <p className="timeline-desc">
                  During high-throughput tasks on DropShip, rendering nested order objects caused critical browser main-thread blocking. The UI frame rate dropped, affecting LCP and user responsiveness. The breakthrough came by implementing flat normalization mappings for state caching and designing lightweight, custom SVG-based layout components that deferred off-screen render updates.
                </p>
                <div className="timeline-techs">
                  <span className="timeline-tech-badge">Flat Maps</span>
                  <span className="timeline-tech-badge">Custom SVG</span>
                  <span className="timeline-tech-badge">Performance</span>
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
                <h2 className="timeline-title">Deliveries & Single-Digit Latency</h2>
                <p className="timeline-desc">
                  Successful project deliveries yielded significant performance wins. Azure Cosmos portal response times leveled to single-digit milliseconds globally. Flat map optimizations reduced main-thread blocking durations by over 75%, pushing Lighthouse SEO and accessibility performance indices to 95+ and 100 respectively.
                </p>
                <div className="timeline-techs">
                  <span className="timeline-tech-badge">Uptime 99.99%</span>
                  <span className="timeline-tech-badge">LCP &lt; 1.8s</span>
                  <span className="timeline-tech-badge">SEO 100</span>
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
