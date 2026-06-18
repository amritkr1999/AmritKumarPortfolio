import React from "react";

const FRONTEND_TECHS = [
  { name: "React 18", rating: 4 },
  { name: "TypeScript", rating: 4 },
  { name: "JavaScript", rating: 4 },
  { name: "Material UI", rating: 4 },
  { name: "Vite", rating: 4 },
  { name: "Angular", rating: 3 },
  { name: "Html", rating: 4 },
  { name: "CSS", rating: 4 },
];

const BACKEND_TECHS = [
  { name: "Java", rating: 4 },
  { name: "Spring Boot", rating: 4 },
  { name: "Hibernate/JPA", rating: 4 },
  { name: "PostgreSQL", rating: 4 },
  { name: "Spring Security", rating: 4 },
  { name: "RESTful APIs", rating: 4 },
  { name: "Python", rating: 3 },
  { name: "SQL", rating: 4 },
];

export default function Toolkit({ setTimelineTechHighlight }) {
  const renderCard = (tech) => {
    return (
      <div
        className="tech-card"
        key={tech.name}
        onMouseEnter={() => setTimelineTechHighlight(tech.name)}
        onMouseLeave={() => setTimelineTechHighlight(null)}
      >
        <span className="tech-name">{tech.name}</span>
        <div className="tech-stars">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={`tech-star-dot ${star <= tech.rating ? "filled" : ""}`}
            ></span>
          ))}
        </div>
      </div>
    );
  };

  return (
    <section id="toolkit" className="toolkit-section">
      <div className="container-wrapper">
        <div className="toolkit-header">
          <span className="toolkit-header-badge">Chapter 3: The Toolkit</span>
          <h2 className="toolkit-header-title">Technical Bookshelves</h2>
        </div>

        <div className="toolkit-grid">
          {/* Backend Bookshelf */}
          <div className="bookshelf">
            <h3 className="bookshelf-title">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: "2px" }}>
                <rect width="20" height="8" x="2" y="2" rx="2" ry="2" />
                <rect width="20" height="8" x="2" y="14" rx="2" ry="2" />
                <line x1="6" x2="6.01" y1="6" y2="6" />
                <line x1="6" x2="6.01" y1="18" y2="18" />
              </svg>
              Backend Systems
            </h3>
            <div className="bookshelf-cards">
              {BACKEND_TECHS.map((tech) => renderCard(tech))}
            </div>
          </div>

          {/* Frontend Bookshelf */}
          <div className="bookshelf">
            <h3 className="bookshelf-title">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: "2px" }}>
                <rect width="20" height="14" x="2" y="3" rx="2" />
                <line x1="8" x2="16" y1="21" y2="21" />
                <line x1="12" x2="12" y1="17" y2="21" />
              </svg>
              Frontend Frameworks
            </h3>
            <div className="bookshelf-cards">
              {FRONTEND_TECHS.map((tech) => renderCard(tech))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
