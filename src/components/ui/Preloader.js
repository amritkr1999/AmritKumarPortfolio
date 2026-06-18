import React from "react";

export default function Preloader({ load }) {
  return (
    <div className="preloader" style={{ opacity: load ? 1 : 0, pointerEvents: load ? "auto" : "none" }}>
      <div className="spinner"></div>
      <div className="preloader-text">INITIALIZING STORYTELLER FRAMEWORK...</div>
    </div>
  );
}
