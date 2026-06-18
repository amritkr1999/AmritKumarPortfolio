import React from "react";

export default function BlueprintModal({ isOpen, onClose, nodeData }) {
  if (!nodeData) return null;

  return (
    <div className={`blueprint-modal-overlay ${isOpen ? "open" : ""}`} onClick={onClose}>
      <div className="blueprint-modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="blueprint-modal-header">
          <h3 className="blueprint-modal-title">{nodeData.title}</h3>
          <button className="blueprint-modal-close-btn" onClick={onClose} aria-label="Close modal">
            &times;
          </button>
        </div>
        <div className="blueprint-modal-body">
          <p style={{ fontWeight: "600", color: "var(--primary-text)" }}>{nodeData.summary}</p>
          
          <h4>System Layer Role</h4>
          <p>{nodeData.role}</p>

          <h4>Technologies & Frameworks</h4>
          <p>{nodeData.tech}</p>

          <h4>Design Patterns & Best Practices</h4>
          <p>{nodeData.patterns}</p>
        </div>
      </div>
    </div>
  );
}
